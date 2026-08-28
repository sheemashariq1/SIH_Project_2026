import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CROPS_DATA } from '../../data/mockData';
import { AIQualityAssessment } from '../../types';

export const AICropScanPage: React.FC = () => {
  const { setFarmerTab, startSellWithCrop, t } = useApp();

  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [report, setReport] = useState<AIQualityAssessment | null>({
    cropId: 'wheat',
    cropName: 'Wheat (Sharbati HD 2967)',
    qualityScore: 87,
    recommendedGrade: 'Grade A',
    confidence: 91,
    visibleDamagePercent: 8,
    spoilageIndicator: 'Low',
    moistureContent: '11.4%',
    lusterScore: 'High / Golden Luster',
    indicators: {
      positive: [
        'Uniform grain appearance and size distribution',
        'Natural golden luster matching Grade A export benchmarks',
        'Moisture strictly measured at 11.4% (well under 12% maximum threshold)',
        'Zero live weevils or insect infestation detected'
      ],
      warnings: [
        'Minor 8% surface abrasion during mechanical threshing'
      ]
    },
    recommendationText: 'Suitable for premium commercial procurement with zero mandi broker deductions.',
    analyzedAt: 'Just now (AI Verified)'
  });

  const [isOverridden, setIsOverridden] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>('Grade A');

  const sampleImages: { [key: string]: { url: string; name: string } } = {
    wheat: {
      url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      name: 'Wheat (Harvest Sample)'
    },
    potato: {
      url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
      name: 'Potato (Tuber Sample)'
    },
    tomato: {
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      name: 'Tomato (Harvest Crate)'
    },
    rice: {
      url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      name: 'Paddy / Basmati Rice'
    },
    mustard: {
      url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=80',
      name: 'Mustard Seeds'
    }
  };

  const scanStages = [
    t('Uploading image to edge computer-vision pipeline...', 'चित्र अपलोड हो रहा है...'),
    t('Detecting crop species & grain morphometrics...', 'फसल एवं दाने की पहचान की जा रही है...'),
    t('Analyzing surface discoloration & luster index...', 'चमक एवं रंग की जांच हो रही है...'),
    t('Screening for insect abrasions & threshing damage...', 'क्षति एवं खरोंच जांची जा रही है...'),
    t('Estimating internal moisture & fungal indicators...', 'नमी एवं फफूंद संकेतकों का विश्लेषण...'),
    t('Synthesizing laboratory Grade & Market Readiness...', 'अंतिम एआई ग्रेड रिपोर्ट तैयार हो रही है...')
  ];

  const handleScan = async (cropIdToScan: string) => {
    setSelectedCropId(cropIdToScan);
    setIsScanning(true);
    setScanStepIndex(0);

    for (let i = 1; i <= 5; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setScanStepIndex(i);
    }

    const targetCrop = CROPS_DATA.find((c) => c.id === cropIdToScan) || CROPS_DATA[0];
    const score = cropIdToScan === 'wheat' ? 87 : cropIdToScan === 'tomato' ? 91 : 74;
    const grade: 'Grade A' | 'Grade B' | 'Grade C' = score >= 85 ? 'Grade A' : 'Grade B';

    setReport({
      cropId: targetCrop.id,
      cropName: targetCrop.name,
      qualityScore: score,
      recommendedGrade: grade,
      confidence: 91,
      visibleDamagePercent: score >= 85 ? 8 : 14,
      spoilageIndicator: 'Low',
      moistureContent: cropIdToScan === 'wheat' ? '11.4%' : '76%',
      lusterScore: 'High / Standard Luster',
      indicators: {
        positive: [
          `High uniformity in ${targetCrop.name} specimen dimensions`,
          'Zero pest infestation or fungal black spot indicators',
          'Meets optimal commercial packaging moisture tolerances'
        ],
        warnings: [
          'Recommended prompt dry storage dispatch within 72 hours'
        ]
      },
      recommendationText: `Suitable for premium ${grade} market listing and direct processor procurement.`,
      analyzedAt: 'Just now (AI Verified)'
    });

    setIsScanning(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('AI Crop Quality Assessment', 'एआई फसल गुणवत्ता जांच')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
              AI-Assisted
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Computer-vision assisted screening that grades produce, detects visible damages, and estimates moisture.',
              'कंप्यूटर विज़न द्वारा दाने की गुणवत्ता, चमक, खरोंच एवं नमी की वैज्ञानिक जांच।'
            )}
          </p>
        </div>
      </div>

      {/* Preset Sample Crop Selector Pills */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2">
          {t('Select Sample Harvest Lot for Quick Demonstration:', 'त्वरित डेमो हेतु नमूना फसल चुनें:')}
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(sampleImages).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleScan(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedCropId === key
                  ? 'bg-[#14532D] text-[#FACC15] shadow-sm'
                  : 'bg-white hover:bg-gray-100 border border-gray-200 text-gray-700'
              }`}
            >
              <span>{data.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Main Scanner Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Image Scanner Feed */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-base text-gray-900 flex items-center justify-between">
            <span>{t('Live Crop Image Analyzer', 'लाइव फसल इमेज स्कैनर')}</span>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              HD Resolution
            </span>
          </h3>

          {/* Visual Container */}
          <div className="relative h-72 w-full rounded-2xl overflow-hidden border-2 border-dashed border-emerald-500/40 bg-black flex items-center justify-center">
            <img
              src={sampleImages[selectedCropId]?.url || sampleImages.wheat.url}
              alt="Crop scan"
              className={`w-full h-full object-cover transition-opacity ${
                isScanning ? 'opacity-70 filter contrast-125' : 'opacity-90'
              }`}
            />

            {/* Laser scanning effect when scanning */}
            {isScanning ? (
              <>
                <div className="absolute left-0 right-0 h-1.5 bg-[#FACC15] shadow-[0_0_20px_#FACC15] animate-scan-laser"></div>
                <div className="absolute inset-0 bg-emerald-900/30 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-black/80 px-4 py-2 rounded-xl text-white text-xs font-bold backdrop-blur-xs">
                    {scanStages[scanStepIndex]}
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs flex items-center justify-between">
                <span>{sampleImages[selectedCropId]?.name}</span>
                <span className="text-[#FACC15] font-bold">✓ Ready for Assessment</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleScan(selectedCropId)}
              disabled={isScanning}
              className="py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? t('Scanning...', 'जांच जारी...') : t('Re-Scan Produce', 'पुनः स्कैन करें')}</span>
            </button>

            <button
              onClick={() => startSellWithCrop(selectedCropId)}
              className="py-3 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-xl font-extrabold text-xs shadow transition-all flex items-center justify-center space-x-1.5"
            >
              <span>{t('Sell This Lot →', 'यह लॉट बेचें →')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: AI Quality Report */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  {t('AI QUALITY REPORT', 'एआई गुणवत्ता प्रमाण-पत्र')}
                </span>
                <h3 className="font-heading text-xl font-extrabold text-gray-900">
                  {report?.cropName || 'Wheat'}
                </h3>
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full">
                {report?.recommendedGrade || 'Grade A'}
              </span>
            </div>

            {/* Score Showcase */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-gradient-to-br from-[#14532D] to-[#1E6B3C] text-white rounded-2xl">
                <span className="text-[10px] text-emerald-300 font-bold block">QUALITY SCORE</span>
                <span className="font-heading text-3xl font-extrabold text-[#FACC15]">
                  {report?.qualityScore || 87}
                </span>
                <span className="text-[10px] text-emerald-200 block mt-0.5">/ 100 Points</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">CONFIDENCE</span>
                <span className="font-heading text-2xl font-bold text-gray-900">
                  {report?.confidence || 91}%
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">High Reliability</span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-500 font-bold block">DAMAGE PERCENT</span>
                <span className="font-heading text-2xl font-bold text-gray-900">
                  {report?.visibleDamagePercent || 8}%
                </span>
                <span className="text-[10px] text-gray-500 block mt-0.5">Threshing Abrasion</span>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="mt-4 space-y-2 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-950 block">Verified Laboratory Indicators:</span>
              <ul className="space-y-1 text-emerald-900">
                {report?.indicators.positive.map((ind, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
                {report?.indicators.warnings.map((warn, i) => (
                  <li key={i} className="flex items-center space-x-1.5 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Override / Actions */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            {isOverridden ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
                <span className="font-bold text-amber-900 block">{t('Manual Grade Override:', 'मैन्युअल ग्रेड संशोधन:')}</span>
                <div className="flex space-x-2">
                  {(['Grade A', 'Grade B', 'Grade C'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs ${
                        selectedGrade === g
                          ? 'bg-[#14532D] text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOverridden(!isOverridden)}
                className="px-3 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl flex items-center space-x-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isOverridden ? t('Cancel Override', 'रद्द करें') : t('Review / Override', 'संशोधन करें')}</span>
              </button>

              <button
                onClick={() => startSellWithCrop(selectedCropId)}
                className="flex-1 py-2.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow transition-colors text-center"
              >
                {t('Accept Grade & Proceed to Sell →', 'ग्रेड स्वीकार करें व बेचें →')}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center">
              AI-assisted quality assessment. Indicative decision-support result.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
