import React, { useState } from 'react';
import {
  Handshake,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Send,
  Truck,
  Building2,
  TrendingUp,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Offer } from '../../types';

export const OffersAndBargaining: React.FC = () => {
  const {
    offers,
    activeOffer,
    setActiveOffer,
    sendCounterOffer,
    acceptOffer,
    rejectOffer,
    setFarmerTab,
    t
  } = useApp();

  const [counterPrice, setCounterPrice] = useState(2450);
  const [counterMessage, setCounterMessage] = useState('');
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);

  const selectedOffer = activeOffer || offers[0];

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;
    sendCounterOffer(selectedOffer.id, counterPrice, counterMessage);
    setIsCounterModalOpen(false);
    setCounterMessage('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Buyer Offers & Live Bargaining', 'खरीदार ऑफर एवं लाइव मोल-भाव')}
            </h1>
            <span className="bg-[#EAB308] text-[#14532D] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {offers.length} {t('Active Bids', 'सक्रिय बोलियां')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Negotiate directly with verified mills and institutional buyers with zero intermediary cuts.',
              'प्रमाणित खाद्य प्रसंस्करण इकाइयों से सीधे बातचीत करें और बिना बिचौलियों के सर्वोत्तम मूल्य पाएं।'
            )}
          </p>
        </div>
      </div>

      {/* 2-Column Layout: Left Offer List / Right Live Chat Negotiation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Offers Feed */}
        <div className="space-y-3">
          <h3 className="font-heading font-extrabold text-sm text-gray-900 flex items-center justify-between">
            <span>{t('Matching Buyer Bids', 'खरीदारों के ऑफर')}</span>
            <span className="text-[11px] text-emerald-800 font-bold">Grade A Verified</span>
          </h3>

          <div className="space-y-2.5">
            {offers.map((off) => {
              const isSelected = selectedOffer?.id === off.id;

              return (
                <div
                  key={off.id}
                  onClick={() => setActiveOffer(off)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#14532D] bg-emerald-50/80 ring-2 ring-emerald-600/20 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-heading font-bold text-sm text-gray-900">{off.buyerName}</h4>
                        {off.buyerVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{off.cropName} • {off.quantityKg} KG</p>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        off.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : off.status === 'countered'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {off.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Current Offer:</span>
                    <span className="font-heading text-lg font-extrabold text-[#14532D]">
                      ₹{off.currentOfferPrice}/quintal
                    </span>
                  </div>

                  {off.pickupIncluded && (
                    <div className="mt-1 flex items-center text-[10px] text-emerald-800 font-bold">
                      <Truck className="w-3 h-3 mr-1" />
                      <span>Free Farmgate Truck Pickup Included</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Negotiation Room */}
        {selectedOffer ? (
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Negotiation Header */}
            <div className="bg-gradient-to-r from-[#14532D] to-[#1E6B3C] text-white p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-extrabold text-lg text-white">
                    {selectedOffer.buyerName}
                  </h3>
                  <span className="bg-[#EAB308] text-[#14532D] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    95% Match
                  </span>
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Lot: {selectedOffer.listingId} • {selectedOffer.cropName} ({selectedOffer.quantityKg} KG)
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-300 block uppercase font-bold">Standing Offer</span>
                <span className="font-heading text-2xl font-extrabold text-[#FACC15]">
                  ₹{selectedOffer.currentOfferPrice}<span className="text-xs text-white font-normal">/q</span>
                </span>
              </div>
            </div>

            {/* Negotiation Messages Container */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto bg-[#F8FBF8]/60 flex-1">
              <div className="text-center">
                <span className="text-[10px] bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-mono">
                  {selectedOffer.createdAt} • Direct Bargaining Channel Opened
                </span>
              </div>

              {selectedOffer.history.map((msg) => {
                const isFarmer = msg.sender === 'farmer';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isFarmer ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-bold text-gray-600">
                      <span>{msg.senderName}</span>
                      <span className="text-gray-400 font-mono text-[10px]">({msg.timestamp})</span>
                    </div>

                    <div
                      className={`max-w-md p-4 rounded-2xl text-xs shadow-xs space-y-1.5 ${
                        isFarmer
                          ? 'bg-[#14532D] text-white rounded-tr-xs'
                          : 'bg-white border border-gray-200 text-gray-900 rounded-tl-xs'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4 border-b pb-1 border-white/20">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                          Proposed Price
                        </span>
                        <span className="font-heading font-extrabold text-base text-[#FACC15]">
                          ₹{msg.pricePerQuintal}/q
                        </span>
                      </div>
                      <p className="leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                );
              })}

              {selectedOffer.status === 'accepted' && (
                <div className="p-4 bg-emerald-100 border-2 border-emerald-500 rounded-2xl text-center text-xs text-emerald-950 font-bold">
                  🎉 Deal Locked at ₹{selectedOffer.currentOfferPrice}/quintal! Escrow transaction initiated.
                </div>
              )}
            </div>

            {/* Negotiation Action Bar */}
            {selectedOffer.status !== 'accepted' && selectedOffer.status !== 'rejected' && (
              <div className="p-4 bg-white border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                  <span>Gross Value: <strong>₹{((selectedOffer.quantityKg / 100) * selectedOffer.currentOfferPrice).toLocaleString('en-IN')}</strong></span>
                  <span className="text-emerald-800 font-bold">Zero Mandi Commission Cut</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => rejectOffer(selectedOffer.id)}
                    className="py-2.5 px-3 bg-gray-100 hover:bg-rose-50 hover:text-rose-700 text-gray-700 font-bold text-xs rounded-xl transition-colors text-center"
                  >
                    {t('Decline Offer', 'अस्वीकार करें')}
                  </button>

                  <button
                    onClick={() => {
                      setCounterPrice(selectedOffer.currentOfferPrice + 20);
                      setIsCounterModalOpen(true);
                    }}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t('Send Counter Offer', 'काउंटर ऑफर भेजें')}</span>
                  </button>

                  <button
                    onClick={() => acceptOffer(selectedOffer.id)}
                    className="py-2.5 px-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FACC15]" />
                    <span>{t('ACCEPT DEAL (₹' + selectedOffer.currentOfferPrice + '/q)', 'सौदा पक्का करें')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 bg-white rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center text-gray-500">
            <Handshake className="w-12 h-12 text-gray-300 mb-2" />
            <p className="text-sm font-bold">Select a buyer bid to open live bargaining</p>
          </div>
        )}
      </div>

      {/* COUNTER OFFER MODAL */}
      {isCounterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <h3 className="font-heading font-extrabold text-lg text-gray-900 mb-1">
              {t('Send Counter Offer to', 'काउंटर ऑफर भेजें:')} {selectedOffer?.buyerName}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Lot: {selectedOffer?.cropName} • Current Bid: ₹{selectedOffer?.currentOfferPrice}/q
            </p>

            <form onSubmit={handleSendCounter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t('Your Counter Price (₹ per Quintal)', 'आपकी प्रति क्विंटल दर (₹)')}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 font-bold text-gray-500">₹</span>
                  <input
                    type="number"
                    value={counterPrice}
                    onChange={(e) => setCounterPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-base font-extrabold text-[#14532D]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t('Message to Buyer (Optional note on AI Grade/Moisture)', 'संदेश (गुणवत्ता/नमी संबंधी टिप्पणी)')}
                </label>
                <textarea
                  value={counterMessage}
                  onChange={(e) => setCounterMessage(e.target.value)}
                  placeholder="e.g. Grain moisture is 11.4% with zero weeds. We can seal at ₹2,450/q."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium h-20"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCounterModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                >
                  {t('Cancel', 'रद्द करें')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow"
                >
                  {t('Submit Counter Offer', 'ऑफर प्रेषित करें')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
