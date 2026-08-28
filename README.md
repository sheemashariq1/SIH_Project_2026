# 🌾 KisanConnect (किसान कनेक्ट)
> **Direct Agri-Trade Marketplace with AI Quality Grading, Mandi Intelligence & Guaranteed Escrow Settlements**

A bilingual (English / हिन्दी) agritech digital platform that eliminates middlemen, protects farmers from distress selling, and connects agricultural producers directly with verified institutional buyers.

---

## 📌 Problem Statement & Solution

| Traditional Supply Chain Pain Points | KisanConnect Solution |
| :--- | :--- |
| **Middleman Exploitation**: 15–25% lost in commission agents & unofficial deductions | **Direct Marketplace**: 0% intermediary fee with itemized net payout realization |
| **Subjective Quality Disputes**: Manual physical grading leads to underpricing | **AI Grain Quality Scanner**: Computer vision estimation of moisture %, foreign matter & certified grade |
| **Payment Default & Delays**: 15–45 day payment cycles or risk of non-payment | **5-Stage Escrow Protection**: Upfront fund lock with automated bank release on weighbridge confirmation |
| **Distress Selling**: Selling at harvest lows due to lack of market intelligence | **Sell vs. Store Predictor**: 30-day econometric trend analysis factoring WDRA storage costs |
| **Weather & Transport Loss**: Sudden post-harvest rainfall damages open crops | **Hyperlocal Agro-Weather Radar**: Real-time alerts with harvesting/drying advisories & farmgate fleet booking |

---

## 🎯 Key Modules & Capabilities

### 1. 👨‍🌾 Farmer Suite
- **8-Step Listing Wizard**: Guided harvest listing with variety, quantity, reserve price, bag packaging, and farmgate location.
- **AI Crop Quality Lab**: Instant simulated grain scanner assessing Moisture Content, Broken Grains, Foreign Matter, and Agmark Grade (`A+`, `A`, `B`, `C`).
- **Mandi Price Intelligence**: Live AGMARKNET mandi price comparisons with dynamic deduction breakdown (freight, loading, net realization).
- **Sell Now vs. Store Forecaster**: Econometric curve model comparing current mandi revenue against 7, 15, and 30-day WDRA warehouse storage gains.
- **Bargaining & Live Negotiations**: Receive buyer bids, review counter-offers, and lock binding digital contracts.
- **5-Stage Escrow Tracker**: Real-time milestone pipeline (`Deal Locked` ➔ `Escrow Funded` ➔ `Transport Dispatched` ➔ `Quality Verified` ➔ `Payment Credited`).
- **Farmgate Logistics & WDRA Storage**: Vehicle booking (Pickup, 14ft Eicher, 32ft Container) & WDRA warehouse receipt generator (`e-NWR`).
- **Agro-Weather Radar**: Real-time rain alerts and field advisories.

### 2. 🏢 Institutional Buyer Hub
- **Verified Produce Discovery**: Filter crop listings by grade, moisture level, variety, and location radius.
- **100% Escrow-Backed Bidding**: Place binding bids with upfront fund reservation.
- **Negotiation Desk**: Counter-offer on price per quintal, delivery dates, and minimum lot sizes.
- **Quality & Weighbridge Verification**: Inspect digitally signed AI quality certificates and release payments on delivery.

### 3. 🛡️ Admin & Agronomist Portal
- **Escrow Liquidity Monitor**: Real-time tracking of platform-wide locked, active, and released funds.
- **Farmer & Buyer KYC Queue**: Verification for Aadhaar, Kisan Credit Card (KCC), GST, and FSSAI licenses.
- **Dispute & Quality Arbitration Desk**: Agronomist intervention portal for weight or grade discrepancies.
- **AGMARKNET Telemetry**: Live API status across major agricultural states.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS 4 (Custom Agricultural Color System)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, CSS Micro-interactions
- **Build Tool**: Vite 6
- **Internationalization**: Dual-language context engine (English & हिन्दी)

---

## 📂 Project Structure

```
├── index.html                    # HTML entry point & font setup
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite build configuration
├── src/
│   ├── main.tsx                  # React DOM root
│   ├── App.tsx                   # Role-based route controller & layout
│   ├── index.css                 # Tailwind CSS rules
│   ├── types.ts                  # Global data models & interfaces
│   ├── context/
│   │   └── AppContext.tsx        # Global store (roles, translations, listings, escrow)
│   └── components/
│       ├── auth/                 # Sign-in & role selection modal
│       ├── landing/              # Public homepage & live mandi price ticker
│       ├── layout/               # Top Navbar & responsive navigation bars
│       ├── farmer/               # 11 Farmer modules (Wizard, AI Lab, Escrow, Radar, etc.)
│       ├── buyer/                # Marketplace discovery, bidding & escrow funding
│       └── admin/                # Platform monitoring, KYC queue & arbitration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📄 License
This project is open-source under the **MIT License**.
