// api/analyze-crop.js
//
// Vercel Serverless Function (Node.js runtime).
// Runs SERVER-SIDE ONLY — this is the one place the GLM_API_KEY is used,
// so it is never exposed to the browser.
//
// Calls Zhipu AI / Z.ai's GLM vision-language model (GLM-4.5V / GLM-4V family)
// with the farmer's crop photo and asks it to return a structured quality
// assessment. The response is validated + clamped server-side before being
// sent back to the app, and the app always has a safe local fallback if this
// endpoint is unreachable or misconfigured (see src/lib/analyzeCrop.ts).
//
// Required env var (set in Vercel Project Settings -> Environment Variables,
// and in a local .env file for `vercel dev`):
//   GLM_API_KEY=xxxxxxxxxxxxxxxxxxxx
//
// Optional env vars:
//   GLM_VISION_MODEL   (default: "glm-4.5v")
//   GLM_API_BASE_URL   (default: "https://open.bigmodel.cn/api/paas/v4")

// Note: Vercel Serverless Functions (outside of Next.js) have a fixed request
// body size limit (~4.5MB) that isn't raiseable via config here. The client
// (src/lib/analyzeCrop.ts) always downsizes photos to <=1024px JPEGs before
// upload, which comfortably stays under that limit.

const DEFAULT_MODEL = process.env.GLM_VISION_MODEL || 'glm-4.5v';
const BASE_URL = process.env.GLM_API_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4';

const SYSTEM_PROMPT = `You are AgriVision, a computer-vision crop quality inspector used by an Indian agri-marketplace.
You will be shown one photo of a harvested crop (grain, vegetable, or fruit) supplied by a farmer.
Visually inspect the produce and return ONLY a single valid JSON object (no markdown fences, no prose
before or after) with exactly this shape:

{
  "cropDetected": string,               // your best guess at the crop name, e.g. "Wheat"
  "qualityScore": number,               // 0-100 overall quality score
  "recommendedGrade": "Grade A" | "Grade B" | "Grade C",
  "confidence": number,                 // 0-100 confidence in this assessment
  "visibleDamagePercent": number,       // 0-100 estimated % of visible damage/blemish
  "spoilageIndicator": "Low" | "Medium" | "High",
  "moistureContent": string,            // your best visual estimate, e.g. "~11-13%"
  "lusterScore": string,                // short phrase, e.g. "High / Golden Luster"
  "positiveIndicators": string[],       // 2-4 short bullet phrases of good qualities you observed
  "warnings": string[],                 // 0-3 short bullet phrases of visible issues (can be empty array)
  "recommendationText": string          // one sentence, market-readiness recommendation
}

Rules:
- Base every field ONLY on what is visible in the image. If the image is blurry, dark, or not produce,
  still return your best-effort JSON but lower "confidence" and note it in "warnings".
- Never claim to be 100% accurate or guarantee a price. This is decision-support only.
- Keep every string field concise (under ~120 characters).
- Return ONLY the JSON object. Do not wrap it in \`\`\`json or any other text.`;

function extractJson(text) {
  if (!text) return null;
  let cleaned = text.trim();
  // Strip ```json ... ``` or ``` ... ``` fences if the model added them anyway.
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) cleaned = fenceMatch[1].trim();
  // Fall back to grabbing the first {...} block.
  const braceStart = cleaned.indexOf('{');
  const braceEnd = cleaned.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd !== -1 && braceEnd > braceStart) {
    cleaned = cleaned.slice(braceStart, braceEnd + 1);
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GLM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'GLM_API_KEY is not configured on the server. Add it in Vercel Project Settings → Environment Variables.'
    });
  }

  const { image, cropHint } = req.body || {};
  if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
    return res.status(400).json({ success: false, error: 'Request must include a base64 "image" data URL.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: image } },
              {
                type: 'text',
                text: cropHint
                  ? `The farmer says this is: ${cropHint}. Inspect the photo and return the JSON assessment.`
                  : 'Inspect the photo and return the JSON assessment.'
              }
            ]
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return res.status(502).json({
        success: false,
        error: `GLM vision API error (${response.status}): ${errText.slice(0, 300) || 'no details returned'}`
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const contentText = Array.isArray(content)
      ? content.map((c) => (typeof c === 'string' ? c : c?.text || '')).join('\n')
      : content;

    const parsed = extractJson(contentText);
    if (!parsed) {
      return res.status(502).json({
        success: false,
        error: 'GLM vision API returned a response that could not be parsed as JSON.',
        raw: typeof contentText === 'string' ? contentText.slice(0, 500) : null
      });
    }

    return res.status(200).json({
      success: true,
      provider: 'glm',
      model: DEFAULT_MODEL,
      data: normalize(parsed, cropHint)
    });
  } catch (err) {
    clearTimeout(timeout);
    const message = err?.name === 'AbortError' ? 'GLM vision API timed out.' : err?.message || 'Unknown server error.';
    return res.status(502).json({ success: false, error: message });
  }
}
