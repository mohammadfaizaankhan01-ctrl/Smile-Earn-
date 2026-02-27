import React from 'react';
import { Camera, Wallet, Trophy, User as UserIcon, Home } from 'lucide-react';
import { AppState, User } from '../types';

interface NavigationProps {
  currentTab: AppState;
  onTabChange: (tab: AppState) => void;
  user: User;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange, user }) => {
  const navItems = [
    { id: AppState.LANDING, icon: Home, label: 'Home' },
    { id: AppState.CAMERA, icon: Camera, label: 'Smile Cam' },
    { id: AppState.WALLET, icon: Wallet, label: 'Wallet' },
    { id: AppState.LEADERBOARD, icon: Trophy, label: 'Ranks' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`
            relative px-6 py-3 rounded-full flex flex-col items-center justify-center transition-all duration-300
            ${currentTab === item.id 
              ? 'text-white bg-white/10' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'}
          `}
        >
          <item.icon size={20} className={currentTab === item.id ? 'text-cyan-400 mb-1' : 'mb-1'} />
          <span className="text-[10px] uppercase tracking-wider font-semibold">{item.label}</span>
          
          {currentTab === item.id && (
            <span className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full"></span>
          )}
        </button>
      ))}
      
      <div className="w-px h-8 bg-white/10 mx-2"></div>
      
      <div className="flex items-center gap-3 px-4">
        <div className="text-right hidden sm:block">
          <div className="text-xs text-slate-400">Balance</div>
          <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            ${user.balance.toFixed(2)}
          </div>
        </div>
        <img 
          src={user.avatarUrl} 
          alt="User" 
          className="w-10 h-10 rounded-full border-2 border-white/10"
        />
      </div>
    </nav>
  );
};