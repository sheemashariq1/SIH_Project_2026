import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PlusCircle,
  Handshake,
  UserCheck
} from 'lucide-react';
import { useApp, FarmerTab } from '../../context/AppContext';

export const FarmerMobileNav: React.FC = () => {
  const { farmerTab, setFarmerTab, t, offers } = useApp();
  const activeOffersCount = offers.filter((o) => o.status === 'pending' || o.status === 'countered').length;

  const mobileTabs: { id: FarmerTab; labelEn: string; labelHi: string; icon: any; badge?: number }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: LayoutDashboard },
    { id: 'market', labelEn: 'Market', labelHi: 'मंडी', icon: TrendingUp },
    { id: 'sell', labelEn: 'Sell', labelHi: 'बेचें', icon: PlusCircle },
    { id: 'offers', labelEn: 'Offers', labelHi: 'ऑफर', icon: Handshake, badge: activeOffersCount > 0 ? activeOffersCount : undefined },
    { id: 'profile', labelEn: 'Profile', labelHi: 'प्रोफ़ाइल', icon: UserCheck }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14532D] border-t border-emerald-700/60 shadow-2xl px-2 py-1.5 flex items-center justify-around">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = farmerTab === tab.id;
        const isSell = tab.id === 'sell';

        if (isSell) {
          return (
            <button
              key={tab.id}
              onClick={() => setFarmerTab(tab.id)}
              className="relative -top-3 flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#EAB308] text-[#14532D] flex items-center justify-center shadow-lg border-2 border-white font-extrabold transition-transform active:scale-95">
                <PlusCircle className="w-6 h-6 text-[#14532D]" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 mt-0.5">
                {t(tab.labelEn, tab.labelHi)}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setFarmerTab(tab.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive ? 'text-[#FACC15] font-bold' : 'text-emerald-200/80 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 bg-amber-400 text-[#14532D] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{t(tab.labelEn, tab.labelHi)}</span>
          </button>
        );
      })}
    </div>
  );
};
