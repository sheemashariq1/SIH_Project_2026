# KisanConnect — Real Computer-Vision AI Setup (Gemini Vision)

This patch switches the "AI Crop Quality Assessment" feature from GLM to
**Google Gemini's vision model**, called through a Vercel Serverless
Function so the API key never reaches the browser. It also fixes a couple of
small bugs found while reviewing the previous patch (object-URL memory
leaks on repeated photo uploads).

## What changed since the last patch

| File | What changed |
|---|---|
| `api/analyze-crop.js` | **Rewritten for Gemini.** Calls `gemini-2.5-flash` (or your chosen model) using Gemini's native `responseSchema` feature, which forces the model to return valid JSON matching our exact shape — more reliable than the old prompt-based JSON parsing. |
| `.env.example` | Now documents `GEMINI_API_KEY` (+ optional `GEMINI_VISION_MODEL`, `GEMINI_API_BASE_URL`) instead of `GLM_API_KEY`. |
| `src/lib/analyzeCrop.ts` | Wording updated (GLM → Gemini); no behavior change — it was already provider-agnostic. |
| `src/components/farmer/AICropScanPage.tsx` | "GLM Vision" badge/text → "Gemini Vision". **Bug fix:** the preview `blob:` URL from a previous upload is now revoked before creating a new one (was leaking memory on repeated re-scans). |
| `src/components/farmer/SellWizard.tsx` | "LIVE GLM VISION" badge → "LIVE GEMINI VISION". |
| `src/context/AppContext.tsx` | **Bug fix:** `setWizardImage()` now revokes the previous `blob:` preview URL before creating a new one (same leak fix as above). |
| `src/types/index.ts` | Comment wording only. |
| `package.json` | Tidied dev scripts: `npm run dev` = plain Vite (frontend only); `npm run dev:api` = `vercel dev` (frontend **and** the real `/api/analyze-crop` function, for testing live AI locally). |

Nothing else in the app was touched — I reviewed the full `src/` tree for
other non-functional buttons (empty `onClick`, dead `href="#"` links, leftover
`console.log`/`TODO` markers) and didn't find any beyond what was already
fixed in the previous patch.

---

## 1. Get a Gemini API key (free)

1. Go to **https://aistudio.google.com/apikey**.
2. Sign in with a Google account and click **Create API key**.
3. Copy it.

> Default model is `gemini-2.5-flash` — fast and vision-capable. If your key
> doesn't have 2.5 access yet, set `GEMINI_VISION_MODEL=gemini-2.0-flash` in
> your `.env` / Vercel env vars instead.

## 2. Apply these files in VS Code

1. Open your project folder in VS Code.
2. Extract the new patch zip and copy its contents into your project root,
   overwriting the matching files (same structure as before):
   ```
   your-project/
   ├── api/analyze-crop.js          <- replaced
   ├── src/
   │   ├── lib/analyzeCrop.ts       <- replaced
   │   ├── components/farmer/
   │   │   ├── AICropScanPage.tsx   <- replaced
   │   │   └── SellWizard.tsx       <- replaced
   │   ├── context/AppContext.tsx   <- replaced
   │   └── types/index.ts           <- replaced
   ├── .env.example                 <- replaced
   └── package.json                 <- replaced
   ```
   Terminal shortcut (adjust paths):
   ```bash
   cp -r ~/Downloads/kisanconnect-gemini-vision-patch/. ~/Projects/kisanconnect-app/
   ```

## 3. Update your local `.env`

Open your existing `.env` file and **replace** the old `GLM_API_KEY` line with:
```
GEMINI_API_KEY="paste-your-real-gemini-key-here"
```
(`.env` is already gitignored — it will not be committed.)

## 4. Install & test locally

```bash
npm install
npm run dev:api      # runs `vercel dev` — serves the real /api/analyze-crop locally
```
Open the printed `localhost` URL, go to **AI Crop Quality Assessment**, and
upload a real photo — you should see a **"✓ Live AI Verified"** /
**"● LIVE GEMINI VISION"** badge if the key is working.

(`npm run dev` still works for quick UI-only iteration, but AI calls will
show "● DEMO MODE" since the API route isn't served by plain Vite.)

## 5. Update the key on Vercel

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. **Remove** `GLM_API_KEY` if you added it previously (optional cleanup).
3. **Add** `GEMINI_API_KEY` = your real key → check Production, Preview, Development.
4. Save. Redeploy (or just push — Vercel auto-deploys).

## 6. Commit and push

```bash
git checkout -b feature/gemini-vision-ai
git add .
git commit -m "Switch crop-quality AI vision from GLM to Gemini; fix preview URL memory leak"
git push -u origin feature/gemini-vision-ai
```
Open a PR into your main branch as before.

## Fallback behavior (unchanged)

If `GEMINI_API_KEY` is missing, invalid, rate-limited, or the network call
fails for any reason, the app automatically falls back to a clearly-labeled
**"● DEMO MODE"** estimate instead of crashing — safe for teammates who
haven't set up a key yet, and safe during a live demo if the network hiccups.
