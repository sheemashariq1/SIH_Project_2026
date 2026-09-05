// src/lib/analyzeCrop.ts
//
// Shared client-side helper used by both AICropScanPage and the Sell Wizard's
// AI scan step. Responsibilities:
//   1. Downscale/compress the photo in-browser (canvas) so uploads stay small
//      and fast on rural/mobile connections.
//   2. Call the real Gemini vision endpoint at /api/analyze-crop.
//   3. If that call fails for ANY reason (no API key configured yet, offline
//      demo, network hiccup, rate limit, etc.) fall back to a clearly-labelled
//      simulated result so the app never breaks during a demo.

import { AIQualityAssessment } from '../types';

export interface AnalyzeCropResult {
  assessment: AIQualityAssessment;
  source: 'live' | 'demo';
  error?: string;
}

const MAX_DIMENSION = 1024;
const JPEG_QUALITY = 0.82;

/** Resize + re-encode an image (File, Blob, or existing data/remote URL) to a small base64 JPEG. */
export async function toCompressedDataUrl(input: File | Blob | string): Promise<string> {
  const imageEl = document.createElement('img');
  const objectUrl =
    typeof input === 'string'
      ? input
      : URL.createObjectURL(input);

  try {
    await new Promise<void>((resolve, reject) => {
      imageEl.onload = () => resolve();
      imageEl.onerror = () => reject(new Error('Could not load the selected image.'));
      imageEl.crossOrigin = 'anonymous';
      imageEl.src = objectUrl;
    });

    const scale = Math.min(1, MAX_DIMENSION / Math.max(imageEl.naturalWidth, imageEl.naturalHeight));
    const width = Math.max(1, Math.round(imageEl.naturalWidth * scale));
    const height = Math.max(1, Math.round(imageEl.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported in this browser.');
    ctx.drawImage(imageEl, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  } finally {
    if (typeof input !== 'string') URL.revokeObjectURL(objectUrl);
  }
}

function buildDemoAssessment(cropId: string, cropName: string): AIQualityAssessment {
  // Deterministic-ish "demo mode" fallback so judges still see a full report
  // even before a GEMINI_API_KEY is configured, or if the network call fails.
  const seed = cropName.length + cropId.length;
  const score = 70 + (seed % 21); // 70-90
  const grade: AIQualityAssessment['recommendedGrade'] = score >= 85 ? 'Grade A' : score >= 75 ? 'Grade B' : 'Grade C';

  return {
    cropId,
    cropName,
    qualityScore: score,
    recommendedGrade: grade,
    confidence: 70,
    visibleDamagePercent: Math.max(4, 20 - (score - 60)),
    spoilageIndicator: score >= 80 ? 'Low' : 'Medium',
    moistureContent: 'Not visually determinable (demo mode)',
    lusterScore: score >= 80 ? 'Good' : 'Standard',
    indicators: {
      positive: [
        `Reasonable uniformity observed in ${cropName} sample`,
        'No major infestation visible in demo estimate'
      ],
      warnings: ['Demo estimate only — connect GEMINI_API_KEY for live computer-vision grading']
    },
    recommendationText: `Suitable for ${grade} market listing pending live AI or manual verification.`,
    analyzedAt: 'Just now (Demo Mode)',
    aiSource: 'demo'
  };
}

/**
 * Analyze a crop photo. `image` may be a File (from an <input type="file">)
 * or a string (existing data: URL or a remote sample-image URL).
 */
export async function analyzeCropImage(
  image: File | Blob | string,
  cropId: string,
  cropName: string
): Promise<AnalyzeCropResult> {
  let dataUrl: string;
  try {
    dataUrl = await toCompressedDataUrl(image);
  } catch (err) {
    // Couldn't even read/compress the image (e.g. CORS-blocked remote sample) — go straight to demo.
    return {
      assessment: buildDemoAssessment(cropId, cropName),
      source: 'demo',
      error: err instanceof Error ? err.message : 'Could not read image.'
    };
  }

  try {
    const res = await fetch('/api/analyze-crop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl, cropHint: cropName })
    });

    const json = await res.json();

    if (!res.ok || !json?.success) {
      throw new Error(json?.error || `Server responded with ${res.status}`);
    }

    const d = json.data;
    const assessment: AIQualityAssessment = {
      cropId,
      cropName: d.cropDetected || cropName,
      qualityScore: d.qualityScore,
      recommendedGrade: d.recommendedGrade,
      confidence: d.confidence,
      visibleDamagePercent: d.visibleDamagePercent,
      spoilageIndicator: d.spoilageIndicator,
      moistureContent: d.moistureContent,
      lusterScore: d.lusterScore,
      indicators: {
        positive: d.positiveIndicators,
        warnings: d.warnings
      },
      recommendationText: d.recommendationText,
      analyzedAt: 'Just now (AI Verified)',
      imageUrl: dataUrl,
      aiSource: 'live'
    };

    return { assessment, source: 'live' };
  } catch (err) {
    const fallback = buildDemoAssessment(cropId, cropName);
    fallback.imageUrl = dataUrl;
    return {
      assessment: fallback,
      source: 'demo',
      error: err instanceof Error ? err.message : 'Live AI service unavailable.'
    };
  }
}
