// api/analyze-crop.js
//
// Vercel Serverless Function (Node.js runtime).
// Runs SERVER-SIDE ONLY — this is the one place GEMINI_API_KEY is used,
// so it is never exposed to the browser.
//
// Calls Google's Gemini vision model with the farmer's crop photo and asks
// it to return a structured quality assessment. We use Gemini's native
// `responseSchema` feature so the model is constrained to return valid JSON
// matching our exact shape (far more reliable than asking it nicely in a
// prompt and hoping). The response is still validated + clamped server-side
// before being sent back to the app, and the app always has a safe local
// fallback if this endpoint is unreachable or misconfigured
// (see src/lib/analyzeCrop.ts).
//
// Required env var (set in Vercel Project Settings -> Environment Variables,
// and in a local .env file for `vercel dev`):
//   GEMINI_API_KEY=xxxxxxxxxxxxxxxxxxxx
//   (get one free at https://aistudio.google.com/apikey)
//
// Optional env vars:
//   GEMINI_VISION_MODEL   (default: "gemini-2.5-flash")
//   GEMINI_API_BASE_URL   (default: "https://generativelanguage.googleapis.com/v1beta")
//
// Note: Vercel Serverless Functions (outside of Next.js) have a fixed request
// body size limit (~4.5MB) that isn't raiseable via config here. The client
// (src/lib/analyzeCrop.ts) always downsizes photos to <=1024px JPEGs before
// upload, which comfortably stays under that limit.

const DEFAULT_MODEL = process.env.GEMINI_VISION_MODEL || 'gemini-2.5-flash';
const BASE_URL = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';

const SYSTEM_PROMPT = `You are AgriVision, a computer-vision crop quality inspector used by an Indian agri-marketplace.
You will be shown one photo of a harvested crop (grain, vegetable, or fruit) supplied by a farmer.
Visually inspect the produce in the photo and return a structured quality assessment.

Rules:
- Base every field ONLY on what is visible in the image.
- If the image is blurry, dark, too far away, or does not clearly show produce, still return your
  best-effort assessment but lower "confidence" and add a note to "warnings" explaining why.
- Never claim to be 100% accurate and never guarantee a market price. This is decision-support only.
- Keep every string field concise (well under 150 characters).`;

// Gemini's structured-output schema. The model is constrained to return
// JSON matching this shape exactly, so no brittle text-parsing is needed.
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    cropDetected: { type: 'STRING', description: 'Best guess at the crop name, e.g. "Wheat"' },
    qualityScore: { type: 'NUMBER', description: 'Overall quality score from 0-100' },
    recommendedGrade: { type: 'STRING', enum: ['Grade A', 'Grade B', 'Grade C'] },
    confidence: { type: 'NUMBER', description: 'Confidence in this assessment, 0-100' },
    visibleDamagePercent: { type: 'NUMBER', description: 'Estimated % of visible damage/blemish, 0-100' },
    spoilageIndicator: { type: 'STRING', enum: ['Low', 'Medium', 'High'] },
    moistureContent: { type: 'STRING', description: 'Best visual estimate, e.g. "~11-13%"' },
    lusterScore: { type: 'STRING', description: 'Short phrase, e.g. "High / Golden Luster"' },
    positiveIndicators: {
      type: 'ARRAY',
      items: { type: 'STRING' },
      description: '2-4 short bullet phrases of good qualities observed'
    },
    warnings: {
      type: 'ARRAY',
      items: { type: 'STRING' },
      description: '0-3 short bullet phrases of visible issues (empty array if none)'
    },
    recommendationText: { type: 'STRING', description: 'One sentence market-readiness recommendation' }
  },
  required: [
    'cropDetected',
    'qualityScore',
    'recommendedGrade',
    'confidence',
    'visibleDamagePercent',
    'spoilageIndicator',
    'moistureContent',
    'lusterScore',
    'positiveIndicators',
    'warnings',
    'recommendationText'
  ]
};

function clampNumber(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function clampEnum(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function clampStringArray(value, maxItems, maxLen) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => typeof v === 'string' && v.trim().length > 0)
    .slice(0, maxItems)
    .map((v) => (v.length > maxLen ? v.slice(0, maxLen - 1) + '…' : v));
}

function normalize(raw, cropHint) {
  const score = clampNumber(raw?.qualityScore, 0, 100, 70);
  const defaultGrade = score >= 85 ? 'Grade A' : score >= 65 ? 'Grade B' : 'Grade C';

  return {
    cropDetected:
      typeof raw?.cropDetected === 'string' && raw.cropDetected.trim() ? raw.cropDetected.trim() : cropHint || 'Produce',
    qualityScore: score,
    recommendedGrade: clampEnum(raw?.recommendedGrade, ['Grade A', 'Grade B', 'Grade C'], defaultGrade),
    confidence: clampNumber(raw?.confidence, 0, 100, 70),
    visibleDamagePercent: clampNumber(raw?.visibleDamagePercent, 0, 100, 10),
    spoilageIndicator: clampEnum(raw?.spoilageIndicator, ['Low', 'Medium', 'High'], 'Low'),
    moistureContent: typeof raw?.moistureContent === 'string' && raw.moistureContent ? raw.moistureContent : 'Not visually determinable',
    lusterScore: typeof raw?.lusterScore === 'string' && raw.lusterScore ? raw.lusterScore : 'Standard',
    positiveIndicators: clampStringArray(raw?.positiveIndicators, 4, 140),
    warnings: clampStringArray(raw?.warnings, 3, 140),
    recommendationText:
      typeof raw?.recommendationText === 'string' && raw.recommendationText
        ? raw.recommendationText
        : 'Suitable for standard market listing pending manual verification.'
  };
}

/** Splits a "data:image/jpeg;base64,AAAA..." string into { mimeType, base64Data }. */
function parseDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { mimeType: match[1], base64Data: match[2] };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'GEMINI_API_KEY is not configured on the server. Add it in Vercel Project Settings → Environment Variables.'
    });
  }

  const { image, cropHint } = req.body || {};
  if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
    return res.status(400).json({ success: false, error: 'Request must include a base64 "image" data URL.' });
  }

  const parsedImage = parseDataUrl(image);
  if (!parsedImage) {
    return res.status(400).json({ success: false, error: 'Could not parse the image data URL.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const url = `${BASE_URL}/models/${DEFAULT_MODEL}:generateContent`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cropHint
                  ? `${SYSTEM_PROMPT}\n\nThe farmer says this is: ${cropHint}. Inspect the attached photo and return the assessment.`
                  : `${SYSTEM_PROMPT}\n\nInspect the attached photo and return the assessment.`
              },
              { inline_data: { mime_type: parsedImage.mimeType, data: parsedImage.base64Data } }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return res.status(502).json({
        success: false,
        error: `Gemini API error (${response.status}): ${errText.slice(0, 300) || 'no details returned'}`
      });
    }

    const data = await response.json();

    const candidate = data?.candidates?.[0];
    const finishReason = candidate?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
      return res.status(502).json({
        success: false,
        error: `Gemini declined to complete the analysis (reason: ${finishReason}). Try a clearer photo.`
      });
    }

    const contentText = candidate?.content?.parts?.map((p) => p?.text || '').join('') || '';

    let parsed;
    try {
      parsed = JSON.parse(contentText);
    } catch {
      return res.status(502).json({
        success: false,
        error: 'Gemini returned a response that could not be parsed as JSON.',
        raw: contentText.slice(0, 500)
      });
    }

    return res.status(200).json({
      success: true,
      provider: 'gemini',
      model: DEFAULT_MODEL,
      data: normalize(parsed, cropHint)
    });
  } catch (err) {
    clearTimeout(timeout);
    const message = err?.name === 'AbortError' ? 'Gemini API timed out.' : err?.message || 'Unknown server error.';
    return res.status(502).json({ success: false, error: message });
  }
}