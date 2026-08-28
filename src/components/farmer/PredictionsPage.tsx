import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  TrendingUp,
  CloudSun,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Info,
  Calendar,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PredictionsPage: React.FC = () => {
  const { setFarmerTab, t } = useApp();

  const [selectedState, setSelectedState] = useState('Haryana');
  const [selectedDistrict, setSelectedDistrict] = useState('Karnal');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [holdDays, setHoldDays] = useState(30);

  // Financial simulation
  const lotKg = 500;
  const quintals = lotKg / 100;
  const currentPrice = 2420;
  const projectedFuturePrice = 2480;
  const immediateTransport = 350;
  const futureTransport = 500;
  const storageCost = holdDays * 8.33; // ~₹250/mth

  const sellNowNet = quintals * currentPrice - immediateTransport;
  const storeNet = quintals * projectedFuturePrice - futureTransport - storageCost;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('AI Regional Price & Demand Predictions', 'एआई क्षेत्रीय मूल्य व मांग पूर्वानुमान')}
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
              Model Simulation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Multi-variable econometric and meteorological model predicting 7-to-30 day price windows.',
              'मौसम, क्षेत्रीय उत्पादन एवं खरीदार मांग का समग्र एआई विश्लेषण।'
            )}
          </p>
        </div>
      </div>

      {/* Selector Row */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs grid grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('State', 'राज्य')}</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            <option value="Haryana">Haryana</option>
            <option value="Punjab">Punjab</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('District', 'ज़िला')}</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            <option value="Karnal">Karnal</option>
            <option value="Panipat">Panipat</option>
            <option value="Kurukshetra">Kurukshetra</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('Crop Target', 'फसल')}</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            <option value="Wheat">Wheat (गेहूं)</option>
            <option value="Paddy">Paddy / Rice (धान)</option>
            <option value="Mustard">Mustard (सरसों)</option>
          </select>
        </div>
      </div>

      {/* 4 Prediction Insight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('PRICE OUTLOOK (7-DAY)', 'मूल्य दृष्टिकोण')}</span>
          <div className="mt-2 font-heading text-2xl font-extrabold text-[#14532D]">
            ₹2,380 – ₹2,470
          </div>
          <div className="mt-1 flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
            <span>↑ Slightly Bullish</span>
            <span className="text-gray-400">•</span>
            <span>78% Conf.</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('DEMAND OUTLOOK', 'मांग दृष्टिकोण')}</span>
          <div className="mt-2 font-heading text-2xl font-extrabold text-amber-700">
            HIGH ↑
          </div>
          <p className="text-xs font-bold text-amber-800 mt-1">+14% expected processing demand</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('SUPPLY & ARRIVALS', 'आवक व आपूर्ति')}</span>
          <div className="mt-2 font-heading text-2xl font-extrabold text-gray-900">
            MODERATE
          </div>
          <p className="text-xs text-gray-500 mt-1">+8% arrival momentum</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('WEATHER RISK FACTOR', 'मौसम जोखिम')}</span>
          <div className="mt-2 font-heading text-2xl font-extrabold text-rose-700">
            MEDIUM 🌧
          </div>
          <p className="text-xs text-rose-600 font-bold mt-1">72% precipitation probability</p>
        </div>
      </div>

      {/* HOW PREDICTION ENGINE WORKS - Visual Flow Banner */}
      <div className="bg-gradient-to-br from-[#14532D] via-[#1A6237] to-[#0F3E22] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-400/30 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 bg-[#EAB308] text-[#14532D] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Architecture: Multi-Source Synthesis</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {t('How Predictions & Recommendations are Generated', 'एआई मॉडल पूर्वानुमान कैसे तैयार करता है?')}
          </h3>
        </div>

        {/* Neural Network Nodes Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          {[
            { title: 'Regional Climate', val: 'Karnal IMD', icon: '☁️' },
            { title: 'Harvest Volume', val: '500 KG Lot', icon: '🌾' },
            { title: 'Historical Rates', val: '5-Yr Mandi Data', icon: '📈' },
            { title: 'Arrival Velocity', val: '2,430 t/day', icon: '🚚' },
            { title: 'Mill Demand', val: '4 Active Buyers', icon: '🏢' },
            { title: 'AI Quality Grade', val: '87/100 (A)', icon: '🤖' },
            { title: 'Storage Rent', val: '₹250/mth', icon: '🏭' }
          ].map((node, idx) => (
            <div key={idx} className="bg-[#0A2E19] p-3 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              <span className="text-xl mb-1">{node.icon}</span>
              <p className="text-[11px] font-bold text-white leading-tight">{node.title}</p>
              <span className="text-[10px] text-emerald-300 font-mono mt-1">{node.val}</span>
            </div>
          ))}
        </div>

        {/* Engine Output Box */}
        <div className="bg-[#0F3E22] p-5 rounded-2xl border border-emerald-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-extrabold text-[#FACC15] uppercase tracking-wider">
              {t('SYNTHESIZED ACTIONABLE STRATEGY:', 'अंतिम कार्ययोजना:')}
            </span>
            <h4 className="font-heading text-xl font-extrabold text-white">
              {t('SELL WITHIN 3 DAYS AT ₹2,420 – ₹2,450/q', '3 दिन में ₹2,420 – ₹2,450 पर बेचें')}
            </h4>
            <p className="text-xs text-emerald-100/80">
              Demand is peaking right before rainfall. Waiting incurs warehouse double-freight without margin uplift.
            </p>
          </div>

          <button
            onClick={() => setFarmerTab('offers')}
            className="px-6 py-3 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap"
          >
            {t('Accept Current Buyer Offer (₹2,430/q) →', 'खरीदार का ₹2,430 ऑफर देखें →')}
          </button>
        </div>
      </div>

      {/* Interactive Sell vs Store Simulation Calculator */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900">
              {t('Interactive Hold / Store Simulation Calculator', 'भंडारण समय एवं शुद्ध लाभ कैलकुलेटर')}
            </h3>
            <p className="text-xs text-gray-500">
              Adjust storage days slider to simulate storage rent vs future mandi price gains
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl">
            {holdDays} Days Selected
          </span>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-gray-700">
            <span>Sell Today (0 Days)</span>
            <span>Hold 15 Days</span>
            <span>Hold 30 Days</span>
            <span>Hold 60 Days</span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={holdDays}
            onChange={(e) => setHoldDays(Number(e.target.value))}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#14532D]"
          />
        </div>

        {/* Calculation Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500">
            <span className="text-xs font-extrabold text-emerald-950 uppercase block">Sell Today Result</span>
            <div className="font-heading text-2xl font-extrabold text-[#14532D] mt-1">
              ₹{sellNowNet.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-800 mt-1">
              Gross ₹12,100 − Transport ₹350 = <strong>₹11,750 net in hand</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-bold text-gray-700 uppercase block">Hold {holdDays} Days Result</span>
            <div className="font-heading text-2xl font-extrabold text-gray-900 mt-1">
              ₹{Math.round(storeNet).toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Gross ₹12,400 − Storage ₹{Math.round(storageCost)} − Freight ₹500
            </p>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 text-center">
          Predictions are statistical models for decision support and are not guaranteed future contract rates.
        </p>
      </div>
    </div>
  );
};
