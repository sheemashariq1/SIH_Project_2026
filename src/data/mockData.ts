import {
  CropDefinition,
  WeatherData,
  MandiComparison,
  StorageFacility,
  TransportOption,
  Listing,
  MatchedBuyer,
  Offer,
  Transaction,
  BuyerRequirement,
  DisputeItem,
  NotificationItem
} from '../types';

export const CROPS_DATA: CropDefinition[] = [
  // CROPS
  {
    id: 'wheat',
    name: 'Wheat',
    nameHi: 'गेहूं',
    category: 'crops',
    emoji: '🌾',
    varieties: ['HD 2967 (Karnal Gold)', 'PBW 550', 'Sharbati Super', 'DBW 187 (Karan Vandana)'],
    mandiAvgPrice: 2420,
    unit: 'Quintal',
    typicalYieldKg: 500,
    shelfLifeDays: 180,
    weatherSensitivity: 'high'
  },
  {
    id: 'rice',
    name: 'Basmati Rice / Paddy',
    nameHi: 'बासमती धान',
    category: 'crops',
    emoji: '🌾',
    varieties: ['Pusa Basmati 1121', 'Pusa 1509', 'Traditional Basmati', 'PR 126'],
    mandiAvgPrice: 3850,
    unit: 'Quintal',
    typicalYieldKg: 1000,
    shelfLifeDays: 240,
    weatherSensitivity: 'medium'
  },
  {
    id: 'mustard',
    name: 'Mustard',
    nameHi: 'सरसों',
    category: 'crops',
    emoji: '🌱',
    varieties: ['Pusa Bold', 'RH 749', 'Giriraj', 'NRCHB 101'],
    mandiAvgPrice: 5650,
    unit: 'Quintal',
    typicalYieldKg: 400,
    shelfLifeDays: 120,
    weatherSensitivity: 'medium'
  },
  {
    id: 'maize',
    name: 'Maize',
    nameHi: 'मक्का',
    category: 'crops',
    emoji: '🌽',
    varieties: ['HQPM-1', 'Deccan 103', 'Pusa HM-4', 'Bio-9681'],
    mandiAvgPrice: 2150,
    unit: 'Quintal',
    typicalYieldKg: 600,
    shelfLifeDays: 90,
    weatherSensitivity: 'low'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    nameHi: 'कपास',
    category: 'crops',
    emoji: '☁️',
    varieties: ['Bt Cotton Hybrid', 'RCH 659', 'Suraj Long Staple', 'Bollgard II'],
    mandiAvgPrice: 6900,
    unit: 'Quintal',
    typicalYieldKg: 350,
    shelfLifeDays: 180,
    weatherSensitivity: 'high'
  },
  {
    id: 'pulses',
    name: 'Pulses / Arhar',
    nameHi: 'दालें / अरहर',
    category: 'crops',
    emoji: '🫘',
    varieties: ['Pusa 992', 'UPAS 120', 'Malviya Chamatkar', 'BDN 711'],
    mandiAvgPrice: 7200,
    unit: 'Quintal',
    typicalYieldKg: 300,
    shelfLifeDays: 150,
    weatherSensitivity: 'low'
  },
  {
    id: 'barley',
    name: 'Barley',
    nameHi: 'जौ',
    category: 'crops',
    emoji: '🌾',
    varieties: ['BH 902', 'DWRB 123', 'RD 2552', 'Pusa Sheetal'],
    mandiAvgPrice: 1950,
    unit: 'Quintal',
    typicalYieldKg: 450,
    shelfLifeDays: 150,
    weatherSensitivity: 'low'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    nameHi: 'गन्ना',
    category: 'crops',
    emoji: '🎋',
    varieties: ['Co 0238', 'CoJ 85', 'Co 0118', 'CoLk 94184'],
    mandiAvgPrice: 380,
    unit: 'Quintal',
    typicalYieldKg: 5000,
    shelfLifeDays: 14,
    weatherSensitivity: 'medium'
  },

  // VEGETABLES
  {
    id: 'potato',
    name: 'Potato',
    nameHi: 'आलू',
    category: 'vegetables',
    emoji: '🥔',
    varieties: ['Kufri Jyoti', 'Kufri Chipsona-1', 'Kufri Pukhraj', 'Kufri Bahar'],
    mandiAvgPrice: 1420,
    unit: 'Quintal',
    typicalYieldKg: 300,
    shelfLifeDays: 45,
    weatherSensitivity: 'high'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    nameHi: 'टमाटर',
    category: 'vegetables',
    emoji: '🍅',
    varieties: ['Himsona Hybrid', 'Abhinav 3140', 'Pusa Ruby', 'Arka Rakshak'],
    mandiAvgPrice: 1850,
    unit: 'Quintal',
    typicalYieldKg: 200,
    shelfLifeDays: 10,
    weatherSensitivity: 'high'
  },
  {
    id: 'onion',
    name: 'Onion',
    nameHi: 'प्याज़',
    category: 'vegetables',
    emoji: '🧅',
    varieties: ['Nasik Red Super', 'Pusa Red', 'Bhima Super', 'AgriFound Dark Red'],
    mandiAvgPrice: 2200,
    unit: 'Quintal',
    typicalYieldKg: 400,
    shelfLifeDays: 60,
    weatherSensitivity: 'high'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    nameHi: 'गाजर',
    category: 'vegetables',
    emoji: '🥕',
    varieties: ['Pusa Rudhira', 'Nantes Half Long', 'Pusa Kesar', 'Red Kuroda'],
    mandiAvgPrice: 1600,
    unit: 'Quintal',
    typicalYieldKg: 300,
    shelfLifeDays: 20,
    weatherSensitivity: 'medium'
  },
  {
    id: 'cauliflower',
    name: 'Cauliflower',
    nameHi: 'फूलगोभी',
    category: 'vegetables',
    emoji: '🥦',
    varieties: ['Pusa Snowball K-1', 'Pusa Deepali', 'Madhuri Hybrid', 'Girija'],
    mandiAvgPrice: 1750,
    unit: 'Quintal',
    typicalYieldKg: 250,
    shelfLifeDays: 7,
    weatherSensitivity: 'high'
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    nameHi: 'पत्तागोभी',
    category: 'vegetables',
    emoji: '🥬',
    varieties: ['Golden Acre', 'Pride of India', 'Pusa Mukta', 'Green Express'],
    mandiAvgPrice: 1300,
    unit: 'Quintal',
    typicalYieldKg: 350,
    shelfLifeDays: 14,
    weatherSensitivity: 'medium'
  },
  {
    id: 'brinjal',
    name: 'Brinjal / Eggplant',
    nameHi: 'बैंगन',
    category: 'vegetables',
    emoji: '🍆',
    varieties: ['Pusa Purple Long', 'Pusa Purple Round', 'Navkiran', 'Manjari Gota'],
    mandiAvgPrice: 1450,
    unit: 'Quintal',
    typicalYieldKg: 200,
    shelfLifeDays: 8,
    weatherSensitivity: 'medium'
  },

  // FRUITS
  {
    id: 'apple',
    name: 'Apple',
    nameHi: 'सेब',
    category: 'fruits',
    emoji: '🍎',
    varieties: ['Royal Delicious', 'Red Chief', 'Golden Delicious', 'Gala Premium'],
    mandiAvgPrice: 6800,
    unit: 'Quintal',
    typicalYieldKg: 500,
    shelfLifeDays: 60,
    weatherSensitivity: 'medium'
  },
  {
    id: 'mango',
    name: 'Mango',
    nameHi: 'आम',
    category: 'fruits',
    emoji: '🥭',
    varieties: ['Dasheri Supreme', 'Langra Banarasi', 'Chausa Sweet', 'Alphonso Ratnagiri'],
    mandiAvgPrice: 4800,
    unit: 'Quintal',
    typicalYieldKg: 400,
    shelfLifeDays: 12,
    weatherSensitivity: 'high'
  },
  {
    id: 'banana',
    name: 'Banana',
    nameHi: 'केला',
    category: 'fruits',
    emoji: '🍌',
    varieties: ['Grand Naine (G9)', 'Robusta', 'Red Banana', 'Yellaki Supreme'],
    mandiAvgPrice: 1900,
    unit: 'Quintal',
    typicalYieldKg: 800,
    shelfLifeDays: 7,
    weatherSensitivity: 'high'
  },
  {
    id: 'orange',
    name: 'Orange / Kinnow',
    nameHi: 'संतरा / किन्नू',
    category: 'fruits',
    emoji: '🍊',
    varieties: ['Nagpur Orange', 'Punjab Kinnow Gold', 'Coorg Mandarin', 'Valencia'],
    mandiAvgPrice: 3200,
    unit: 'Quintal',
    typicalYieldKg: 600,
    shelfLifeDays: 20,
    weatherSensitivity: 'medium'
  },
  {
    id: 'grapes',
    name: 'Grapes',
    nameHi: 'अंगूर',
    category: 'fruits',
    emoji: '🍇',
    varieties: ['Thompson Seedless', 'Sharad Seedless', 'Tas-A-Ganesh', 'Flame Seedless'],
    mandiAvgPrice: 5200,
    unit: 'Quintal',
    typicalYieldKg: 300,
    shelfLifeDays: 14,
    weatherSensitivity: 'high'
  },
  {
    id: 'guava',
    name: 'Guava',
    nameHi: 'अमरूद',
    category: 'fruits',
    emoji: '🍈',
    varieties: ['Allahabad Safeda', 'Lucknow 49 (Sardar)', 'Lalit Red', 'VNR Bihi'],
    mandiAvgPrice: 2600,
    unit: 'Quintal',
    typicalYieldKg: 350,
    shelfLifeDays: 6,
    weatherSensitivity: 'medium'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    nameHi: 'अनार',
    category: 'fruits',
    emoji: '🪴',
    varieties: ['Bhagawa Ruby Red', 'Ganesh', 'Arakta', 'Mridula'],
    mandiAvgPrice: 7900,
    unit: 'Quintal',
    typicalYieldKg: 300,
    shelfLifeDays: 30,
    weatherSensitivity: 'medium'
  }
];

export const INITIAL_WEATHER_DATA: WeatherData = {
  location: 'Karnal, Haryana',
  state: 'Haryana',
  district: 'Karnal',
  currentTemp: 29,
  humidity: 68,
  rainProbability: 72,
  windSpeed: 14,
  riskLevel: 'HIGH',
  forecast: [
    { day: 'Today', temp: 29, condition: 'Rain Shower', icon: '🌧', rainProbability: 72, humidity: 68, windSpeed: 14 },
    { day: 'Tomorrow', temp: 31, condition: 'Sunny / Clear', icon: '☀️', rainProbability: 18, humidity: 55, windSpeed: 10 },
    { day: 'Saturday', temp: 30, condition: 'Scattered Showers', icon: '🌦', rainProbability: 42, humidity: 62, windSpeed: 12 },
    { day: 'Sunday', temp: 28, condition: 'Heavy Rain Alert', icon: '⛈', rainProbability: 67, humidity: 75, windSpeed: 16 },
    { day: 'Monday', temp: 27, condition: 'Cloudy / Damp', icon: '☁️', rainProbability: 55, humidity: 70, windSpeed: 11 },
    { day: 'Tuesday', temp: 29, condition: 'Partly Sunny', icon: '⛅', rainProbability: 25, humidity: 58, windSpeed: 9 },
    { day: 'Wednesday', temp: 31, condition: 'Clear Sun', icon: '☀️', rainProbability: 12, humidity: 50, windSpeed: 8 }
  ],
  cropImpactInsights: [
    {
      cropName: 'Wheat (Harvested)',
      riskTitle: 'High Rain & Moisture Risk',
      riskDescription: 'Heavier rainfall expected in 3 days across GT Karnal belt. High open-field moisture causes grain fungal damage, luster loss, and up to 15% price deduction.',
      recommendedAction: 'SELL WITHIN 3 DAYS or move stock immediately into covered GreenStore silos.',
      urgency: 'high'
    },
    {
      cropName: 'Tomato / Vegetables',
      riskTitle: 'High Spoilage & Transit Delay Risk',
      riskDescription: 'High humidity accelerates rot in ripe tomatoes if stored beyond 48 hours without cold chains.',
      recommendedAction: 'Dispatch immediately to local Panipat Mandi or direct processor.',
      urgency: 'high'
    },
    {
      cropName: 'Mustard / Pulses',
      riskTitle: 'Moderate Storage Condensation',
      riskDescription: 'Ensure tarpaulin double-layer covering if held in kutcha godowns.',
      recommendedAction: 'Safe to hold up to 10 days in certified dry warehouse.',
      urgency: 'medium'
    }
  ]
};

export const INITIAL_MANDIS: MandiComparison[] = [
  {
    id: 'mandi-karnal',
    name: 'Karnal Main Mandi (G.T. Road)',
    location: 'Karnal, Haryana',
    distanceKm: 14,
    pricePerQuintal: 2420,
    transportCost: 350,
    arrivalsTonnes: 2430,
    demandLevel: 'HIGH',
    estimatedNetRealization: 11750,
    isBestOpportunity: true
  },
  {
    id: 'mandi-panipat',
    name: 'Panipat Grain Market',
    location: 'Panipat, Haryana',
    distanceKm: 29,
    pricePerQuintal: 2390,
    transportCost: 520,
    arrivalsTonnes: 1890,
    demandLevel: 'MODERATE',
    estimatedNetRealization: 11430
  },
  {
    id: 'mandi-kurukshetra',
    name: 'Kurukshetra Anaj Mandi',
    location: 'Kurukshetra, Haryana',
    distanceKm: 34,
    pricePerQuintal: 2410,
    transportCost: 610,
    arrivalsTonnes: 1420,
    demandLevel: 'HIGH',
    estimatedNetRealization: 11440
  },
  {
    id: 'mandi-delhi',
    name: 'Narela Terminal Mandi (Delhi)',
    location: 'Narela, Delhi NCR',
    distanceKm: 115,
    pricePerQuintal: 2460,
    transportCost: 1900,
    arrivalsTonnes: 5800,
    demandLevel: 'HIGH',
    estimatedNetRealization: 10400
  },
  {
    id: 'mandi-sonipat',
    name: 'Sonipat Mandi',
    location: 'Sonipat, Haryana',
    distanceKm: 78,
    pricePerQuintal: 2405,
    transportCost: 1250,
    arrivalsTonnes: 1650,
    demandLevel: 'MODERATE',
    estimatedNetRealization: 10775
  }
];

export const STORAGE_FACILITIES: StorageFacility[] = [
  {
    id: 'store-greenstore',
    name: 'GreenStore Agrilogix Silos',
    distanceKm: 6,
    ratePerDay: 250,
    capacityTonnes: 2500,
    availableTonnes: 850,
    type: 'Scientific Climate-Controlled Grain Silo',
    contact: '+91 98120 44521',
    rating: 4.8
  },
  {
    id: 'store-farmsafe',
    name: 'FarmSafe Cold & Dry Godown',
    distanceKm: 11,
    ratePerDay: 220,
    capacityTonnes: 5000,
    availableTonnes: 1600,
    type: 'Certified WDRA Godown (Dry Produce)',
    contact: '+91 94160 88219',
    rating: 4.6
  },
  {
    id: 'store-haryana-state',
    name: 'Haryana State Warehousing Corp (HSWC)',
    distanceKm: 15,
    ratePerDay: 190,
    capacityTonnes: 12000,
    availableTonnes: 3400,
    type: 'Govt. Accredited Warehouse',
    contact: '+91 184 225 3910',
    rating: 4.4
  }
];

export const TRANSPORT_FLEET: TransportOption[] = [
  {
    id: 'trans-mini',
    name: 'Eco Mini Truck (Mahindra Bolero Maxi)',
    vehicleType: 'Mini Truck (Up to 1.2 Tonnes)',
    capacityKg: 1200,
    baseCost: 250,
    perKmCost: 12,
    rating: 4.9,
    eta: 'Within 45 mins'
  },
  {
    id: 'trans-medium',
    name: 'Eicher Pro 3-Tonner Carrier',
    vehicleType: 'Medium Truck (Up to 3.5 Tonnes)',
    capacityKg: 3500,
    baseCost: 400,
    perKmCost: 18,
    rating: 4.7,
    eta: 'Within 1.5 hours'
  },
  {
    id: 'trans-heavy',
    name: 'Tata 1109 5-Tonne Heavy Hauler',
    vehicleType: 'Heavy Truck (Up to 6 Tonnes)',
    capacityKg: 6000,
    baseCost: 550,
    perKmCost: 22,
    rating: 4.8,
    eta: 'Within 2 hours'
  },
  {
    id: 'trans-self',
    name: 'Farmer Self-Transport / Tractor Trolley',
    vehicleType: 'Own Farm Vehicle (Self Dispatched)',
    capacityKg: 5000,
    baseCost: 0,
    perKmCost: 8,
    rating: 5.0,
    eta: 'Instant / Self-Scheduled'
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'KC-WHT-00124',
    farmerId: 'farmer-01',
    farmerName: 'Rameshwar Singh (Karnal)',
    farmerPhone: '+91 98123 45678',
    farmerLocation: 'Village Taraori, Karnal, Haryana - 132001',
    cropId: 'wheat',
    cropName: 'Wheat (Sharbati HD 2967)',
    category: 'crops',
    variety: 'HD 2967 (Karnal Gold)',
    quantityKg: 500,
    quantityDisplay: '500 KG (5 Quintals)',
    grade: 'Grade A',
    aiQuality: {
      cropId: 'wheat',
      cropName: 'Wheat',
      qualityScore: 87,
      recommendedGrade: 'Grade A',
      confidence: 91,
      visibleDamagePercent: 8,
      spoilageIndicator: 'Low',
      moistureContent: '11.4%',
      lusterScore: 'High / Golden Luster',
      indicators: {
        positive: ['Uniform grain shape & color', 'Low foreign matter (< 1.2%)', 'Moisture under 12% optimal standard'],
        warnings: ['Minor 8% surface abrasion during threshing']
      },
      recommendationText: 'Suitable for premium commercial procurement with zero mandi broker deductions.',
      analyzedAt: 'Just now (AI Verified)'
    },
    expectedPricePerQuintal: 2450,
    estimatedNetRealization: 11800,
    status: 'under_deal',
    createdAt: '2026-08-28 08:30 AM',
    harvestDate: '2026-08-26',
    matchedBuyersCount: 4
  },
  {
    id: 'KC-POT-00125',
    farmerId: 'farmer-01',
    farmerName: 'Rameshwar Singh (Karnal)',
    farmerPhone: '+91 98123 45678',
    farmerLocation: 'Village Taraori, Karnal, Haryana - 132001',
    cropId: 'potato',
    cropName: 'Potato (Kufri Jyoti)',
    category: 'vegetables',
    variety: 'Kufri Jyoti',
    quantityKg: 300,
    quantityDisplay: '300 KG (3 Quintals)',
    grade: 'Grade B',
    aiQuality: {
      cropId: 'potato',
      cropName: 'Potato',
      qualityScore: 74,
      recommendedGrade: 'Grade B',
      confidence: 88,
      visibleDamagePercent: 14,
      spoilageIndicator: 'Low',
      moistureContent: '78%',
      lusterScore: 'Standard Earth Coat',
      indicators: {
        positive: ['Solid tuber density', 'No green sunburn patches'],
        warnings: ['Slight size variance across batch (40-65mm)']
      },
      recommendationText: 'Standard grading suitable for bulk institutional kitchen & retail supply.',
      analyzedAt: 'Yesterday'
    },
    expectedPricePerQuintal: 1450,
    estimatedNetRealization: 4150,
    status: 'active',
    createdAt: '2026-08-27 11:15 AM',
    harvestDate: '2026-08-25',
    matchedBuyersCount: 3
  },
  {
    id: 'KC-TOM-00126',
    farmerId: 'farmer-01',
    farmerName: 'Rameshwar Singh (Karnal)',
    farmerPhone: '+91 98123 45678',
    farmerLocation: 'Village Taraori, Karnal, Haryana - 132001',
    cropId: 'tomato',
    cropName: 'Tomato (Himsona Hybrid)',
    category: 'vegetables',
    variety: 'Himsona Hybrid',
    quantityKg: 200,
    quantityDisplay: '200 KG (2 Quintals)',
    grade: 'Grade A',
    aiQuality: {
      cropId: 'tomato',
      cropName: 'Tomato',
      qualityScore: 91,
      recommendedGrade: 'Grade A',
      confidence: 94,
      visibleDamagePercent: 4,
      spoilageIndicator: 'Low',
      moistureContent: 'Firm Fruit Skin',
      lusterScore: 'Deep Crimson Red',
      indicators: {
        positive: ['Firm pericarp with high juice brix (4.6°)', 'Zero blossom end rot', 'Even ripening'],
        warnings: ['Prompt 48h dispatch suggested due to rain ambient humidity']
      },
      recommendationText: 'Premium culinary grade ready for direct quick-commerce or ketchup processing.',
      analyzedAt: '2 days ago'
    },
    expectedPricePerQuintal: 1900,
    estimatedNetRealization: 3600,
    status: 'active',
    createdAt: '2026-08-26 03:40 PM',
    harvestDate: '2026-08-26',
    matchedBuyersCount: 5
  }
];

export const MATCHED_BUYERS: MatchedBuyer[] = [
  {
    id: 'buyer-abc',
    companyName: 'ABC Foods & Agro Industries',
    verified: true,
    matchScore: 95,
    cropWanted: 'Wheat (Grade A)',
    gradeWanted: 'Grade A',
    quantityWantedKg: 500,
    offerPriceRange: '₹2,400 – ₹2,450/q',
    distanceKm: 18,
    location: 'Panipat Food Park, Haryana',
    paymentTermDays: 2,
    rating: 4.9
  },
  {
    id: 'buyer-sharma',
    companyName: 'Sharma Agri Processing & Flour Mills',
    verified: true,
    matchScore: 88,
    cropWanted: 'Wheat (Grade A / B)',
    gradeWanted: 'Grade A',
    quantityWantedKg: 1000,
    offerPriceRange: '₹2,380 – ₹2,420/q',
    distanceKm: 24,
    location: 'Karnal Industrial Area',
    paymentTermDays: 1,
    rating: 4.7
  },
  {
    id: 'buyer-green',
    companyName: 'Green Harvest Organics & Retail',
    verified: true,
    matchScore: 82,
    cropWanted: 'Wheat / Cereals',
    gradeWanted: 'Grade A',
    quantityWantedKg: 800,
    offerPriceRange: '₹2,360 – ₹2,400/q',
    distanceKm: 32,
    location: 'Sonipat Agri Hub',
    paymentTermDays: 3,
    rating: 4.6
  },
  {
    id: 'buyer-itc',
    companyName: 'ITC Agri Business Division (e-Choupal)',
    verified: true,
    matchScore: 91,
    cropWanted: 'Wheat (Aashirvaad Line)',
    gradeWanted: 'Grade A',
    quantityWantedKg: 5000,
    offerPriceRange: '₹2,420 – ₹2,460/q',
    distanceKm: 45,
    location: 'Kurukshetra Procurement Center',
    paymentTermDays: 2,
    rating: 4.95
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'OFFER-001',
    listingId: 'KC-WHT-00124',
    cropName: 'Wheat (Grade A)',
    buyerId: 'buyer-abc',
    buyerName: 'ABC Foods & Agro Industries',
    buyerVerified: true,
    quantityKg: 500,
    initialOfferPrice: 2400,
    currentOfferPrice: 2430,
    pickupIncluded: true,
    status: 'countered',
    createdAt: '2026-08-28 09:00 AM',
    updatedAt: '2026-08-28 09:18 AM',
    history: [
      {
        id: 'msg-1',
        sender: 'buyer',
        senderName: 'ABC Foods',
        pricePerQuintal: 2400,
        message: 'We inspected the AI Quality Report (87/100 Grade A). We can offer ₹2,400/q with free truck pickup at your village gate.',
        timestamp: '09:00 AM'
      },
      {
        id: 'msg-2',
        sender: 'farmer',
        senderName: 'Rameshwar Singh (You)',
        pricePerQuintal: 2450,
        message: 'Grain moisture is only 11.4% with zero weeds. Current Karnal mandi rate is ₹2,420/q. I can do ₹2,450/q.',
        timestamp: '09:08 AM'
      },
      {
        id: 'msg-3',
        sender: 'buyer',
        senderName: 'ABC Foods',
        pricePerQuintal: 2430,
        message: 'We value the quality consistency. Final offer ₹2,430/q + immediate logistics pickup within 24 hours. Deal?',
        timestamp: '09:18 AM'
      }
    ]
  },
  {
    id: 'OFFER-002',
    listingId: 'KC-WHT-00124',
    cropName: 'Wheat (Grade A)',
    buyerId: 'buyer-sharma',
    buyerName: 'Sharma Agri Processing & Flour Mills',
    buyerVerified: true,
    quantityKg: 500,
    initialOfferPrice: 2400,
    currentOfferPrice: 2400,
    pickupIncluded: false,
    status: 'pending',
    createdAt: '2026-08-28 08:45 AM',
    updatedAt: '2026-08-28 08:45 AM',
    history: [
      {
        id: 'msg-s1',
        sender: 'buyer',
        senderName: 'Sharma Agri Mills',
        pricePerQuintal: 2400,
        message: 'Standard mill purchase rate ₹2,400/quintal for Taraori pickup.',
        timestamp: '08:45 AM'
      }
    ]
  },
  {
    id: 'OFFER-003',
    listingId: 'KC-WHT-00124',
    cropName: 'Wheat (Grade A)',
    buyerId: 'buyer-green',
    buyerName: 'Green Harvest Organics',
    buyerVerified: true,
    quantityKg: 500,
    initialOfferPrice: 2380,
    currentOfferPrice: 2380,
    pickupIncluded: true,
    status: 'pending',
    createdAt: '2026-08-28 08:50 AM',
    updatedAt: '2026-08-28 08:50 AM',
    history: [
      {
        id: 'msg-g1',
        sender: 'buyer',
        senderName: 'Green Harvest',
        pricePerQuintal: 2380,
        message: 'Prompt 24-hr payment via UPI / Bank transfer @ ₹2,380/q.',
        timestamp: '08:50 AM'
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'KC-TXN-00124',
    listingId: 'KC-WHT-00124',
    cropName: 'Wheat (Grade A - 500 KG)',
    quantityKg: 500,
    farmerName: 'Rameshwar Singh',
    farmerPhone: '+91 98123 45678',
    buyerName: 'Vikram Malhotra',
    buyerCompany: 'ABC Foods & Agro Industries',
    buyerVerified: true,
    finalPricePerQuintal: 2430,
    grossValue: 12150,
    transportCost: 350,
    storageCost: 0,
    platformFee: 0, // Zero fee for farmers
    estimatedNetRealization: 11800,
    currentStage: 3, // Deal Confirmed
    stages: [
      { name: 'Listing Created', description: 'AI Quality Assessed (87/100 Grade A)', completed: true, date: '28 Aug, 08:30 AM' },
      { name: 'Offer Received', description: 'Initial offer ₹2,400/q from ABC Foods', completed: true, date: '28 Aug, 09:00 AM' },
      { name: 'Negotiation', description: 'Countered at ₹2,450/q -> Settled at ₹2,430/q', completed: true, date: '28 Aug, 09:18 AM' },
      { name: 'Deal Confirmed', description: 'Digital sales contract signed with Escrow protection', completed: true, date: '28 Aug, 09:22 AM' },
      { name: 'Pickup Scheduled', description: 'Eco Mini Truck allocated (Driver: Harpreet Singh)', completed: false, date: 'Est. 29 Aug, 08:00 AM' },
      { name: 'Produce In Transit', description: 'GPS Geofenced route tracking to Panipat Food Park', completed: false },
      { name: 'Delivered & Weighed', description: 'Electronic weighbridge verification at buyer warehouse', completed: false },
      { name: 'Payment Settled', description: 'Direct DBT Bank Transfer to Farmer Account (₹11,800)', completed: false }
    ],
    paymentStatus: 'IN_ESCROW',
    pickupDate: '2026-08-29',
    deliveryDate: '2026-08-29'
  }
];

export const BUYER_REQUIREMENTS: BuyerRequirement[] = [
  {
    id: 'REQ-001',
    buyerId: 'buyer-abc',
    buyerName: 'ABC Foods & Agro Industries',
    cropName: 'Wheat',
    quantityKg: 25000,
    requiredGrade: 'Grade A',
    maxPricePerQuintal: 2450,
    preferredLocation: 'Karnal / Panipat',
    preferredMandi: 'Karnal Main Mandi',
    requiredByDate: '2026-08-31',
    pickupType: 'Buyer Pickup',
    status: 'open',
    matchedListingsCount: 8
  },
  {
    id: 'REQ-002',
    buyerId: 'buyer-sharma',
    buyerName: 'Sharma Agri Processing & Flour Mills',
    cropName: 'Wheat',
    quantityKg: 10000,
    requiredGrade: 'Grade A',
    maxPricePerQuintal: 2420,
    preferredLocation: 'Karnal / Kurukshetra',
    preferredMandi: 'Any nearby',
    requiredByDate: '2026-09-02',
    pickupType: 'Buyer Pickup',
    status: 'open',
    matchedListingsCount: 5
  },
  {
    id: 'REQ-003',
    buyerId: 'buyer-motherdairy',
    buyerName: 'Safal / Mother Dairy Fruit & Veg',
    cropName: 'Tomato',
    quantityKg: 5000,
    requiredGrade: 'Grade A',
    maxPricePerQuintal: 1950,
    preferredLocation: 'Haryana / NCR',
    preferredMandi: 'Panipat / Sonipat',
    requiredByDate: '2026-08-30',
    pickupType: 'Farmer Delivery',
    status: 'open',
    matchedListingsCount: 4
  }
];

export const INITIAL_DISPUTES: DisputeItem[] = [
  {
    id: 'DSP-091',
    transactionId: 'KC-TXN-00088',
    farmerName: 'Kuldeep Yadav (Sonipat)',
    buyerName: 'AgroPrime Retail Ltd',
    cropName: 'Basmati Paddy',
    issue: 'Dispute over weighbridge moisture measurement calibration at drop point (13.5% vs 12.1% farm check).',
    reportedBy: 'farmer',
    createdAt: '2026-08-27',
    status: 'UNDER_REVIEW',
    resolutionNotes: 'Independent Agri Assessor dispatched for re-sampling.'
  },
  {
    id: 'DSP-092',
    transactionId: 'KC-TXN-00074',
    farmerName: 'Harbhajan Gill (Kurukshetra)',
    buyerName: 'Haryana Grain Traders',
    cropName: 'Mustard',
    issue: 'Delay in second payout tranche beyond agreed 48-hour escrow window.',
    reportedBy: 'farmer',
    createdAt: '2026-08-26',
    status: 'RESOLVED',
    resolutionNotes: 'Escrow released automatically following digital weighbridge slip verification.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'counter',
    title: '🤝 Counter Offer Received',
    message: 'ABC Foods offered ₹2,430/q for your Wheat (Grade A - 500 KG). Tap to view and accept.',
    timestamp: '5m ago',
    read: false,
    actionTab: 'offers'
  },
  {
    id: 'notif-2',
    type: 'weather',
    title: '🌧 Heavy Rainfall Risk in Karnal',
    message: '72% rain probability in 3 days. AI suggests selling Wheat within 72 hrs or booking covered storage.',
    timestamp: '1h ago',
    read: false,
    actionTab: 'weather'
  },
  {
    id: 'notif-3',
    type: 'market',
    title: '📈 Wheat Market Price Up +6.4%',
    message: 'Karnal mandi price increased to ₹2,420/q driven by robust regional processing demand.',
    timestamp: '3h ago',
    read: true,
    actionTab: 'market'
  },
  {
    id: 'notif-4',
    type: 'offer',
    title: '💰 New Buyer Match Detected',
    message: 'ITC Agri Business posted a new requirement matching your Grade A Wheat inventory.',
    timestamp: '5h ago',
    read: true,
    actionTab: 'offers'
  }
];
