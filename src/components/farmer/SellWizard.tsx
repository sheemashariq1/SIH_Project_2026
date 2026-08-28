import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Camera,
  MapPin,
  TrendingUp,
  CloudRain,
  ShieldCheck,
  Truck,
  Building2,
  Zap,
  Info,
  DollarSign,
  Search,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CROPS_DATA } from '../../data/mockData';
import { CropCategory, CropDefinition } from '../../types';

export const SellWizard: React.FC = () => {
  const {
    sellWizard,
    setSellWizard,
    runAIScanForWizard,
    publishCurrentWizardListing,
    mandis,
    storageFacilities,
    transportFleet,
    weather,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('crops');

  const filteredCrops = CROPS_DATA.filter((c) => {
    const matchesCat = c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameHi.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  // Steps configuration
  const steps = [
    { num: 1, label: t('Crop', 'फसल') },
    { num: 2, label: t('Harvest Details', 'विवरण') },
    { num: 3, label: t('AI Quality Scan', 'एआई ग्रेडिंग') },
    { num: 4, label: t('Market & Weather', 'मंडी व मौसम') },
    { num: 5, label: t('Sell vs Store', 'निर्णय') },
    { num: 6, label: t('Price Discovery', 'भाव तय') },
    { num: 7, label: t('Logistics', 'परिवहन') },
    { num: 8, label: t('Publish Listing', 'प्रकाशन') }
  ];

  // Calculated financials
  const quintals = sellWizard.quantityKg / 100;
  const currentMandiPrice = sellWizard.crop?.mandiAvgPrice || 2420;
  const grossValue = quintals * sellWizard.expectedPrice;
  const selectedTransport = transportFleet.find((t) => t.id === sellWizard.selectedTransportId) || transportFleet[0];
  const transportCost = selectedTransport.baseCost + selectedTransport.perKmCost * 14;
  const storageCost = sellWizard.hasStorage ? 250 : 0;
  const estimatedNetRealization = Math.max(0, grossValue - transportCost - storageCost);

  const scanStepLabels = [
    t('Uploading image to secure edge server...', 'चित्र अपलोड हो रहा है...'),
    t('Detecting crop species & grain morphometrics...', 'फसल एवं दाने की पहचान की जा रही है...'),
    t('Analyzing surface discoloration & luster index...', 'चमक एवं रंग की जांच हो रही है...'),
    t('Screening for insect abrasions & threshing damage...', 'कीट एवं गहाई की क्षति जांची जा रही है...'),
    t('Estimating internal moisture & fungal indicators...', 'नमी एवं फफूंद संकेतकों का विश्लेषण...'),
    t('Synthesizing laboratory Grade & Market Readiness...', 'अंतिम एआई ग्रेड रिपोर्ट तैयार हो रही है...')
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto pb-12">
      {/* Wizard Header */}
      <div className="bg-gradient-to-r from-[#14532D] to-[#1E6B3C] p-6 rounded-3xl text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-emerald-800/80 px-2.5 py-0.5 rounded-full text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>{t('Smart Selling & Price Discovery Workflow', 'स्मार्ट फसल बिक्री एवं मूल्य निर्धारण प्रक्रिया')}</span>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-white">
              {t('Create Harvest Listing', 'नई फसल सूची बनाएं')}
            </h1>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
            {t('Step', 'चरण')} {sellWizard.step} {t('of', 'में से')} 8
          </span>
        </div>

        {/* Step Progress Pills */}
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-2 border-t border-emerald-700/60">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num <= sellWizard.step) {
                  setSellWizard((prev) => ({ ...prev, step: s.num }));
                }
              }}
              className={`text-left p-1.5 rounded-lg text-[10px] font-bold transition-all truncate ${
                sellWizard.step === s.num
                  ? 'bg-[#EAB308] text-[#14532D] shadow'
                  : s.num < sellWizard.step
                  ? 'bg-emerald-800/80 text-emerald-200'
                  : 'bg-emerald-950/40 text-emerald-400/50 cursor-not-allowed'
              }`}
            >
              <span>{s.num}. {s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: CROP SELECTION */}
      {sellWizard.step === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-gray-900">
              {t('Select Your Harvested Crop Category', 'अपनी फसल का प्रकार चुनें')}
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              {t('Choose from 3 primary agricultural categories or search below.', 'नीचे दी गई श्रेणियों में से अपनी फसल चुनें।')}
            </p>
          </div>

          {/* 3 Major Category Tabs */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedCategory('crops')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                selectedCategory === 'crops'
                  ? 'border-[#14532D] bg-emerald-50 text-[#14532D] font-extrabold shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span className="text-3xl mb-1">🌾</span>
              <span className="text-sm font-heading">{t('Crops & Grains', 'अनाज व दलहन')}</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Wheat, Rice, Mustard...</span>
            </button>

            <button
              onClick={() => setSelectedCategory('vegetables')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                selectedCategory === 'vegetables'
                  ? 'border-[#14532D] bg-emerald-50 text-[#14532D] font-extrabold shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span className="text-3xl mb-1">🥕</span>
              <span className="text-sm font-heading">{t('Vegetables', 'सब्जियां')}</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Potato, Onion, Tomato...</span>
            </button>

            <button
              onClick={() => setSelectedCategory('fruits')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                selectedCategory === 'fruits'
                  ? 'border-[#14532D] bg-emerald-50 text-[#14532D] font-extrabold shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span className="text-3xl mb-1">🍎</span>
              <span className="text-sm font-heading">{t('Fruits & Orchards', 'फल')}</span>
              <span className="text-[10px] text-gray-500 mt-0.5">Apple, Mango, Banana...</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search crop by name (e.g. Wheat, Potato, Tomato)...', 'फसल का नाम खोजें...')}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Crops Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredCrops.map((c) => {
              const isSelected = sellWizard.crop?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSellWizard((prev) => ({
                      ...prev,
                      crop: c,
                      variety: c.varieties[0] || 'Standard',
                      expectedPrice: c.mandiAvgPrice + 30
                    }));
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#14532D] bg-emerald-50/80 ring-2 ring-emerald-600/30'
                      : 'border-gray-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{c.emoji}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#14532D]" />
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="font-heading font-extrabold text-sm text-gray-900">{c.name}</h4>
                    <p className="text-[11px] text-gray-500">{c.nameHi}</p>
                    <p className="text-[10px] text-emerald-800 font-bold mt-1">Avg: ₹{c.mandiAvgPrice}/q</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 2 }))}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <span>{t('Continue with', 'जारी रखें')} {sellWizard.crop?.name} →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: HARVEST DETAILS */}
      {sellWizard.step === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Harvest & Farm Lot Details', 'फसल कटाई एवं लॉट विवरण')}
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                {t('Specify quantity, harvest date, location, and upload produce photo.', 'मात्रा, कटाई की तारीख, स्थान एवं फसल का फोटो अपलोड करें।')}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="text-xl">{sellWizard.crop?.emoji}</span>
              <span className="text-xs font-extrabold text-[#14532D]">{sellWizard.crop?.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Variety */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t('Crop Variety / Sub-Type', 'फसल की किस्म / वैरायटी')}
              </label>
              <select
                value={sellWizard.variety}
                onChange={(e) => setSellWizard((prev) => ({ ...prev, variety: e.target.value }))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold"
              >
                {sellWizard.crop?.varieties.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t('Total Harvest Quantity (in KG)', 'कुल कटाई मात्रा (किलो में)')}
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={sellWizard.quantityKg}
                  onChange={(e) => setSellWizard((prev) => ({ ...prev, quantityKg: Number(e.target.value) }))}
                  className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold"
                  min={50}
                  step={50}
                />
                <span className="px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-xs font-bold text-gray-600">
                  = {(sellWizard.quantityKg / 100).toFixed(1)} Qtl
                </span>
              </div>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t('Harvest Date', 'कटाई की तिथि')}
              </label>
              <input
                type="date"
                value={sellWizard.harvestDate}
                onChange={(e) => setSellWizard((prev) => ({ ...prev, harvestDate: e.target.value }))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold"
              />
            </div>

            {/* Pincode & Location */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t('Farm Location & Pincode', 'खेत का स्थान व पिनकोड')}
              </label>
              <input
                type="text"
                value={sellWizard.location}
                onChange={(e) => setSellWizard((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* Photo Upload Area */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              {t('Upload Crop Sample Photo for AI Quality Assessment', 'एआई गुणवत्ता जांच हेतु फसल की तस्वीर अपलोड करें')}
            </label>

            <div className="border-2 border-dashed border-emerald-600/40 hover:border-emerald-600 bg-emerald-50/40 rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#14532D] flex items-center justify-center mb-2">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-gray-800">
                {t('Click to upload crop sample image or drag file here', 'फोटो खींचें या गैलरी से अपलोड करें')}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {t('High resolution photos ensure 90%+ AI grading confidence', 'स्पष्ट फोटो से 90%+ सटीक एआई ग्रेडिंग सुनिश्चित होती है')}
              </p>

              {sellWizard.imagePreview && (
                <div className="mt-3 relative w-48 h-28 rounded-xl overflow-hidden border-2 border-emerald-600 shadow">
                  <img
                    src={sellWizard.imagePreview}
                    alt="Crop preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                    Sample Attached
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 1 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back to Crop', 'पीछे')}</span>
            </button>

            <button
              onClick={async () => {
                setSellWizard((prev) => ({ ...prev, step: 3 }));
                await runAIScanForWizard();
              }}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('Analyze Crop with AI →', 'एआई द्वारा फसल की जांच करें →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI CROP QUALITY ASSESSMENT */}
      {sellWizard.step === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI-Assisted Quality Assessment</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {sellWizard.isScanning ? t('AI Computer Vision Screening in Progress...', 'एआई विज़न जांच जारी है...') : t('AI Quality Assessment Report', 'एआई गुणवत्ता मूल्यांकन रिपोर्ट')}
              </h2>
            </div>
            <span className="text-xs text-gray-400 font-mono">Model: AgriVision-v3.8</span>
          </div>

          {/* Scanning Animation State */}
          {sellWizard.isScanning ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="relative w-48 h-48 rounded-3xl overflow-hidden border-4 border-emerald-500 shadow-2xl bg-black">
                {sellWizard.imagePreview && (
                  <img
                    src={sellWizard.imagePreview}
                    alt="Scanning"
                    className="w-full h-full object-cover opacity-80 filter contrast-125"
                  />
                )}
                {/* Laser animation bar */}
                <div className="absolute left-0 right-0 h-1 bg-[#FACC15] shadow-[0_0_15px_#FACC15] animate-scan-laser"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-transparent to-emerald-500/20 pointer-events-none"></div>
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="font-heading font-extrabold text-base text-gray-900">
                  {scanStepLabels[sellWizard.scanStepIndex] || scanStepLabels[0]}
                </h3>
                <div className="w-64 bg-gray-200 h-2.5 rounded-full mx-auto overflow-hidden">
                  <div
                    style={{ width: `${((sellWizard.scanStepIndex + 1) / 6) * 100}%` }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-[#14532D] transition-all duration-300 rounded-full"
                  ></div>
                </div>
                <p className="text-[11px] text-gray-500">
                  {t('Deep neural network examining grain parameters against BIS Standards', 'भारतीय मानक ब्यूरो (BIS) मानकों के अनुरूप दाने की जांच')}
                </p>
              </div>
            </div>
          ) : (
            /* AI Quality Result Card */
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Score & Recommended Grade */}
                <div className="bg-gradient-to-br from-[#14532D] to-[#1E6B3C] text-white p-6 rounded-3xl shadow-md flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300">
                      {t('AI QUALITY SCORE', 'एआई गुणवत्ता स्कोर')}
                    </span>
                    <div className="font-heading text-5xl font-extrabold text-[#FACC15] mt-1">
                      {sellWizard.aiAssessment?.qualityScore || 87}
                      <span className="text-xl text-emerald-200 font-normal"> / 100</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-700/60">
                      <span className="text-[11px] text-emerald-200 block">{t('RECOMMENDED GRADE', 'सुझाई गई श्रेणी')}</span>
                      <span className="font-heading text-2xl font-extrabold text-white">
                        {sellWizard.aiAssessment?.recommendedGrade || 'Grade A'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs bg-[#0F3E22] px-3 py-2 rounded-xl border border-emerald-500/30">
                    <span className="text-emerald-300">Confidence:</span>
                    <span className="font-mono font-bold text-[#FACC15]">
                      {sellWizard.aiAssessment?.confidence || 91}%
                    </span>
                  </div>
                </div>

                {/* Indicators & Spoilage */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">{t('Visible Damage', 'दृश्यमान क्षति')}</span>
                      <span className="font-heading text-xl font-bold text-gray-900">
                        {sellWizard.aiAssessment?.visibleDamagePercent || 8}%
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Low / Acceptable</span>
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">{t('Spoilage Indicator', 'खराबी सूचकांक')}</span>
                      <span className="font-heading text-xl font-bold text-emerald-700">
                        {sellWizard.aiAssessment?.spoilageIndicator || 'LOW'}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">Zero fungal mold</span>
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                      <span className="text-[11px] text-gray-500 block">{t('Moisture Content', 'नमी प्रतिशत')}</span>
                      <span className="font-heading text-xl font-bold text-gray-900">
                        {sellWizard.aiAssessment?.moistureContent || '11.4%'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">&lt; 12% Optimal</span>
                    </div>
                  </div>

                  {/* Quality Checklist */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      {t('Verified Quality Indicators', 'प्रमाणित गुणवत्ता विशेषताएं')}
                    </h4>
                    <div className="space-y-1 text-xs text-emerald-900">
                      <div className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t('Good grain appearance and uniform golden luster', 'दाने की एक समान चमक व रूप')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{t('Low visible damage (< 8% threshing abrasion)', 'न्यूनतम थ्रेशिंग क्षति (< 8%)')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{t('Minor surface chafing; does not affect milling yield', 'मामूली छिलका खरोंच; पिसाई क्षमता अप्रभावित')}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-800 font-medium pt-2 border-t border-emerald-200/60">
                      💡 <strong>{t('Recommendation:', 'सिफारिश:')}</strong> {t('Suitable for premium market listing & corporate procurement.', 'प्रीमियम बाज़ार एवं कॉर्पोरेट खरीद के लिए उपयुक्त।')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mandatory AI Disclaimer */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-2 text-[11px] text-gray-500">
                <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>
                  <strong>AI-Assisted Quality Assessment:</strong> Indicative decision-support result generated by computer vision algorithms for price discovery. Physical inspection at buyer dock remains standard.
                </span>
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => runAIScanForWizard()}
                  className="px-4 py-2 text-xs font-bold text-emerald-800 hover:underline"
                >
                  🔄 {t('Re-Run AI Scan', 'दोबारा स्कैन करें')}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSellWizard((prev) => ({ ...prev, step: 4 }))}
                    className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
                  >
                    <span>{t('Accept AI Grade & Analyze Market →', 'एआई ग्रेड स्वीकार करें व आगे बढ़ें →')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: WEATHER SCREEN & MANDI COMPARISON */}
      {sellWizard.step === 4 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-rose-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <CloudRain className="w-3.5 h-3.5 text-rose-600" />
                <span>Weather & Regional Risk Intelligence</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Weather Impact & Nearby Mandi Comparison', 'मौसम का प्रभाव व नज़दीकी मंडियों की तुलना')}
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-700">📍 Karnal Hub</span>
          </div>

          {/* Weather Alert Card */}
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{t('CRITICAL WEATHER IMPACT ON YOUR WHEAT', 'गेहूं पर आगामी मौसम का बड़ा प्रभाव')}</span>
              </span>
              <span className="bg-amber-200 text-amber-950 font-extrabold px-2 py-0.5 rounded-md">
                72% Rain Risk in 3 Days
              </span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              {t(
                'Heavier rainfall expected across Karnal and Panipat mandis. Open field harvest faces moisture absorption risk, leading to potential 10-15% price deductions if unsheltered.',
                'करनाल एवं पानीपत में भारी वर्षा का पूर्वानुमान है। खुले में रखी फसल में नमी बढ़ने पर 10-15% दाम कटने का जोखिम है।'
              )}
            </p>
          </div>

          {/* Mandi Comparison Table */}
          <div>
            <h3 className="font-heading font-extrabold text-sm text-gray-900 mb-3">
              {t('Nearby Mandi Net Comparison for 500 KG Lot', '500 किलो लॉट हेतु मंडियों का शुद्ध हिसाब')}
            </h3>

            <div className="space-y-2.5">
              {mandis.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    m.isBestOpportunity
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-heading font-bold text-sm text-gray-900">{m.name}</h4>
                      {m.isBestOpportunity && (
                        <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          🏆 {t('BEST ESTIMATED OPPORTUNITY', 'सर्वश्रेष्ठ अवसर')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {m.distanceKm} km away • Transport Cost: ₹{m.transportCost} • Demand: {m.demandLevel}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">{t('Mandi Price', 'मंडी भाव')}</span>
                      <span className="font-extrabold text-gray-900">₹{m.pricePerQuintal}/q</span>
                    </div>

                    <div className="text-right bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-emerald-800 font-bold block">{t('Est. Net Realization', 'शुद्ध प्राप्ति')}</span>
                      <span className="font-heading font-extrabold text-sm text-[#14532D]">
                        ₹{m.estimatedNetRealization.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 3 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'पीछे')}</span>
            </button>

            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 5 }))}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <span>{t('View Sell Now vs Store Decision →', 'बेचें या रोकें निर्णय देखें →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REGIONAL PREDICTIONS & SELL NOW VS STORE */}
      {sellWizard.step === 5 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-700" />
                <span>AI Predictive Decision Engine</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Sell Now vs Store & Sell Later Comparison', 'अभी बेचें बनाम भंडारण करके बाद में बेचें')}
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Confidence: 78%
            </span>
          </div>

          {/* Side by Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. SELL NOW OPTION */}
            <div className="p-5 rounded-3xl border-2 border-emerald-500 bg-emerald-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-base text-gray-900">
                    🟢 {t('Option A: Sell Within 3 Days', 'विकल्प A: 3 दिन में बेचें')}
                  </span>
                  <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {t('RECOMMENDED', 'अनुशंसित')}
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('Gross Produce Value (500 KG @ ₹2,420/q)', 'सकल मूल्य')}</span>
                    <span className="font-bold text-gray-900">₹12,100</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>{t('Transport Overhead', 'वाहन भाड़ा')}</span>
                    <span>− ₹350</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>{t('Storage Cost', 'वेयरहाउस किराया')}</span>
                    <span>₹0</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-200 flex justify-between text-sm font-extrabold text-[#14532D]">
                    <span>{t('Estimated Net Realization:', 'शुद्ध प्राप्त मूल्य:')}</span>
                    <span>₹11,750</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-800 mt-3 bg-white p-2.5 rounded-xl border border-emerald-200">
                  ✓ High active mill demand<br />
                  ✓ Zero rain quality depreciation<br />
                  ✓ Instant 2-day escrow settlement
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200">
                <span className="text-[11px] font-bold text-[#14532D] block">
                  {t('AI Recommendation: SELL WITHIN 3 DAYS', 'एआई सलाह: 3 दिन के भीतर बेचें')}
                </span>
              </div>
            </div>

            {/* 2. STORE AND SELL LATER */}
            <div className="p-5 rounded-3xl border border-gray-200 bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-base text-gray-900">
                    📦 {t('Option B: Store in Silo (30 Days)', 'विकल्प B: 30 दिन गोदाम में रखें')}
                  </span>
                  <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Alternative
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('Projected Price (₹2,500/q)', 'अनुमानित भाव')}</span>
                    <span className="font-bold text-gray-900">₹12,500</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>{t('Transport to Warehouse + Mandi', 'दोगुना परिवहन')}</span>
                    <span>− ₹600</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>{t('Storage Rent (30d @ ₹250/mth)', 'गोदाम किराया')}</span>
                    <span>− ₹250</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                    <span>{t('Estimated Net Realization:', 'शुद्ध प्राप्त मूल्य:')}</span>
                    <span>₹11,650</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 mt-3 bg-white p-2.5 rounded-xl border border-gray-200">
                  ⚠ Storage rent and double handling offset higher future rate.<br />
                  ⚠ Rainfall moisture transit risk.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <span className="text-[11px] font-medium text-gray-500 block">
                  Net outcome is ~₹100 lower after storage fees.
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 4 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'पीछे')}</span>
            </button>

            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 6 }))}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <span>{t('Set Expected Price & Discover →', 'अपेक्षित मूल्य निर्धारित करें →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: FARMER PRICE DISCOVERY & EXPECTATION */}
      {sellWizard.step === 6 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                <span>Price Discovery Engine</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Farmer Price Expectation vs Market Benchmark', 'किसान की मूल्य अपेक्षा व बाज़ार तुलना')}
              </h2>
            </div>
            <span className="text-xs text-gray-500 font-medium">Input for direct bidding</span>
          </div>

          {/* Input Price Control */}
          <div className="bg-gradient-to-br from-emerald-50 to-[#F8FBF8] p-6 rounded-3xl border border-emerald-200">
            <label className="block text-xs font-extrabold uppercase tracking-wide text-emerald-950 mb-2">
              {t('Enter Your Desired / Expected Price (₹ per Quintal)', 'अपनी अपेक्षित दर दर्ज करें (₹ प्रति क्विंटल)')}
            </label>
            <div className="flex items-center space-x-3">
              <span className="font-heading text-3xl font-extrabold text-[#14532D]">₹</span>
              <input
                type="number"
                value={sellWizard.expectedPrice}
                onChange={(e) => setSellWizard((prev) => ({ ...prev, expectedPrice: Number(e.target.value) }))}
                className="w-48 px-4 py-3 bg-white border-2 border-emerald-600 rounded-2xl text-xl font-extrabold text-[#14532D] focus:outline-none shadow-sm"
                step={10}
              />
              <span className="text-sm font-bold text-gray-600">/ Quintal</span>
            </div>
            <p className="text-[11px] text-emerald-800 mt-2 font-medium">
              💡 {t('Tip: Setting within ₹2,420 – ₹2,460 attracts 95% faster bids from verified mills.', 'सलाह: ₹2,420 – ₹2,460 रखने पर खरीदारों से तुरंत बोलियां प्राप्त होती हैं।')}
            </p>
          </div>

          {/* 3 Value Benchmark Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-[11px] text-gray-500 block">{t('Current Mandi Average', 'वर्तमान मंडी औसत')}</span>
              <span className="font-heading text-xl font-bold text-gray-900">₹2,420/q</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Karnal Mandi</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-[11px] text-gray-500 block">{t('Buyer Bidding Average', 'खरीदार औसत बोली')}</span>
              <span className="font-heading text-xl font-bold text-gray-900">₹2,400/q</span>
              <span className="text-[10px] text-gray-500 block mt-0.5">4 Active Mill Offers</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-500">
              <span className="text-[11px] text-emerald-900 font-bold block">{t('Your Expected Price', 'आपकी अपेक्षित दर')}</span>
              <span className="font-heading text-xl font-extrabold text-[#14532D]">₹{sellWizard.expectedPrice}/q</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                {sellWizard.expectedPrice > currentMandiPrice ? '↑ Above Mandi Avg' : 'Competitive Rate'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
            <strong>Decision Support Note:</strong> This price expectation is used for buyer matching and negotiation discovery. It is not a guaranteed statutory MSP payout.
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 5 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'पीछे')}</span>
            </button>

            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 7 }))}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <span>{t('Configure Transport & Storage →', 'परिवहन व वेयरहाउस चुनें →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: LOGISTICS & TRANSPORT SELECTION */}
      {sellWizard.step === 7 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Integrated Logistics & Net Realization</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Select Transport Fleet for Farmgate Pickup', 'खेत से उठान हेतु वाहन चुनें')}
              </h2>
            </div>
            <span className="text-xs text-gray-500 font-mono">Distance: 14 km (Karnal Hub)</span>
          </div>

          {/* Transport Fleet options */}
          <div className="space-y-3">
            {transportFleet.map((tOpt) => {
              const isSelected = sellWizard.selectedTransportId === tOpt.id;
              const cost = tOpt.baseCost + tOpt.perKmCost * 14;

              return (
                <div
                  key={tOpt.id}
                  onClick={() => setSellWizard((prev) => ({ ...prev, selectedTransportId: tOpt.id }))}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'border-[#14532D] bg-emerald-50/70 ring-2 ring-emerald-600/20'
                      : 'border-gray-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-gray-900">{tOpt.name}</h4>
                      <p className="text-xs text-gray-500">{tOpt.vehicleType} • ETA: {tOpt.eta}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#14532D]">₹{cost}</span>
                      <p className="text-[10px] text-gray-500">Total freight</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#14532D] bg-[#14532D] text-white' : 'border-gray-300'}`}>
                      {isSelected && <Check className="w-3 h-3 text-[#FACC15]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Net Realization Box */}
          <div className="p-5 rounded-2xl bg-[#0F3E22] text-white space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
              {t('NET REALIZATION BREAKDOWN FOR THIS LOT', 'इस लॉट का वास्तविक शुद्ध लाभ')}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-emerald-300 block">Gross Value</span>
                <span className="font-extrabold text-white text-base">₹{grossValue.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-emerald-300 block">Transport</span>
                <span className="font-bold text-rose-300 text-base">− ₹{transportCost}</span>
              </div>
              <div>
                <span className="text-emerald-300 block">Storage</span>
                <span className="font-bold text-gray-300 text-base">− ₹0</span>
              </div>
              <div>
                <span className="text-[#FACC15] font-bold block">Estimated Net</span>
                <span className="font-heading font-extrabold text-xl text-[#FACC15]">₹{estimatedNetRealization.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 6 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'पीछे')}</span>
            </button>

            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 8 }))}
              className="px-6 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <span>{t('Review Summary & Publish Listing →', 'अंतिम विवरण व प्रकाशन →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: SUMMARY & PUBLISH */}
      {sellWizard.step === 8 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ready for Buyer Marketplace</span>
              </div>
              <h2 className="font-heading text-xl font-extrabold text-gray-900">
                {t('Confirm & Publish Produce Listing', 'फसल लिस्टिंग की पुष्टि करें')}
              </h2>
            </div>
            <span className="text-xs font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700 font-bold">
              Lot: KC-WHT-00124
            </span>
          </div>

          {/* Comprehensive Summary Card */}
          <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-[#EAB308] text-[#14532D] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                  {sellWizard.aiAssessment?.recommendedGrade || 'Grade A'} Verified
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-gray-900 mt-2">
                  {sellWizard.crop?.name} ({sellWizard.variety})
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  📍 {sellWizard.location}
                </p>
              </div>

              <div className="text-right">
                <span className="font-heading text-2xl font-extrabold text-[#14532D]">
                  {sellWizard.quantityKg} KG
                </span>
                <p className="text-xs text-gray-500 font-medium">({quintals.toFixed(1)} Quintals)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-emerald-200 text-xs">
              <div className="p-3 bg-white rounded-xl shadow-xs">
                <span className="text-[10px] text-gray-500 block">AI Quality Score</span>
                <span className="font-extrabold text-emerald-800 text-base">
                  {sellWizard.aiAssessment?.qualityScore || 87}/100
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-xs">
                <span className="text-[10px] text-gray-500 block">Expected Rate</span>
                <span className="font-extrabold text-gray-900 text-base">
                  ₹{sellWizard.expectedPrice}/q
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-xs">
                <span className="text-[10px] text-gray-500 block">Selected Fleet</span>
                <span className="font-extrabold text-gray-900 text-xs truncate block">
                  Eco Mini Truck
                </span>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl shadow-xs">
                <span className="text-[10px] text-emerald-900 font-bold block">Est. Net Realization</span>
                <span className="font-heading font-extrabold text-[#14532D] text-base">
                  ₹{estimatedNetRealization.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-950">
            <ShieldCheck className="w-6 h-6 text-emerald-700 flex-shrink-0" />
            <div>
              <p className="font-bold">{t('Instant Buyer Notification & Matching', 'तुरंत खरीदार मिलान')}</p>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                {t(
                  'Publishing makes this lot visible to 4 matching mills (ABC Foods, Sharma Agro, ITC, Green Harvest) with zero intermediary cuts.',
                  'प्रकाशन के साथ ही 4 सत्यापित मिलों को सूचना भेजी जाएगी और सीधे ऑफर प्राप्त होंगे।'
                )}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSellWizard((prev) => ({ ...prev, step: 7 }))}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'पीछे')}</span>
            </button>

            <button
              onClick={() => publishCurrentWizardListing()}
              className="px-8 py-3.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-sm shadow-xl transition-all transform active:scale-95 flex items-center space-x-2"
            >
              <span>🎉 {t('PUBLISH LISTING & GET BUYER OFFERS', 'लिस्टिंग प्रकाशित करें एवं ऑफर प्राप्त करें')} →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
