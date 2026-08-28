import React, { useState } from 'react';
import {
  X,
  Sprout,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authRole,
    setAuthRole,
    loginAs,
    t
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98123 45678');
  const [password, setPassword] = useState('••••••••');
  const [otpInput, setOtpInput] = useState(['5', '4', '9', '1']);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState('Rameshwar Singh');
  const [state, setState] = useState('Haryana');
  const [district, setDistrict] = useState('Karnal');
  const [village, setVillage] = useState('Village Taraori');
  const [pincode, setPincode] = useState('132001');
  const [userType, setUserType] = useState<'individual' | 'fpo'>('individual');

  if (!isAuthOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(authRole);
  };

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setAuthMode('otp');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-900/10">
        {/* Header with Green Theme */}
        <div className="bg-gradient-to-r from-[#14532D] to-[#1E6B3C] p-6 text-white relative">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-[#14532D] flex items-center justify-center font-bold text-lg">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                {t('Welcome to KisanConnect', 'किसानकनेक्ट में आपका स्वागत है')}
              </h3>
              <p className="text-xs text-emerald-200">
                {t('Intelligent Agri-Trade Ecosystem', 'स्मार्ट कृषि व्यापार एवं निर्णय मंच')}
              </p>
            </div>
          </div>

          {/* Role selection tab bar inside modal */}
          <div className="grid grid-cols-3 gap-1 bg-[#0F3E22]/80 p-1 rounded-xl border border-emerald-500/30 text-xs mt-4">
            <button
              onClick={() => setAuthRole('farmer')}
              className={`py-2 rounded-lg font-bold transition-all ${
                authRole === 'farmer'
                  ? 'bg-[#EAB308] text-[#14532D] shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              👨‍🌾 {t('Farmer / FPO', 'किसान')}
            </button>
            <button
              onClick={() => setAuthRole('buyer')}
              className={`py-2 rounded-lg font-bold transition-all ${
                authRole === 'buyer'
                  ? 'bg-[#EAB308] text-[#14532D] shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              🏢 {t('Buyer / Mill', 'खरीदार')}
            </button>
            <button
              onClick={() => setAuthRole('admin')}
              className={`py-2 rounded-lg font-bold transition-all ${
                authRole === 'admin'
                  ? 'bg-[#EAB308] text-[#14532D] shadow'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              ⚡ {t('Admin Portal', 'व्यवस्थापक')}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* 1-Click Fast Demo Bypass */}
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-xs font-bold text-emerald-950">
                  {t('SIH Evaluator Quick Access', 'SIH मूल्यांकन त्वरित लॉगिन')}
                </p>
                <p className="text-[11px] text-emerald-700">
                  {t('Explore pre-seeded data & live state', 'पूर्व-सत्यापित डेटा के साथ सीधे प्रवेश करें')}
                </p>
              </div>
            </div>
            <button
              onClick={() => loginAs(authRole)}
              className="px-3.5 py-1.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95"
            >
              {t('Enter Demo →', 'प्रवेश करें →')}
            </button>
          </div>

          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t('Mobile Number or Email', 'मोबाइल नंबर या ईमेल')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="+91 98123 45678"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t('Password / PIN', 'पासवर्ड / पिन')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  {t('Login with OTP instead', 'ओटीपी से लॉगिन करें')}
                </button>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-gray-500 hover:underline">
                  {t('Forgot PIN?', 'पिन भूल गए?')}
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{t('Sign In to Account', 'खाते में प्रवेश करें')}</span>
                <ArrowRight className="w-4 h-4 text-[#FACC15]" />
              </button>

              <div className="pt-2 text-center text-xs text-gray-600">
                {t("Don't have an account?", 'नया खाता बनाना चाहते हैं?')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-emerald-800 hover:underline"
                >
                  {t('Register for Free', 'निःशुल्क पंजीकरण करें')}
                </button>
              </div>
            </form>
          )}

          {authMode === 'otp' && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <p className="text-xs text-gray-600">
                  {t('We sent a 4-digit OTP to', 'हमने 4-अंकों का ओटीपी भेजा है')}{' '}
                  <span className="font-bold text-gray-900">{phoneOrEmail}</span>
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                {otpInput.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otpInput];
                      next[idx] = e.target.value;
                      setOtpInput(next);
                    }}
                    className="w-12 h-12 text-center text-xl font-extrabold border-2 border-emerald-600/40 rounded-xl focus:border-emerald-600 focus:outline-none bg-emerald-50/50"
                  />
                ))}
              </div>

              <button
                onClick={() => loginAs(authRole)}
                className="w-full py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                {t('Verify OTP & Enter', 'ओटीपी सत्यापित करें और प्रवेश करें')}
              </button>

              <button
                onClick={() => setAuthMode('login')}
                className="w-full text-xs text-gray-500 hover:text-gray-800 font-medium text-center block"
              >
                ← {t('Back to password login', 'पासवर्ड लॉगिन पर वापस जाएं')}
              </button>
            </div>
          )}

          {authMode === 'signup' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('Full Name / Representative', 'पूरा नाम')}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('Phone Number', 'फ़ोन नंबर')}
                  </label>
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('State', 'राज्य')}
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('District', 'ज़िला')}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    {t('Pincode', 'पिनकोड')}
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  {t('Village / Locality', 'गाँव / क्षेत्र')}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium"
                  required
                />
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    checked={userType === 'individual'}
                    onChange={() => setUserType('individual')}
                    className="text-emerald-700 focus:ring-emerald-500"
                  />
                  <span>{t('Individual Farmer', 'व्यक्तिगत किसान')}</span>
                </label>
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    checked={userType === 'fpo'}
                    onChange={() => setUserType('fpo')}
                    className="text-emerald-700 focus:ring-emerald-500"
                  />
                  <span>{t('FPO / Cooperative Leader', 'एफपीओ / समूह')}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-white rounded-xl font-bold text-xs shadow transition-all"
              >
                {t('Complete Registration & Start', 'पंजीकरण पूरा करें')}
              </button>

              <div className="pt-1 text-center text-xs text-gray-600">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-emerald-800 font-bold hover:underline"
                >
                  ← {t('Already have an account? Login', 'पहले से खाता है? लॉगिन करें')}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center space-x-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('Government e-NAM & Aadhaar KYC Compatible', 'ई-नाम एवं आधार अनुपालन सुरक्षा')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
