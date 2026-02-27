import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { Trophy, Medal } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Top Smilers 🏆</h2>
        <p className="text-slate-400">Compete with global users to earn the most rewards.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">User</div>
          <div className="col-span-4 text-right">Total Earned</div>
        </div>
        
        {MOCK_LEADERBOARD.map((entry, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
            <div className="col-span-2 flex justify-center">
              {entry.rank === 1 ? (
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                  <Trophy size={16} />
                </div>
              ) : entry.rank === 2 ? (
                <div className="w-8 h-8 rounded-full bg-slate-300/20 text-slate-300 flex items-center justify-center">
                  <Medal size={16} />
                </div>
              ) : entry.rank === 3 ? (
                <div className="w-8 h-8 rounded-full bg-orange-700/20 text-orange-600 flex items-center justify-center">
                  <Medal size={16} />
                </div>
              ) : (
                <span className="text-slate-500 font-bold">{entry.rank}</span>
              )}
            </div>
            
            <div className="col-span-6 flex items-center gap-3">
              <img src={entry.avatarUrl} alt={entry.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium text-white">{entry.name}</div>
                <div className="text-xs text-slate-500">{entry.score} Smile Pts</div>
              </div>
            </div>
            
            <div className="col-span-4 text-right font-bold text-green-400">
              ${entry.earnings.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};