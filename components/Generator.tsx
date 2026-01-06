import React, { useState, useEffect } from 'react';
import { SheetRow, GeneratorStatus } from '../types';
import { IconBolt, IconLoader } from './Icons';

interface GeneratorProps {
  links: SheetRow[];
  loading: boolean;
}

const Generator: React.FC<GeneratorProps> = ({ links, loading }) => {
  const [status, setStatus] = useState<GeneratorStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulate "Last generated X seconds ago"
  useEffect(() => {
    const interval = setInterval(() => {
      setLastGenerated(prev => prev + Math.floor(Math.random() * 5));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    // If no links, allow "Retry" (reload page)
    if (!loading && links.length === 0) {
      window.location.reload();
      return;
    }

    if (status !== 'idle' || links.length === 0) return;

    setErrorMessage(null); // Clear any previous errors
    // 1. Verifying
    setStatus('verifying');
    
    // 2. Processing (Progress Bar)
    setTimeout(() => {
      setStatus('processing');
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          finishGeneration();
        } else {
          setProgress(currentProgress);
        }
      }, 100); // 100ms * 20 steps = 2 seconds approx
    }, 1500);
  };

  const finishGeneration = () => {
    // Select Random Link
    const randomIndex = Math.floor(Math.random() * links.length);
    const selectedLink = links[randomIndex];

    // Validate the link before showing success
    if (!selectedLink || !selectedLink.url) {
        setStatus('idle');
        setErrorMessage("Error: Unable to generate a valid link. Please try again.");
        return;
    }

    // Success
    setStatus('completed');
    
    // Show success for a moment then redirect
    setTimeout(() => {
      window.location.href = selectedLink.url;
    }, 1000);
  };

  const getButtonText = () => {
    if (loading) return "Loading Links...";
    if (links.length === 0) return "No Links Found (Click to Retry)";
    if (status === 'idle') return "Generate Link";
    if (status === 'verifying') return "Verifying Request...";
    if (status === 'processing') return "Generating...";
    if (status === 'completed') return "Success! Redirecting...";
    return "Generate Link";
  };

  // Button should be enabled if links=0 (for retry) or if valid idle state
  const isButtonDisabled = status !== 'idle' && status !== 'completed' && loading;

  return (
    <div id="generator" className="w-full max-w-2xl mx-auto my-12 p-1">
      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-neon-cyan/20">
        
        {/* Header inside Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-neon-cyan mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <IconBolt className="w-8 h-8 text-neon-cyan" />
          </div>
          <h2 className="text-2xl font-bold font-tech text-white mb-2">Ready to Generate?</h2>
          <p className="text-slate-400">Secure • Encrypted • Instant</p>
        </div>

        {/* Action Area */}
        <div className="relative z-10">
          <button
            onClick={handleGenerate}
            disabled={isButtonDisabled}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide transition-all duration-300
              ${!isButtonDisabled
                ? 'bg-gradient-to-r from-neon-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}
            `}
          >
            <div className="flex items-center justify-center gap-3">
              {(status === 'verifying' || status === 'processing' || loading) && <IconLoader className="w-5 h-5" />}
              {getButtonText()}
            </div>
          </button>

          {/* Progress Bar Container */}
          {(status === 'processing' || status === 'completed') && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-neon-cyan mb-1 font-mono">
                <span>ENCRYPTING CONNECTION</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center text-red-400 text-sm font-semibold animate-pulse">
              {errorMessage}
            </div>
          )}
          
          {/* Empty Link Warning */}
          {!loading && links.length === 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center text-yellow-200 text-sm font-semibold">
              Warning: Connection to database successful, but no active links were found.
            </div>
          )}

          {/* Success Message */}
          {status === 'completed' && !errorMessage && (
            <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg text-center text-neon-green text-sm font-semibold animate-bounce">
              Link Generated Successfully! Redirecting...
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>DAILY LIMIT: <span className="text-slate-300">1/USER</span></span>
          <span>LAST GEN: <span className="text-neon-cyan">{lastGenerated}s AGO</span></span>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-purple blur-[80px] opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan blur-[80px] opacity-20"></div>
      </div>
    </div>
  );
};

export default Generator;