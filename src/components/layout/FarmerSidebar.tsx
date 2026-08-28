import React from 'react';
import {
  LayoutDashboard,
  Wheat,
  Sparkles,
  TrendingUp,
  CloudSun,
  LineChart,
  PlusCircle,
  Handshake,
  Truck,
  CheckCircle,
  Bell,
  UserCheck,
  Zap
} from 'lucide-react';
import { useApp, FarmerTab } from '../../context/AppContext';

export const FarmerSidebar: React.FC = () => {
  const { farmerTab, setFarmerTab, t, offers, transactions, unreadNotifsCount } = useApp();

  const activeOffersCount = offers.filter((o) => o.status === 'pending' || o.status === 'countered').length;
  const activeTxnCount = transactions.filter((t) => t.paymentStatus !== 'SETTLED').length;

  const navItems: { id: FarmerTab; labelEn: string; labelHi: string; icon: any; badge?: string | number; badgeColor?: string }[] = [
    { id: 'home', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', icon: LayoutDashboard },
    { id: 'crops', labelEn: 'My Crops', labelHi: 'मेरी फसलें', icon: Wheat, badge: '3' },
    { id: 'ai', labelEn: 'AI Quality Scan', labelHi: 'एआई क्वालिटी स्कैन', icon: Sparkles, badge: 'AI', badgeColor: 'bg-amber-400 text-amber-950' },
    { id: 'market', labelEn: 'Market Intelligence', labelHi: 'मंडी भाव व ट्रेंड', icon: TrendingUp },
    { id: 'weather', labelEn: 'Weather & Impact', labelHi: 'मौसम व प्रभाव', icon: CloudSun, badge: 'Alert', badgeColor: 'bg-rose-500 text-white' },
    { id: 'pred', labelEn: 'Regional Predictions', labelHi: 'पूर्वानुमान व सलाह', icon: LineChart },
    { id: 'sell', labelEn: 'Sell Produce', labelHi: 'फसल बेचें', icon: PlusCircle, badge: 'Smart', badgeColor: 'bg-emerald-400 text-emerald-950 font-bold' },
    { id: 'offers', labelEn: 'Buyer Offers', labelHi: 'खरीदार के ऑफर', icon: Handshake, badge: activeOffersCount > 0 ? activeOffersCount : undefined, badgeColor: 'bg-amber-400 text-amber-950 font-bold' },
    { id: 'log', labelEn: 'Logistics & Storage', labelHi: 'वेयरहाउस व ट्रांसपोर्ट', icon: Truck },
    { id: 'txn', labelEn: 'Transactions', labelHi: 'लेन-देन ट्रैकिंग', icon: CheckCircle, badge: activeTxnCount > 0 ? activeTxnCount : undefined, badgeColor: 'bg-emerald-500 text-white' },
    { id: 'notifications', labelEn: 'Notifications', labelHi: 'सूचनाएं', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined, badgeColor: 'bg-rose-500 text-white' },
    { id: 'profile', labelEn: 'Farmer Profile', labelHi: 'प्रोफ़ाइल', icon: UserCheck }
  ];

  return (
    <aside className="w-64 bg-[#14532D] text-white flex-shrink-0 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between border-r border-emerald-800/40 hidden md:flex">
      <div>
        {/* Farmer Profile Mini Header */}
        <div className="bg-[#0F3E22] p-3 rounded-2xl border border-emerald-600/30 mb-5 flex items-center space-x-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EAB308] to-amber-300 text-[#14532D] font-extrabold flex items-center justify-center text-base shadow">
            🌾
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-extrabold text-white truncate">Rameshwar Singh</h4>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-emerald-200 font-medium">Karnal (132001)</span>
            </div>
          </div>
        </div>

        {/* Navigation Section Title */}
        <div className="px-2 pb-2">
          <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">
            {t('Farmer Workspace', 'किसान कार्यक्षेत्र')}
          </p>
        </div>

        {/* Nav list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = farmerTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setFarmerTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#EAB308] text-[#14532D] shadow-md font-bold'
                    : 'text-emerald-100 hover:bg-[#1E6B3C]/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#14532D]' : 'text-emerald-300'}`} />
                  <span>{t(item.labelEn, item.labelHi)}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                      item.badgeColor || 'bg-emerald-700 text-emerald-100'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Smart Selling Callout */}
      <div className="mt-6 p-3.5 bg-gradient-to-br from-[#1E6B3C] to-[#0F3E22] rounded-2xl border border-emerald-500/30 text-emerald-100 shadow-inner">
        <div className="flex items-center space-x-2 text-[#FACC15] mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-extrabold uppercase tracking-wide">
            {t('AI Advisory', 'एआई सलाह')}
          </span>
        </div>
        <p className="text-[11px] text-emerald-100/90 leading-snug">
          {t(
            'High rain risk in 3 days. Wheat Grade A market peak currently at ₹2,420/q.',
            '3 दिन में भारी बारिश का अनुमान। गेहूं ग्रेड A का दाम अभी ₹2,420/क्विंटल।'
          )}
        </p>
        <button
          onClick={() => setFarmerTab('sell')}
          className="mt-2.5 w-full py-1.5 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-lg text-xs font-bold transition-all shadow"
        >
          {t('Sell Produce Now →', 'अभी फसल बेचें →')}
        </button>
      </div>
    </aside>
  );
};
