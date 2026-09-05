# KisanConnect — Real Computer-Vision AI Setup (GLM Vision)

This patch replaces the fully-simulated "AI Crop Quality Assessment" screens
with a **real computer-vision model call** (GLM vision-language model from
Zhipu AI / Z.ai), routed through a Vercel Serverless Function so the API key
never reaches the browser.

## What changed

| File | What it does |
|---|---|
| `api/analyze-crop.js` | **New.** Vercel serverless function. Receives a base64 photo, calls the GLM vision model server-side, validates the response, returns clean JSON. This is the only place `GLM_API_KEY` is used. |
| `src/lib/analyzeCrop.ts` | **New.** Client helper: compresses the photo in-browser, calls `/api/analyze-crop`, and gracefully falls back to a clearly-labeled demo estimate if the call fails (missing key, offline, rate limit, etc.) so the app never breaks mid-demo. |
| `src/components/farmer/AICropScanPage.tsx` | **Rewritten.** The upload area now actually works (click / drag-drop / camera capture) and photos are sent through the real pipeline. Sample pills still work for a quick demo. |
| `src/components/farmer/SellWizard.tsx` | **Patched.** Step 2's "Upload Crop Sample Photo" box previously had **no click handler at all** — it was decorative. It's now a real file input + drag-and-drop. |
| `src/context/AppContext.tsx` | **Patched.** `runAIScanForWizard()` used to always return the same hardcoded 87/100 "Grade A" result. It now calls the real analyzer and adds `setWizardImage()` + an `aiError` field for the UI. |
| `src/types/index.ts` | Added optional `aiSource?: 'live' | 'demo'` field to `AIQualityAssessment` so the UI can show a "LIVE GLM VISION" vs "DEMO MODE" badge. |
| `.env.example` | Swapped the unused `GEMINI_API_KEY` for `GLM_API_KEY` (+ optional model/base-url overrides). |
| `package.json` | Removed the unused `@google/genai`, `express`, `dotenv` dependencies (nothing in the code ever called them); added `vercel` as a dev dependency so `npm run dev` can run the API route locally. |

Everything else in your app is untouched.

---

## 1. Get a GLM API key

1. Go to **https://open.bigmodel.cn/** (Zhipu AI / Z.ai's open platform) and create an account.
2. Create an API key from your account/API-keys page.
3. Copy it — you'll paste it into Vercel and your local `.env` in step 3.

> The default model is `glm-4.5v`. If your account only has access to the
> older GLM-4V family, set `GLM_VISION_MODEL=glm-4v-plus` instead (see below).

## 2. Apply these files in VS Code

1. Open your existing project folder (`kisanconnect-app`) in VS Code.
2. Extract the patch zip you were given and copy its contents **into the
   project root**, overwriting the matching files. In VS Code's Explorer you
   can just drag the extracted `api`, `src`, files onto the project root and
   choose "Replace" when prompted — the folder structure matches exactly:
   ```
   your-project/
   ├── api/
   │   └── analyze-crop.js          <- new
   ├── src/
   │   ├── lib/
   │   │   └── analyzeCrop.ts       <- new
   │   ├── components/farmer/
   │   │   ├── AICropScanPage.tsx   <- replaced
   │   │   └── SellWizard.tsx       <- replaced
   │   ├── context/AppContext.tsx   <- replaced
   │   └── types/index.ts           <- replaced
   ├── .env.example                 <- replaced
   └── package.json                 <- replaced
   ```
3. Open the VS Code integrated terminal (`` Ctrl+` ``) in the project root.

## 3. Configure your local environment

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
   (On Windows PowerShell: `copy .env.example .env`)
2. Open `.env` and paste your real key:
   ```
   GLM_API_KEY="paste-your-real-key-here"
   ```
3. `.env` is already in `.gitignore` — it will **not** be committed. Good.

## 4. Install dependencies & run locally

```bash
npm install
npm i -g vercel        # one-time global install, or skip and use `npx vercel dev`
npm run dev
```

`npm run dev` now runs `vercel dev`, which serves both the Vite frontend
**and** the `/api/analyze-crop` serverless function locally on
`http://localhost:3000`, so you can test real photo uploads before pushing.

If you just want the old plain-Vite dev server (frontend only, API calls will
fall back to Demo Mode locally), use `npm run dev:vite-only` instead.

## 5. Add the key to Vercel (for your deployed site)

Since your repo is already connected to Vercel:

1. Go to your project on **vercel.com** → **Settings** → **Environment Variables**.
2. Add:
   - `GLM_API_KEY` = your real key → check **Production**, **Preview**, and **Development**.
   - *(optional)* `GLM_VISION_MODEL` = `glm-4.5v` or `glm-4v-plus`.
3. Save. Vercel will use this automatically on the next deploy — you do **not**
   put this key in any file that gets committed to GitHub.

## 6. Commit and push (for the team)

```bash
git checkout -b feature/glm-vision-ai
git add .
git commit -m "Wire real GLM computer-vision crop grading into AI scan + sell wizard"
git push -u origin feature/glm-vision-ai
```

Then open a Pull Request into your main branch on the `SIH_Project_2026`
GitHub repo so your teammates can review it. Once merged, Vercel will build
and deploy automatically (as it already does for your repo), and the live
site will use `GLM_API_KEY` from the Vercel dashboard.

**For teammates pulling this branch:** they just need to run `cp .env.example .env`
and add their own `GLM_API_KEY` locally (or ask you for a shared dev key) —
they do not need to touch Vercel settings to test locally with `vercel dev`.

## How it behaves if something's misconfigured

- No `GLM_API_KEY` set → the API route returns a clear error → the frontend
  automatically shows a **"● DEMO MODE"** badge and a demo-estimate report
  instead of crashing. Great for teammates who haven't set up a key yet.
- Bad/expired key, rate limit, network issue → same graceful demo fallback,
  with the specific error shown in a small amber banner on the report.
- Everything configured correctly → you'll see **"✓ Live AI Verified"** /
  **"● LIVE GLM VISION"** badges, and the quality score/grade/indicators come
  directly from the model's inspection of the actual uploaded photo.
