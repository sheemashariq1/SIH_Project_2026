import React, { useEffect, useMemo, useState } from 'react';
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
import { CROPS_DATA, STATE_DISTRICTS } from '../../data/mockData';

// Small deterministic pseudo-random generator seeded by a string, so each
// crop gets its own stable-looking (but different) trend line instead of
// every crop sharing the exact same static numbers.
const seededRandom = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = (h * 1664525 + 1013904223) | 0;
    return ((h >>> 0) % 1000) / 1000;
  };
};

export const MarketIntelligence: React.FC = () => {
  const { mandis, setFarmerTab, t } = useApp();

  const states = Object.keys(STATE_DISTRICTS);
  const [selectedState, setSelectedState] = useState('Haryana');
  const [selectedDistrict, setSelectedDistrict] = useState(STATE_DISTRICTS['Haryana'][0]);
  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [selectedMandiId, setSelectedMandiId] = useState<string | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  const selectedCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];

  // Whenever the State changes, snap the District to the first valid option
  // for that state instead of leaving a stale district from another state.
  useEffect(() => {
    const districtsForState = STATE_DISTRICTS[selectedState] || [];
    if (!districtsForState.includes(selectedDistrict)) {
      setSelectedDistrict(districtsForState[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  // Mandis relevant to the selected State, with the mandi matching the
  // selected District (if any) surfaced first — this is what actually makes
  // "Nearby Mandi" reflect the location filters instead of always showing
  // the same Karnal-based list.
  const relevantMandis = useMemo(() => {
    const inState = mandis.filter((m) => m.state === selectedState);
    const pool = inState.length > 0 ? inState : mandis;
    return [...pool].sort((a, b) => {
      const aMatch = a.district === selectedDistrict ? 0 : 1;
      const bMatch = b.district === selectedDistrict ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
      return a.distanceKm - b.distanceKm;
    }).slice(0, 3);
  }, [mandis, selectedState, selectedDistrict]);

  useEffect(() => {
    if (relevantMandis.length > 0 && !relevantMandis.some((m) => m.id === selectedMandiId)) {
      setSelectedMandiId(relevantMandis[0].id);
    }
  }, [relevantMandis, selectedMandiId]);

  const benchmarkMandi = relevantMandis.find((m) => m.id === selectedMandiId) || relevantMandis[0];

  // Crop-specific derived metrics so every crop shows its own numbers
  // instead of one hardcoded ₹2,420 benchmark for everything.
  const cropMetrics = useMemo(() => {
    const rand = seededRandom(selectedCropId + selectedDistrict);
    const basePrice = benchmarkMandi ? benchmarkMandi.pricePerQuintal : selectedCrop.mandiAvgPrice;
    const priceAdjustedForCrop = Math.round(selectedCrop.mandiAvgPrice * (0.97 + rand() * 0.06));
    const weeklyChangePct = +(2 + rand() * 8).toFixed(1);
    const outlookPct = +(3 + rand() * 10).toFixed(1);
    const arrivals = Math.round(800 + rand() * 3500);
    const demandBoostPct = Math.round(5 + rand() * 20);
    const isBullish = rand() > 0.3;
    return { basePrice, priceAdjustedForCrop, weeklyChangePct, outlookPct, arrivals, demandBoostPct, isBullish };
  }, [selectedCropId, selectedDistrict, benchmarkMandi, selectedCrop]);

  // Trend data points for 7d, 30d, 90d — generated per-crop so the chart
  // actually changes when a different crop is selected.
  const trendData = useMemo(() => {
    const rand = seededRandom(selectedCropId + '-trend');
    const base = cropMetrics.priceAdjustedForCrop;
    const buildSeries = (count: number, labelFn: (i: number) => string) => {
      const points = [];
      let price = Math.round(base * 0.9);
      for (let i = 0; i < count; i++) {
        price = Math.round(price + (rand() - 0.3) * base * 0.02);
        const arrivals = Math.round(900 + rand() * 2000);
        points.push({ label: i === count - 1 ? t('Today', 'आज') : labelFn(i), price, arrivals });
      }
      // Ensure the series ends near the current benchmark price for consistency
      points[points.length - 1].price = base;
      return points;
    };

    return {
      '7d': buildSeries(7, (i) => t(`Day ${i + 1}`, `दिन ${i + 1}`)),
      '30d': buildSeries(4, (i) => t(`Week ${i + 1}`, `सप्ताह ${i + 1}`)),
      '90d': buildSeries(3, (i) => t(`Month ${i + 1}`, `माह ${i + 1}`))
    };
  }, [selectedCropId, cropMetrics.priceAdjustedForCrop, t]);

  const currentDataset = trendData[activeTimeframe];
  const maxPrice = Math.max(...currentDataset.map((d) => d.price)) * 1.1;
  const minPrice = Math.min(...currentDataset.map((d) => d.price)) * 0.9;

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
            {states.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('District', 'ज़िला')}</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            {(STATE_DISTRICTS[selectedState] || []).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('Crop', 'फसल')}</label>
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            {CROPS_DATA.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.nameHi})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1">{t('Benchmark Mandi', 'मुख्य मंडी')}</label>
          <select
            value={selectedMandiId || ''}
            onChange={(e) => setSelectedMandiId(e.target.value)}
            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900"
          >
            {relevantMandis.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('CURRENT BENCHMARK', 'वर्तमान भाव')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-[#14532D]">₹{cropMetrics.priceAdjustedForCrop.toLocaleString('en-IN')}<span className="text-xs text-gray-500 font-normal">/q</span></span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              ↑ {cropMetrics.weeklyChangePct}%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">7-Day Change: +₹{Math.round(cropMetrics.priceAdjustedForCrop * cropMetrics.weeklyChangePct / 100)}/q</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('30-DAY OUTLOOK', '30-दिवसीय ट्रेंड')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-emerald-800">+{cropMetrics.outlookPct}%</span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${cropMetrics.isBullish ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
              {cropMetrics.isBullish ? t('Bullish', 'तेज़ी') : t('Stable', 'स्थिर')}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{t('Seasonal supply consolidation', 'मौसमी आपूर्ति समायोजन')}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('MARKET ARRIVALS', 'दैनिक आवक')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-gray-900">{cropMetrics.arrivals.toLocaleString('en-IN')} <span className="text-xs text-gray-500 font-normal">t</span></span>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md">
              {t('Moderate', 'मध्यम')}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{t(`Across ${(STATE_DISTRICTS[selectedState] || []).length} district yards`, `${(STATE_DISTRICTS[selectedState] || []).length} ज़िला यार्ड में`)}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold">{t('BUYER DEMAND', 'खरीदार मांग')}</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-heading text-2xl font-extrabold text-amber-700">{cropMetrics.demandBoostPct > 15 ? t('HIGH ↑', 'उच्च ↑') : t('MODERATE', 'मध्यम')}</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md">
              +{cropMetrics.demandBoostPct}% Peak
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{relevantMandis.length} {t('verified mills bidding', 'सत्यापित खरीदार बोली लगा रहे हैं')}</p>
        </div>
      </div>

      {/* Interactive Chart Section */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900">
              {selectedCrop.emoji} {selectedCrop.name} {t('Price & Market Arrival Trend', 'मूल्य एवं आवक ट्रेंड ग्राफ')}
            </h3>
            <p className="text-xs text-gray-500">{t('Historical time series data with moving average', 'समय के साथ मूल्य परिवर्तन का ग्राफ')}</p>
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
              {t(`Showing mandis nearest to ${selectedDistrict}, ${selectedState}`, `${selectedDistrict}, ${selectedState} के नज़दीक की मंडियां`)}
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-900 font-bold px-3 py-1 rounded-xl">
            For 500 KG Lot
          </span>
        </div>

        {relevantMandis.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-500">
            {t('No mandi network data available for this region yet.', 'इस क्षेत्र के लिए मंडी डेटा अभी उपलब्ध नहीं है।')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relevantMandis.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMandiId(m.id)}
                className={`p-5 rounded-3xl border flex flex-col justify-between transition-all cursor-pointer ${
                  m.id === selectedMandiId
                    ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-gray-200 bg-white shadow-xs hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400">{m.distanceKm} km</span>
                    {m.id === selectedMandiId && (
                      <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        🏆 {t('SELECTED', 'चयनित')}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMandiId(m.id);
                      setFarmerTab('sell');
                    }}
                    className="px-3.5 py-1.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
                  >
                    {t('Sell Here →', 'यहां बेचें →')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
