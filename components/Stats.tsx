import React, { useState, useEffect } from 'react';
import { SITE_STATS } from '../constants';
import { IconUsers, IconLink, IconShield, IconGlobe } from './Icons';

const Stats = () => {
  const [liveUsers, setLiveUsers] = useState(SITE_STATS.activeUsersBase);

  useEffect(() => {
    // Randomly fluctuate the live user count
    const interval = setInterval(() => {
      setLiveUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return prev + change;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Active Users', 
      value: liveUsers.toLocaleString(), 
      icon: <IconUsers className="w-6 h-6 text-neon-cyan" />,
      color: 'border-neon-cyan/20'
    },
    { 
      label: 'Links Generated', 
      value: SITE_STATS.linksGeneratedBase.toLocaleString() + '+', 
      icon: <IconLink className="w-6 h-6 text-neon-purple" />,
      color: 'border-neon-purple/20'
    },
    { 
      label: 'Success Rate', 
      value: SITE_STATS.successRate, 
      icon: <IconShield className="w-6 h-6 text-neon-green" />,
      color: 'border-neon-green/20'
    },
    { 
      label: 'Countries', 
      value: SITE_STATS.countries, 
      icon: <IconGlobe className="w-6 h-6 text-blue-400" />,
      color: 'border-blue-400/20'
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`glass-panel p-6 rounded-xl border ${stat.color} text-center hover:bg-slate-800/50 transition-colors`}>
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold font-tech text-white mb-1">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;