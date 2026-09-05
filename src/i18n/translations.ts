// src/i18n/translations.ts
//
// Extensible translation dictionary for languages beyond English/Hindi.
//
// DESIGN: every string in the app is already written as
//   t('English text', 'Hindi text')
// throughout the components. Rather than rewriting every call site to use
// abstract keys (a large, risky, mechanical change across 20+ files), this
// dictionary is keyed by the EXACT ENGLISH STRING itself. AppContext's t()
// function looks up `TRANSLATIONS[language][enString]` for any language
// other than 'en'/'hi', and falls back to the English string if that exact
// string hasn't been translated yet for that language.
//
// This means:
//   - Adding a brand new language = add one new object below. No component
//     files need to change.
//   - Extending an existing language's coverage = add more key/value pairs
//     to its object below, using the English string (copy it exactly,
//     including punctuation) as the key.
//   - Any string not yet present for the active language silently falls
//     back to English, so the app never shows a blank label.

import { Language } from '../types';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' }
];

type TranslationMap = Record<string, string>;

export const TRANSLATIONS: Partial<Record<Language, TranslationMap>> = {
  pa: {
    // Navbar
    'Your Crop. Your Market. Your Choice.': 'ਤੁਹਾਡੀ ਫ਼ਸਲ। ਤੁਹਾਡੀ ਮੰਡੀ। ਤੁਹਾਡੀ ਪਸੰਦ।',
    'Back': 'ਪਿੱਛੇ',
    'Farmer': 'ਕਿਸਾਨ',
    'Buyer': 'ਖਰੀਦਦਾਰ',
    'Admin': 'ਐਡਮਿਨ',
    // Sidebar / common nav
    'Dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'My Crops': 'ਮੇਰੀਆਂ ਫ਼ਸਲਾਂ',
    'AI Quality Scan': 'ਏਆਈ ਗੁਣਵੱਤਾ ਜਾਂਚ',
    'Market Intelligence': 'ਮੰਡੀ ਜਾਣਕਾਰੀ',
    'Weather & Impact': 'ਮੌਸਮ ਤੇ ਪ੍ਰਭਾਵ',
    'Regional Predictions': 'ਖੇਤਰੀ ਭਵਿੱਖਬਾਣੀ',
    'Buyer Offers': 'ਖਰੀਦਦਾਰ ਦੀਆਂ ਪੇਸ਼ਕਸ਼ਾਂ',
    'Logistics & Storage': 'ਢੋਆ-ਢੁਆਈ ਤੇ ਭੰਡਾਰਨ',
    'Transactions': 'ਲੈਣ-ਦੇਣ',
    'Notifications': 'ਸੂਚਨਾਵਾਂ',
    'Farmer Profile': 'ਕਿਸਾਨ ਪ੍ਰੋਫ਼ਾਈਲ',
    'Sell Produce Now': 'ਹੁਣੇ ਫ਼ਸਲ ਵੇਚੋ',
    'Sell Produce Now →': 'ਹੁਣੇ ਫ਼ਸਲ ਵੇਚੋ →',
    // Common buttons
    'Back to Home': 'ਘਰ ਵਾਪਸ ਜਾਓ',
    'Cancel': 'ਰੱਦ ਕਰੋ',
    'Submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
    'Next': 'ਅੱਗੇ',
    'Continue': 'ਜਾਰੀ ਰੱਖੋ',
    'Save': 'ਸੰਭਾਲੋ',
    'Close': 'ਬੰਦ ਕਰੋ',
    'Sign In': 'ਸਾਈਨ ਇਨ ਕਰੋ',
    'Sign Out': 'ਸਾਈਨ ਆਊਟ ਕਰੋ',
    'Enter as Farmer': 'ਕਿਸਾਨ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ',
    'Enter as Buyer': 'ਖਰੀਦਦਾਰ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ',
    // Auth modal
    'Mobile Number': 'ਮੋਬਾਈਲ ਨੰਬਰ',
    'Password': 'ਪਾਸਵਰਡ',
    'Send OTP': 'OTP ਭੇਜੋ',
    'Verify OTP': 'OTP ਤਸਦੀਕ ਕਰੋ',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'ਅਗਲੀ ਪੀੜ੍ਹੀ ਦਾ ਖੇਤੀ-ਤਕਨੀਕ ਢਾਂਚਾ',
    'For Farmers & FPOs': 'ਕਿਸਾਨਾਂ ਅਤੇ FPO ਲਈ',
    'AI Scan (87/100)': 'ਏਆਈ ਸਕੈਨ (87/100)',
    'Net Realization': 'ਸ਼ੁੱਧ ਪ੍ਰਾਪਤੀ',
    'Zero Middlemen': 'ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ',
    'ENTER AS FARMER →': 'ਕਿਸਾਨ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ →',
    'For Mills, Processors & Retail': 'ਮਿੱਲਾਂ, ਪ੍ਰੋਸੈਸਰਾਂ ਤੇ ਪ੍ਰਚੂਨ ਲਈ',
    'Farmer Portal': 'ਕਿਸਾਨ ਪੋਰਟਲ',
    'Buyer Portal': 'ਖਰੀਦਦਾਰ ਪੋਰਟਲ',
    'AI Grade Reports': 'ਏਆਈ ਗ੍ਰੇਡ ਰਿਪੋਰਟਾਂ',
    'Farmgate Sourcing': 'ਸਿੱਧੀ ਖੇਤ ਤੋਂ ਖਰੀਦ',
    'Escrow Safety': 'ਐਸਕ੍ਰੋ ਸੁਰੱਖਿਆ',
    'ENTER AS BUYER →': 'ਖਰੀਦਦਾਰ ਵਜੋਂ ਦਾਖਲ ਹੋਵੋ →',
    'Government / Mandi Board Admin Portal →': 'ਸਰਕਾਰ / ਮੰਡੀ ਬੋਰਡ ਐਡਮਿਨ ਪੋਰਟਲ →',
    'END-TO-END TRANSACTION PIPELINE': 'ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ ਲੈਣ-ਦੇਣ ਪ੍ਰਕਿਰਿਆ',
    'From Harvest to Guaranteed Payment': 'ਵਾਢੀ ਤੋਂ ਗਰੰਟੀਸ਼ੁਦਾ ਭੁਗਤਾਨ ਤੱਕ',
    'CORE ARCHITECTURE': 'ਮੁੱਖ ਢਾਂਚਾ',
    'The 5 Pillars of KisanConnect': 'ਕਿਸਾਨਕਨੈਕਟ ਦੇ 5 ਥੰਮ੍ਹ',
    'Active in Prototype': 'ਪ੍ਰੋਟੋਟਾਈਪ ਵਿੱਚ ਸਰਗਰਮ',
    'Ready to Experience the SIH Live Demo?': 'ਕੀ ਤੁਸੀਂ SIH ਲਾਈਵ ਡੈਮੋ ਲਈ ਤਿਆਰ ਹੋ?',
    'Launch Farmer Demo Flow': 'ਕਿਸਾਨ ਡੈਮੋ ਸ਼ੁਰੂ ਕਰੋ',
    'Launch Buyer Demo Flow': 'ਖਰੀਦਦਾਰ ਡੈਮੋ ਵੇਖੋ',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'ਭਾਰਤੀ ਮੰਡੀਆਂ ਵਿੱਚ ਮੁੱਲ ਅਸਮਾਨਤਾ, ਵਿਚੋਲਿਆਂ ਦੇ ਸ਼ੋਸ਼ਣ ਅਤੇ ਮਜਬੂਰੀ ਵਿਕਰੀ ਦਾ ਹੱਲ',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'ਏਆਈ-ਸੰਚਾਲਿਤ ਮੰਡੀ ਜਾਣਕਾਰੀ, ਮੌਸਮ-ਅਧਾਰਿਤ ਜੋਖਮ ਅਨੁਮਾਨ, ਅਤੇ ਕਿਸਾਨ-ਖਰੀਦਦਾਰ ਵਿਚਕਾਰ ਸਿੱਧਾ ਪਾਰਦਰਸ਼ੀ ਵਪਾਰ।',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'ਵਧੇਰੇ ਸਮਝਦਾਰੀ ਨਾਲ ਵੇਚੋ। ਏਆਈ ਨਾਲ ਫ਼ਸਲ ਦੀ ਗੁਣਵੱਤਾ ਜਾਂਚੋ, ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੀ ਤੁਲਨਾ ਕਰੋ, ਅਤੇ ਸਿੱਧਾ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸੌਦਾ ਕਰੋ।',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'ਵਧੇਰੇ ਸਮਝਦਾਰੀ ਨਾਲ ਖਰੀਦੋ। ਏਆਈ-ਪਰਖੇ ਹੋਏ ਖੇਤ ਲਾਟ ਲੱਭੋ, ਪਿੰਡ ਤੱਕ ਮੂਲ ਟਰੇਸ ਕਰੋ, ਅਤੇ ਭਰੋਸੇਯੋਗ ਸਪਲਾਈ ਚੇਨ ਯਕੀਨੀ ਬਣਾਓ।',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'ਸਿਰਫ਼ ਇੱਕ ਸੂਚੀ ਬੋਰਡ ਨਹੀਂ। ਇੱਕ ਸੰਪੂਰਨ ਬੁੱਧੀਮਾਨ ਫੈਸਲਾ-ਸਹਾਇਤਾ ਪ੍ਰਣਾਲੀ।',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'ਪੂਰਾ ਅਸਲ ਕੇਸ ਅਧਿਐਨ ਵੇਖੋ: ਕਰਨਾਲ ਵਿੱਚ ਕਣਕ (500 ਕਿਲੋ) -> ਏਆਈ ਸਕੈਨ (87/100) -> ਮੀਂਹ ਚੇਤਾਵਨੀ -> ₹2,430/ਕੁਇੰਟਲ ਸੌਦਾ -> ਐਸਕ੍ਰੋ ਭੁਗਤਾਨ।',
    'Harvest Listing': 'ਫ਼ਸਲ ਸੂਚੀ',
    'Market Pulse': 'ਮੰਡੀ ਰੁਝਾਨ',
    'ML Prediction': 'ਮੁੱਲ ਅਨੁਮਾਨ',
    'Buyer Match': 'ਖਰੀਦਦਾਰ ਮਿਲਾਨ',
    'Live Bargain': 'ਸਿੱਧੀ ਗੱਲਬਾਤ',
    'Logistics/Storage': 'ਢੋਆ-ਢੁਆਈ/ਭੰਡਾਰਨ',
    'Escrow Payment': 'ਗਰੰਟੀਸ਼ੁਦਾ ਭੁਗਤਾਨ',
    'AI Crop Quality Assessment': 'ਏਆਈ ਫ਼ਸਲ ਗੁਣਵੱਤਾ ਮੁਲਾਂਕਣ',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'ਕੰਪਿਊਟਰ-ਵਿਜ਼ਨ ਦੁਆਰਾ ਨਮੀ, ਚਮਕ ਤੇ ਨੁਕਸਾਨ ਦੀ ਪਛਾਣ ਕਰਕੇ ਫ਼ਸਲ ਨੂੰ ਗ੍ਰੇਡ (A/B/C) ਦੇਣਾ।',
    'Smart Market Intelligence': 'ਸਮਾਰਟ ਮੰਡੀ ਜਾਣਕਾਰੀ',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'ਕਈ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਦੀ ਤੁਲਨਾ ਕਰਕੇ ਅਸਲ ਢੋਆ-ਢੁਆਈ ਖਰਚਾ ਘਟਾ ਕੇ ਸ਼ੁੱਧ ਲਾਭ ਦੱਸਣਾ।',
    'Predictive Decision Engine': 'ਭਵਿੱਖਬਾਣੀ ਫੈਸਲਾ ਇੰਜਣ',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'ਖੇਤਰੀ ਮੌਸਮ ਜੋਖਮ, ਪਿਛਲੇ ਰੁਝਾਨ ਤੇ ਮੰਗ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ "ਹੁਣੇ ਵੇਚੋ ਜਾਂ ਰੱਖੋ" ਦੀ ਸਲਾਹ।',
    'Direct Verified Marketplace': 'ਸਿੱਧਾ ਪ੍ਰਮਾਣਿਤ ਬਾਜ਼ਾਰ',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'ਕੰਪਨੀਆਂ, ਪ੍ਰੋਸੈਸਰਾਂ ਤੇ ਮਿੱਲਾਂ ਨਾਲ ਬਿਨਾਂ ਦਲਾਲ ਸਿੱਧੀ ਗੱਲਬਾਤ ਤੇ ਡਿਜੀਟਲ ਕਾਊਂਟਰ-ਆਫਰ।',
    'Smart Logistics & Storage': 'ਸਮਾਰਟ ਢੋਆ-ਢੁਆਈ ਤੇ ਭੰਡਾਰਨ',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA ਪ੍ਰਮਾਣਿਤ ਗੋਦਾਮ, ਕੋਲਡ ਚੇਨ, ਤੇ ਸਥਾਨਕ ਟਰੱਕ ਬੁਕਿੰਗ ਪਾਰਦਰਸ਼ੀ ਦਰਾਂ \'ਤੇ।'
  },
  mr: {
    'Your Crop. Your Market. Your Choice.': 'तुमचे पीक. तुमची बाजारपेठ. तुमची निवड.',
    'Back': 'मागे',
    'Farmer': 'शेतकरी',
    'Buyer': 'खरेदीदार',
    'Admin': 'प्रशासक',
    'Dashboard': 'डॅशबोर्ड',
    'My Crops': 'माझी पिके',
    'AI Quality Scan': 'एआय गुणवत्ता तपासणी',
    'Market Intelligence': 'बाजार माहिती',
    'Weather & Impact': 'हवामान व परिणाम',
    'Regional Predictions': 'प्रादेशिक अंदाज',
    'Buyer Offers': 'खरेदीदारांच्या ऑफर',
    'Logistics & Storage': 'वाहतूक व साठवण',
    'Transactions': 'व्यवहार',
    'Notifications': 'सूचना',
    'Farmer Profile': 'शेतकरी प्रोफाइल',
    'Sell Produce Now': 'आत्ता पीक विका',
    'Sell Produce Now →': 'आत्ता पीक विका →',
    'Back to Home': 'मुख्यपृष्ठावर परत जा',
    'Cancel': 'रद्द करा',
    'Submit': 'सबमिट करा',
    'Next': 'पुढे',
    'Continue': 'सुरू ठेवा',
    'Save': 'जतन करा',
    'Close': 'बंद करा',
    'Sign In': 'साइन इन करा',
    'Sign Out': 'साइन आउट करा',
    'Enter as Farmer': 'शेतकरी म्हणून प्रवेश करा',
    'Enter as Buyer': 'खरेदीदार म्हणून प्रवेश करा',
    'Mobile Number': 'मोबाइल नंबर',
    'Password': 'पासवर्ड',
    'Send OTP': 'OTP पाठवा',
    'Verify OTP': 'OTP सत्यापित करा',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'नव्या पिढीचे कृषी-तंत्रज्ञान',
    'For Farmers & FPOs': 'शेतकरी व FPO साठी',
    'AI Scan (87/100)': 'एआय स्कॅन (87/100)',
    'Net Realization': 'निव्वळ प्राप्ती',
    'Zero Middlemen': 'दलालमुक्त',
    'ENTER AS FARMER →': 'शेतकरी म्हणून प्रवेश करा →',
    'For Mills, Processors & Retail': 'मिल्स, प्रक्रिया व किरकोळ विक्रेत्यांसाठी',
    'Farmer Portal': 'शेतकरी पोर्टल',
    'Buyer Portal': 'खरेदीदार पोर्टल',
    'AI Grade Reports': 'एआय ग्रेड अहवाल',
    'Farmgate Sourcing': 'थेट शेतातून खरेदी',
    'Escrow Safety': 'एस्क्रो सुरक्षा',
    'ENTER AS BUYER →': 'खरेदीदार म्हणून प्रवेश करा →',
    'Government / Mandi Board Admin Portal →': 'सरकार / बाजार समिती प्रशासक पोर्टल →',
    'END-TO-END TRANSACTION PIPELINE': 'सुरुवातीपासून शेवटपर्यंत व्यवहार प्रक्रिया',
    'From Harvest to Guaranteed Payment': 'कापणीपासून हमी भरलेल्या पेमेंटपर्यंत',
    'CORE ARCHITECTURE': 'मुख्य रचना',
    'The 5 Pillars of KisanConnect': 'किसानकनेक्टचे 5 आधारस्तंभ',
    'Active in Prototype': 'प्रोटोटाइपमध्ये सक्रिय',
    'Ready to Experience the SIH Live Demo?': 'SIH लाइव्ह डेमो अनुभवायला तयार आहात का?',
    'Launch Farmer Demo Flow': 'शेतकरी डेमो सुरू करा',
    'Launch Buyer Demo Flow': 'खरेदीदार डेमो पहा',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'भारतीय बाजारपेठांमधील किंमत तफावत, दलालांचे शोषण व अडचणीतील विक्रीवर उपाय',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'एआय-आधारित बाजार माहिती, हवामान जोखीम अंदाज, आणि शेतकरी-खरेदीदार यांच्यातील थेट पारदर्शक व्यवहार.',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'अधिक हुशारीने विका. एआयने पिकाची गुणवत्ता तपासा, जवळच्या बाजारपेठांची तुलना करा, आणि थेट खरेदीदारांशी वाटाघाटी करा.',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'अधिक हुशारीने खरेदी करा. एआय-तपासलेले शेत लॉट शोधा, गावापर्यंत मूळ शोधा, आणि विश्वासार्ह पुरवठा साखळी सुनिश्चित करा.',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'फक्त एक यादी फलक नाही. एक संपूर्ण बुद्धिमान निर्णय-सहाय्य प्रणाली.',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'संपूर्ण वास्तविक केस स्टडी पहा: करनालमध्ये गहू (500 किलो) -> एआय स्कॅन (87/100) -> पावसाचा इशारा -> ₹2,430/क्विंटल सौदा -> एस्क्रो पेमेंट.',
    'Harvest Listing': 'पीक नोंदणी',
    'Market Pulse': 'बाजार कल',
    'ML Prediction': 'किंमत अंदाज',
    'Buyer Match': 'खरेदीदार जुळणी',
    'Live Bargain': 'थेट वाटाघाटी',
    'Logistics/Storage': 'वाहतूक/साठवण',
    'Escrow Payment': 'हमी पेमेंट',
    'AI Crop Quality Assessment': 'एआय पीक गुणवत्ता मूल्यांकन',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'संगणक-दृष्टीद्वारे ओलावा, चमक व नुकसान ओळखून पिकाला ग्रेड (A/B/C) देणे.',
    'Smart Market Intelligence': 'स्मार्ट बाजार माहिती',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'अनेक बाजारपेठांतील भावांची तुलना करून व वाहतूक खर्च वजा करून खरा निव्वळ नफा दाखवणे.',
    'Predictive Decision Engine': 'भाकीत निर्णय इंजिन',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'प्रादेशिक हवामान जोखीम, मागील कल व मागणीचे विश्लेषण करून "आत्ता विका की साठवा" याचा सल्ला.',
    'Direct Verified Marketplace': 'थेट सत्यापित बाजारपेठ',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'कंपन्या, प्रक्रिया उद्योग व मिल्ससोबत दलालाशिवाय थेट वाटाघाटी व डिजिटल काउंटर-ऑफर.',
    'Smart Logistics & Storage': 'स्मार्ट वाहतूक व साठवण',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA प्रमाणित गोदामे, कोल्ड चेन, व स्थानिक वाहन बुकिंग पारदर्शक दरात.'
  },
  ta: {
    'Your Crop. Your Market. Your Choice.': 'உங்கள் பயிர். உங்கள் சந்தை. உங்கள் தேர்வு.',
    'Back': 'பின்செல்',
    'Farmer': 'விவசாயி',
    'Buyer': 'வாங்குபவர்',
    'Admin': 'நிர்வாகி',
    'Dashboard': 'டாஷ்போர்டு',
    'My Crops': 'எனது பயிர்கள்',
    'AI Quality Scan': 'AI தர பரிசோதனை',
    'Market Intelligence': 'சந்தை தகவல்',
    'Weather & Impact': 'வானிலை & தாக்கம்',
    'Regional Predictions': 'பிராந்திய முன்னறிவிப்பு',
    'Buyer Offers': 'வாங்குபவர் சலுகைகள்',
    'Logistics & Storage': 'போக்குவரத்து & சேமிப்பு',
    'Transactions': 'பரிவர்த்தனைகள்',
    'Notifications': 'அறிவிப்புகள்',
    'Farmer Profile': 'விவசாயி சுயவிவரம்',
    'Sell Produce Now': 'இப்போது விற்கவும்',
    'Sell Produce Now →': 'இப்போது விற்கவும் →',
    'Back to Home': 'முகப்புக்குத் திரும்பு',
    'Cancel': 'ரத்து செய்',
    'Submit': 'சமர்ப்பிக்கவும்',
    'Next': 'அடுத்து',
    'Continue': 'தொடரவும்',
    'Save': 'சேமி',
    'Close': 'மூடு',
    'Sign In': 'உள்நுழையவும்',
    'Sign Out': 'வெளியேறு',
    'Enter as Farmer': 'விவசாயியாக நுழையவும்',
    'Enter as Buyer': 'வாங்குபவராக நுழையவும்',
    'Mobile Number': 'மொபைல் எண்',
    'Password': 'கடவுச்சொல்',
    'Send OTP': 'OTP அனுப்பு',
    'Verify OTP': 'OTP சரிபார்க்கவும்',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'அடுத்த தலைமுறை வேளாண் தொழில்நுட்பம்',
    'For Farmers & FPOs': 'விவசாயிகள் & FPO களுக்கு',
    'AI Scan (87/100)': 'AI ஸ்கேன் (87/100)',
    'Net Realization': 'நிகர வருமானம்',
    'Zero Middlemen': 'இடைத்தரகர் இல்லை',
    'ENTER AS FARMER →': 'விவசாயியாக நுழையவும் →',
    'For Mills, Processors & Retail': 'ஆலைகள், பதப்படுத்துநர்கள் & சில்லறை வணிகர்களுக்கு',
    'Farmer Portal': 'விவசாயி போர்டல்',
    'Buyer Portal': 'வாங்குபவர் போர்டல்',
    'AI Grade Reports': 'AI தர அறிக்கைகள்',
    'Farmgate Sourcing': 'நேரடி பண்ணை கொள்முதல்',
    'Escrow Safety': 'எஸ்க்ரோ பாதுகாப்பு',
    'ENTER AS BUYER →': 'வாங்குபவராக நுழையவும் →',
    'Government / Mandi Board Admin Portal →': 'அரசு / மண்டி வாரிய நிர்வாக போர்டல் →',
    'END-TO-END TRANSACTION PIPELINE': 'தொடக்கம் முதல் முடிவு வரை பரிவர்த்தனை செயல்முறை',
    'From Harvest to Guaranteed Payment': 'அறுவடையிலிருந்து உத்தரவாத கட்டணம் வரை',
    'CORE ARCHITECTURE': 'முக்கிய கட்டமைப்பு',
    'The 5 Pillars of KisanConnect': 'KisanConnect இன் 5 தூண்கள்',
    'Active in Prototype': 'முன்மாதிரியில் செயலில்',
    'Ready to Experience the SIH Live Demo?': 'SIH நேரடி டெமோவை அனுபவிக்க தயாரா?',
    'Launch Farmer Demo Flow': 'விவசாயி டெமோவைத் தொடங்கு',
    'Launch Buyer Demo Flow': 'வாங்குபவர் டெமோவைப் பார்',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'இந்திய மண்டிகளில் விலை ஏற்றத்தாழ்வு, இடைத்தரகர் சுரண்டல் & நெருக்கடி விற்பனைக்கு தீர்வு',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'AI-இயங்கும் சந்தை தகவல், வானிலை அபாய முன்னறிவிப்பு, மற்றும் விவசாயி-வாங்குபவர் நேரடி வெளிப்படையான வர்த்தகம்.',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'புத்திசாலித்தனமாக விற்கவும். AI மூலம் தர தரத்தை சரிபார்க்கவும், அருகிலுள்ள மண்டிகளை ஒப்பிடவும், வாங்குபவர்களுடன் நேரடியாக பேரம் பேசவும்.',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'புத்திசாலித்தனமாக வாங்கவும். AI-மதிப்பிடப்பட்ட பண்ணை பங்குகளைக் கண்டறியவும், கிராம பண்ணைகள் வரை மூலத்தைக் கண்டறியவும், நம்பகமான விநியோகச் சங்கிலியை உறுதிசெய்யவும்.',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'வெறும் பட்டியல் பலகை அல்ல. ஒரு முழுமையான புத்திசாலி முடிவு-ஆதரவு அமைப்பு.',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'முழு உண்மையான வழக்கு ஆய்வைப் பாருங்கள்: கர்னாலில் கோதுமை (500 கிலோ) அறுவடை -> AI ஸ்கேன் (87/100) -> மழை எச்சரிக்கை -> ₹2,430/குவிண்டால் ஒப்பந்தம் -> எஸ்க்ரோ பணம்.',
    'Harvest Listing': 'அறுவடை பட்டியல்',
    'Market Pulse': 'சந்தை போக்கு',
    'ML Prediction': 'விலை முன்னறிவிப்பு',
    'Buyer Match': 'வாங்குபவர் பொருத்தம்',
    'Live Bargain': 'நேரடி பேரம்',
    'Logistics/Storage': 'போக்குவரத்து/சேமிப்பு',
    'Escrow Payment': 'உத்தரவாத பணம்',
    'AI Crop Quality Assessment': 'AI பயிர் தர மதிப்பீடு',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'கணினி-பார்வை மூலம் ஈரப்பதம், பொலிவு & சேதத்தைக் கண்டறிந்து பயிரை தரம் (A/B/C) பிரிக்கிறது.',
    'Smart Market Intelligence': 'ஸ்மார்ட் சந்தை தகவல்',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'பல மண்டி விலைகளை ஒப்பிட்டு, போக்குவரத்து செலவைக் கழித்து உண்மையான நிகர லாபத்தைக் காட்டுகிறது.',
    'Predictive Decision Engine': 'முன்னறிவிப்பு முடிவு இயந்திரம்',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'பிராந்திய வானிலை அபாயங்கள், கடந்தகால போக்குகள் & தேவையை பகுப்பாய்வு செய்து "இப்போது விற்க அல்லது சேமிக்க" ஆலோசனை.',
    'Direct Verified Marketplace': 'நேரடி சரிபார்க்கப்பட்ட சந்தை',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'நிறுவனங்கள், பதப்படுத்துநர்கள் & ஆலைகளுடன் இடைத்தரகர் இல்லாமல் நேரடி பேச்சுவார்த்தை & டிஜிட்டல் எதிர்-சலுகைகள்.',
    'Smart Logistics & Storage': 'ஸ்மார்ட் போக்குவரத்து & சேமிப்பு',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA சான்றளிக்கப்பட்ட கிடங்குகள், குளிர் சங்கிலி, & உள்ளூர் வாகன முன்பதிவு வெளிப்படையான விலையில்.'
  },
  te: {
    'Your Crop. Your Market. Your Choice.': 'మీ పంట. మీ మార్కెట్. మీ ఎంపిక.',
    'Back': 'వెనుకకు',
    'Farmer': 'రైతు',
    'Buyer': 'కొనుగోలుదారు',
    'Admin': 'నిర్వాహకుడు',
    'Dashboard': 'డాష్‌బోర్డ్',
    'My Crops': 'నా పంటలు',
    'AI Quality Scan': 'AI నాణ్యత పరీక్ష',
    'Market Intelligence': 'మార్కెట్ సమాచారం',
    'Weather & Impact': 'వాతావరణం & ప్రభావం',
    'Regional Predictions': 'ప్రాంతీయ అంచనాలు',
    'Buyer Offers': 'కొనుగోలుదారు ఆఫర్లు',
    'Logistics & Storage': 'రవాణా & నిల్వ',
    'Transactions': 'లావాదేవీలు',
    'Notifications': 'నోటిఫికేషన్లు',
    'Farmer Profile': 'రైతు ప్రొఫైల్',
    'Sell Produce Now': 'ఇప్పుడే అమ్మండి',
    'Sell Produce Now →': 'ఇప్పుడే అమ్మండి →',
    'Back to Home': 'హోమ్‌కు తిరిగి వెళ్ళండి',
    'Cancel': 'రద్దు చేయండి',
    'Submit': 'సమర్పించండి',
    'Next': 'తదుపరి',
    'Continue': 'కొనసాగించండి',
    'Save': 'సేవ్ చేయండి',
    'Close': 'మూసివేయండి',
    'Sign In': 'సైన్ ఇన్ చేయండి',
    'Sign Out': 'సైన్ అవుట్ చేయండి',
    'Enter as Farmer': 'రైతుగా ప్రవేశించండి',
    'Enter as Buyer': 'కొనుగోలుదారుగా ప్రవేశించండి',
    'Mobile Number': 'మొబైల్ నంబర్',
    'Password': 'పాస్‌వర్డ్',
    'Send OTP': 'OTP పంపండి',
    'Verify OTP': 'OTP ధృవీకరించండి',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'తదుపరి తరం వ్యవసాయ సాంకేతికత',
    'For Farmers & FPOs': 'రైతులు & FPO ల కోసం',
    'AI Scan (87/100)': 'AI స్కాన్ (87/100)',
    'Net Realization': 'నికర రాబడి',
    'Zero Middlemen': 'మధ్యవర్తులు లేరు',
    'ENTER AS FARMER →': 'రైతుగా ప్రవేశించండి →',
    'For Mills, Processors & Retail': 'మిల్లులు, ప్రాసెసర్లు & రిటైల్ కోసం',
    'Farmer Portal': 'రైతు పోర్టల్',
    'Buyer Portal': 'కొనుగోలుదారు పోర్టల్',
    'AI Grade Reports': 'AI గ్రేడ్ నివేదికలు',
    'Farmgate Sourcing': 'నేరుగా పొలం నుండి కొనుగోలు',
    'Escrow Safety': 'ఎస్క్రో భద్రత',
    'ENTER AS BUYER →': 'కొనుగోలుదారుగా ప్రవేశించండి →',
    'Government / Mandi Board Admin Portal →': 'ప్రభుత్వ / మండి బోర్డ్ అడ్మిన్ పోర్టల్ →',
    'END-TO-END TRANSACTION PIPELINE': 'ప్రారంభం నుండి ముగింపు వరకు లావాదేవీ ప్రక్రియ',
    'From Harvest to Guaranteed Payment': 'పంట కోత నుండి హామీ చెల్లింపు వరకు',
    'CORE ARCHITECTURE': 'ప్రధాన నిర్మాణం',
    'The 5 Pillars of KisanConnect': 'KisanConnect యొక్క 5 స్తంభాలు',
    'Active in Prototype': 'ప్రోటోటైప్‌లో సక్రియం',
    'Ready to Experience the SIH Live Demo?': 'SIH లైవ్ డెమోను అనుభవించడానికి సిద్ధమా?',
    'Launch Farmer Demo Flow': 'రైతు డెమో ప్రారంభించండి',
    'Launch Buyer Demo Flow': 'కొనుగోలుదారు డెమో చూడండి',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'భారతీయ మండీలలో ధరల అసమానత, మధ్యవర్తుల దోపిడీ & నష్టపు అమ్మకాలకు పరిష్కారం',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'AI-ఆధారిత మార్కెట్ సమాచారం, వాతావరణ ప్రమాద అంచనా, మరియు రైతు-కొనుగోలుదారు మధ్య ప్రత్యక్ష పారదర్శక వాణిజ్యం.',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'తెలివిగా అమ్మండి. AI తో పంట నాణ్యతను పరిశీలించండి, సమీప మండీలను పోల్చండి, మరియు ధృవీకరించిన కొనుగోలుదారులతో నేరుగా బేరమాడండి.',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'తెలివిగా కొనుగోలు చేయండి. AI-మదింపు చేసిన పొలం లాట్‌లను కనుగొనండి, గ్రామ పొలాల వరకు మూలాన్ని గుర్తించండి, మరియు నమ్మకమైన సరఫరా గొలుసులను నిర్ధారించండి.',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'కేవలం లిస్టింగ్ బోర్డు కాదు. ఇది సమగ్ర తెలివైన నిర్ణయ-మద్దతు వ్యవస్థ.',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'పూర్తి నిజ జీవిత కేస్ స్టడీని చూడండి: కర్నాల్‌లో గోధుమ (500 కిలోలు) కోత -> AI స్కాన్ (87/100) -> వర్ష హెచ్చరిక -> ₹2,430/క్వింటాల్ ఒప్పందం -> ఎస్క్రో చెల్లింపు.',
    'Harvest Listing': 'పంట జాబితా',
    'Market Pulse': 'మార్కెట్ ధోరణి',
    'ML Prediction': 'ధర అంచనా',
    'Buyer Match': 'కొనుగోలుదారు జోడింపు',
    'Live Bargain': 'ప్రత్యక్ష బేరసారం',
    'Logistics/Storage': 'రవాణా/నిల్వ',
    'Escrow Payment': 'హామీ చెల్లింపు',
    'AI Crop Quality Assessment': 'AI పంట నాణ్యత మదింపు',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'కంప్యూటర్-విజన్ ద్వారా తేమ, మెరుపు & నష్టాన్ని గుర్తించి పంటను గ్రేడ్ (A/B/C) చేయడం.',
    'Smart Market Intelligence': 'స్మార్ట్ మార్కెట్ సమాచారం',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'బహుళ మండీ ధరలను పోల్చి, రవాణా ఖర్చును తీసివేసి నిజమైన నికర రాబడిని చూపడం.',
    'Predictive Decision Engine': 'అంచనా నిర్ణయ యంత్రం',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'ప్రాంతీయ వాతావరణ ప్రమాదాలు, గత ధోరణులు & డిమాండ్‌ను విశ్లేషించి "ఇప్పుడు అమ్మాలా లేదా నిల్వ చేయాలా" అని సలహా ఇస్తుంది.',
    'Direct Verified Marketplace': 'ప్రత్యక్ష ధృవీకరించిన మార్కెట్',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'కంపెనీలు, ప్రాసెసర్లు & మిల్లులతో మధ్యవర్తులు లేకుండా ప్రత్యక్ష చర్చలు & డిజిటల్ కౌంటర్-ఆఫర్లు.',
    'Smart Logistics & Storage': 'స్మార్ట్ రవాణా & నిల్వ',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA ధృవీకరించిన గోదాములు, కోల్డ్ చెయిన్, & స్థానిక వాహన బుకింగ్ పారదర్శక ధరలలో.'
  },
  bn: {
    'Your Crop. Your Market. Your Choice.': 'আপনার ফসল। আপনার বাজার। আপনার পছন্দ।',
    'Back': 'ফিরে যান',
    'Farmer': 'কৃষক',
    'Buyer': 'ক্রেতা',
    'Admin': 'অ্যাডমিন',
    'Dashboard': 'ড্যাশবোর্ড',
    'My Crops': 'আমার ফসল',
    'AI Quality Scan': 'AI মান যাচাই',
    'Market Intelligence': 'বাজার তথ্য',
    'Weather & Impact': 'আবহাওয়া ও প্রভাব',
    'Regional Predictions': 'আঞ্চলিক পূর্বাভাস',
    'Buyer Offers': 'ক্রেতার অফার',
    'Logistics & Storage': 'পরিবহন ও সংরক্ষণ',
    'Transactions': 'লেনদেন',
    'Notifications': 'বিজ্ঞপ্তি',
    'Farmer Profile': 'কৃষক প্রোফাইল',
    'Sell Produce Now': 'এখনই বিক্রি করুন',
    'Sell Produce Now →': 'এখনই বিক্রি করুন →',
    'Back to Home': 'হোমে ফিরে যান',
    'Cancel': 'বাতিল করুন',
    'Submit': 'জমা দিন',
    'Next': 'পরবর্তী',
    'Continue': 'চালিয়ে যান',
    'Save': 'সংরক্ষণ করুন',
    'Close': 'বন্ধ করুন',
    'Sign In': 'সাইন ইন করুন',
    'Sign Out': 'সাইন আউট করুন',
    'Enter as Farmer': 'কৃষক হিসেবে প্রবেশ করুন',
    'Enter as Buyer': 'ক্রেতা হিসেবে প্রবেশ করুন',
    'Mobile Number': 'মোবাইল নম্বর',
    'Password': 'পাসওয়ার্ড',
    'Send OTP': 'OTP পাঠান',
    'Verify OTP': 'OTP যাচাই করুন',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'পরবর্তী প্রজন্মের কৃষি-প্রযুক্তি অবকাঠামো',
    'For Farmers & FPOs': 'কৃষক ও FPO দের জন্য',
    'AI Scan (87/100)': 'AI স্ক্যান (87/100)',
    'Net Realization': 'নিট প্রাপ্তি',
    'Zero Middlemen': 'কোনো মধ্যস্বত্বভোগী নেই',
    'ENTER AS FARMER →': 'কৃষক হিসেবে প্রবেশ করুন →',
    'For Mills, Processors & Retail': 'মিল, প্রসেসর ও খুচরা বিক্রেতাদের জন্য',
    'Farmer Portal': 'কৃষক পোর্টাল',
    'Buyer Portal': 'ক্রেতা পোর্টাল',
    'AI Grade Reports': 'AI গ্রেড রিপোর্ট',
    'Farmgate Sourcing': 'সরাসরি খামার থেকে সংগ্রহ',
    'Escrow Safety': 'এসক্রো নিরাপত্তা',
    'ENTER AS BUYER →': 'ক্রেতা হিসেবে প্রবেশ করুন →',
    'Government / Mandi Board Admin Portal →': 'সরকার / মান্ডি বোর্ড অ্যাডমিন পোর্টাল →',
    'END-TO-END TRANSACTION PIPELINE': 'শুরু থেকে শেষ পর্যন্ত লেনদেন প্রক্রিয়া',
    'From Harvest to Guaranteed Payment': 'ফসল কাটা থেকে নিশ্চিত পেমেন্ট পর্যন্ত',
    'CORE ARCHITECTURE': 'মূল কাঠামো',
    'The 5 Pillars of KisanConnect': 'KisanConnect এর ৫টি স্তম্ভ',
    'Active in Prototype': 'প্রোটোটাইপে সক্রিয়',
    'Ready to Experience the SIH Live Demo?': 'SIH লাইভ ডেমো অনুভব করতে প্রস্তুত?',
    'Launch Farmer Demo Flow': 'কৃষক ডেমো শুরু করুন',
    'Launch Buyer Demo Flow': 'ক্রেতা ডেমো দেখুন',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'ভারতীয় মান্ডিতে মূল্য বৈষম্য, মধ্যস্বত্বভোগীদের শোষণ ও বাধ্যতামূলক বিক্রয়ের সমাধান',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'AI-চালিত বাজার তথ্য, আবহাওয়া-ভিত্তিক ঝুঁকি পূর্বাভাস, এবং কৃষক-ক্রেতার মধ্যে সরাসরি স্বচ্ছ বাণিজ্য।',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'আরও বুদ্ধিমত্তার সাথে বিক্রি করুন। AI দিয়ে ফসলের মান পরীক্ষা করুন, কাছাকাছি মান্ডি তুলনা করুন, এবং যাচাইকৃত ক্রেতাদের সাথে সরাসরি দরকষাকষি করুন।',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'আরও বুদ্ধিমত্তার সাথে সংগ্রহ করুন। AI-মূল্যায়িত খামার লট আবিষ্কার করুন, গ্রামের খামার পর্যন্ত উৎস খুঁজুন, এবং নির্ভরযোগ্য সরবরাহ চেইন নিশ্চিত করুন।',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'শুধু একটি তালিকা বোর্ড নয়। একটি সম্পূর্ণ বুদ্ধিমান সিদ্ধান্ত-সহায়ক ব্যবস্থা।',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'সম্পূর্ণ বাস্তব কেস স্টাডি দেখুন: কর্নালে গম (৫০০ কেজি) কাটা -> AI স্ক্যান (৮৭/১০০) -> বৃষ্টির সতর্কতা -> ₹২,৪৩০/কুইন্টাল চুক্তি -> এসক্রো পেমেন্ট।',
    'Harvest Listing': 'ফসল তালিকা',
    'Market Pulse': 'বাজার প্রবণতা',
    'ML Prediction': 'মূল্য পূর্বাভাস',
    'Buyer Match': 'ক্রেতা মিল',
    'Live Bargain': 'সরাসরি দরকষাকষি',
    'Logistics/Storage': 'পরিবহন/সংরক্ষণ',
    'Escrow Payment': 'নিশ্চিত পেমেন্ট',
    'AI Crop Quality Assessment': 'AI ফসল মান মূল্যায়ন',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'কম্পিউটার-ভিশনের মাধ্যমে আর্দ্রতা, উজ্জ্বলতা ও ক্ষতি সনাক্ত করে ফসলকে গ্রেড (A/B/C) দেওয়া।',
    'Smart Market Intelligence': 'স্মার্ট বাজার তথ্য',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'একাধিক মান্ডির দাম তুলনা করে ও পরিবহন খরচ বাদ দিয়ে প্রকৃত নিট আয় দেখানো।',
    'Predictive Decision Engine': 'পূর্বাভাস সিদ্ধান্ত ইঞ্জিন',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'আঞ্চলিক আবহাওয়া ঝুঁকি, অতীত প্রবণতা ও চাহিদা বিশ্লেষণ করে "এখনই বিক্রি করুন নাকি সংরক্ষণ করুন" পরামর্শ দেয়।',
    'Direct Verified Marketplace': 'সরাসরি যাচাইকৃত বাজার',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'কোম্পানি, প্রসেসর ও মিলের সাথে মধ্যস্বত্বভোগী ছাড়া সরাসরি আলোচনা ও ডিজিটাল কাউন্টার-অফার।',
    'Smart Logistics & Storage': 'স্মার্ট পরিবহন ও সংরক্ষণ',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA প্রত্যয়িত গুদাম, কোল্ড চেইন, ও স্থানীয় যান বুকিং স্বচ্ছ মূল্যে।'
  },
  gu: {
    'Your Crop. Your Market. Your Choice.': 'તમારો પાક. તમારું બજાર. તમારી પસંદગી.',
    'Back': 'પાછળ',
    'Farmer': 'ખેડૂત',
    'Buyer': 'ખરીદનાર',
    'Admin': 'એડમિન',
    'Dashboard': 'ડેશબોર્ડ',
    'My Crops': 'મારા પાકો',
    'AI Quality Scan': 'AI ગુણવત્તા તપાસ',
    'Market Intelligence': 'બજાર માહિતી',
    'Weather & Impact': 'હવામાન અને અસર',
    'Regional Predictions': 'પ્રાદેશિક આગાહી',
    'Buyer Offers': 'ખરીદનારની ઓફર',
    'Logistics & Storage': 'પરિવહન અને સંગ્રહ',
    'Transactions': 'વ્યવહારો',
    'Notifications': 'સૂચનાઓ',
    'Farmer Profile': 'ખેડૂત પ્રોફાઇલ',
    'Sell Produce Now': 'હમણાં જ વેચો',
    'Sell Produce Now →': 'હમણાં જ વેચો →',
    'Back to Home': 'હોમ પર પાછા જાઓ',
    'Cancel': 'રદ કરો',
    'Submit': 'સબમિટ કરો',
    'Next': 'આગળ',
    'Continue': 'ચાલુ રાખો',
    'Save': 'સાચવો',
    'Close': 'બંધ કરો',
    'Sign In': 'સાઇન ઇન કરો',
    'Sign Out': 'સાઇન આઉટ કરો',
    'Enter as Farmer': 'ખેડૂત તરીકે પ્રવેશ કરો',
    'Enter as Buyer': 'ખરીદનાર તરીકે પ્રવેશ કરો',
    'Mobile Number': 'મોબાઇલ નંબર',
    'Password': 'પાસવર્ડ',
    'Send OTP': 'OTP મોકલો',
    'Verify OTP': 'OTP ચકાસો',
    // Landing page
    'Next-Generation Agri-Tech Infrastructure': 'આગામી પેઢીનું કૃષિ-તકનીક માળખું',
    'For Farmers & FPOs': 'ખેડૂતો અને FPO માટે',
    'AI Scan (87/100)': 'AI સ્કેન (87/100)',
    'Net Realization': 'ચોખ્ખી પ્રાપ્તિ',
    'Zero Middlemen': 'કોઈ વચેટિયો નહીં',
    'ENTER AS FARMER →': 'ખેડૂત તરીકે પ્રવેશ કરો →',
    'For Mills, Processors & Retail': 'મિલો, પ્રોસેસર્સ અને છૂટક વેપારીઓ માટે',
    'Farmer Portal': 'ખેડૂત પોર્ટલ',
    'Buyer Portal': 'ખરીદનાર પોર્ટલ',
    'AI Grade Reports': 'AI ગ્રેડ અહેવાલો',
    'Farmgate Sourcing': 'સીધા ખેતરમાંથી ખરીદી',
    'Escrow Safety': 'એસ્ક્રો સુરક્ષા',
    'ENTER AS BUYER →': 'ખરીદનાર તરીકે પ્રવેશ કરો →',
    'Government / Mandi Board Admin Portal →': 'સરકાર / મંડી બોર્ડ એડમિન પોર્ટલ →',
    'END-TO-END TRANSACTION PIPELINE': 'શરૂઆતથી અંત સુધીની વ્યવહાર પ્રક્રિયા',
    'From Harvest to Guaranteed Payment': 'લણણીથી ગેરંટીકૃત ચુકવણી સુધી',
    'CORE ARCHITECTURE': 'મુખ્ય માળખું',
    'The 5 Pillars of KisanConnect': 'KisanConnect ના 5 સ્તંભો',
    'Active in Prototype': 'પ્રોટોટાઇપમાં સક્રિય',
    'Ready to Experience the SIH Live Demo?': 'SIH લાઇવ ડેમો અનુભવવા તૈયાર છો?',
    'Launch Farmer Demo Flow': 'ખેડૂત ડેમો શરૂ કરો',
    'Launch Buyer Demo Flow': 'ખરીદનાર ડેમો જુઓ',
    'Solving Agricultural Price Disparity, Intermediary Exploitation & Distress Selling across Indian Mandis':
      'ભારતીય મંડીઓમાં ભાવ અસમાનતા, વચેટિયાના શોષણ અને મજબૂરીવશ વેચાણનો ઉકેલ',
    'AI-powered market intelligence, weather-driven risk forecasting, and direct farmer-buyer transaction connectivity for transparent agricultural trade.':
      'AI-સંચાલિત બજાર માહિતી, હવામાન-આધારિત જોખમ આગાહી, અને ખેડૂત-ખરીદનાર વચ્ચે સીધો પારદર્શક વેપાર.',
    'Sell produce smarter. Scan crop quality with AI, compare nearby mandis, check weather risks, and bargain directly with verified buyers.':
      'વધુ સ્માર્ટ રીતે વેચો. AI વડે પાકની ગુણવત્તા તપાસો, નજીકની મંડીઓની સરખામણી કરો, અને ચકાસાયેલા ખરીદદારો સાથે સીધી વાટાઘાટ કરો.',
    'Source smarter. Discover AI-assessed farm lots, trace origin to village farms, send procurement bids, and secure reliable supply chains.':
      'વધુ સ્માર્ટ રીતે ખરીદો. AI-મૂલ્યાંકિત ખેતર લોટ શોધો, ગામડાના ખેતરો સુધી મૂળ શોધો, અને વિશ્વસનીય પુરવઠા શૃંખલા સુનિશ્ચિત કરો.',
    'Not just a listing board. An integrated intelligent decision-support operating system.':
      'ફક્ત યાદી બોર્ડ નથી. એક સંપૂર્ણ બુદ્ધિશાળી નિર્ણય-સહાયક સિસ્ટમ.',
    'Walk through the full real-life case study: Wheat (500 KG) harvested in Karnal -> AI scan (87/100 Grade A) -> Rain Alert -> Deal locked at ₹2,430/q -> Escrow payment.':
      'સંપૂર્ણ વાસ્તવિક કેસ સ્ટડી જુઓ: કર્નાલમાં ઘઉં (500 કિલો) લણણી -> AI સ્કેન (87/100) -> વરસાદની ચેતવણી -> ₹2,430/ક્વિન્ટલ સોદો -> એસ્ક્રો ચુકવણી.',
    'Harvest Listing': 'લણણી યાદી',
    'Market Pulse': 'બજાર વલણ',
    'ML Prediction': 'ભાવ આગાહી',
    'Buyer Match': 'ખરીદનાર મેચ',
    'Live Bargain': 'સીધી વાટાઘાટ',
    'Logistics/Storage': 'પરિવહન/સંગ્રહ',
    'Escrow Payment': 'ગેરંટીકૃત ચુકવણી',
    'AI Crop Quality Assessment': 'AI પાક ગુણવત્તા મૂલ્યાંકન',
    'Computer-vision assisted screening that grades produce (Grade A/B/C) with moisture, luster & damage detection.':
      'કમ્પ્યુટર-વિઝન દ્વારા ભેજ, ચમક અને નુકસાન ઓળખીને પાકને ગ્રેડ (A/B/C) આપવો.',
    'Smart Market Intelligence': 'સ્માર્ટ બજાર માહિતી',
    'Multi-mandi price discovery calculating real transport overhead to surface the true Net Realization.':
      'અનેક મંડીઓના ભાવની સરખામણી કરી પરિવહન ખર્ચ બાદ કરીને સાચી ચોખ્ખી આવક બતાવવી.',
    'Predictive Decision Engine': 'આગાહી નિર્ણય એન્જિન',
    'Synthesizes regional weather risks, historical trends & buyer demand to advise whether to Sell Now or Store.':
      'પ્રાદેશિક હવામાન જોખમો, ભૂતકાળના વલણો અને માંગનું વિશ્લેષણ કરીને "હમણાં વેચો કે સંગ્રહ કરો" ની સલાહ.',
    'Direct Verified Marketplace': 'સીધું ચકાસાયેલ બજાર',
    'Direct negotiation and digital counter-offers with corporate buyers, food processors and mills with zero broker cuts.':
      'કંપનીઓ, પ્રોસેસર્સ અને મિલો સાથે વચેટિયા વગર સીધી વાટાઘાટ અને ડિજિટલ કાઉન્ટર-ઓફર.',
    'Smart Logistics & Storage': 'સ્માર્ટ પરિવહન અને સંગ્રહ',
    'Integrated geo-located WDRA certified godowns, cold chains, and local fleet booking at transparent rates.':
      'WDRA પ્રમાણિત ગોડાઉન, કોલ્ડ ચેઇન, અને સ્થાનિક વાહન બુકિંગ પારદર્શક દરે.'
  }
};

/** Look up a translation for `enText` in the given language, falling back to English. */
export function lookupTranslation(language: Language, enText: string): string {
  const dict = TRANSLATIONS[language];
  if (dict && dict[enText]) return dict[enText];
  return enText;
}
