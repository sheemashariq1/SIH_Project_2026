import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { FarmerPortal } from './components/farmer/FarmerPortal';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';

const GOOGLE_CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) ||
  '526438262455-dg3oaojejk809ipbmul1lni4salh3398.apps.googleusercontent.com';

const MainAppContent: React.FC = () => {
  const { role, isAuthOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#F8FBF8] text-gray-900 flex flex-col font-sans selection:bg-[#14532D] selection:text-[#FACC15]">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Dynamic View Router based on user role */}
      <div className="flex-1">
        {role === 'landing' && <LandingPage />}
        {role === 'farmer' && <FarmerPortal />}
        {role === 'buyer' && <BuyerDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </div>

      {/* Global Authentication / Sign In Modal */}
      {isAuthOpen && <AuthModal />}
    </div>
  );
};

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </GoogleOAuthProvider>
  );
}


