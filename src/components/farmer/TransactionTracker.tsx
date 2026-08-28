import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Building2,
  FileText,
  AlertOctagon,
  Download,
  ArrowRight,
  Sparkles,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const TransactionTracker: React.FC = () => {
  const { transactions, advanceTransactionStage, t } = useApp();
  const [selectedTxnId, setSelectedTxnId] = useState<string>(transactions[0]?.id || 'KC-TXN-00124');
  const [disputeNote, setDisputeNote] = useState('');
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);

  const txn = transactions.find((tr) => tr.id === selectedTxnId) || transactions[0];

  const stagesList = [
    { num: 1, title: t('Deal Accepted', 'सौदा स्वीकृत'), desc: t('Mutual digital signature recorded', 'डिजिटल अनुबंध हस्ताक्षरित') },
    { num: 2, title: t('Payment Secured', 'भुगतान एस्क्रो में सुरक्षित'), desc: t('100% funds held in bank escrow', 'राशि सुरक्षित एस्क्रो में जमा') },
    { num: 3, title: t('Logistics & Pickup', 'परिवहन व उठान'), desc: t('GPS Mini Truck dispatched to farm', 'वाहन खेत के लिए रवाना') },
    { num: 4, title: t('Dock Weighment', 'वजन व गुणवत्ता जांच'), desc: t('Weighbridge slip & laboratory check', 'कांटा पर्ची व लैब मिलान') },
    { num: 5, title: t('Payment Released', 'खाते में राशि अंतरित'), desc: t('Instant NEFT/UPI settlement', 'सीधे बैंक खाते में भुगतान') }
  ];

  const handleDownloadInvoice = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `==================================================\n` +
      `KISANCONNECT DIGITAL SETTLEMENT & ESCROW INVOICE\n` +
      `Transaction ID: ${txn.id}\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Buyer: ${txn.buyerName}\n` +
      `Farmer: Ramesh Kumar (Karnal, HR)\n` +
      `Crop: ${txn.cropName} (${txn.quantityKg} KG)\n` +
      `Agreed Rate: ₹${txn.agreedPricePerQuintal}/quintal\n` +
      `--------------------------------------------------\n` +
      `Gross Amount: ₹${txn.grossAmount.toLocaleString('en-IN')}\n` +
      `Transport Deductions: ₹${txn.transportFee}\n` +
      `Platform Fee (0% Promotional): ₹${txn.platformFee}\n` +
      `Net Settlement Amount: ₹${txn.netAmountToFarmer.toLocaleString('en-IN')}\n` +
      `Bank Account: HDFC Bank A/c ending in **8921\n` +
      `Status: ESCROW_SECURED_VERIFIED\n` +
      `==================================================\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Invoice-${txn.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('Escrow Transaction & Settlement Tracking', 'एस्क्रो सौदा व भुगतान ट्रैकिंग')}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
              Escrow Secured
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t(
              'Guaranteed payout lifecycle. Funds locked safely before truck dispatch.',
              '100% सुरक्षित भुगतान चक्र। वाहन उठान से पूर्व खरीदार की पूरी राशि बैंक एस्क्रो में जमा।'
            )}
          </p>
        </div>

        {/* Transaction Selector Dropdown if multiple */}
        {transactions.length > 1 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500">Lot:</span>
            <select
              value={selectedTxnId}
              onChange={(e) => setSelectedTxnId(e.target.value)}
              className="p-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 shadow-xs"
            >
              {transactions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} ({t.cropName})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Tracker Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        {/* Deal Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-extrabold text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                {txn.id}
              </span>
              <span className="text-xs text-gray-500 font-medium">Created on {txn.createdAt}</span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-gray-900 mt-1">
              {txn.cropName} • {txn.quantityKg} KG
            </h2>
            <p className="text-xs text-emerald-900 font-bold mt-0.5">
              Buyer: <span className="underline">{txn.buyerName}</span> (Agreed Rate: ₹{txn.agreedPricePerQuintal}/q)
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-emerald-200 sm:pl-6">
            <span className="text-xs text-gray-500 block">{t('Net Payout to Farmer', 'किसान को शुद्ध देय राशि')}</span>
            <span className="font-heading text-3xl font-extrabold text-[#14532D]">
              ₹{txn.netAmountToFarmer.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
              Bank A/c Ending **8921
            </span>
          </div>
        </div>

        {/* 5-STAGE INTERACTIVE VISUAL STEPPER */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-sm text-gray-900 uppercase tracking-wider">
              {t('5-Stage Verified Transaction Lifecycle', '5-चरणीय सत्यापन प्रगति')}
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Current: Stage {txn.currentStage} of 5
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {stagesList.map((st) => {
              const isPassed = st.num < txn.currentStage;
              const isCurrent = st.num === txn.currentStage;
              const isFuture = st.num > txn.currentStage;

              return (
                <div
                  key={st.num}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isPassed
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-xs'
                      : isCurrent
                      ? 'border-amber-400 bg-amber-50/80 ring-2 ring-amber-400 shadow-md'
                      : 'border-gray-200 bg-gray-50/60 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold">0{st.num}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                      ) : (
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                      )}
                    </div>

                    <h4 className="font-heading font-extrabold text-sm text-gray-900 leading-tight">
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-snug">{st.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-black/5 text-[10px] font-bold">
                    {isPassed && <span className="text-emerald-800">✓ Completed</span>}
                    {isCurrent && <span className="text-amber-800 animate-pulse">● Active Stage</span>}
                    {isFuture && <span className="text-gray-400">Upcoming</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Escrow Details & Settlement Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          {/* Escrow Details */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-gray-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{t('Escrow Account Settlement Sheet', 'एस्क्रो खाता विवरण')}</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Gross Produce Value ({txn.quantityKg} KG @ ₹{txn.agreedPricePerQuintal}/q)</span>
                <span className="font-bold text-gray-900">₹{txn.grossAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Integrated Logistics / Transport Freight</span>
                <span>− ₹{txn.transportFee}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Platform Commission (Promotional Waiver)</span>
                <span>₹0</span>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between text-sm font-extrabold text-[#14532D]">
                <span>Total Net Release to Farmer:</span>
                <span>₹{txn.netAmountToFarmer.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 pt-1">
              🔒 <strong>Escrow Trust Guarantee:</strong> Buyer cannot cancel or reverse funds once produce passes dock weighbridge. Automatic IMPS payout within 2 hours.
            </p>
          </div>

          {/* Action Tools & Stage Advancer (Simulated Demo Engine) */}
          <div className="p-5 rounded-2xl bg-emerald-950 text-white flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                TRANSACTION TOOLS
              </span>
              <p className="text-xs text-emerald-100/90 mt-1">
                Download legal agreement copy or simulate progress stages.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleDownloadInvoice}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-[#FACC15]" />
                <span>{t('Download Formal Invoice', 'चालान डाउनलोड करें')}</span>
              </button>

              <button
                onClick={() => setIsDisputeOpen(true)}
                className="w-full py-2.5 bg-rose-900/60 hover:bg-rose-900 text-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>{t('Raise Quality Dispute / Help', 'विवाद / सहायता दर्ज करें')}</span>
              </button>

              {/* Dev/Demo Step Advancer */}
              {txn.currentStage < 5 && (
                <button
                  onClick={() => advanceTransactionStage(txn.id)}
                  className="w-full py-2 bg-[#EAB308] hover:bg-[#FACC15] text-[#14532D] font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <span>Simulate Next Stage →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DISPUTE MODAL */}
      {isDisputeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <h3 className="font-heading font-extrabold text-lg text-gray-900 mb-1">
              {t('Raise Support Ticket or Weight Dispute', 'विवाद या सहायता अनुरोध दर्ज करें')}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Lot: {txn.id} • Dedicated Agronomist Arbitrator: Assigned in 15 mins
            </p>

            {disputeSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-extrabold text-emerald-950">
                  Ticket #DISP-8921 Logged. Escrow release paused pending joint re-weighing.
                </p>
                <button
                  onClick={() => {
                    setIsDisputeOpen(false);
                    setDisputeSuccess(false);
                  }}
                  className="px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDisputeSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dispute Reason</label>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold">
                    <option>Weighbridge dock variance (&gt; 2%)</option>
                    <option>Logistics truck driver delay (&gt; 4 hours)</option>
                    <option>Unjustified quality moisture deduction claim</option>
                    <option>Other grievance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Provide Details & Description</label>
                  <textarea
                    value={disputeNote}
                    onChange={(e) => setDisputeNote(e.target.value)}
                    required
                    placeholder="Describe specific issue with weighbridge or laboratory inspection..."
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs h-24"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDisputeOpen(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow"
                  >
                    Submit Dispute Notice
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
