import React, { useRef, useState } from 'react';
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
import { analyzeCropImage } from '../../lib/analyzeCrop';

export const AICropScanPage: React.FC = () => {
  const { setFarmerTab, startSellWithCrop, t } = useApp();

  const [selectedCropId, setSelectedCropId] = useState('wheat');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [report, setReport] = useState<AIQualityAssessment | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    t('Uploading image to computer-vision pipeline...', 'चित्र अपलोड हो रहा है...'),
    t('Detecting crop species & grain morphometrics...', 'फसल एवं दाने की पहचान की जा रही है...'),
    t('Analyzing surface discoloration & luster index...', 'चमक एवं रंग की जांच हो रही है...'),
    t('Screening for insect abrasions & threshing damage...', 'क्षति एवं खरोंच जांची जा रही है...'),
    t('Estimating internal moisture & fungal indicators...', 'नमी एवं फफूंद संकेतकों का विश्लेषण...'),
    t('Synthesizing laboratory Grade & Market Readiness...', 'अंतिम एआई ग्रेड रिपोर्ट तैयार हो रही है...')
  ];

  const runScan = async (imageSource: File | string, cropIdHint: string, cropNameHint: string) => {
    setIsScanning(true);
    setScanStepIndex(0);
    setAiError(null);

    const animation = (async () => {
      for (let i = 1; i <= 5; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setScanStepIndex(i);
      }
    })();

    const analysis = analyzeCropImage(imageSource, cropIdHint, cropNameHint);
    const [, result] = await Promise.all([animation, analysis]);

    setReport(result.assessment);
    if (result.source === 'demo' && result.error) setAiError(result.error);
    setIsScanning(false);
  };

  const handleSampleScan = async (cropIdToScan: string) => {
    setSelectedCropId(cropIdToScan);
    setPreviewUrl(sampleImages[cropIdToScan]?.url || sampleImages.wheat.url);
    const targetCrop = CROPS_DATA.find((c) => c.id === cropIdToScan) || CROPS_DATA[0];
    await runScan(sampleImages[cropIdToScan]?.url || sampleImages.wheat.url, targetCrop.id, targetCrop.name);
  };

  const handleFileSelected = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    const targetCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];
    await runScan(file, targetCrop.id, targetCrop.name);
  };

  const handleRescan = async () => {
    const targetCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];
    const source = previewUrl || sampleImages.wheat.url;
    await runScan(source, targetCrop.id, targetCrop.name);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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
              'Upload a real photo of your harvest for computer-vision grading, powered by GLM vision AI.',
              'अपने फसल की असली तस्वीर अपलोड करें, GLM विज़न AI द्वारा गुणवत्ता जांच होगी।'
            )}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileSelected(file);
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 border-2 border-dashed border-emerald-600/40 hover:border-emerald-600 bg-emerald-50/40 rounded-2xl p-4 cursor-pointer transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelected(file);
              e.target.value = '';
            }}
          />
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#14532D] flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">
                {t('Upload a clear photo of your harvested crop', 'अपनी फसल की स्पष्ट तस्वीर अपलोड करें')}
              </p>
              <p className="text-[11px] text-gray-500">
                {t('Click, drag & drop, or use your camera', 'क्लिक करें, फ़ाइल खींचें, या कैमरा उपयोग करें')}
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-[#14532D] text-[#FACC15] text-xs font-extrabold rounded-xl shadow shrink-0">
            {t('UPLOAD IMAGE', 'तस्वीर अपलोड करें')}
          </span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2">
          {t('Or try a quick demo with a sample harvest lot:', 'या नमूना फसल से त्वरित डेमो आज़माएं:')}
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(sampleImages).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleSampleScan(key)}
              disabled={isScanning}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 disabled:opacity-50 ${
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-base text-gray-900 flex items-center justify-between">
            <span>{t('Crop Image Analyzer', 'फसल इमेज स्कैनर')}</span>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              HD Resolution
            </span>
          </h3>

          <div className="relative h-72 w-full rounded-2xl overflow-hidden border-2 border-dashed border-emerald-500/40 bg-black flex items-center justify-center">
            {previewUrl || sampleImages[selectedCropId]?.url ? (
              <img
                src={previewUrl || sampleImages[selectedCropId]?.url || sampleImages.wheat.url}
                alt="Crop scan"
                className={`w-full h-full object-cover transition-opacity ${
                  isScanning ? 'opacity-70 filter contrast-125' : 'opacity-90'
                }`}
              />
            ) : (
              <div className="text-white/60 text-xs flex flex-col items-center gap-2">
                <Camera className="w-8 h-8" />
                <span>{t('No image yet — upload one above', 'अभी कोई तस्वीर नहीं — ऊपर अपलोड करें')}</span>
              </div>
            )}

            {isScanning ? (
              <>
                <div className="absolute left-0 right-0 h-1.5 bg-[#FACC15] shadow-[0_0_20px_#FACC15] animate-scan-laser"></div>
                <div className="absolute inset-0 bg-emerald-900/30 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-black/80 px-4 py-2 rounded-xl text-white text-xs font-bold backdrop-blur-xs">
                    {scanStages[scanStepIndex]}
                  </div>
                </div>
              </>
            ) : report ? (
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs flex items-center justify-between">
                <span>{report.cropName}</span>
                <span className={`font-bold ${report.aiSource === 'live' ? 'text-[#FACC15]' : 'text-amber-300'}`}>
                  {report.aiSource === 'live' ? '✓ Live AI Verified' : '● Demo Estimate'}
                </span>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRescan}
              disabled={isScanning || (!previewUrl && !sampleImages[selectedCropId])}
              className="py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] rounded-xl font-extrabold text-xs shadow transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 border-2 border-dashed border-emerald-600/40 hover:border-emerald-600 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {t('Take / Upload Another Photo', 'दूसरी तस्वीर लें / अपलोड करें')}
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-5 flex flex-col justify-between">
          {!report && !isScanning ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-300" />
              <p className="text-sm font-bold text-gray-700">{t('No report yet', 'अभी कोई रिपोर्ट नहीं')}</p>
              <p className="text-xs text-gray-500 max-w-xs">
                {t(
                  'Upload a photo or pick a sample lot to generate an AI quality report.',
                  'AI गुणवत्ता रिपोर्ट पाने हेतु तस्वीर अपलोड करें या नमूना चुनें।'
                )}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    {t('AI QUALITY REPORT', 'एआई गुणवत्ता प्रमाण-पत्र')}
                  </span>
                  <h3 className="font-heading text-xl font-extrabold text-gray-900">
                    {report?.cropName || (isScanning ? '…' : 'Wheat')}
                  </h3>
                </div>
                <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full">
                  {report?.recommendedGrade || '—'}
                </span>
              </div>

              {aiError && !isScanning && (
                <div className="mt-3 flex items-start space-x-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold rounded-xl p-2.5">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{aiError}</span>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-gradient-to-br from-[#14532D] to-[#1E6B3C] text-white rounded-2xl">
                  <span className="text-[10px] text-emerald-300 font-bold block">QUALITY SCORE</span>
                  <span className="font-heading text-3xl font-extrabold text-[#FACC15]">
                    {report?.qualityScore ?? '—'}
                  </span>
                  <span className="text-[10px] text-emerald-200 block mt-0.5">/ 100 Points</span>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-bold block">CONFIDENCE</span>
                  <span className="font-heading text-2xl font-bold text-gray-900">{report?.confidence ?? '—'}%</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                    {report?.aiSource === 'live' ? 'GLM Vision' : 'Demo Estimate'}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 font-bold block">DAMAGE PERCENT</span>
                  <span className="font-heading text-2xl font-bold text-gray-900">
                    {report?.visibleDamagePercent ?? '—'}%
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Visible Damage</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-950 block">
                  {report?.aiSource === 'live' ? 'AI-Verified Indicators:' : 'Demo Indicators:'}
                </span>
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
          )}

          {report && (
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
                          selectedGrade === g ? 'bg-[#14532D] text-white' : 'bg-white text-gray-700 border border-gray-300'
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
                {t(
                  'AI-assisted quality assessment. Indicative decision-support result.',
                  'एआई-सहायित गुणवत्ता जांच। यह केवल सुझावात्मक जानकारी है।'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
