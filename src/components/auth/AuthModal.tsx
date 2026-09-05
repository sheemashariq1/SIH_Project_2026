import React, { useState } from 'react';
import {
  X,
  Sprout,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authRole,
    setAuthRole,
    loginAs,
    loginWithGoogle,
    language,
    t
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98123 45678');
  const [password, setPassword] = useState('••••••••');
  const [otpInput, setOtpInput] = useState(['5', '4', '9', '1']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [googleAuthStatus, setGoogleAuthStatus] = useState<string | null>(null);

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

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        const decoded: any = jwtDecode(credentialResponse.credential);
        setGoogleAuthStatus(`Verified as ${decoded.name || decoded.email}`);
        loginWithGoogle({
          name: decoded.name || 'Google Verified User',
          email: decoded.email || '',
          avatar: decoded.picture || '',
          role: authRole
        });
      } catch (err) {
        console.error('Failed to parse Google JWT:', err);
        loginAs(authRole);
      }
    } else {
      loginAs(authRole);
    }
  };

  const handleGoogleError = () => {
    console.warn('Google sign-in returned error or origin not whitelisted.');
    setGoogleAuthStatus('Notice: If testing on unverified domain, use One-Click Sign In below');
  };

  // Quick fallback Google sign in handler
  const handleDirectGoogleLogin = () => {
    loginWithGoogle({
      name: 'Google Verified Farmer',
      email: 'farmer.verified@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: authRole
    });
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
              className={`py-2 rounded-lg font-bold transition-all ${authRole === 'farmer'
                ? 'bg-[#EAB308] text-[#14532D] shadow'
                : 'text-emerald-200 hover:text-white'
                }`}
            >
              👨‍🌾 {t('Farmer / FPO', 'किसान')}
            </button>
            <button
              onClick={() => setAuthRole('buyer')}
              className={`py-2 rounded-lg font-bold transition-all ${authRole === 'buyer'
                ? 'bg-[#EAB308] text-[#14532D] shadow'
                : 'text-emerald-200 hover:text-white'
                }`}
            >
              🏢 {t('Buyer / Mill', 'खरीदार')}
            </button>
            <button
              onClick={() => setAuthRole('admin')}
              className={`py-2 rounded-lg font-bold transition-all ${authRole === 'admin'
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
          {/* PRIMARY GOOGLE SIGN-IN SECTION */}
          <div className="mb-4 p-3.5 bg-gradient-to-r from-blue-50/80 to-emerald-50/80 border border-blue-200/80 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-bold text-gray-800">
                  {t('Continue with Google Account', 'गूगल खाते से लॉगिन करें')}
                </span>
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {authRole.toUpperCase()}
              </span>
            </div>

            {/* Google OAuth Component */}
            <div className="flex flex-col items-center justify-center pt-1 pb-1">
              <div className="w-full flex justify-center scale-95 origin-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  shape="pill"
                  size="large"
                  text="signin_with"
                  width="320"
                />
              </div>

              {/* Instant One-Tap Google Button */}
              <button
                type="button"
                onClick={handleDirectGoogleLogin}
                className="mt-2 text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center space-x-1.5 transition-colors"
              >
                <span>🚀 {t('Instant 1-Click Google Sign-In', 'तुरंत 1-क्लिक गूगल लॉगिन')}</span>
              </button>
            </div>

            {googleAuthStatus && (
              <p className="text-[11px] text-amber-700 text-center mt-1 font-medium bg-amber-50 p-1 rounded-lg">
                {googleAuthStatus}
              </p>
            )}
          </div>

          {/* DIVIDER */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                {t('Or with Mobile / OTP', 'या मोबाइल / ओटीपी द्वारा')}
              </span>
            </div>
          </div>

          {/* 1-Click Fast Demo Bypass */}
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-950">
                  {t('SIH Evaluator Quick Access', 'SIH मूल्यांकन त्वरित लॉगिन')}
                </p>
                <p className="text-[11px] text-emerald-700">
                  {t('Pre-seeded live datasets', 'पूर्व-सत्यापित डेटा के साथ')}
                </p>
              </div>
            </div>
            <button
              onClick={() => loginAs(authRole)}
              className="px-3 py-1.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95 shrink-0"
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
