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
    'Verify OTP': 'OTP ਤਸਦੀਕ ਕਰੋ'
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
    'Verify OTP': 'OTP सत्यापित करा'
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
    'Verify OTP': 'OTP சரிபார்க்கவும்'
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
    'Verify OTP': 'OTP ధృవీకరించండి'
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
    'Verify OTP': 'OTP যাচাই করুন'
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
    'Verify OTP': 'OTP ચકાસો'
  }
};

/** Look up a translation for `enText` in the given language, falling back to English. */
export function lookupTranslation(language: Language, enText: string): string {
  const dict = TRANSLATIONS[language];
  if (dict && dict[enText]) return dict[enText];
  return enText;
}
