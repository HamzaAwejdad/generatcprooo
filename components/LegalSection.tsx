import React from 'react';
import { CONTACT_CHANNEL_URL } from '../constants';
import { IconTelegram } from './Icons';

const LegalSection = () => {
  return (
    <div className="bg-slate-950 border-t border-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* About Us */}
        <section className="text-center">
          <h3 className="text-xl font-bold text-white mb-4 font-tech">About GeneratCPro</h3>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            GeneratCPro is a smart automation platform designed to generate verified access links instantly.
            Powered by Telegram bots, it ensures speed, simplicity, and secure redirection for users worldwide.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Privacy Policy */}
          <section>
            <h4 className="text-lg font-bold text-neon-cyan mb-3 font-tech">Privacy Policy</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
                No personal data collection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
                No IP storage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
                No cookies or tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
                All redirections handled securely through Telegram
              </li>
            </ul>
          </section>

          {/* Terms of Use */}
          <section>
            <h4 className="text-lg font-bold text-neon-purple mb-3 font-tech">Terms of Use</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                All links are provided “as-is”
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                No responsibility for third-party Telegram content
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                Abuse, automation, or misuse may result in restriction
              </li>
            </ul>
          </section>
        </div>

        {/* Contact */}
        <section className="text-center pt-8 border-t border-slate-900">
          <h4 className="text-lg font-bold text-white mb-6 font-tech">Need Support?</h4>
          <a 
            href={CONTACT_CHANNEL_URL}
            className="inline-flex items-center gap-3 bg-[#229ED9] hover:bg-[#1e8bc0] text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <IconTelegram className="w-5 h-5" />
            Contact via Telegram
          </a>
        </section>

      </div>
    </div>
  );
};

export default LegalSection;