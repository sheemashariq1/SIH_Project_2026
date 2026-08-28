import React from 'react';
import {
  CloudSun,
  CloudRain,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherScreen: React.FC = () => {
  const { weather, setFarmerTab, t } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Weather & Farm Conditions', 'मौसम व कृषि दशाएं')}
            </h1>
            <span className="bg-rose-100 text-rose-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-rose-300">
              72% Rain Alert
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            📍 <span className="font-semibold text-gray-800">Karnal, Haryana</span> • {t('Hyperlocal IMD weather stream connected directly to crop decision engine', 'आईएमडी मौसम डेटा एवं फसल सुरक्षा सलाहकार')}
          </p>
        </div>
      </div>

      {/* 4 Current Conditions Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>TEMPERATURE</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 font-heading text-3xl font-extrabold text-gray-900">
            {weather.currentTemp}°C
          </div>
          <p className="text-[11px] text-gray-500 mt-1">High 31°C / Low 24°C</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>HUMIDITY</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 font-heading text-3xl font-extrabold text-gray-900">
            {weather.humidity}%
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Elevated ambient moisture</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-rose-400 bg-rose-50/40 shadow-xs">
          <div className="flex items-center justify-between text-rose-900 text-xs font-bold">
            <span>RAIN PROBABILITY</span>
            <CloudRain className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 font-heading text-3xl font-extrabold text-rose-700">
            {weather.rainProbability}%
          </div>
          <p className="text-[11px] text-rose-700 font-bold mt-1">Precipitation expected in 72h</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>WIND VELOCITY</span>
            <Wind className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-heading text-3xl font-extrabold text-gray-900">
            {weather.windSpeed} <span className="text-xs text-gray-500 font-normal">km/h</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Gentle East-North Breeze</p>
        </div>
      </div>

      {/* 7-Day Forecast Strip */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-heading font-extrabold text-lg text-gray-900">
          {t('7-Day Regional Agro-Weather Forecast', '7-दिवसीय मौसम पूर्वानुमान')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border text-center flex flex-col justify-between ${
                day.rainProbability >= 60
                  ? 'border-rose-300 bg-rose-50/60 ring-1 ring-rose-400'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div>
                <span className="text-xs font-extrabold text-gray-900 block">{day.day}</span>
                <span className="text-2xl my-2 block">{day.icon}</span>
                <span className="font-heading font-bold text-base text-gray-900">{day.temp}°C</span>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-200/80">
                <span className={`text-[10px] font-bold ${day.rainProbability >= 60 ? 'text-rose-700' : 'text-blue-600'}`}>
                  🌧 {day.rainProbability}% Rain
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WEATHER IMPACT ON YOUR CROP SECTION */}
      <div className="bg-gradient-to-br from-[#14532D] to-[#1E6B3C] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-400/30 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-700/60">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-[#FACC15]" />
            <h3 className="font-heading font-extrabold text-xl text-white">
              {t('Weather Impact on Your Harvested Crops', 'फसल पर मौसम का सीधा प्रभाव व सुरक्षा उपाय')}
            </h3>
          </div>
          <span className="bg-[#EAB308] text-[#14532D] text-xs font-extrabold px-3 py-1 rounded-full">
            AI AGRO-ADVISORY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weather.cropImpactInsights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-[#0F3E22] p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-extrabold text-base text-[#FACC15]">
                    {insight.cropName}
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      insight.urgency === 'high'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-400 text-amber-950'
                    }`}
                  >
                    {insight.riskTitle}
                  </span>
                </div>

                <p className="text-xs text-emerald-100/90 leading-relaxed mt-2">
                  {insight.riskDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-700/50">
                <span className="text-[11px] text-emerald-300 font-bold block mb-1">
                  {t('Recommended Action:', 'सुझावित कदम:')}
                </span>
                <p className="text-xs font-extrabold text-white bg-emerald-950/80 p-2 rounded-xl border border-emerald-500/30">
                  {insight.recommendedAction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Sell / Storage */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-emerald-200">
            {t(
              'Sell harvested wheat immediately to prevent open-mandi moisture markdown or book WDRA dry storage.',
              'नमी कट से बचने के लिए गेहूं तुरंत बेचें अथवा सुरक्षित गोदाम बुक करें।'
            )}
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => setFarmerTab('log')}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors"
            >
              {t('Book Covered Silo / Warehouse', 'वेयरहाउस बुक करें')}
            </button>
            <button
              onClick={() => setFarmerTab('sell')}
              className="px-5 py-2.5 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-xl text-xs font-extrabold shadow transition-transform active:scale-95 flex items-center space-x-1.5"
            >
              <span>{t('Sell Wheat Now (₹2,420/q) →', 'अभी गेहूं बेचें →')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
