import React from 'react';
import {
  Wheat,
  Sparkles,
  PlusCircle,
  Eye,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing } from '../../types';

export const MyCrops: React.FC = () => {
  const { listings, setFarmerTab, startSellWithCrop, setActiveListing, t } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('My Crop Inventory', 'मेरी फसलें व भंडार')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {listings.length} {t('Active Harvests', 'उपज लॉट')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Manage harvest batches, view AI laboratory quality scores, and dispatch to market.',
              'फसल लॉट प्रबंधित करें, एआई गुणवत्ता रिपोर्ट देखें और उचित मंडी या खरीदार को बेचें।'
            )}
          </p>
        </div>

        <button
          onClick={() => setFarmerTab('sell')}
          className="px-4 py-2.5 bg-[#14532D] hover:bg-[#1E6B3C] text-white rounded-xl text-xs font-bold shadow transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-[#FACC15]" />
          <span>{t('+ Add New Harvest Lot', '+ नया फसल लॉट जोड़ें')}</span>
        </button>
      </div>

      {/* Grid of Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {listings.map((item) => {
          const score = item.aiQuality.qualityScore;
          const isWheat = item.cropId === 'wheat';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
                isWheat ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-200'
              }`}
            >
              <div>
                {/* Badge Row */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      item.grade === 'Grade A'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {item.grade}
                  </span>

                  <span className="text-[11px] font-mono text-gray-400">
                    {item.id}
                  </span>
                </div>

                {/* Crop Name & Quantity */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-gray-900">
                      {item.cropName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{item.farmerLocation.split(',')[0]}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-lg font-extrabold text-[#14532D]">
                      {item.quantityKg} KG
                    </span>
                    <p className="text-[10px] text-gray-500">{(item.quantityKg / 100).toFixed(1)} Quintals</p>
                  </div>
                </div>

                {/* AI Quality Bar */}
                <div className="mt-4 p-3 rounded-2xl bg-[#F8FBF8] border border-emerald-100">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="flex items-center space-x-1 text-emerald-900">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI Quality Score</span>
                    </span>
                    <span className="font-extrabold text-[#14532D]">{score}/100</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${score}%` }}
                      className={`h-full rounded-full ${
                        score >= 85
                          ? 'bg-gradient-to-r from-emerald-500 to-[#14532D]'
                          : 'bg-gradient-to-r from-amber-400 to-amber-600'
                      }`}
                    ></div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-600">
                    <span>Moisture: {item.aiQuality.moistureContent}</span>
                    <span>Confidence: {item.aiQuality.confidence}%</span>
                  </div>
                </div>

                {/* Expected Rate and Net */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    <span className="text-[10px] text-gray-500 block">{t('Expected Price', 'अपेक्षित भाव')}</span>
                    <span className="font-extrabold text-gray-900">₹{item.expectedPricePerQuintal}/q</span>
                  </div>
                  <div className="p-2 bg-emerald-50/70 rounded-xl">
                    <span className="text-[10px] text-emerald-800 font-bold block">{t('Est. Net Realization', 'शुद्ध प्राप्ति')}</span>
                    <span className="font-extrabold text-[#14532D]">₹{item.estimatedNetRealization.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setActiveListing(item);
                    setFarmerTab('ai');
                  }}
                  className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('AI Re-Scan', 'एआई स्कैन')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveListing(item);
                    setFarmerTab('offers');
                  }}
                  className="flex-1 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl text-xs font-bold shadow transition-colors flex items-center justify-center space-x-1"
                >
                  <span>{t('Sell / Offers', 'बेचें / ऑफर')}</span>
                  <span className="text-[10px] bg-[#EAB308] text-[#14532D] font-extrabold px-1.5 py-0.2 rounded-full ml-1">
                    {item.matchedBuyersCount}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
