# 🌾 KisanConnect (किसान कनेक्ट)

> **Smart India Hackathon 2026 Prototype** — A direct farmer-to-buyer agri-marketplace with AI crop grading, mandi price intelligence, live bargaining, and escrow-secured settlements.

KisanConnect connects farmers directly with verified institutional buyers (mills, processors, retailers), removing commission-agent middlemen from India's agricultural supply chain. It combines computer-vision crop grading, multi-mandi price comparison, weather-aware sell/store guidance, and bank-escrow-backed transactions in one platform — available in 8 Indian languages.

**Live problem it addresses:** price disparity across mandis, intermediary exploitation, and distress selling by farmers who lack real-time market information.

---

## 📌 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the AI Crop Scan Locally](#-running-the-ai-crop-scan-locally)
- [Deployment (Vercel)](#-deployment-vercel)
- [Internationalization](#-internationalization)
- [Known Limitations & Roadmap](#-known-limitations--roadmap)
- [Contributing](#-contributing)

---

## ✨ Key Features

### 👨‍🌾 Farmer Portal
- **8-step Sell Wizard** — pick from 20+ crops (grains, vegetables, fruits) with a searchable picker and a **voice-search mic button** for farmers who can't read or type, log harvest details, get an AI quality grade, compare mandis, get a Sell-Now-vs-Store recommendation, set a price, arrange transport, and publish the listing.
- **AI Crop Quality Scan** — upload a real photo and get a computer-vision grade (Grade A/B/C), quality score, moisture estimate, damage %, and spoilage indicator, powered by **Google Gemini's vision API** through a secure serverless function. Falls back to a clearly-labeled demo estimate if no API key is configured, so the app never breaks.
- **Market Intelligence** — cascading State → District filters, per-crop price trends, and a "nearest mandi" comparison covering Haryana, Punjab, Uttar Pradesh, and Delhi NCR, with real transport-cost-adjusted net realization figures.
- **Weather & Regional Predictions** — rainfall risk alerts and a dynamic Sell-Now-vs-Store-in-Silo calculator driven by your selected mandi and quantity.
- **Live Bargaining** — accept, counter, or negotiate buyer offers in a real-time-style chat thread.
- **Logistics & Storage** — book a transport vehicle (with driver name & phone) or a WDRA-style certified warehouse bay (with contact number), both cost-transparent.
- **Escrow Transaction Tracker** — a full multi-stage settlement pipeline from deal-lock to bank payout, invoice download, and dispute raising.
- **Notifications** — live alerts for offers, weather, and market moves, with mark-all-read support.

### 🏢 Buyer Portal
- Browse AI-graded farm lots with quality breakdowns and farmer ratings.
- Place bids and negotiate directly with farmers — zero broker cuts.
- Escrow & Payouts dashboard to track and advance locked funds through settlement.

### 🛡️ Admin / Mandi Board Portal
- Platform-wide overview of active listings and transactions.
- KYC verification queue for farmers and buyers.
- Escrow & dispute oversight.

### 🔐 Authentication
- Mobile number + password, OTP flow, and a one-tap "SIH Evaluator" demo login — no Google account required.
- **Optional real Google Sign-In** (via Google Identity Services) that only appears once a Google OAuth Client ID is configured; otherwise it's cleanly hidden.

### 🌍 Internationalization
8 languages: **English, Hindi, Punjabi, Marathi, Tamil, Telugu, Bengali, Gujarati.** See [Internationalization](#-internationalization) below for coverage details.

### 🛟 Resilience
A global error boundary and an always-visible "Back" button mean a bug on any one screen can't strand the user on a blank page — there's always a way back home.

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Build tool | Vite 6 |
| Icons | Lucide React |
| Auth | `@react-oauth/google` + `jwt-decode` (Google Identity Services) |
| AI vision | Google Gemini API (`generateContent`, multimodal) |
| Backend | Vercel Serverless Functions (Node.js) — one endpoint, `api/analyze-crop.js` |
| Hosting | Vercel (auto-deploys from GitHub) |

There is no traditional database — this is a stateful in-memory prototype (see [Known Limitations](#-known-limitations--roadmap)).

---

## 📂 Project Structure

```
kisanconnect-app/
├── api/
│   └── analyze-crop.js          # Serverless function: calls Gemini vision API server-side
├── src/
│   ├── main.tsx                 # React root + Google OAuth provider
│   ├── App.tsx                  # Role-based router (landing / farmer / buyer / admin)
│   ├── vite-env.d.ts            # Vite/import.meta.env type declarations
│   ├── context/
│   │   └── AppContext.tsx       # Global state: listings, offers, transactions, auth, i18n
│   ├── i18n/
│   │   └── translations.ts      # Extensible dictionary for the 6 non-English/Hindi languages
│   ├── lib/
│   │   └── analyzeCrop.ts       # Client helper: compresses photo, calls /api, demo fallback
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   ├── data/
│   │   └── mockData.ts          # Seed data: crops, mandis, storage, transport, listings
│   └── components/
│       ├── auth/                # Sign-in modal (mobile/OTP/demo/Google)
│       ├── landing/              # Public homepage
│       ├── layout/               # Navbar, Farmer sidebar, mobile nav
│       ├── farmer/                # Sell Wizard, AI scan, market intel, logistics, etc.
│       ├── buyer/                 # Buyer dashboard
│       ├── admin/                 # Admin dashboard
│       └── common/                 # ErrorBoundary, VoiceInputButton
├── .env.example                  # Template for required environment variables
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Then open `.env` and fill in your keys — see [Environment Variables](#-environment-variables) below. Every feature has a graceful fallback, so the app runs fine even with `.env` left blank; you just won't get live AI grading or the Google Sign-In button.

### 3. Run the app

**Frontend only** (fastest, but the AI scan will show demo estimates only):
```bash
npm run dev
```
Opens on `http://localhost:5173`.

**Frontend + AI backend together** (needed to test real Gemini crop grading):
```bash
npm install -g vercel   # one-time
vercel dev
```
Opens on `http://localhost:3000`. First run will prompt you to log in to Vercel and link/create a project — safe to create a fresh one for local testing.

> ⚠️ These two modes run on **different ports**. If you're testing Google Sign-In, make sure the port you're using is added to your OAuth Client's Authorized JavaScript Origins (see below).

### 4. Type-check / build
```bash
npm run lint    # tsc --noEmit
npm run build   # production build to dist/
```

---

## 🔑 Environment Variables

| Variable | Required? | Where it's used | Notes |
|---|---|---|---|
| `GEMINI_API_KEY` | For live AI scan | `api/analyze-crop.js` (server-only) | **Secret.** Get one free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Never exposed to the browser. |
| `GEMINI_VISION_MODEL` | Optional | `api/analyze-crop.js` | Overrides the default model (`gemini-3.5-flash`). |
| `VITE_GOOGLE_CLIENT_ID` | For Google Sign-In | `src/main.tsx`, `src/components/auth/AuthModal.tsx` | **Public**, not a secret — safe to ship in the frontend bundle. Get one from [Google Cloud Console](https://console.cloud.google.com/apis/credentials). |

If a variable is missing, the corresponding feature degrades gracefully (demo-mode AI grading, or a hidden Google button) instead of breaking the app.

---

## 🧠 Running the AI Crop Scan Locally

1. Get a Gemini API key (link above) and add it to `.env` as `GEMINI_API_KEY`.
2. Run `vercel dev` (not `npm run dev` — see [Getting Started](#-getting-started)).
3. Go to Farmer → Sell → upload a crop photo. You should see a **"● LIVE GEMINI VISION"** badge on the report instead of "● DEMO MODE".
4. **Any time you edit `.env`, restart `vercel dev`** — environment variables are only read at process startup.

For production, add `GEMINI_API_KEY` in your Vercel project's **Settings → Environment Variables** (the local `.env` file is git-ignored and never deployed automatically).

---

## ☁️ Deployment (Vercel)

This repo is set up to deploy on Vercel automatically on every push to the main branch.

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. In **Settings → Environment Variables**, add `GEMINI_API_KEY` and (optionally) `VITE_GOOGLE_CLIENT_ID` for Production, Preview, and Development.
3. If using Google Sign-In, add your deployed domain (e.g. `https://your-app.vercel.app`) to the OAuth Client's Authorized JavaScript Origins in Google Cloud Console.

---

## 🌍 Internationalization

The app supports **English, Hindi, Punjabi, Marathi, Tamil, Telugu, Bengali, and Gujarati**, selectable from the navbar's language dropdown.

**How it works:** every string in the app is written as `t('English text', 'Hindi text')`. For the 6 languages beyond English/Hindi, `t()` looks up the exact English string in `src/i18n/translations.ts` and falls back to English if that string hasn't been translated yet for the active language — so the UI never shows a blank label.

**Current coverage:**
- ✅ Full — English, Hindi (every screen)
- 🟡 Partial — Punjabi, Marathi, Tamil, Telugu, Bengali, Gujarati: navbar, sidebar, landing page, and common buttons/labels are translated; deeper screen-specific content (e.g. the Market Intelligence page body) currently falls back to English in these 6 languages.

**To extend coverage:** open `src/i18n/translations.ts`, pick a language object, and add:
```ts
'Some English string exactly as it appears in a t() call': 'Translated text',
```
No other file needs to change — this is intentional, so translation work can be picked up incrementally by anyone on the team without touching component code.

---

## ⚠️ Known Limitations & Roadmap

This is a hackathon prototype, not a production system. Known gaps:

- **No real database or persistence** — all listings, offers, and transactions live in React state and reset on page reload. A real backend (or at minimum `localStorage`) is a natural next step.
- **No real backend auth or payments** — mobile/OTP login and escrow settlement are simulated; there's no real SMS gateway or bank integration.
- **Large components** — `BuyerDashboard.tsx` and `AdminDashboard.tsx` are still fairly monolithic and would benefit from being split into smaller sub-components.
- **No URL-based routing** — navigation between screens is in-memory tab state, not real routes, so there's no deep-linking or browser back/forward support (the in-app "Back" button covers most of this need instead).
- **i18n coverage** — see above; 6 of 8 languages only cover the highest-traffic screens so far.

---

## 🤝 Contributing

This project is developed collaboratively for SIH 2026. If you're on the team:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Run `npm run lint` and `npm run build` before committing to catch type errors.
3. Open a Pull Request into `main` — Vercel will build a preview deployment automatically.
4. **Never commit your `.env` file** — it's git-ignored by default. Share keys with teammates out-of-band (Slack/WhatsApp), not in the repo.

---

## 📄 License

MIT — built for Smart India Hackathon 2026.
