import React from 'react';
import {
  Sparkles,
  TrendingUp,
  CloudRain,
  Award,
  ArrowUpRight,
  AlertTriangle,
  Zap,
  ArrowRight,
  Calendar,
  Layers,
  Truck,
  Building2,
  Handshake,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmerDashboard: React.FC = () => {
  const { setFarmerTab, t, offers, transactions, weather } = useApp();

  const activeOffer = offers[0];
  const activeTxn = transactions[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Good Morning 👋', 'शुभ प्रभात 👋')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
              {t('Live Market Pulse', 'लाइव मंडी भाव')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            📍 <span className="font-semibold text-gray-800">Karnal, Haryana</span> • {t('Your regional market intelligence & decision center today', 'आपका क्षेत्रीय बाज़ार विश्लेषण एवं निर्णय केंद्र')}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFarmerTab('sell')}
            className="px-4 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
          >
            <span>🌾 {t('Sell Harvest Produce', 'नई फसल बेचें')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FACC15]" />
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Market Price */}
        <div
          onClick={() => setFarmerTab('market')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t('CURRENT MARKET PRICE', 'वर्तमान मंडी भाव')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-[#14532D]">₹2,420<span className="text-xs text-gray-500 font-normal">/q</span></span>
            <span className="inline-flex items-center text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +6.4%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Karnal Main Mandi (Wheat)</p>
        </div>

        {/* 2. Buyer Demand */}
        <div
          onClick={() => setFarmerTab('offers')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t('BUYER DEMAND', 'खरीदार मांग')}</span>
            <Handshake className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-amber-700">HIGH ↑</span>
            <span className="inline-flex items-center text-[11px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md">
              +14% expected
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">4 verified buyers matching</p>
        </div>

        {/* 3. Weather Risk */}
        <div
          onClick={() => setFarmerTab('weather')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t('WEATHER RISK', 'मौसम जोखिम')}</span>
            <CloudRain className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-rose-700">MEDIUM 🌧</span>
            <span className="inline-flex items-center text-[11px] font-bold text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded-md">
              72% rain risk
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Rain expected in 3 days</p>
        </div>

        {/* 4. AI Quality */}
        <div
          onClick={() => setFarmerTab('ai')}
          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t('AI QUALITY SCORE', 'एआई गुणवत्ता स्कोर')}</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-[#14532D]">87<span className="text-xs text-gray-500 font-normal">/100</span></span>
            <span className="inline-flex items-center text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              GRADE A
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">91% model confidence</p>
        </div>
      </div>

      {/* Large Hero Card: 🌾 SMART SELLING OPPORTUNITY */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#14532D] via-[#1B6A3D] to-[#0F3E22] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-400/30">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#EAB308]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/80 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-200 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>{t('SMART SELLING OPPORTUNITY', 'स्मार्ट बिक्री अवसर')}</span>
            </div>

            <div className="flex items-center space-x-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Wheat • <span className="text-[#FACC15]">Grade A</span>
              </h2>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                500 KG Lot
              </span>
            </div>

            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              {t(
                'Buyer demand is high and rain risk is rising in GT Karnal belt. KisanConnect recommendation engine advises selling within 3 days for maximum realization.',
                'करनाल क्षेत्र में खरीदारों की मांग अधिक है और आगामी 3 दिनों में बारिश का खतरा है। किसानकनेक्ट एआई अधिकतम लाभ के लिए 3 दिन के भीतर फसल बेचने की सलाह देता है।'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setFarmerTab('pred')}
                className="px-5 py-2.5 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center space-x-1.5"
              >
                <span>{t('View Full AI Recommendation →', 'एआई पूर्ण सलाह देखें →')}</span>
              </button>

              <button
                onClick={() => setFarmerTab('offers')}
                className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-xs rounded-xl transition-colors"
              >
                {t('View 4 Matching Buyers', '4 खरीदार ऑफर देखें')}
              </button>
            </div>
          </div>

          {/* Right Estimated Net Box */}
          <div className="bg-[#0A2E19]/80 border border-emerald-400/30 p-5 rounded-2xl flex flex-col justify-between min-w-[240px] text-right sm:text-left lg:text-right">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                {t('ESTIMATED NET REALIZATION', 'अनुमानित शुद्ध प्राप्त मूल्य')}
              </span>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FACC15] mt-1">
                ₹11,720
              </div>
              <p className="text-[11px] text-emerald-200 mt-0.5">
                {t('for 500 KG (after ₹350 transport)', '500 किलो के लिए (₹350 भाड़ा काटकर)')}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-700/50 flex items-center justify-between text-xs">
              <span className="text-emerald-300">{t('Action:', 'सिफारिश:')}</span>
              <span className="font-extrabold text-[#FACC15] bg-emerald-900/90 px-2 py-0.5 rounded-md border border-amber-400/40">
                {t('SELL WITHIN 3 DAYS', '3 दिन में बेचें')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div>
        <h3 className="font-heading font-extrabold text-sm text-gray-900 mb-3 flex items-center space-x-1.5">
          <span>{t('Quick Decision Actions', 'त्वरित कार्य एवं सेवाएं')}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setFarmerTab('ai')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-[#14532D]" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('AI Crop Scan', 'एआई स्कैन')}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Grade A/B/C</span>
          </button>

          <button
            onClick={() => setFarmerTab('market')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-[#14532D]" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('Mandi Prices', 'मंडी भाव')}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">5 Mandis</span>
          </button>

          <button
            onClick={() => setFarmerTab('weather')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <CloudRain className="w-5 h-5 text-[#14532D]" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('Weather Risk', 'मौसम जोखिम')}</span>
            <span className="text-[10px] text-rose-600 font-bold mt-0.5">72% Rain</span>
          </button>

          <button
            onClick={() => setFarmerTab('pred')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('Predictions', 'पूर्वानुमान')}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">7-Day Range</span>
          </button>

          <button
            onClick={() => setFarmerTab('offers')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <Handshake className="w-5 h-5 text-[#14532D]" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('Buyer Offers', 'खरीदार ऑफर')}</span>
            <span className="text-[10px] text-amber-700 font-bold mt-0.5">₹2,430/q offer</span>
          </button>

          <button
            onClick={() => setFarmerTab('log')}
            className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center text-center transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5 text-[#14532D]" />
            </div>
            <span className="text-xs font-bold text-gray-900">{t('Transport/Store', 'वेयरहाउस/वाहन')}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">From ₹250/d</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Price Trend & "What should you do now?" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wheat Price Trend Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-heading font-extrabold text-sm text-gray-900">
                {t('Wheat 7-Day Price Trend', 'गेहूं 7-दिवसीय भाव ट्रेंड')}
              </h3>
              <p className="text-[11px] text-gray-500">Karnal Mandi • ₹ per Quintal</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              ↑ 6.4% Week-on-Week
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-40 flex items-end justify-between gap-2 px-2">
              {[
                { day: '22 Aug', price: 2275, height: '42%' },
                { day: '23 Aug', price: 2310, height: '52%' },
                { day: '24 Aug', price: 2290, height: '47%' },
                { day: '25 Aug', price: 2340, height: '62%' },
                { day: '26 Aug', price: 2380, height: '74%' },
                { day: '27 Aug', price: 2400, height: '82%' },
                { day: 'Today', price: 2420, height: '94%', highlight: true }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{bar.price}
                  </span>
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-t-lg transition-all ${
                      bar.highlight
                        ? 'bg-gradient-to-t from-[#14532D] to-[#22C55E] shadow-sm'
                        : 'bg-emerald-200/80 group-hover:bg-emerald-300'
                    }`}
                  ></div>
                  <span className={`text-[10px] font-medium ${bar.highlight ? 'font-bold text-[#14532D]' : 'text-gray-500'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Low: ₹2,275/q</span>
            <span className="font-bold text-[#14532D]">Peak: ₹2,420/q (Today)</span>
            <button
              onClick={() => setFarmerTab('market')}
              className="font-bold text-emerald-800 hover:underline"
            >
              {t('Explore 30-Day Analysis →', '30-दिवसीय विश्लेषण →')}
            </button>
          </div>
        </div>

        {/* "What Should You Do Now?" Decision Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold text-xs">
                💡
              </div>
              <h3 className="font-heading font-extrabold text-sm text-gray-900">
                {t('What Should You Do Now?', 'अभी आपको क्या करना चाहिए?')}
              </h3>
            </div>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              AI Action Protocol
            </span>
          </div>

          <div className="space-y-2.5 my-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
              <span className="text-gray-600 flex items-center space-x-1.5">
                <span>🌧</span>
                <span>{t('Weather Threat', 'मौसम का खतरा')}</span>
              </span>
              <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                High Rain in 3 Days (72%)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
              <span className="text-gray-600 flex items-center space-x-1.5">
                <span>🤝</span>
                <span>{t('Procurement Demand', 'खरीदार मांग')}</span>
              </span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                High (4 Active Mills)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 text-xs">
              <span className="text-gray-600 flex items-center space-x-1.5">
                <span>📈</span>
                <span>{t('Projected Price', 'अनुमानित अधिकतम भाव')}</span>
              </span>
              <span className="font-extrabold text-gray-900 font-mono">
                ₹2,450/quintal
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <p className="font-bold text-emerald-950 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('Recommended Strategy:', 'सलाहकार रणनीति:')}</span>
              </p>
              <p className="text-emerald-800 text-[11px] mt-1 leading-snug">
                {t(
                  'Accept ABC Foods offer at ₹2,430/q with free truck pickup, avoiding wet grain moisture markdown and warehouse rent overhead.',
                  'एबीसी फूड्स का ₹2,430/क्विंटल का ऑफर स्वीकार करें जिसमें मुफ्त वाहन उठाव शामिल है। इससे नमी कट और गोदाम के खर्च से बचेंगे।'
                )}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={() => setFarmerTab('offers')}
              className="flex-1 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-bold text-xs shadow transition-colors text-center"
            >
              {t('Review Buyer Offers (₹2,430/q) →', 'ऑफर देखें व सौदा पक्का करें →')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
