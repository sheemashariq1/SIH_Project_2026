import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Edit3,
  Save,
  CreditCard,
  Building2,
  Wheat,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FarmerProfile: React.FC = () => {
  const { currentUser, setFarmerTab, t } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [location, setLocation] = useState(currentUser.location);
  const [landArea, setLandArea] = useState('6.5 Acres');
  const [primaryCrops, setPrimaryCrops] = useState('Wheat (HD-2967), Basmati Rice, Mustard');
  const [bankAccount, setBankAccount] = useState('HDFC Bank •••• 9182 (IFSC: HDFC0001892)');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#14532D] to-[#1E6B3C] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EAB308] text-[#14532D] font-black text-2xl flex items-center justify-center shadow-lg border-2 border-white/40">
              🌾
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-heading text-2xl font-black text-white">{name}</h1>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{t('KYC VERIFIED', 'सत्यापित')}</span>
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-1 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>{location}</span>
              </p>
              <p className="text-[11px] text-emerald-300 mt-0.5">
                {currentUser.fpoName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? t('Cancel', 'रद्द करें') : t('Edit Details', 'संशोधित करें')}</span>
            </button>
            <button
              onClick={() => setFarmerTab('sell')}
              className="px-4 py-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] rounded-xl text-xs font-black shadow transition-all"
            >
              🌾 {t('Sell Harvest', 'फसल बेचें')}
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('Profile details successfully updated!', 'प्रोफ़ाइल जानकारी सफलतापूर्वक सुरक्षित हो गई!')}</span>
        </div>
      )}

      {/* Profile Form / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
            <h3 className="font-heading font-extrabold text-sm text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>{t('Farmer & Farm Particulars', 'किसान एवं कृषि विवरण')}</span>
              <span className="text-xs text-gray-400 font-mono">ID: KC-FRM-10928</span>
            </h3>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('Full Name', 'पूरा नाम')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('Phone Number', 'फ़ोन नंबर')}</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('Email Address', 'ईमेल')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('Land Holding Area', 'भूमि का क्षेत्रफल')}</label>
                    <input
                      type="text"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('Village / Farm Location', 'गाँव / खेत का पता')}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('Major Harvest Crops', 'मुख्य फसलें')}</label>
                  <input
                    type="text"
                    value={primaryCrops}
                    onChange={(e) => setPrimaryCrops(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    {t('Cancel', 'रद्द करें')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#14532D] text-[#FACC15] font-extrabold text-xs rounded-xl shadow flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{t('Save Changes', 'सुरक्षित करें')}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('Primary Phone', 'फ़ोन')}:</span>
                  <span className="font-bold text-gray-900">{phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('Email Address', 'ईमेल')}:</span>
                  <span className="font-bold text-gray-900">{email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('Total Cultivated Land', 'खेती योग्य भूमि')}:</span>
                  <span className="font-bold text-gray-900">{landArea}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('Key Crop Varieties', 'फसलें')}:</span>
                  <span className="font-bold text-gray-900">{primaryCrops}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{t('Linked Direct Escrow Bank', 'बैंक खाता')}:</span>
                  <span className="font-mono font-bold text-emerald-800">{bankAccount}</span>
                </div>
              </div>
            )}
          </div>

          {/* KYC Credentials */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
            <h3 className="font-heading font-extrabold text-sm text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>{t('Verified Government Identifiers & KYC', 'सत्यापित सरकारी पहचान')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                <div>
                  <span className="text-gray-500 text-[11px] block">{t('Aadhaar UID', 'आधार संख्या')}</span>
                  <span className="font-mono font-bold text-gray-900">•••• •••• 4491</span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                  ✓ Verified
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                <div>
                  <span className="text-gray-500 text-[11px] block">{t('Kisan Credit Card', 'किसान क्रेडिट कार्ड')}</span>
                  <span className="font-mono font-bold text-gray-900">KCC-HR-99210</span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                  ✓ Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Performance & Trust Score */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-heading font-extrabold text-sm text-gray-900 pb-2 border-b border-gray-100 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t('Platform Trust & Reputation', 'विश्वसनीयता स्कोर')}</span>
            </h3>

            <div className="text-center py-2">
              <div className="text-4xl font-heading font-black text-[#14532D]">4.9 <span className="text-sm font-normal text-gray-500">/ 5.0</span></div>
              <p className="text-[11px] text-gray-500 mt-1">{t('Based on 14 completed verified settlements', '14 सफल सौदों पर आधारित')}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>{t('Fulfillment Rate', 'आपूर्ति दर')}</span>
                <span className="font-bold text-emerald-700">100%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-full"></div>
              </div>

              <div className="flex justify-between text-gray-600 pt-1">
                <span>{t('AI Grade Accuracy', 'एआई ग्रेड सटीकता')}</span>
                <span className="font-bold text-emerald-700">96.4%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[96%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 text-white p-5 rounded-3xl space-y-3">
            <div className="flex items-center space-x-2 text-[#FACC15]">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-heading font-bold text-xs uppercase">{t('FPO Cooperative Advantage', 'एफपीओ सदस्यता लाभ')}</h4>
            </div>
            <p className="text-[11px] text-emerald-200 leading-relaxed">
              {t(
                'You are enrolled with Karnal Progressive FPC. Enjoy grouped bulk freight rates (saving 18% on logistics) and zero middleman deductions.',
                'आप करनाल प्रोग्रेसिव एफपीओ से जुड़े हैं। सामूहिक परिवहन के माध्यम से 18% भाड़ा बचाएं और बिना किसी बिचौलिए के सीधे भुगतान पाएं।'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
