import React, { useState } from 'react';
import { ExternalLink, Check, Copy, X, Sparkles, ChefHat, ShieldCheck, ArrowRight } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CHEF3MONTHFREE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunch = () => {
    window.open('https://cheflogic.ai.studio/', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#1A2238] border border-[#D4AF37]/40 rounded-lg p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#94a3b8] hover:text-white transition-colors p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0F382C] via-[#1A2238] to-[#101524] border border-[#D4AF37]/50 flex items-center justify-center p-1.5 shrink-0 shadow-md">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="modalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5E08C" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#94741B" />
                </linearGradient>
              </defs>
              <rect x="10" y="29" width="20" height="3.5" rx="1" fill="url(#modalGold)" />
              <path
                d="M12 27 C10 22, 6 21, 8 15 C10 10, 16 11, 18 16 C19 10, 21 10, 22 16 C24 11, 30 10, 32 15 C34 21, 30 22, 28 27 Z"
                stroke="url(#modalGold)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="20" y1="16" x2="20" y2="27" stroke="url(#modalGold)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M15 19 C16 22, 16 24, 17 27" stroke="url(#modalGold)" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M25 19 C24 22, 24 24, 23 27" stroke="url(#modalGold)" strokeWidth="1.1" strokeLinecap="round" />
              <polygon points="20,7 22,10 20,13 18,10" fill="url(#modalGold)" />
            </svg>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">VIP Hospitality Access</span>
            <h3 className="text-2xl font-serif-culinary text-white">Activate 3-Month Free Trial</h3>
          </div>
        </div>

        <p className="text-sm text-[#cbd5e1] mt-3 leading-relaxed">
          Welcome to the ChefLogic culinary workspace. Your kitchen is granted 90 days of complete, unrestricted access to the intelligence engine at{' '}
          <strong className="text-white font-mono">https://cheflogic.ai.studio/</strong>.
        </p>

        {/* Access Pass Code Box */}
        <div className="my-6 p-4 bg-[#101524] border border-[#273352] rounded flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#94a3b8] block">Exclusive Trial Passcode</span>
            <span className="font-mono text-base font-bold text-[#D4AF37] tracking-wider">CHEF3MONTHFREE</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1A2238] hover:bg-[#222B45] border border-[#273352] hover:border-[#D4AF37] rounded transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Copy Pass</span>
              </>
            )}
          </button>
        </div>

        {/* What is Included */}
        <div className="space-y-2.5 mb-7 text-xs text-[#cbd5e1]">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>Zero upfront credit card required · Instant access for executive chefs and culinary managers</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>Commercial recipe costing engine & multi-authority food regulatory matrix</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Full Menu Engineering Boston Matrix analysis & POS sync</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleLaunch}
            className="w-full py-3 px-5 text-sm font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
          >
            <span>Proceed to cheflogic.ai.studio</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 text-xs font-medium text-[#94a3b8] hover:text-white transition-colors cursor-pointer text-center"
          >
            Stay on Overview
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-[#64748b]">
            Direct portal destination: <span className="font-mono text-[#D4AF37]">https://cheflogic.ai.studio/</span>
          </span>
        </div>
      </div>
    </div>
  );
};
