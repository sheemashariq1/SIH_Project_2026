import React, { useState } from 'react';
import {
  Sprout,
  Globe,
  Bell,
  User,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    toggleLanguage,
    t,
    currentUser,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    setFarmerTab,
    setIsAuthOpen,
    setAuthRole
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#14532D] text-white shadow-md border-b border-[#1E6B3C]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setRole('landing')}>
            <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-[#14532D] flex items-center justify-center shadow-inner font-bold text-xl">
              <Sprout className="w-6 h-6 text-[#14532D]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Kisan<span className="text-[#FACC15]">Connect</span>
                </span>
                <span className="bg-[#1E6B3C] text-emerald-100 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-emerald-400/30">
                  SIH Pro
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-medium hidden sm:block">
                {t('Your Crop. Your Market. Your Choice.', 'आपकी फसल. आपका बाज़ार. आपका फैसला.')}
              </p>
            </div>
          </div>

          {/* Center Location & Mode Tag (Visible when not in landing) */}
          {role !== 'landing' && (
            <div className="hidden md:flex items-center space-x-2 bg-[#0F3E22]/60 px-3.5 py-1.5 rounded-full border border-emerald-500/20 text-xs text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-[#FACC15]" />
              <span className="font-medium">Karnal Mandi Hub, Haryana</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-300 font-mono">Live Demo Engine</span>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E6B3C]/70 hover:bg-[#1E6B3C] border border-emerald-400/30 text-xs font-semibold text-white transition-all shadow-sm"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Role Switcher Pills (Header quick toggle for easy SIH evaluator testing) */}
            <div className="hidden lg:flex items-center bg-[#0F3E22] p-1 rounded-lg border border-emerald-600/30 text-xs">
              <button
                onClick={() => {
                  setRole('farmer');
                  setFarmerTab('home');
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${role === 'farmer' ? 'bg-[#EAB308] text-[#14532D] font-bold shadow-sm' : 'text-emerald-200 hover:text-white'
                  }`}
              >
                👨‍🌾 {t('Farmer', 'किसान')}
              </button>
              <button
                onClick={() => setRole('buyer')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${role === 'buyer' ? 'bg-[#EAB308] text-[#14532D] font-bold shadow-sm' : 'text-emerald-200 hover:text-white'
                  }`}
              >
                🏢 {t('Buyer', 'खरीदार')}
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${role === 'admin' ? 'bg-[#EAB308] text-[#14532D] font-bold shadow-sm' : 'text-emerald-200 hover:text-white'
                  }`}
              >
                ⚡ {t('Admin', 'व्यवस्थापक')}
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-lg bg-[#1E6B3C]/70 hover:bg-[#1E6B3C] border border-emerald-400/30 text-white transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 text-gray-800 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#14532D]" />
                      <h4 className="font-heading font-bold text-sm text-[#14532D]">
                        {t('Live Activity & Alerts', 'लाइव सूचनाएं व अलर्ट')}
                      </h4>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {unreadNotifsCount} {t('new', 'नए')}
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 px-2 py-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.actionTab) {
                            setRole('farmer');
                            setFarmerTab(n.actionTab as any);
                          }
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 rounded-xl hover:bg-emerald-50/70 transition-colors cursor-pointer text-left ${!n.read ? 'bg-amber-50/60 font-medium' : 'opacity-85'
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-bold text-[#14532D] flex items-center space-x-1">
                            <span>{n.title}</span>
                          </p>
                          <span className="text-[10px] text-gray-400 font-mono ml-2 whitespace-nowrap">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Action */}
            {role === 'landing' ? (
              <button
                onClick={() => {
                  setAuthRole('farmer');
                  setIsAuthOpen(true);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-lg font-bold text-xs shadow-sm transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('Sign In', 'लॉग इन')}</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-lg bg-[#1E6B3C]/80 hover:bg-[#1E6B3C] border border-emerald-400/30 text-white transition-all text-xs font-semibold"
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/40"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#EAB308] text-[#14532D] font-bold flex items-center justify-center text-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden sm:inline font-medium text-emerald-100 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 text-gray-800 p-3 z-50 animate-in fade-in duration-150">
                    <div className="flex items-center space-x-3 p-2 bg-emerald-50/70 rounded-xl mb-2">
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-600/30 shadow"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#14532D] text-[#FACC15] font-bold flex items-center justify-center text-sm shadow">
                          {currentUser.name.charAt(0)}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{currentUser.name}</h4>
                        <p className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {currentUser.provider === 'google'
                              ? t('Google Verified', 'गूगल सत्यापित')
                              : t('AI & Aadhaar Verified', 'सत्यापित किसान')}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-500 px-2 py-1 space-y-1">
                      <p>📍 {currentUser.location}</p>
                      <p>📞 {currentUser.phone}</p>
                      <p className="text-emerald-800 font-medium">🏢 {currentUser.fpoName}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                      <button
                        onClick={() => {
                          setRole('landing');
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('Switch Account / Logout', 'लॉग आउट')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
