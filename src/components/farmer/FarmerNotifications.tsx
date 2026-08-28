import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Handshake,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmerNotifications: React.FC = () => {
  const { notifications, markNotificationRead, setFarmerTab, t } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Notifications & Alerts', 'सूचनाएं एवं अलर्ट')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
              {notifications.length} {t('Total', 'कुल')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Real-time alerts for market price jumps, buyer bids, escrow payouts, and weather warnings.',
              'मंडी भाव वृद्धि, खरीदार बोलियां, एस्क्रो भुगतान और मौसम चेतावनियों के रियल-टाइम अलर्ट।'
            )}
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => {
          let Icon = Bell;
          let iconBg = 'bg-blue-100 text-blue-800';

          if (notif.type === 'offer') {
            Icon = Handshake;
            iconBg = 'bg-amber-100 text-amber-800';
          } else if (notif.type === 'weather') {
            Icon = AlertTriangle;
            iconBg = 'bg-rose-100 text-rose-800';
          } else if (notif.type === 'price_alert') {
            Icon = TrendingUp;
            iconBg = 'bg-emerald-100 text-emerald-800';
          } else if (notif.type === 'transaction') {
            Icon = CheckCircle2;
            iconBg = 'bg-emerald-100 text-emerald-800';
          }

          return (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.actionTab) {
                  setFarmerTab(notif.actionTab as any);
                }
              }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-gray-200 opacity-80'
                  : 'bg-emerald-50/40 border-emerald-300 shadow-xs'
              } hover:border-emerald-500 hover:shadow-md`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading font-extrabold text-sm text-gray-900">
                      {t(notif.title, notif.titleHi || notif.title)}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {t(notif.message, notif.messageHi || notif.message)}
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono mt-2 block">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {notif.actionTab && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(notif.id);
                    setFarmerTab(notif.actionTab as any);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1 flex-shrink-0 self-center"
                >
                  <span>{t('View', 'देखें')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
