"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Server, Activity, ShieldCheck, Zap, Globe, MessageSquare, Battery, BatteryCharging, Menu } from 'lucide-react';

const targets = {
  pterodactyl: { 
    id: 'ptero', 
    name: 'Pterodactyl Panel', 
    url: 'https://panel.bynexhost.fun/',
    desc: 'Main Control Panel'
  },
  pve1: { 
    id: 'pve1', 
    name: 'Proxmox PVE 1', 
    url: 'https://pve.bynexhost.fun/',
    desc: 'Virtualization Node A' 
  },
  pve2: { 
    id: 'pve2', 
    name: 'Proxmox PVE 2', 
    url: 'https://pve2.bynexhost.fun/',
    desc: 'Virtualization Node B' 
  },
};

const ServerCard = ({ name, url, desc, isMain = false }) => {
  const [data, setData] = useState({ online: null, latency: 0 });

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`/api/check?url=${encodeURIComponent(url)}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setData({ online: false, latency: 0 });
      }
    };
    check();
    const interval = setInterval(check, 15000); // Refresh tiap 15 detik
    return () => clearInterval(interval);
  }, [url]);

  const isOnline = data.online;
  const isLoading = data.online === null;

  return (
    <div className={`relative group overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.01] 
      ${isMain ? 'p-8 bg-slate-900/80 border-slate-700' : 'p-6 bg-slate-900/50 border-slate-800'}
      ${isOnline ? 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]' : 'hover:border-red-500/50'}
    `}>
      {/* Background Glow Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-[80px] opacity-20 
        ${isOnline ? 'from-emerald-400 to-transparent' : 'from-red-500 to-transparent'}`} 
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
            {isMain ? <Server size={32} /> : <ShieldCheck size={24} />}
          </div>
          <div>
            <h3 className={`${isMain ? 'text-2xl' : 'text-lg'} font-bold text-white tracking-tight`}>{name}</h3>
            <p className="text-slate-400 text-sm">{desc}</p>
            <a href={url} target="_blank" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors mt-1 block truncate max-w-[200px] md:max-w-none">{url}</a>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
          {isLoading ? (
             <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
               <Activity size={18} /> <span className="text-sm font-mono">PINGING...</span>
             </div>
          ) : (
            <>
              <div className="text-right">
                <div className="text-xs text-slate-500 font-mono mb-1">LATENCY</div>
                <div className={`font-mono font-bold ${data.latency < 100 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {data.latency}ms
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider border 
                ${isOnline ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const uptime = 99.98; 

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30 font-sans">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-bold text-xl tracking-tight text-white">Bynex<span className="text-emerald-500">Host</span></span>
          </div>
          <Link href="/contact" className="hidden md:flex items-center gap-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all text-white border border-slate-700">
            <MessageSquare size={16} /> Support
          </Link>
          <Link href="/contact" className="md:hidden p-2 bg-slate-800 rounded-lg">
             <MessageSquare size={20} />
          </Link>
        </div>
      </nav>

      <main className="pt-28 pb-12 px-4 max-w-5xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">System Status</h1>
          <p className="text-slate-400">Live monitoring for BynexHost Infrastructure.</p>
        </div>

        
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 px-1">
            <Zap size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Core Service</span>
          </div>
          <ServerCard {...targets.pterodactyl} isMain={true} />
        </section>

      
        <div className="relative py-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-dashed border-slate-800"></div>
          </div>
          <div className="relative bg-[#020617] px-4">
             <span className="text-xs font-mono text-slate-600 uppercase border border-slate-800 px-3 py-1 rounded-full">Virtualization Nodes</span>
          </div>
        </div>

     
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ServerCard {...targets.pve1} />
          <ServerCard {...targets.pve2} />
        </section>

      
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-1 border border-slate-800 shadow-2xl">
          <div className="bg-[#020617] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            
          
            <div className="w-full md:w-1/2">
               <div className="flex justify-between text-sm mb-2 text-slate-400 font-mono">
                  <span>SYSTEM POWER</span>
                  <span className="text-emerald-400 flex items-center gap-1"><BatteryCharging size={14}/> CHARGING</span>
               </div>
               <div className="h-10 w-full bg-slate-800/50 rounded-lg p-1.5 relative overflow-hidden border border-slate-700">
                  {/* The Green Fill */}
                  <div className="h-full bg-emerald-500 rounded relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse" style={{ width: '98%' }}>
                    {/* Striped Pattern on Battery */}
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white mix-blend-difference z-10">100%</div>
               </div>
            </div>

          
            <div className="flex flex-col items-center md:items-end">
               <span className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Total Uptime</span>
               <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter">
                 {uptime}<span className="text-2xl text-emerald-500">%</span>
               </div>
               <p className="text-xs text-emerald-500/80 mt-1 font-mono">ALL SYSTEMS OPERATIONAL</p>
            </div>

          </div>
        </div>

      </main>

      <footer className="text-center py-8 text-slate-600 text-sm border-t border-slate-900">
        &copy; 2024 BynexHost. Monitor by <span className="text-slate-500">AunuXdev</span>.
      </footer>
    </div>
  );
}