import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, History, Wallet as WalletIcon, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { getHistory, getUser, withdrawFunds } from '../services/mockBackend';
import { SmileRecord, User } from '../types';

export const Wallet: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<SmileRecord[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setHistory(getHistory());
  }, []);

  const handleWithdraw = async () => {
    if (!user || user.balance <= 0) return;
    setIsWithdrawing(true);
    await withdrawFunds();
    setUser(getUser());
    setIsWithdrawing(false);
    alert("Withdrawal initiated! Check your (mock) wallet.");
  };

  const chartData = history.slice(0, 10).reverse().map((h, i) => ({
    name: i.toString(),
    score: h.score,
    reward: h.reward
  }));

  if (!user) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-24 pb-32 px-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <WalletIcon size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-slate-400 mb-2">Total Balance</div>
            <div className="text-5xl font-bold text-white mb-6">${user.balance.toFixed(2)} <span className="text-lg text-slate-500">USDC</span></div>
            <div className="flex gap-4">
              <Button onClick={handleWithdraw} disabled={isWithdrawing || user.balance === 0}>
                {isWithdrawing ? 'Processing...' : 'Withdraw Funds'}
              </Button>
              <Button variant="ghost" className="gap-2">
                <Download size={18} /> Export CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-col justify-center">
           <div className="mb-4">
             <div className="text-slate-400 text-sm mb-1">Total Smiles</div>
             <div className="text-3xl font-bold">{user.totalSmiles}</div>
           </div>
           <div>
             <div className="text-slate-400 text-sm mb-1">Average Score</div>
             <div className="text-3xl font-bold text-purple-400">88%</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ArrowUpRight className="text-green-400" /> Earnings Performance
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="reward" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <History className="text-blue-400" /> Recent Activity
          </h3>
          <div className="space-y-4 max-h-[250px] overflow-y-auto no-scrollbar">
            {history.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No smiles recorded yet.</p>
            ) : (
              history.slice(0, 10).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={record.imageUrl} alt="Smile" className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                    <div>
                      <div className="text-sm font-medium">Genuine Smile</div>
                      <div className="text-xs text-slate-500">{new Date(record.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">+{record.reward.toFixed(3)} USDC</div>
                    <div className="text-xs text-slate-500">{Math.round(record.score)}% Score</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};