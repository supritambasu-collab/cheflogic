import React from 'react';

interface ChefLogicLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const ChefLogicLogo: React.FC<ChefLogicLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }[size];

  const textStyles = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Emblem Mark */}
      <div className={`relative ${iconDimensions} rounded-lg bg-gradient-to-br from-[#0F382C] via-[#1A2238] to-[#101524] border border-[#D4AF37]/50 flex items-center justify-center p-1.5 shadow-md shrink-0 transition-transform hover:scale-105`}>
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoInnerGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E08C" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#94741B" />
            </linearGradient>
          </defs>

          {/* Crown Base */}
          <rect x="10" y="29" width="20" height="3.5" rx="1" fill="url(#logoInnerGold)" />

          {/* Crown Silhouette */}
          <path
            d="M12 27 C10 22, 6 21, 8 15 C10 10, 16 11, 18 16 C19 10, 21 10, 22 16 C24 11, 30 10, 32 15 C34 21, 30 22, 28 27 Z"
            stroke="url(#logoInnerGold)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mathematical Center Flutes */}
          <line x1="20" y1="16" x2="20" y2="27" stroke="url(#logoInnerGold)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M15 19 C16 22, 16 24, 17 27" stroke="url(#logoInnerGold)" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M25 19 C24 22, 24 24, 23 27" stroke="url(#logoInnerGold)" strokeWidth="1.1" strokeLinecap="round" />

          {/* Diamond Spire */}
          <polygon points="20,7 22,10 20,13 18,10" fill="url(#logoInnerGold)" />
        </svg>
      </div>

      {/* Typographic Lockup */}
      <div className="flex flex-col text-left">
        <span className={`font-serif-culinary tracking-wide text-white leading-none ${textStyles}`}>
          Chef<span className="text-[#D4AF37] font-medium">Logic</span>
        </span>
        {showSubtitle && (
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mt-1">
            Culinary Intelligence
          </span>
        )}
      </div>
    </div>
  );
};
