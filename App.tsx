import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SmileCam } from './components/SmileCam';
import { Wallet } from './components/Wallet';
import { Leaderboard } from './components/Leaderboard';
import { AppState, User } from './types';
import { getUser } from './services/mockBackend';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<User>(getUser());

  // Listen for storage changes to update UI across components
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom event for local updates
    window.addEventListener('local-storage-update', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleStorageChange);
    };
  }, []);

  const handleEarn = (amount: number) => {
    // Trigger update
    setUser(getUser());
  };

  const renderContent = () => {
    switch (currentTab) {
      case AppState.LANDING:
        return <Hero onGetStarted={() => setCurrentTab(AppState.CAMERA)} />;
      case AppState.CAMERA:
        return <SmileCam onEarn={handleEarn} user={user} />;
      case AppState.WALLET:
        return <Wallet />;
      case AppState.LEADERBOARD:
        return <Leaderboard />;
      default:
        return <Hero onGetStarted={() => setCurrentTab(AppState.CAMERA)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
      <main className="relative z-10">
        {renderContent()}
      </main>
      
      {currentTab !== AppState.LANDING && (
        <Navigation 
          currentTab={currentTab} 
          onTabChange={setCurrentTab} 
          user={user} 
        />
      )}
    </div>
  );
};

export default App;