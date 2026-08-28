import React, { useState } from 'react';
import {
  TrendingUp,
  Filter,
  MapPin,
  Truck,
  ArrowUpRight,
  Sparkles,
  BarChart2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketIntelligence: React.FC = () => {
  const { mandis, setFarmerTab, t } = useApp();

  const [selectedState, setSelectedState] = useState('Haryana');
  const [selectedDistrict, setSelectedDistrict] = useState('Karnal');
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [activeTimeframe, setActiveTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  // Trend data points for 7d, 30d, 90d
  const trendData = {
    '7d': [
      { label: 'Day 1', price: 2280, arrivals: 1800 },
      { label: 'Day 2', price: 2310, arrivals: 2100 },
      { label: 'Day 3', price: 2290, arrivals: 1950 },
      { label: 'Day 4', price: 2340, arrivals: 2300 },
      { label: 'Day 5', price: 2375, arrivals: 2400 },
      { label: 'Day 6', price: 2400, arrivals: 2550 },
      { label: 'Today', price: 2420, arrivals: 2430 }
    ],
    '30d': [
      { label: 'Week 1', price: 2220, arrivals: 1400 },
      { label: 'Week 2', price: 2280, arrivals: 1900 },
      { label: 'Week 3', price: 2350, arrivals: 2200 },
      { label: 'Week 4', price: 2420, arrivals: 2430 }
    ],
    '90d': [
      { label: 'Month 1', price: 2150, arrivals: 900 },
      { label: 'Month 2', price: 2260, arrivals: 1600 },
      { label: 'Month 3', price: 2420, arrivals: 2430 }
    ]
  };

  const currentDataset = trendData[activeTimeframe];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Market Intelligence & Price Discovery', 'मंडी भाव व बाज़ार विश्लेषण')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              AGMARKNET & AI Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Real-time mandi benchmark prices, historical arrival patterns, and true net realization comparison.',
              'वास्तविक समय पर मंडी भाव, दैनिक आवक और परिवहन भाड़ा घटाकर शुद्ध लाभ की सटीक गणना।'
            )}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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
            <option value="Delhi NCR">Delhi NCR</option>
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
            <option value="Sonipat">Sonipat</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('Crop', 'फसल')}</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            <option value="Wheat">Wheat (गेहूं)</option>
            <option value="Paddy">Basmati Paddy (धान)</option>
            <option value="Mustard">Mustard (सरसों)</option>
            <option value="Potato">Potato (आलू)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('Benchmark Mandi', 'मुख्य मंडी')}</label>
          <select className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900">
            <option>Karnal Main Mandi</option>
            <option>Panipat Grain Market</option>
            <option>Narela Terminal (Delhi)</option>
          </select>
        </div>
      </div>

      {/* 4 Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('CURRENT BENCHMARK', 'वर्तमान भाव')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-[#14532D]">₹2,420<span className="text-xs text-gray-500 font-normal">/q</span></span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              ↑ 6.4%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">7-Day Change: +₹145/q</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('30-DAY OUTLOOK', '30-दिवसीय ट्रेंड')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-emerald-800">+8.9%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              Bullish
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Seasonal supply consolidation</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('MARKET ARRIVALS', 'दैनिक आवक')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-gray-900">2,430 <span className="text-xs text-gray-500 font-normal">t</span></span>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md">
              Moderate
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Across 4 district yards</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('BUYER DEMAND', 'खरीदार मांग')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-amber-700">HIGH ↑</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md">
              +14% Peak
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">4 verified mills bidding</p>
        </div>
      </div>

      {/* Interactive Chart Section */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900">
              {selectedCrop} {t('Price & Market Arrival Trend', 'मूल्य एवं आवक ट्रेंड ग्राफ')}
            </h3>
            <p className="text-xs text-gray-500">Historical time series data with moving average</p>
          </div>

          {/* Timeframe buttons */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveTimeframe('7d')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTimeframe === '7d' ? 'bg-[#14532D] text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setActiveTimeframe('30d')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTimeframe === '30d' ? 'bg-[#14532D] text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setActiveTimeframe('90d')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTimeframe === '90d' ? 'bg-[#14532D] text-white shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Visual Responsive Bar & Curve Graph */}
        <div className="pt-6 pb-2">
          <div className="h-48 flex items-end justify-between gap-3 px-4">
            {currentDataset.map((item, idx) => {
              const maxPrice = 2500;
              const minPrice = 2100;
              const percentage = Math.max(15, Math.min(95, ((item.price - minPrice) / (maxPrice - minPrice)) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[11px] font-mono font-bold text-gray-800 opacity-90 group-hover:scale-110 transition-transform">
                    ₹{item.price}
                  </div>
                  <div
                    style={{ height: `${percentage}%` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-[#14532D] to-[#22C55E] group-hover:from-emerald-700 group-hover:to-emerald-400 transition-all shadow-sm relative"
                  >
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-[#EAB308]"></div>
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 truncate">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nearby Mandi Comparison with Transport Cost */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900">
              {t('Nearby Mandi Net Realization Comparison', 'नज़दीकी मंडियों की तुलना (शुद्ध प्राप्त मूल्य)')}
            </h3>
            <p className="text-xs text-gray-500">
              Calculates freight overhead based on distance from Village Taraori (Karnal)
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-900 font-bold px-3 py-1 rounded-xl">
            For 500 KG Lot
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mandis.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                m.isBestOpportunity
                  ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-gray-200 bg-white shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gray-400">{m.distanceKm} km</span>
                  {m.isBestOpportunity && (
                    <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      🏆 1ST CHOICE
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-extrabold text-base text-gray-900">{m.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">📍 {m.location}</p>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Mandi Rate</span>
                    <span className="font-bold text-gray-900">₹{m.pricePerQuintal}/q</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>Transport Freight</span>
                    <span>− ₹{m.transportCost}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Daily Arrivals</span>
                    <span>{m.arrivalsTonnes} tonnes</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block">Est. Net Realization</span>
                  <span className="font-heading font-extrabold text-lg text-[#14532D]">
                    ₹{m.estimatedNetRealization.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => setFarmerTab('sell')}
                  className="px-3.5 py-1.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  {t('Sell Here →', 'यहां बेचें →')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
