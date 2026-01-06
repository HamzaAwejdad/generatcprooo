import React from 'react';
import { SheetRow } from '../types';
import { TELEGRAM_BOT_URL, CONTACT_CHANNEL_URL, COMMUNITY_CHAT_URL } from '../constants';
import { IconTelegram, IconUsers, IconBolt } from './Icons';

interface LinkListProps {
  links: SheetRow[];
  loading: boolean;
}

const LinkList: React.FC<LinkListProps> = () => {
  // We ignore the links prop to hide the database from the UI
  // Instead, we show official channels/ecosystem

  const channels = [
    {
      name: "Official Updates",
      description: "Get real-time status updates, maintenance alerts, and new features.",
      subscribers: "14.2K",
      url: CONTACT_CHANNEL_URL,
      icon: <img src="https://ik.imagekit.io/s4uplus/GeneratCPro%20news.jpeg" alt="Updates" className="w-full h-full object-cover" />,
      color: "from-blue-500 to-cyan-400",
      buttonText: "JOIN CHANNEL"
    },
    {
      name: "Start Bot",
      description: "Access the generator directly from Telegram for faster access.",
      subscribers: "ONLINE",
      url: TELEGRAM_BOT_URL,
      icon: <img src="https://ik.imagekit.io/s4uplus/GeneratCPro%20logo.png" alt="Bot" className="w-full h-full object-cover" />,
      color: "from-neon-purple to-fuchsia-500",
      buttonText: "START BOT"
    },
    {
      name: "Global Community",
      description: "Connect with thousands of active users. Share feedback, get help, and stay engaged with the ecosystem.",
      subscribers: "ACTIVE",
      url: COMMUNITY_CHAT_URL,
      icon: <img src="https://ik.imagekit.io/s4uplus/photo_2025-12-19_10-21-22.jpg?updatedAt=1766507653207" alt="Community" className="w-full h-full object-cover" />,
      color: "from-emerald-400 to-green-500",
      buttonText: "JOIN DISCUSSION"
    }
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-1 rounded-full bg-slate-900 border border-slate-800 mb-4">
           <div className="px-4 py-1 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
             Ecosystem
           </div>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white font-tech mb-4">
          Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Channels</span>
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Don't miss out. Join our official Telegram channels to stay updated and get exclusive access.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {channels.map((channel, idx) => (
          <a 
            key={idx}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            {/* Animated Glow Background */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${channel.color} rounded-2xl opacity-20 group-hover:opacity-70 blur transition duration-500 group-hover:duration-200`}></div>
            
            {/* Card Content */}
            <div className="relative h-full bg-slate-950 rounded-2xl p-6 border border-slate-800 group-hover:border-slate-700/0 transition-all duration-300 flex flex-col">
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 overflow-hidden`}>
                  {channel.icon}
                </div>
                <div className="py-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                  {channel.subscribers}
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-2 font-tech group-hover:text-neon-cyan transition-colors">
                {channel.name}
              </h4>
              
              <p className="text-sm text-slate-400 mb-8 leading-relaxed flex-grow">
                {channel.description}
              </p>

              <div className="mt-auto">
                <div className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-white group-hover:text-black border border-slate-800 group-hover:border-transparent text-center text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2">
                   {channel.buttonText}
                   <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>

            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LinkList;