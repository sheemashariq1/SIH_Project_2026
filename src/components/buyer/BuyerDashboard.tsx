import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Handshake,
  CheckCircle2,
  DollarSign,
  Truck,
  MapPin,
  Star,
  Send,
  Building2,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, Offer } from '../../types';

export const BuyerDashboard: React.FC = () => {
  const {
    listings,
    offers,
    transactions,
    createBuyerOffer,
    sendCounterOffer,
    advanceTransactionStage,
    homeSignal,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState<'browse' | 'bids' | 'deals' | 'escrow'>('browse');

  // Reset to the default tab whenever the Navbar's "Back" button is pressed.
  useEffect(() => {
    setActiveTab('browse');
  }, [homeSignal]);

  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');
  const [selectedListingForBid, setSelectedListingForBid] = useState<Listing | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(2420);
  const [bidNote, setBidNote] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);

  // Negotiation chat state inside Buyer portal
  const [selectedNegotiationId, setSelectedNegotiationId] = useState<string>(offers[0]?.id || '');
  const [buyerMsg, setBuyerMsg] = useState('');
  const [buyerCounterRate, setBuyerCounterRate] = useState<number>(2430);

  const activeNegotiation = offers.find((o) => o.id === selectedNegotiationId) || offers[0];

  const filteredListings = listings.filter((l) => {
    const matchCrop = selectedCropFilter === 'All' || l.cropId.toLowerCase() === selectedCropFilter.toLowerCase();
    const matchGrade = selectedGradeFilter === 'All' || l.grade === selectedGradeFilter;
    return matchCrop && matchGrade;
  });

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForBid) return;

    createBuyerOffer(selectedListingForBid.id, bidPrice, bidNote);

    setBidSuccess(true);
    setTimeout(() => {
      setBidSuccess(false);
      setSelectedListingForBid(null);
      setActiveTab('bids');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FBF8] text-gray-900 pb-16">
      {/* Buyer Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#14532D] text-[#FACC15] flex items-center justify-center font-extrabold shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading text-lg font-extrabold text-gray-900">ABC Food Processors</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[11px] text-gray-500">Verified Industrial Mill Buyer • GSTIN: 06AAACA1234F1Z5</span>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'browse' ? 'bg-[#14532D] text-[#FACC15] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🌾 {t('Browse Farm Lots', 'फसल खोजें')}
            </button>
            <button
              onClick={() => setActiveTab('bids')}
              className={`px-3.5 py-1.5 rounded-xl transition-all relative ${
                activeTab === 'bids' ? 'bg-[#14532D] text-[#FACC15] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💬 {t('Bids & Negotiations', 'बोलियां व मोल-भाव')}
              <span className="ml-1 bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[10px]">
                {offers.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'escrow' ? 'bg-[#14532D] text-[#FACC15] shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔒 {t('Escrow & Payouts', 'एस्क्रो व भुगतान')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Buyer Key Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-500 block">{t('ACTIVE FARM LOTS', 'सक्रिय फसल लॉट')}</span>
            <div className="mt-2 font-heading text-3xl font-extrabold text-gray-900">{listings.length}</div>
            <p className="text-[11px] text-emerald-700 font-bold mt-1">100% AI Quality Graded</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-500 block">{t('ACTIVE NEGOTIATIONS', 'चल रही बोलियां')}</span>
            <div className="mt-2 font-heading text-3xl font-extrabold text-amber-700">{offers.length}</div>
            <p className="text-[11px] text-gray-500 mt-1">Direct farmer channels</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-emerald-500/50 bg-emerald-50/20 shadow-xs">
            <span className="text-xs font-bold text-emerald-950 block">{t('ESCROW LOCKED FUNDS', 'एस्क्रो में जमा राशि')}</span>
            <div className="mt-2 font-heading text-3xl font-extrabold text-[#14532D]">₹12,150</div>
            <p className="text-[11px] text-emerald-800 font-bold mt-1">Protected in HDFC Escrow</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-500 block">{t('COMPLETED PROCUREMENT', 'कुल खरीद')}</span>
            <div className="mt-2 font-heading text-3xl font-extrabold text-gray-900">42.5 <span className="text-xs text-gray-500 font-normal">T</span></div>
            <p className="text-[11px] text-emerald-700 font-bold mt-1">Direct from 18 Farmers</p>
          </div>
        </div>

        {/* 1. BROWSE FARM LISTINGS VIEW */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-700">Filter Crop:</span>
                {['All', 'Wheat', 'Potato', 'Tomato'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCropFilter(c)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      selectedCropFilter === c
                        ? 'bg-[#14532D] text-[#FACC15]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-700">AI Grade:</span>
                {['All', 'Grade A', 'Grade B'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGradeFilter(g)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      selectedGradeFilter === g
                        ? 'bg-[#14532D] text-[#FACC15]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-0.5 rounded-full border border-emerald-300">
                        {item.grade} • AI Score {item.aiQuality.qualityScore}/100
                      </span>
                      <span className="text-xs font-mono text-gray-400">{item.id}</span>
                    </div>

                    <h3 className="font-heading text-xl font-extrabold text-gray-900">
                      {item.cropName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.farmerLocation}</span>
                    </p>

                    {/* Farmer Profile */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-2xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900 block">{item.farmerName}</span>
                        <span className="text-[10px] text-gray-500">Verified Seller (3+ Years)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.farmerRating}</span>
                      </div>
                    </div>

                    {/* AI Lab Breakdown */}
                    <div className="mt-3 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs space-y-1">
                      <div className="flex justify-between text-emerald-950">
                        <span>Grain Moisture:</span>
                        <span className="font-bold">{item.aiQuality.moistureContent}</span>
                      </div>
                      <div className="flex justify-between text-emerald-950">
                        <span>Visible Damage:</span>
                        <span className="font-bold">{item.aiQuality.visibleDamagePercent}%</span>
                      </div>
                      <div className="flex justify-between text-emerald-950">
                        <span>AI Confidence:</span>
                        <span className="font-bold">{item.aiQuality.confidence}%</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-gray-500 block">Quantity</span>
                        <span className="font-heading text-lg font-bold text-gray-900">
                          {item.quantityKg} KG
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Farmer Ask Price</span>
                        <span className="font-heading text-xl font-extrabold text-[#14532D]">
                          ₹{item.expectedPricePerQuintal}/q
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedListingForBid(item);
                        setBidPrice(item.expectedPricePerQuintal - 20);
                      }}
                      className="w-full py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center space-x-1.5"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{t('Place Procurement Bid', 'बोली लगाएं')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. BIDS & DIRECT NEGOTIATION CHAT */}
        {activeTab === 'bids' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left list of bids */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-sm text-gray-900">
                {t('Ongoing Direct Farmer Negotiations', 'सक्रिय मोल-भाव')}
              </h3>

              <div className="space-y-2.5">
                {offers.map((off) => {
                  const isSel = off.id === activeNegotiation?.id;

                  return (
                    <div
                      key={off.id}
                      onClick={() => setSelectedNegotiationId(off.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSel
                          ? 'border-[#14532D] bg-emerald-50/80 ring-2 ring-emerald-600/20'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-gray-900">{off.cropName} ({off.quantityKg} KG)</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          {off.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Lot ID: {off.listingId}</p>

                      <div className="mt-3 flex justify-between items-baseline pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Current Offer:</span>
                        <span className="font-heading font-extrabold text-[#14532D] text-base">
                          ₹{off.currentOfferPrice}/q
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Chat UI */}
            {activeNegotiation && (
              <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-[#14532D] to-[#1E6B3C] text-white flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-white">
                      Negotiation: {activeNegotiation.cropName} ({activeNegotiation.quantityKg} KG)
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Farmer: Ramesh Kumar (Karnal) • AI Grade A Certified (Score 87)
                    </p>
                  </div>
                  <span className="text-xs bg-[#EAB308] text-[#14532D] font-extrabold px-3 py-1 rounded-full">
                    Standing: ₹{activeNegotiation.currentOfferPrice}/q
                  </span>
                </div>

                <div className="p-6 space-y-4 max-h-96 overflow-y-auto bg-[#F8FBF8]/60 flex-1">
                  {activeNegotiation.history.map((msg) => {
                    const isBuyer = msg.sender === 'buyer';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-bold text-gray-600">
                          <span>{msg.senderName}</span>
                          <span className="text-gray-400 font-mono text-[10px]">({msg.timestamp})</span>
                        </div>

                        <div
                          className={`max-w-md p-4 rounded-2xl text-xs shadow-xs space-y-1.5 ${
                            isBuyer
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
                </div>

                {/* Buyer Message Input Bar */}
                <div className="p-4 bg-white border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-700">Counter Price (₹/q):</span>
                    <input
                      type="number"
                      value={buyerCounterRate}
                      onChange={(e) => setBuyerCounterRate(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#14532D]"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={buyerMsg}
                      onChange={(e) => setBuyerMsg(e.target.value)}
                      placeholder="e.g. ₹2,430/q is our final offer with automated truck dispatch..."
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />

                    <button
                      onClick={() => {
                        if (!buyerMsg) return;
                        sendCounterOffer(activeNegotiation.id, buyerCounterRate, buyerMsg);
                        setBuyerMsg('');
                      }}
                      className="px-5 py-2.5 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow flex items-center space-x-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. ESCROW & SETTLEMENT MANAGEMENT VIEW */}
        {activeTab === 'escrow' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-gray-900">
                    {t('Corporate Buyer Escrow Control Center', 'खरीदार एस्क्रो नियंत्रण कक्ष')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Deposit advance funds into tri-party bank escrow to lock premium farmer harvest lots.
                  </p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-full">
                  HDFC Integrated Node
                </span>
              </div>

              <div className="space-y-3">
                {transactions.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-5 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border">
                          {tr.id}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Stage {tr.currentStage + 1} of {tr.stages.length}</span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-gray-900 mt-1">
                        {tr.cropName} • {tr.quantityKg} KG (Farmer: {tr.farmerName})
                      </h4>
                      <p className="text-xs text-emerald-800 font-bold mt-0.5">
                        Agreed Rate: ₹{tr.finalPricePerQuintal}/quintal • Escrow Balance: ₹{tr.grossValue.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 self-end md:self-auto">
                      {tr.currentStage < tr.stages.length - 1 ? (
                        <button
                          onClick={() => advanceTransactionStage(tr.id)}
                          className="px-4 py-2 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow-xs"
                        >
                          Approve Dock Weighment & Advance Stage →
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                          ✓ Settled & Released to Farmer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PLACE BID MODAL */}
      {selectedListingForBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {selectedListingForBid.grade} • AI Quality {selectedListingForBid.aiQuality.qualityScore}/100
                </span>
                <h3 className="font-heading font-extrabold text-xl text-gray-900 mt-1">
                  Place Bid on {selectedListingForBid.cropName}
                </h3>
                <p className="text-xs text-gray-500">
                  Seller: {selectedListingForBid.farmerName} (📍 {selectedListingForBid.farmerLocation})
                </p>
              </div>
              <button
                onClick={() => setSelectedListingForBid(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {bidSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-extrabold text-base text-emerald-950">
                  Bid Submitted to {selectedListingForBid.farmerName}!
                </h4>
                <p className="text-xs text-emerald-800">
                  Redirecting to live bargaining channel...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceBid} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3.5 rounded-2xl">
                  <div>
                    <span className="text-gray-500 block">Lot Quantity:</span>
                    <span className="font-bold text-gray-900">{selectedListingForBid.quantityKg} KG ({(selectedListingForBid.quantityKg / 100).toFixed(1)} Qtl)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Farmer Ask:</span>
                    <span className="font-bold text-[#14532D]">₹{selectedListingForBid.expectedPricePerQuintal}/quintal</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Bid Price (₹ per Quintal)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 font-bold text-gray-500">₹</span>
                    <input
                      type="number"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-base font-extrabold text-[#14532D]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Message / Logistics Terms to Farmer
                  </label>
                  <textarea
                    value={bidNote}
                    onChange={(e) => setBidNote(e.target.value)}
                    placeholder="We offer ₹2,420/q with immediate Mini Truck pickup from Village Taraori. Zero weighment cuts."
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs h-20"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedListingForBid(null)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-xs rounded-xl shadow-lg"
                  >
                    Submit Bid & Open Negotiation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
