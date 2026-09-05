import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Role,
  Language,
  Listing,
  Offer,
  Transaction,
  WeatherData,
  MandiComparison,
  StorageFacility,
  TransportOption,
  BuyerRequirement,
  DisputeItem,
  NotificationItem,
  AIQualityAssessment,
  CropDefinition
} from '../types';
import {
  CROPS_DATA,
  INITIAL_WEATHER_DATA,
  INITIAL_MANDIS,
  STORAGE_FACILITIES,
  TRANSPORT_FLEET,
  INITIAL_LISTINGS,
  INITIAL_OFFERS,
  INITIAL_TRANSACTIONS,
  BUYER_REQUIREMENTS,
  INITIAL_DISPUTES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export type FarmerTab =
  | 'home'
  | 'crops'
  | 'ai'
  | 'market'
  | 'weather'
  | 'pred'
  | 'sell'
  | 'offers'
  | 'log'
  | 'txn'
  | 'notifications'
  | 'profile';

export type BuyerTab =
  | 'dashboard'
  | 'find'
  | 'market'
  | 'requirements'
  | 'offers'
  | 'purchases'
  | 'logistics'
  | 'payments'
  | 'profile';

export type AdminTab =
  | 'overview'
  | 'farmers'
  | 'buyers'
  | 'listings'
  | 'markets'
  | 'ai'
  | 'weather'
  | 'transactions'
  | 'disputes';

export interface SellWizardState {
  step: number; // 1: Crop, 2: Harvest Details, 3: AI Scan, 4: Weather & Market, 5: Predictions & Sell/Store, 6: Price Discovery, 7: Logistics, 8: Summary & Publish
  crop: CropDefinition | null;
  variety: string;
  quantityKg: number;
  unit: 'KG' | 'SACKS';
  harvestDate: string;
  location: string;
  pincode: string;
  hasStorage: boolean;
  hasTransport: boolean;
  imagePreview: string | null;
  aiAssessment: AIQualityAssessment | null;
  isScanning: boolean;
  scanStepIndex: number;
  expectedPrice: number;
  selectedTransportId: string;
  selectedStorageId: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (en: string, hi: string) => string;

  // Farmer state
  farmerTab: FarmerTab;
  setFarmerTab: (tab: FarmerTab) => void;
  listings: Listing[];
  activeListing: Listing | null;
  setActiveListing: (listing: Listing | null) => void;
  offers: Offer[];
  activeOffer: Offer | null;
  setActiveOffer: (offer: Offer | null) => void;
  transactions: Transaction[];
  activeTransaction: Transaction | null;
  setActiveTransaction: (txn: Transaction | null) => void;

  // Buyer state
  buyerTab: BuyerTab;
  setBuyerTab: (tab: BuyerTab) => void;
  buyerRequirements: BuyerRequirement[];

  // Admin state
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  disputes: DisputeItem[];

  // Shared state
  weather: WeatherData;
  mandis: MandiComparison[];
  storageFacilities: StorageFacility[];
  transportFleet: TransportOption[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  // Wizard state
  sellWizard: SellWizardState;
  setSellWizard: React.Dispatch<React.SetStateAction<SellWizardState>>;
  resetSellWizard: () => void;
  startSellWithCrop: (cropId: string) => void;
  runAIScanForWizard: (sampleCropId?: string) => Promise<void>;
  publishCurrentWizardListing: () => void;

  // Actions
  sendCounterOffer: (offerId: string, price: number, message: string) => void;
  acceptOffer: (offerId: string) => void;
  rejectOffer: (offerId: string) => void;
  advanceTransactionStage: (txnId: string) => void;
  addBuyerRequirement: (req: Omit<BuyerRequirement, 'id' | 'status' | 'matchedListingsCount'>) => void;
  createBuyerOffer: (listingId: string, pricePerQuintal: number, message: string) => void;
  verifyUser: (userId: string, userRole: 'farmer' | 'buyer', approved: boolean) => void;
  updateDisputeStatus: (disputeId: string, status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED', notes?: string) => void;

  // Auth modal
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authRole: 'farmer' | 'buyer' | 'admin';
  setAuthRole: (role: 'farmer' | 'buyer' | 'admin') => void;
  currentUser: {
    name: string;
    phone: string;
    email: string;
    location: string;
    verified: boolean;
    fpoName?: string;
    avatar?: string;
    provider?: 'google' | 'phone' | 'demo';
  };
  loginAs: (role: 'farmer' | 'buyer' | 'admin') => void;
  loginWithGoogle: (userInfo: { name: string; email: string; avatar?: string; role?: 'farmer' | 'buyer' | 'admin' }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_WIZARD_STATE: SellWizardState = {
  step: 1,
  crop: CROPS_DATA.find((c) => c.id === 'wheat') || CROPS_DATA[0],
  variety: 'HD 2967 (Karnal Gold)',
  quantityKg: 500,
  unit: 'KG',
  harvestDate: '2026-08-27',
  location: 'Village Taraori, Karnal, Haryana',
  pincode: '132001',
  hasStorage: false,
  hasTransport: false,
  imagePreview: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
  aiAssessment: null,
  isScanning: false,
  scanStepIndex: 0,
  expectedPrice: 2450,
  selectedTransportId: 'trans-mini',
  selectedStorageId: 'store-greenstore'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('landing');
  const [language, setLanguage] = useState<Language>('en');

  // Navigation tabs
  const [farmerTab, setFarmerTab] = useState<FarmerTab>('home');
  const [buyerTab, setBuyerTab] = useState<BuyerTab>('dashboard');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Datasets in State
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [activeListing, setActiveListing] = useState<Listing | null>(INITIAL_LISTINGS[0]);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(INITIAL_OFFERS[0]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(INITIAL_TRANSACTIONS[0]);
  const [buyerRequirements, setBuyerRequirements] = useState<BuyerRequirement[]>(BUYER_REQUIREMENTS);
  const [disputes, setDisputes] = useState<DisputeItem[]>(INITIAL_DISPUTES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [weather] = useState<WeatherData>(INITIAL_WEATHER_DATA);
  const [mandis] = useState<MandiComparison[]>(INITIAL_MANDIS);
  const [storageFacilities] = useState<StorageFacility[]>(STORAGE_FACILITIES);
  const [transportFleet] = useState<TransportOption[]>(TRANSPORT_FLEET);

  // Wizard
  const [sellWizard, setSellWizard] = useState<SellWizardState>(INITIAL_WIZARD_STATE);

  // Auth
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'farmer' | 'buyer' | 'admin'>('farmer');
  const [currentUser, setCurrentUser] = useState({
    name: 'Rameshwar Singh',
    phone: '+91 98123 45678',
    email: 'rameshwar.karnal@agrimail.in',
    location: 'Village Taraori, Karnal, Haryana (132001)',
    verified: true,
    fpoName: 'Karnal Progressive Farmer Producer Company',
    avatar: '',
    provider: 'demo' as 'google' | 'phone' | 'demo'
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (en: string, hi: string) => {
    return language === 'hi' ? hi : en;
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const resetSellWizard = () => {
    setSellWizard(INITIAL_WIZARD_STATE);
  };

  const startSellWithCrop = (cropId: string) => {
    const selected = CROPS_DATA.find((c) => c.id === cropId) || CROPS_DATA[0];
    setSellWizard((prev) => ({
      ...prev,
      crop: selected,
      variety: selected.varieties[0] || 'Standard Variety',
      expectedPrice: selected.mandiAvgPrice + 30,
      step: 2
    }));
    setFarmerTab('sell');
  };

  const runAIScanForWizard = async (sampleCropId?: string) => {
    const targetCrop = sampleCropId
      ? CROPS_DATA.find((c) => c.id === sampleCropId) || sellWizard.crop
      : sellWizard.crop;

    setSellWizard((prev) => ({
      ...prev,
      isScanning: true,
      scanStepIndex: 0
    }));

    // Simulated multi-stage scan delays
    for (let i = 1; i <= 6; i++) {
      await new Promise((res) => setTimeout(res, 450));
      setSellWizard((prev) => ({
        ...prev,
        scanStepIndex: i
      }));
    }

    // High quality assessment synthesis
    const mockAssessment: AIQualityAssessment = {
      cropId: targetCrop?.id || 'wheat',
      cropName: targetCrop?.name || 'Wheat',
      qualityScore: 87,
      recommendedGrade: 'Grade A',
      confidence: 91,
      visibleDamagePercent: 8,
      spoilageIndicator: 'Low',
      moistureContent: '11.4%',
      lusterScore: 'High / Golden Sheen',
      indicators: {
        positive: [
          'Uniform grain size, weight and natural golden luster',
          'Moisture level strictly under optimal 12% storage threshold',
          'Negligible foreign matter / chaff (< 1.1%)'
        ],
        warnings: [
          'Minor 8% surface abrasion during mechanical threshing'
        ]
      },
      recommendationText: 'Suitable for premium commercial procurement with maximum price realization and zero mandi broker cut.',
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSellWizard((prev) => ({
      ...prev,
      isScanning: false,
      aiAssessment: mockAssessment
    }));
  };

  const publishCurrentWizardListing = () => {
    const newId = `KC-${(sellWizard.crop?.name.slice(0, 3) || 'CRP').toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newListing: Listing = {
      id: newId,
      farmerId: 'farmer-01',
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmerLocation: sellWizard.location,
      cropId: sellWizard.crop?.id || 'wheat',
      cropName: `${sellWizard.crop?.name || 'Wheat'} (${sellWizard.variety})`,
      category: sellWizard.crop?.category || 'crops',
      variety: sellWizard.variety,
      quantityKg: sellWizard.quantityKg,
      quantityDisplay: `${sellWizard.quantityKg} KG (${(sellWizard.quantityKg / 100).toFixed(1)} Quintals)`,
      grade: sellWizard.aiAssessment?.recommendedGrade || 'Grade A',
      aiQuality: sellWizard.aiAssessment || {
        cropId: sellWizard.crop?.id || 'wheat',
        cropName: sellWizard.crop?.name || 'Wheat',
        qualityScore: 87,
        recommendedGrade: 'Grade A',
        confidence: 91,
        visibleDamagePercent: 8,
        spoilageIndicator: 'Low',
        moistureContent: '11.4%',
        lusterScore: 'High Golden',
        indicators: {
          positive: ['Uniform grain shape & color'],
          warnings: ['Minor 8% threshing abrasion']
        },
        recommendationText: 'Suitable for premium market listing.',
        analyzedAt: 'Just now'
      },
      expectedPricePerQuintal: sellWizard.expectedPrice,
      estimatedNetRealization: Math.round((sellWizard.quantityKg / 100) * sellWizard.expectedPrice - 350),
      status: 'active',
      createdAt: 'Just now',
      harvestDate: sellWizard.harvestDate,
      matchedBuyersCount: 4
    };

    setListings((prev) => [newListing, ...prev]);
    setActiveListing(newListing);

    // Also auto-generate an incoming mock offer from ABC Foods
    const newOffer: Offer = {
      id: `OFFER-${Math.floor(100 + Math.random() * 900)}`,
      listingId: newId,
      cropName: newListing.cropName,
      buyerId: 'buyer-abc',
      buyerName: 'ABC Foods & Agro Industries',
      buyerVerified: true,
      quantityKg: newListing.quantityKg,
      initialOfferPrice: sellWizard.expectedPrice - 20,
      currentOfferPrice: sellWizard.expectedPrice - 20,
      pickupIncluded: true,
      status: 'pending',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      history: [
        {
          id: `msg-${Date.now()}`,
          sender: 'buyer',
          senderName: 'ABC Foods',
          pricePerQuintal: sellWizard.expectedPrice - 20,
          message: `We verified your AI Grade A report for ${newListing.cropName}. Offering ₹${sellWizard.expectedPrice - 20}/q with free farmgate pickup!`,
          timestamp: 'Just now'
        }
      ]
    };

    setOffers((prev) => [newOffer, ...prev]);
    setActiveOffer(newOffer);

    addNotification({
      type: 'offer',
      title: '🎉 Listing Published Live!',
      message: `${newListing.cropName} is now visible. ABC Foods immediately sent an offer of ₹${sellWizard.expectedPrice - 20}/q.`,
      actionTab: 'offers'
    });

    setFarmerTab('offers');
  };

  const sendCounterOffer = (offerId: string, price: number, message: string) => {
    setOffers((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          const updatedHistory = [
            ...off.history,
            {
              id: `msg-${Date.now()}`,
              sender: 'farmer' as const,
              senderName: `${currentUser.name} (You)`,
              pricePerQuintal: price,
              message: message || `I can offer at ₹${price}/q considering verified Grade A quality.`,
              timestamp: 'Just now'
            }
          ];

          // Simulate automatic buyer response after 1.5s
          setTimeout(() => {
            const buyerCounterPrice = Math.min(price, off.currentOfferPrice + Math.round((price - off.currentOfferPrice) * 0.6));
            setOffers((currentOffers) =>
              currentOffers.map((o) => {
                if (o.id === offerId) {
                  return {
                    ...o,
                    currentOfferPrice: buyerCounterPrice,
                    status: 'countered',
                    history: [
                      ...o.history,
                      {
                        id: `msg-${Date.now() + 1}`,
                        sender: 'buyer' as const,
                        senderName: o.buyerName,
                        pricePerQuintal: buyerCounterPrice,
                        message: `We can meet you at ₹${buyerCounterPrice}/q with immediate 24h pickup and digital escrow guarantee. Can we seal the deal?`,
                        timestamp: 'Just now'
                      }
                    ]
                  };
                }
                return o;
              })
            );

            addNotification({
              type: 'counter',
              title: '💬 Buyer Counter Offer',
              message: `${off.buyerName} replied with ₹${buyerCounterPrice}/q. Tap to review and confirm deal.`,
              actionTab: 'offers'
            });
          }, 1500);

          return {
            ...off,
            currentOfferPrice: price,
            status: 'countered',
            history: updatedHistory
          };
        }
        return off;
      })
    );
  };

  const acceptOffer = (offerId: string) => {
    const targetOffer = offers.find((o) => o.id === offerId);
    if (!targetOffer) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14532D', '#16A34A', '#EAB308', '#F59E0B']
      });
    } catch {
      // Ignore if confetti blocked
    }

    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'accepted' } : o))
    );

    // Create transaction
    const newTxnId = `KC-TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    const quintals = targetOffer.quantityKg / 100;
    const gross = quintals * targetOffer.currentOfferPrice;
    const net = gross - (targetOffer.pickupIncluded ? 0 : 350);

    const newTxn: Transaction = {
      id: newTxnId,
      listingId: targetOffer.listingId,
      cropName: `${targetOffer.cropName} (${targetOffer.quantityKg} KG)`,
      quantityKg: targetOffer.quantityKg,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      buyerName: 'Vikram Malhotra',
      buyerCompany: targetOffer.buyerName,
      buyerVerified: targetOffer.buyerVerified,
      finalPricePerQuintal: targetOffer.currentOfferPrice,
      grossValue: gross,
      transportCost: targetOffer.pickupIncluded ? 0 : 350,
      storageCost: 0,
      platformFee: 0,
      estimatedNetRealization: net,
      currentStage: 3, // Deal Confirmed
      stages: [
        { name: 'Listing Created', description: 'AI Quality Assessed (87/100 Grade A)', completed: true, date: '28 Aug, 08:30 AM' },
        { name: 'Offer Received', description: `Initial offer from ${targetOffer.buyerName}`, completed: true, date: '28 Aug, 09:00 AM' },
        { name: 'Negotiation', description: `Agreed rate ₹${targetOffer.currentOfferPrice}/q`, completed: true, date: 'Just now' },
        { name: 'Deal Confirmed', description: 'Digital sales agreement created with Escrow security', completed: true, date: 'Just now' },
        { name: 'Pickup Scheduled', description: 'Allocated Eco Mini Truck for village dispatch', completed: false, date: 'Est. Tomorrow, 08:00 AM' },
        { name: 'Produce In Transit', description: 'Geofenced GPS tracking to procurement hub', completed: false },
        { name: 'Delivered & Weighed', description: 'Electronic weighbridge verification', completed: false },
        { name: 'Payment Settled', description: `Direct Bank Transfer (₹${net.toLocaleString('en-IN')})`, completed: false }
      ],
      paymentStatus: 'IN_ESCROW',
      pickupDate: 'Tomorrow, 08:00 AM',
      deliveryDate: 'Tomorrow, 02:00 PM'
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setActiveTransaction(newTxn);

    // Update listing status
    setListings((prev) =>
      prev.map((l) => (l.id === targetOffer.listingId ? { ...l, status: 'sold' } : l))
    );

    addNotification({
      type: 'payment',
      title: '✅ Deal Confirmed!',
      message: `Deal locked with ${targetOffer.buyerName} at ₹${targetOffer.currentOfferPrice}/q. Escrow initialized.`,
      actionTab: 'txn'
    });

    setFarmerTab('txn');
  };

  const rejectOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'rejected' } : o))
    );
  };

  const advanceTransactionStage = (txnId: string) => {
    setTransactions((prev) =>
      prev.map((txn) => {
        if (txn.id === txnId) {
          const nextStage = Math.min(txn.currentStage + 1, txn.stages.length - 1);
          const updatedStages = txn.stages.map((stage, idx) => {
            if (idx <= nextStage) {
              return { ...stage, completed: true, date: stage.date || 'Just now' };
            }
            return stage;
          });

          const newPaymentStatus =
            nextStage >= 7 ? 'SETTLED' : nextStage >= 4 ? 'PROCESSING' : 'IN_ESCROW';

          if (nextStage >= 7) {
            try {
              confetti({
                particleCount: 90,
                spread: 80,
                origin: { y: 0.5 }
              });
            } catch {
              // ignore
            }
          }

          return {
            ...txn,
            currentStage: nextStage,
            stages: updatedStages,
            paymentStatus: newPaymentStatus
          };
        }
        return txn;
      })
    );
  };

  const addBuyerRequirement = (
    req: Omit<BuyerRequirement, 'id' | 'status' | 'matchedListingsCount'>
  ) => {
    const newReq: BuyerRequirement = {
      ...req,
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      status: 'open',
      matchedListingsCount: Math.floor(3 + Math.random() * 8)
    };
    setBuyerRequirements((prev) => [newReq, ...prev]);
    addNotification({
      type: 'market',
      title: '📋 Requirement Published',
      message: `Requirement for ${req.quantityKg} KG ${req.cropName} is active and matching with farmers.`,
      actionTab: 'find'
    });
  };

  const createBuyerOffer = (
    listingId: string,
    pricePerQuintal: number,
    message: string
  ) => {
    const targetListing = listings.find((l) => l.id === listingId);
    if (!targetListing) return;

    const newOffer: Offer = {
      id: `OFFER-${Math.floor(100 + Math.random() * 900)}`,
      listingId: targetListing.id,
      cropName: targetListing.cropName,
      buyerId: 'buyer-current',
      buyerName: 'ABC Foods & Agro Industries',
      buyerVerified: true,
      quantityKg: targetListing.quantityKg,
      initialOfferPrice: pricePerQuintal,
      currentOfferPrice: pricePerQuintal,
      pickupIncluded: true,
      status: 'pending',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      history: [
        {
          id: `msg-${Date.now()}`,
          sender: 'buyer',
          senderName: 'ABC Foods (You)',
          pricePerQuintal: pricePerQuintal,
          message: message || `We are pleased to offer ₹${pricePerQuintal}/q with pickup.`,
          timestamp: 'Just now'
        }
      ]
    };

    setOffers((prev) => [newOffer, ...prev]);
    setActiveOffer(newOffer);

    addNotification({
      type: 'offer',
      title: '📤 Offer Submitted to Farmer',
      message: `Your offer of ₹${pricePerQuintal}/q was sent to ${targetListing.farmerName}.`,
      actionTab: 'offers'
    });
  };

  const verifyUser = (userId: string, userRole: 'farmer' | 'buyer', approved: boolean) => {
    addNotification({
      type: 'market',
      title: approved ? '✅ Verification Approved' : '❌ Verification Rejected',
      message: `${userRole === 'farmer' ? 'Farmer' : 'Buyer'} ID ${userId} status updated by Admin.`,
      actionTab: 'overview'
    });
  };

  const updateDisputeStatus = (
    disputeId: string,
    status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED',
    notes?: string
  ) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === disputeId
          ? { ...d, status, resolutionNotes: notes || d.resolutionNotes }
          : d
      )
    );
  };

  const loginAs = (roleToSet: 'farmer' | 'buyer' | 'admin') => {
    setRole(roleToSet);
    setIsAuthOpen(false);
    if (roleToSet === 'farmer') setFarmerTab('home');
    if (roleToSet === 'buyer') setBuyerTab('dashboard');
    if (roleToSet === 'admin') setAdminTab('overview');
  };

  const loginWithGoogle = (userInfo: {
    name: string;
    email: string;
    avatar?: string;
    role?: 'farmer' | 'buyer' | 'admin';
  }) => {
    const roleToSet = userInfo.role || authRole;
    setCurrentUser((prev) => ({
      ...prev,
      name: userInfo.name || prev.name,
      email: userInfo.email || prev.email,
      avatar: userInfo.avatar || '',
      verified: true,
      provider: 'google'
    }));
    setRole(roleToSet);
    setIsAuthOpen(false);
    if (roleToSet === 'farmer') setFarmerTab('home');
    if (roleToSet === 'buyer') setBuyerTab('dashboard');
    if (roleToSet === 'admin') setAdminTab('overview');

    addNotification({
      type: 'market',
      title: '🟢 Google Login Verified',
      message: `Signed in as ${userInfo.name} (${userInfo.email || roleToSet}).`,
      actionTab: roleToSet === 'farmer' ? 'profile' : 'dashboard'
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335']
      });
    } catch {
      // Ignore if confetti is disabled
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        toggleLanguage,
        t,
        farmerTab,
        setFarmerTab,
        listings,
        activeListing,
        setActiveListing,
        offers,
        activeOffer,
        setActiveOffer,
        transactions,
        activeTransaction,
        setActiveTransaction,
        buyerTab,
        setBuyerTab,
        buyerRequirements,
        adminTab,
        setAdminTab,
        disputes,
        weather,
        mandis,
        storageFacilities,
        transportFleet,
        notifications,
        unreadNotifsCount,
        markNotificationRead,
        addNotification,
        sellWizard,
        setSellWizard,
        resetSellWizard,
        startSellWithCrop,
        runAIScanForWizard,
        publishCurrentWizardListing,
        sendCounterOffer,
        acceptOffer,
        rejectOffer,
        advanceTransactionStage,
        addBuyerRequirement,
        createBuyerOffer,
        verifyUser,
        updateDisputeStatus,
        isAuthOpen,
        setIsAuthOpen,
        authRole,
        setAuthRole,
        currentUser,
        loginAs,
        loginWithGoogle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
