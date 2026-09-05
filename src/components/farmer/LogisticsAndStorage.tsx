import React, { useState } from 'react';
import {
  Truck,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  Search,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LogisticsAndStorage: React.FC = () => {
  const { storageFacilities, transportFleet, t } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'transport' | 'storage'>('transport');
  const [selectedStorageId, setSelectedStorageId] = useState(storageFacilities[0].id);
  const [selectedTransportId, setSelectedTransportId] = useState(transportFleet[0].id);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBookTransport = (vehicle: { name: string; driverName: string; driverPhone: string }) => {
    setBookingSuccess(
      `Transport Booking Confirmed! ${vehicle.name} has been assigned to pickup from Village Taraori (Karnal). Driver: ${vehicle.driverName}${vehicle.driverPhone !== '—' ? ` (📞 ${vehicle.driverPhone})` : ''} • ETA: 45 Mins.`
    );
    setTimeout(() => setBookingSuccess(null), 6000);
  };

  const handleBookStorage = (s: { name: string; contact: string }) => {
    setBookingSuccess(`Storage Bay Reserved at ${s.name}! E-Warehouse Receipt (e-NWR) generated. Warehouse Manager Contact: 📞 ${s.contact}`);
    setTimeout(() => setBookingSuccess(null), 6000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Logistics & Certified Storage Facilities', 'परिवहन एवं प्रमाणित भंडारण गोदाम')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
              WDRA Certified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'On-demand farmgate freight pickup and certified warehouse storage with electronic receipts (e-NWR).',
              'खेत से सीधे वाहन लोडिंग और सरकारी मान्यता प्राप्त वेयरहाउस में सुरक्षित भंडारण।'
            )}
          </p>
        </div>

        {/* Subtab Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('transport')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'transport'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs font-extrabold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t('Transport Fleet', 'परिवहन वाहन')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('storage')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'storage'
                ? 'bg-[#14532D] text-[#FACC15] shadow-xs font-extrabold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('Storage Warehouses', 'गोदाम / साइलो')}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {bookingSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-600 rounded-2xl text-xs font-bold text-emerald-950 flex items-center space-x-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* 1. TRANSPORT FLEET VIEW */}
      {activeSubTab === 'transport' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {transportFleet.map((vehicle) => {
              const est15kmCost = vehicle.baseCost + vehicle.perKmCost * 14;

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {vehicle.vehicleType}
                      </span>
                      <span className="text-xs font-mono text-gray-500 font-bold">
                        ETA {vehicle.eta}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-extrabold text-gray-900">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Max Payload: <span className="font-bold text-gray-700">{vehicle.capacityKg.toLocaleString()} KG</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      🧑‍✈️ Driver: <span className="font-bold text-gray-700">{vehicle.driverName}</span>
                      {vehicle.driverPhone !== '—' && <span className="ml-1">📞 {vehicle.driverPhone}</span>}
                    </p>

                    <div className="mt-4 p-3 bg-gray-50 rounded-2xl space-y-1.5 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>Base Loading Charge</span>
                        <span className="font-bold text-gray-900">₹{vehicle.baseCost}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Rate per KM</span>
                        <span className="font-bold text-gray-900">₹{vehicle.perKmCost}/km</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 flex justify-between font-extrabold text-[#14532D]">
                        <span>Est. 14 KM Trip:</span>
                        <span>₹{est15kmCost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-mono">GPS Verified</span>
                    <button
                      onClick={() => handleBookTransport(vehicle)}
                      className="px-4 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1"
                    >
                      <span>{t('Dispatch Vehicle →', 'वाहन बुक करें →')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center space-x-3 text-xs text-gray-600">
            <Info className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              All drivers undergo digital KYC verification and live GPS trip tracking to eliminate transit theft or tampering.
            </span>
          </div>
        </div>
      )}

      {/* 2. STORAGE WAREHOUSES VIEW */}
      {activeSubTab === 'storage' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {storageFacilities.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                      WDRA Accredited
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">
                      {s.distanceKm} km
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-extrabold text-gray-900">
                    {s.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📍 {s.distanceKm} km away • Type: {s.type}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📞 Warehouse Contact: <span className="font-bold text-gray-700">{s.contact}</span>
                  </p>

                  <div className="mt-4 p-3 bg-gray-50 rounded-2xl space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Rate (per Qtl / day)</span>
                      <span className="font-extrabold text-[#14532D]">₹{s.ratePerDay}/day</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Available Capacity</span>
                      <span className="font-bold text-gray-900">{s.availableTonnes} / {s.capacityTonnes} Tonnes</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {[s.type, `${s.rating}★ Rated`, 'e-NWR Enabled'].map((feat, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">5 Qtl Lot / 30d</span>
                    <span className="font-bold text-xs text-gray-900">₹{s.ratePerDay * 30 * 5} Total</span>
                  </div>

                  <button
                    onClick={() => handleBookStorage(s)}
                    className="px-4 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1"
                  >
                    <span>{t('Reserve Bay →', 'स्थान आरक्षित करें →')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <div>
              <p className="font-bold">Electronic Negotiable Warehouse Receipts (e-NWR) Included</p>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Pledge stored crop receipts directly with partnering public banks to unlock 70% pledge loans at low priority-sector interest rates.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
