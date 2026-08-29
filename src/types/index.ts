export type Role = 'landing' | 'farmer' | 'buyer' | 'admin';

export type Language = 'en' | 'hi';

export type CropCategory = 'fruits' | 'vegetables' | 'crops';

export interface CropDefinition {
  id: string;
  name: string;
  nameHi: string;
  category: CropCategory;
  emoji: string;
  varieties: string[];
  mandiAvgPrice: number; // in ₹ per quintal (100 kg)
  unit: string;
  typicalYieldKg: number;
  shelfLifeDays: number;
  weatherSensitivity: 'high' | 'medium' | 'low';
}

export interface AIQualityAssessment {
  cropId: string;
  cropName: string;
  qualityScore: number; // 0 - 100 (e.g. 87)
  recommendedGrade: 'Grade A' | 'Grade B' | 'Grade C';
  confidence: number; // 0 - 100 (e.g. 91%)
  visibleDamagePercent: number; // e.g. 8%
  spoilageIndicator: 'Low' | 'Medium' | 'High';
  moistureContent: string; // e.g. "11.8%"
  lusterScore: string; // "High / Premium"
  indicators: {
    positive: string[];
    warnings: string[];
  };
  recommendationText: string;
  analyzedAt: string;
  imageUrl?: string;
  isOverridden?: boolean;
  /** 'live' = real Gemini computer-vision inference. 'demo' = local fallback estimate. */
  aiSource?: 'live' | 'demo';
}

export interface WeatherForecastDay {
  day: string;
  temp: number;
  condition: string;
  icon: string;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  location: string;
  state: string;
  district: string;
  currentTemp: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  forecast: WeatherForecastDay[];
  cropImpactInsights: {
    cropName: string;
    riskTitle: string;
    riskDescription: string;
    recommendedAction: string;
    urgency: 'high' | 'medium' | 'low';
  }[];
}

export interface MandiComparison {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  pricePerQuintal: number;
  transportCost: number;
  arrivalsTonnes: number;
  demandLevel: 'HIGH' | 'MODERATE' | 'LOW';
  estimatedNetRealization: number;
  isBestOpportunity?: boolean;
}

export interface StorageFacility {
  id: string;
  name: string;
  distanceKm: number;
  ratePerDay: number; // in ₹/day
  capacityTonnes: number;
  availableTonnes: number;
  type: string;
  contact: string;
  rating: number;
}

export interface TransportOption {
  id: string;
  name: string;
  vehicleType: string;
  capacityKg: number;
  baseCost: number;
  perKmCost: number;
  rating: number;
  eta: string;
}

export interface Listing {
  id: string; // e.g. "KC-WHT-00124"
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  cropId: string;
  cropName: string;
  category: CropCategory;
  variety: string;
  quantityKg: number;
  quantityDisplay: string;
  grade: 'Grade A' | 'Grade B' | 'Grade C';
  aiQuality: AIQualityAssessment;
  expectedPricePerQuintal: number;
  estimatedNetRealization: number;
  transportSelected?: TransportOption;
  storageSelected?: StorageFacility;
  status: 'active' | 'under_deal' | 'sold' | 'draft';
  createdAt: string;
  harvestDate: string;
  matchedBuyersCount: number;
}

export interface MatchedBuyer {
  id: string;
  companyName: string;
  verified: boolean;
  matchScore: number; // e.g. 95
  cropWanted: string;
  gradeWanted: string;
  quantityWantedKg: number;
  offerPriceRange: string; // "₹2,400 – ₹2,450/q"
  distanceKm: number;
  location: string;
  paymentTermDays: number;
  rating: number;
  avatarUrl?: string;
}

export interface NegotiationMessage {
  id: string;
  sender: 'farmer' | 'buyer';
  senderName: string;
  pricePerQuintal: number;
  message: string;
  timestamp: string;
}

export interface Offer {
  id: string;
  listingId: string;
  cropName: string;
  buyerId: string;
  buyerName: string;
  buyerVerified: boolean;
  quantityKg: number;
  initialOfferPrice: number;
  currentOfferPrice: number;
  pickupIncluded: boolean;
  status: 'pending' | 'countered' | 'accepted' | 'rejected' | 'expired';
  history: NegotiationMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string; // e.g. "KC-TXN-00124"
  listingId: string;
  cropName: string;
  quantityKg: number;
  farmerName: string;
  farmerPhone: string;
  buyerName: string;
  buyerCompany: string;
  buyerVerified: boolean;
  finalPricePerQuintal: number;
  grossValue: number;
  transportCost: number;
  storageCost: number;
  platformFee: number;
  estimatedNetRealization: number;
  currentStage: number; // 0 to 7
  stages: {
    name: string;
    description: string;
    completed: boolean;
    date?: string;
  }[];
  paymentStatus: 'PROCESSING' | 'IN_ESCROW' | 'SETTLED' | 'PENDING';
  pickupDate: string;
  deliveryDate?: string;
}

export interface BuyerRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  cropName: string;
  quantityKg: number;
  requiredGrade: 'Grade A' | 'Grade B' | 'Grade C' | 'Any';
  maxPricePerQuintal: number;
  preferredLocation: string;
  preferredMandi: string;
  requiredByDate: string;
  pickupType: 'Buyer Pickup' | 'Farmer Delivery';
  status: 'open' | 'matched' | 'fulfilled';
  matchedListingsCount: number;
}

export interface DisputeItem {
  id: string;
  transactionId: string;
  farmerName: string;
  buyerName: string;
  cropName: string;
  issue: string;
  reportedBy: 'farmer' | 'buyer';
  createdAt: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED';
  resolutionNotes?: string;
}

export interface NotificationItem {
  id: string;
  type: 'offer' | 'market' | 'weather' | 'counter' | 'logistics' | 'payment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionTab?: string;
}
