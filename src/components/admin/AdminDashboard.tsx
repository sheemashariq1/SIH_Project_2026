import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Server,
  Database,
  Building2,
  Lock,
  RefreshCw,
  Search,
  Eye,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { listings, transactions, t } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'kyc' | 'ai-health' | 'escrow-bank' | 'disputes'>('overview');
  const [kycApprovals, setKycApprovals] = useState([
    { id: 'KYC-881', name: 'Sukhwinder Singh', role: 'Farmer', location: 'Ambala, HR', doc: 'Aadhaar + Land Patta', status: 'Pending' },
    { id: 'KYC-882', name: 'Kisan Agro Processors', role: 'Corporate Buyer', location: 'Panipat, HR', doc: 'GST + FSSAI License', status: 'Pending' },
    { id: 'KYC-883', name: 'Davinder Gill', role: 'Farmer', location: 'Kurukshetra, HR', doc: 'Kisan Credit Card', status: 'Verified' }
  ]);

  const handleApproveKyc = (id: string) => {
    setKycApprovals((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'Verified' } : k))
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-16">
      {/* Admin Top Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308] text-[#14532D] flex items-center justify-center font-extrabold shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading text-lg font-extrabold text-white">KisanConnect Platform Control</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  SYSTEM LEVEL 1
                </span>
              </div>
              <span className="text-[11px] text-gray-400">Escrow Banking Node & Computer Vision Arbitrator</span>
            </div>
          </div>

          {/* Admin Navigation Pills */}
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setAdminTab('overview')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                adminTab === 'overview' ? 'bg-[#14532D] text-[#FACC15] font-extrabold' : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 System Stats
            </button>
            <button
              onClick={() => setAdminTab('kyc')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                adminTab === 'kyc' ? 'bg-[#14532D] text-[#FACC15] font-extrabold' : 'text-gray-400 hover:text-white'
              }`}
            >
              🪪 KYC Verifications
            </button>
            <button
              onClick={() => setAdminTab('ai-health')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                adminTab === 'ai-health' ? 'bg-[#14532D] text-[#FACC15] font-extrabold' : 'text-gray-400 hover:text-white'
              }`}
            >
              🤖 AI Telemetry
            </button>
            <button
              onClick={() => setAdminTab('escrow-bank')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                adminTab === 'escrow-bank' ? 'bg-[#14532D] text-[#FACC15] font-extrabold' : 'text-gray-400 hover:text-white'
              }`}
            >
              🏦 Escrow Ledger
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">Total Farmers</span>
            <div className="font-heading text-2xl font-extrabold text-white mt-1">4,820</div>
            <span className="text-[10px] text-emerald-400 font-bold">↑ 124 this week</span>
          </div>

          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">Verified Mills</span>
            <div className="font-heading text-2xl font-extrabold text-white mt-1">340</div>
            <span className="text-[10px] text-emerald-400 font-bold">100% GST Validated</span>
          </div>

          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">Harvest Volume</span>
            <div className="font-heading text-2xl font-extrabold text-white mt-1">18,400 Qtl</div>
            <span className="text-[10px] text-gray-400">Across 6 States</span>
          </div>

          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">Escrow Volume</span>
            <div className="font-heading text-2xl font-extrabold text-[#FACC15] mt-1">₹4.82 Cr</div>
            <span className="text-[10px] text-emerald-400 font-bold">Zero defaults</span>
          </div>

          <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">AI Grading Accuracy</span>
            <div className="font-heading text-2xl font-extrabold text-emerald-400 mt-1">94.2%</div>
            <span className="text-[10px] text-gray-400">&lt; 1.2s Latency</span>
          </div>
        </div>

        {/* 1. SYSTEM OVERVIEW & RECENT TRANSACTIONS */}
        {adminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <h3 className="font-heading font-extrabold text-base text-white">
                  Live Market Transactions (Escrow Stream)
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>

              <div className="space-y-3">
                {transactions.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-4 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[#FACC15] font-bold">{tr.id}</span>
                        <span className="text-gray-400">{tr.cropName} ({tr.quantityKg} KG)</span>
                      </div>
                      <p className="text-gray-400 mt-1">
                        Buyer: <span className="text-gray-200 font-bold">{tr.buyerName}</span> → Farmer: Ramesh Kumar
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-extrabold text-sm text-emerald-400">
                        ₹{tr.grossAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-gray-500 block">Stage {tr.currentStage}/5 Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingestion & Telemetry Feeds */}
            <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-white">
                Data Pipeline Health
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-200 block">AGMARKNET Price API</span>
                    <span className="text-[10px] text-gray-500">Hourly sync • 2,400 Mandis</span>
                  </div>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>

                <div className="p-3 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-200 block">IMD Hyperlocal Weather</span>
                    <span className="text-[10px] text-gray-500">Radar doppler stream active</span>
                  </div>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>

                <div className="p-3 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-200 block">HDFC Escrow Webhook Node</span>
                    <span className="text-[10px] text-gray-500">256-bit encrypted channel</span>
                  </div>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. KYC VERIFICATION DESK */}
        {adminTab === 'kyc' && (
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-heading font-extrabold text-lg text-white">
              Farmer & Mill Buyer Verification Queue
            </h3>

            <div className="space-y-3">
              {kycApprovals.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-gray-950 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-gray-400 font-bold">{item.id}</span>
                      <span className="font-bold text-white text-sm">{item.name}</span>
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-gray-400 mt-1">
                      📍 {item.location} • Submitted: <span className="text-emerald-400">{item.doc}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    {item.status === 'Pending' ? (
                      <button
                        onClick={() => handleApproveKyc(item.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
                      >
                        Approve & Verify KYC
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-xl">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. AI TELEMETRY */}
        {adminTab === 'ai-health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs font-bold">MODEL VERSION</span>
              <div className="font-mono text-xl font-bold text-emerald-400">AgriVision-v3.8-Ultra</div>
              <p className="text-xs text-gray-400">Trained on 450,000+ Indian grain and horticultural samples.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs font-bold">INFERENCE SPEED</span>
              <div className="font-mono text-xl font-bold text-white">1.18 Seconds</div>
              <p className="text-xs text-gray-400">P99 edge cloud latency benchmark.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs font-bold">FALSE POSITIVE RATE</span>
              <div className="font-mono text-xl font-bold text-emerald-400">0.8%</div>
              <p className="text-xs text-gray-400">Verified against official APMC laboratory test results.</p>
            </div>
          </div>
        )}

        {/* 4. ESCROW LEDGER */}
        {adminTab === 'escrow-bank' && (
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="font-heading font-extrabold text-base text-white">
                  Tri-Party Escrow Bank Ledger
                </h3>
                <p className="text-xs text-gray-400">Master escrow pooling account with automatic IMPS smart contracts</p>
              </div>
              <span className="font-mono text-sm font-extrabold text-[#FACC15]">
                Active Pool: ₹4,82,40,000
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Every crop transaction automatically locks funds upon buyer deal acceptance. No farmer can suffer non-payment or delayed cheques after handing over their produce.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
