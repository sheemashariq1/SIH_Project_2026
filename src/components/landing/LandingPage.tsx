import React from 'react';
import {
  Sprout,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  Brain,
  Truck,
  Handshake,
  Layers,
  Award,
  ChevronRight,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setRole, setFarmerTab, setBuyerTab, setAdminTab, t } = useApp();

  const pipelineSteps = [
    { num: '1', nameEn: 'Harvest Listing', nameHi: 'फसल विवरण', icon: '🌾' },
    { num: '2', nameEn: 'AI Quality Scan', nameHi: 'एआई गुणवत्ता', icon: '🤖' },
    { num: '3', nameEn: 'Market Pulse', nameHi: 'मंडी भाव तुलना', icon: '📈' },
    { num: '4', nameEn: 'ML Prediction', nameHi: 'मूल्य पूर्वानुमान', icon: '🔮' },
    { num: '5', nameEn: 'Buyer Match', nameHi: 'खरीदार मिलान', icon: '🤝' },
    { num: '6', nameEn: 'Live Bargain', nameHi: 'सीधी बातचीत', icon: '💬' },
    { num: '7', nameEn: 'Logistics/Storage', nameHi: 'सुरक्षित परिवहन', icon: '🚚' },
    { num: '8', nameEn: 'Escrow Payment', nameHi: 'गारंटीकृत भुगतान', icon: '💳' }
  ];

  const pillars = [
    {
      icon: Sparkles,
      titleEn: 'AI Crop Quality Assessment',
      titleHi: 'एआई फसल गुणवत्ता जांच',
      descEn: 'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.',
      descHi: 'कंप्यूटर विज़न द्वारा दाने का आकार, नमी और चमक की सटीक वैज्ञानिक ग्रेडिंग।'
    },
    {
      icon: TrendingUp,
      titleEn: 'Smart Market Intelligence',
      titleHi: 'मंडी भाव व वास्तविक लाभ',
      descEn: 'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.',
      descHi: 'भाड़ा और दूरी काटकर किसान को किस मंडी में सर्वाधिक शुद्ध लाभ मिलेगा, उसका स्पष्ट हिसाब।'
    },
    {
      icon: Brain,
      titleEn: 'Predictive Decision Engine',
      titleHi: 'मौसम व मांग का पूर्वानुमान',
      descEn: 'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.',
      descHi: 'बारिश के जोखिम व बाज़ार मांग का विश्लेषण करके "अभी बेचें या रोकें" की ठोस सलाह।'
    },
    {
      icon: Handshake,
      titleEn: 'Direct Verified Marketplace',
      titleHi: 'बिचौलिया-मुक्त सीधी बिक्री',
      descEn: 'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.',
      descHi: 'खाद्य प्रसंस्करण इकाइयों और प्रमाणित खरीदारों से सीधे मोल-भाव की सुविधा।'
    },
    {
      icon: Truck,
      titleEn: 'Smart Logistics & Storage',
      titleHi: 'वेयरहाउस व त्वरित वाहन',
      descEn: 'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.',
      descHi: 'नज़दीकी सरकारी प्रमाणित गोदाम व मिनी-ट्रक की आसान बुकिंग।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1B281E]">
      {/* Top Banner Notice */}
      <div className="bg-[#14532D] text-emerald-100 px-4 py-2 text-center text-xs font-semibold border-b border-emerald-800">
        <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full mr-2">
          SIH 2026 PROTOTYPE
        </span>
        {t(
          'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis',
          'भारतीय मंडियों में मूल्य विसंगति, बिचौलियों के शोषण और संकटग्रस्त बिक्री का समग्र एआई समाधान'
        )}
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-300 px-4 py-1.5 rounded-full text-emerald-900 text-xs font-extrabold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-4 h-4 text-[#14532D]" />
            <span>{t('Next-Generation Agri-Tech Infrastructure', 'अत्याधुनिक कृषि-तकनीक मंच')}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#14532D] leading-[1.15]">
            KISAN<span className="text-[#CA8A04]">CONNECT</span>
          </h1>

          <p className="font-heading text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            "{t('Your Crop. Your Market. Your Choice.', 'आपकी फसल. आपका बाज़ार. आपका फैसला.')}"
          </p>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.',
              'एआई गुणवत्ता परीक्षण, मौसम जोखिम विश्लेषण, मंडी भाव तुलना और खरीदारों से सीधे सौदेबाजी का संपूर्ण डिजिटल मंच।'
            )}
          </p>
        </div>

        {/* Two Huge Role Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
          {/* Farmer Card */}
          <div
            onClick={() => {
              setRole('farmer');
              setFarmerTab('home');
            }}
            className="group relative bg-gradient-to-br from-[#14532D] to-[#1E6B3C] p-8 rounded-3xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-emerald-400/30 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EAB308] text-[#14532D] flex items-center justify-center text-3xl font-bold shadow-md mb-5">
                👨‍🌾
              </div>
              <div className="inline-block bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {t('For Farmers & FPOs', 'किसानों एवं एफपीओ के लिए')}
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-white">
                {t('Farmer Portal', 'किसान पोर्टल')}
              </h2>
              <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
                {t(
                  'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.',
                  'फसल की एआई ग्रेडिंग करें, मौसम का खतरा देखें, मंडी भाव की तुलना करें और सीधे खरीदारों से श्रेष्ठ मूल्य प्राप्त करें।'
                )}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="bg-[#0F3E22] px-2.5 py-1 rounded-lg border border-emerald-500/30">✓ AI Scan (87/100)</span>
                <span className="bg-[#0F3E22] px-2.5 py-1 rounded-lg border border-emerald-500/30">✓ Net Realization</span>
                <span className="bg-[#0F3E22] px-2.5 py-1 rounded-lg border border-emerald-500/30">✓ Zero Middlemen</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-700/50 flex items-center justify-between">
              <span className="font-bold text-sm text-[#FACC15] group-hover:underline">
                {t('ENTER AS FARMER →', 'किसान के रूप में प्रवेश करें →')}
              </span>
              <div className="w-10 h-10 rounded-full bg-[#EAB308] text-[#14532D] flex items-center justify-center font-bold shadow transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Buyer Card */}
          <div
            onClick={() => {
              setRole('buyer');
              setBuyerTab('dashboard');
            }}
            className="group relative bg-white p-8 rounded-3xl text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200/80 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center text-3xl font-bold shadow-xs mb-5">
                🏢
              </div>
              <div className="inline-block bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {t('For Mills, Processors & Retail', 'प्रसंस्करण इकाइयों व व्यापारियों के लिए')}
              </div>
              <h2 className="font-heading text-3xl font-extrabold text-[#14532D]">
                {t('Buyer Portal', 'खरीदार पोर्टल')}
              </h2>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {t(
                  'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.',
                  'सत्यापित किसानों से उच्च गुणवत्ता की उपज प्राप्त करें, एआई गुणवत्ता रिपोर्ट देखें और पारदर्शी तरीके से सीधे बोलियां लगाएं।'
                )}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">✓ AI Grade Reports</span>
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">✓ Farmgate Sourcing</span>
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">✓ Escrow Safety</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="font-bold text-sm text-[#14532D] group-hover:underline">
                {t('ENTER AS BUYER →', 'खरीदार के रूप में प्रवेश करें →')}
              </span>
              <div className="w-10 h-10 rounded-full bg-[#14532D] text-white flex items-center justify-center font-bold shadow transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Small Admin Entrance */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setRole('admin');
              setAdminTab('overview');
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-emerald-950/10 hover:bg-emerald-950/20 text-emerald-900 text-xs font-bold transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('Government / Mandi Board Admin Portal →', 'मंडी समिति / व्यवस्थापक पोर्टल →')}</span>
          </button>
        </div>
      </div>

      {/* 8-Step Visual Pipeline: FROM HARVEST TO PAYMENT */}
      <div className="bg-[#EFECE3] border-y border-[#DFDCD2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#14532D]">
              {t('END-TO-END TRANSACTION PIPELINE', 'शुरुआत से अंत तक पारदर्शी यात्रा')}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              {t('From Harvest to Guaranteed Payment', 'खेत की कटाई से सीधे बैंक खाते में भुगतान')}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {pipelineSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-3.5 rounded-2xl border border-emerald-900/10 shadow-sm text-center flex flex-col items-center justify-between hover:border-emerald-500 hover:shadow-md transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center mb-1">
                  {step.num}
                </span>
                <span className="text-2xl mb-1">{step.icon}</span>
                <p className="text-xs font-extrabold text-gray-900 leading-tight">
                  {t(step.nameEn, step.nameHi)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Five Product Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#14532D]">
            {t('CORE ARCHITECTURE', 'मुख्य तकनीकी स्तंभ')}
          </span>
          <h3 className="font-heading text-3xl font-extrabold text-gray-900 mt-1">
            {t('The 5 Pillars of KisanConnect', 'किसानकनेक्ट के 5 आधारस्तंभ')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            {t(
              'Not just a listing board. An integrated intelligent decision-support operating system.',
              'यह केवल एक बाज़ार नहीं, अपितु भारतीय किसान का डिजिटल सलाहकार व सुरक्षा कवच है।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#14532D] flex items-center justify-center mb-3 font-bold">
                    <Icon className="w-5 h-5 text-[#14532D]" />
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-gray-900 mb-2">
                    {t(p.titleEn, p.titleHi)}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t(p.descEn, p.descHi)}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[11px] font-bold text-emerald-800">
                  <span>{t('Active in Prototype', 'प्रोटोटाइप में सक्रिय')}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Quick Demo Launcher Bar */}
      <div className="bg-gradient-to-r from-[#14532D] to-[#1E6B3C] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold">
            {t('Ready to Experience the SIH Live Demo?', 'क्या आप लाइव डेमो अनुभव के लिए तैयार हैं?')}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            {t(
              'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.',
              'करनाल के गेहूं (500 किलो) का वास्तविक केस-स्टडी: एआई स्कैन (87/100) -> बारिश चेतावनी -> ₹2,430 पर सौदा -> एस्क्रो भुगतान ट्रैकिंग।'
            )}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setRole('farmer');
                setFarmerTab('home');
              }}
              className="px-6 py-3 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-xl font-extrabold text-sm shadow-lg transition-transform active:scale-95"
            >
              🌾 {t('Launch Farmer Demo Flow', 'किसान डेमो शुरू करें')}
            </button>
            <button
              onClick={() => {
                setRole('buyer');
                setBuyerTab('dashboard');
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-extrabold text-sm shadow transition-colors"
            >
              🏢 {t('Launch Buyer Demo Flow', 'खरीदार डेमो देखें')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
