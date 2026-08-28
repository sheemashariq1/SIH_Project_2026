import React from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerSidebar } from '../layout/FarmerSidebar';
import { FarmerMobileNav } from '../layout/FarmerMobileNav';
import { FarmerDashboard } from './FarmerDashboard';
import { MyCrops } from './MyCrops';
import { AICropScanPage } from './AICropScanPage';
import { MarketIntelligence } from './MarketIntelligence';
import { WeatherScreen } from './WeatherScreen';
import { PredictionsPage } from './PredictionsPage';
import { SellWizard } from './SellWizard';
import { OffersAndBargaining } from './OffersAndBargaining';
import { LogisticsAndStorage } from './LogisticsAndStorage';
import { TransactionTracker } from './TransactionTracker';
import { FarmerNotifications } from './FarmerNotifications';
import { FarmerProfile } from './FarmerProfile';

export const FarmerPortal: React.FC = () => {
  const { farmerTab } = useApp();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#F8FBF8]">
      {/* Desktop Sidebar */}
      <FarmerSidebar />

      {/* Main View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8 overflow-x-hidden">
        {farmerTab === 'home' && <FarmerDashboard />}
        {farmerTab === 'crops' && <MyCrops />}
        {farmerTab === 'ai' && <AICropScanPage />}
        {farmerTab === 'market' && <MarketIntelligence />}
        {farmerTab === 'weather' && <WeatherScreen />}
        {farmerTab === 'pred' && <PredictionsPage />}
        {farmerTab === 'sell' && <SellWizard />}
        {farmerTab === 'offers' && <OffersAndBargaining />}
        {farmerTab === 'log' && <LogisticsAndStorage />}
        {farmerTab === 'txn' && <TransactionTracker />}
        {farmerTab === 'notifications' && <FarmerNotifications />}
        {farmerTab === 'profile' && <FarmerProfile />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <FarmerMobileNav />
    </div>
  );
};
