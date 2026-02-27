import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Play, Sparkles, TrendingUp, Users } from 'lucide-react';
import { SPONSORS, MOCK_LEADERBOARD } from '../constants';
import { AppState } from '../types';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen pt-20 pb-32 flex flex-col items-center justify-center relative overflow-hidden bg-[#020617]">
      
      {/* --- CINEMATIC BACKGROUND START --- */}
      
      {/* 1. Base Image (Deep Navy/Purple Network) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=3200&auto=format&fit=crop"
          alt="Futuristic Web3 Background" 
          className="w-full h-full object-cover opacity-80 blur-[2px] scale-105"
        />
        {/* Cinematic Vignette & Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-70"></div>
      </div>

      {/* 2. Digital Dust / Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* 3. Floating Ethereal Orbs (Subtle) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
        {/* Top Center Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[500px] bg-indigo-500/10 rounded-[100%] blur-[100px] animate-pulse-slow mix-blend-screen"></div>
        
        {/* Floating Particles mimicking digital dust */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400/50 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle Neural Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M0,500 Q 400,300 800,500 T 1600,500" fill="none" stroke="url(#lineGrad)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDuration: '8s' }} />
        </svg>
      </div>

      {/* --- CONTENT START --- */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-cyan-300 mb-8 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.15)] bg-black/20 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span className="font-medium tracking-wide">Web3 AI Facial Recognition is Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 text-white drop-shadow-2xl"
          >
            Turn Smiles Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 drop-shadow-lg filter pb-2">
              Real Rewards 😄
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md"
          >
            Our advanced AI verifies genuine happiness and rewards you with crypto instantly. Join the happiest economy on earth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button size="lg" onClick={onGetStarted} className="shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] border border-white/10 text-lg px-10">
              Smile & Earn Now
            </Button>
            <Button variant="outline" size="lg" className="gap-2 backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 text-lg px-8">
              <Play size={18} fill="currentColor" /> Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Community Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-card rounded-2xl p-8 mb-24 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/30 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1 text-white">Loved by the Community</h3>
              <p className="text-slate-400 text-sm">Join 10,000+ smiling members</p>
            </div>
            <div className="flex -space-x-4">
              {MOCK_LEADERBOARD.map((user, i) => (
                <div key={i} className="relative transition-transform hover:-translate-y-1 hover:z-10 cursor-pointer group">
                  <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border-2 border-[#0B0F19] group-hover:border-indigo-500 transition-colors" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-[10px] text-black font-bold px-1.5 py-0.5 rounded-full border border-[#0B0F19]">
                    99+
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-[#0B0F19] flex items-center justify-center text-xs text-slate-400 font-medium hover:bg-slate-700 transition-colors cursor-pointer">
                +10k
              </div>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Users, title: "1. Smile", desc: "Look at the camera and give your best genuine smile." },
            { icon: TrendingUp, title: "2. Verify", desc: "AI analyzes facial landmarks to ensure authenticity." },
            { icon: Sparkles, title: "3. Earn", desc: "Get USDC dropped directly into your linked wallet." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] group bg-gradient-to-br from-white/[0.03] to-transparent"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 shadow-inner">
                <item.icon className="text-indigo-300 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Sponsors */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8">Backed By</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {SPONSORS.map((s, i) => (
              <div key={i} className="text-2xl font-bold flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                <span className="w-8 h-8 bg-white/5 border border-white/10 rounded flex items-center justify-center text-xs group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">{s.logo}</span>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};