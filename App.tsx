import React, { useState, useEffect } from 'react';
import { fetchActiveLinks } from './services/sheetService';
import { SheetRow, FetchStatus } from './types';
import { TELEGRAM_BOT_URL } from './constants';
import Generator from './components/Generator';
import Stats from './components/Stats';
import LinkList from './components/LinkList';
import LegalSection from './components/LegalSection';
import { IconShield, IconTelegram, IconLoader } from './components/Icons';
import AdBanner from './components/AdBanner';

function App() {
  const [links, setLinks] = useState<SheetRow[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const loadData = async () => {
      setFetchStatus('loading');
      const data = await fetchActiveLinks();
      setLinks(data);
      setFetchStatus('success');
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden font-sans selection:bg-neon-cyan/30 selection:text-white">
      
      {/* 1. Header (Sticky) */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 shadow-lg shadow-cyan-500/20">
              <img 
                src="https://ik.imagekit.io/s4uplus/photo_2025-12-19_10-21-22.jpg?updatedAt=1766507653207" 
                alt="GeneratCPro Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-tech font-bold text-white tracking-wide text-lg leading-tight">GeneratCPro</span>
              <div className="flex items-center gap-1">
                <IconShield className="w-3 h-3 text-neon-green" />
                <span className="text-[10px] text-neon-green font-bold uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>

          <a 
            href={TELEGRAM_BOT_URL}
            className="hidden sm:flex items-center gap-2 bg-[#229ED9] hover:bg-[#1e8bc0] text-white text-sm font-bold py-2 px-4 rounded-full transition-all hover:shadow-[0_0_15px_rgba(34,158,217,0.4)]"
          >
            <IconTelegram className="w-4 h-4" />
            <span>Generate from Telegram</span>
          </a>
          {/* Mobile Icon Only */}
          <a href={TELEGRAM_BOT_URL} className="sm:hidden text-[#229ED9]">
             <IconTelegram className="w-8 h-8" />
          </a>
        </div>
      </header>

      <main className="pt-24 pb-12">
        {/* 2. Hero Section */}
        <section className="text-center px-4 mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-purple blur-[120px] opacity-20 -z-10 rounded-full pointer-events-none"></div>
          
          <span className="inline-block py-1 px-3 rounded-full bg-slate-900 border border-slate-800 text-neon-cyan text-xs font-mono mb-6 animate-fade-in-up">
            V 2.0.4 • SYSTEM ONLINE
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black font-tech text-white mb-6 tracking-tight leading-tight">
            Generate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple neon-text">Valid Link</span> Instantly
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Fast, Secure, and Powered by Telegram Automation. <br className="hidden md:block"/>
            Access premium resources with a single click.
          </p>

          <button 
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce bg-white text-slate-900 hover:bg-slate-200 font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-colors"
          >
            Start Generator ↓
          </button>
        </section>

        {/* Ad Space 1 */}
        <AdBanner />

        {/* 3. Generator Section */}
        <Generator 
          links={links} 
          loading={fetchStatus === 'loading'} 
        />

        {/* Ad Space 2 */}
        <AdBanner />

        {/* 4. Trust & Stats */}
        <Stats />

        {/* Ad Space 3 */}
        <AdBanner />

        {/* 5. Available Premium Links */}
        <LinkList 
          links={links} 
          loading={fetchStatus === 'loading'} 
        />
        
        {/* Ad Space 4 */}
        <AdBanner />
      </main>

      {/* 6-9. Legal Sections */}
      <LegalSection />

      {/* Ad Space 5 */}
      <AdBanner />

      {/* 10. Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
           <IconTelegram className="w-5 h-5 opacity-50" />
           <span className="font-tech font-bold text-slate-300">GeneratCPro</span>
        </div>
        <p className="text-xs text-slate-600">
          © 2026 GeneratCPro – All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;