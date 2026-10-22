import React from 'react';

interface ChefLogixLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const ChefLogixLogo: React.FC<ChefLogixLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = ''
}) => {
  const textStyles = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Typographic Lockup with Chef Cap on top of 'i' */}
      <div className="flex flex-col text-left">
        <span 
          aria-label="ChefLogix"
          className={`font-serif-culinary tracking-wide text-white leading-none ${textStyles} inline-flex items-baseline`}
        >
          <span>Chef</span>
          <span className="text-[#D4AF37] font-medium">Log</span>
          <span className="relative inline-flex items-baseline text-[#D4AF37] font-medium">
            {/* Chef Cap perched on top of i */}
            <svg 
              viewBox="0 0 24 20" 
              className="absolute -top-[0.46em] left-1/2 -translate-x-[48%] w-[0.88em] h-[0.72em] pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`chefCapGold_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#9C7A1D" />
                </linearGradient>
              </defs>
              {/* Toque blanche puffy folds */}
              <path
                d="M5.5 13.5 C3.8 12.5 3 9.5 4.8 7.2 C5.8 5.8 7.8 5.4 9.2 6.1 C10 4.2 12.2 3.2 14.2 3.8 C15.8 4.2 16.8 5.5 17.2 6.8 C18.8 6.4 20.6 7.5 21 9.4 C21.4 11.4 20.2 13 18.5 13.5 Z"
                fill={`url(#chefCapGold_${size})`}
              />
              {/* Fold accents */}
              <path d="M8.5 13.5 V8" stroke="#1A2238" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
              <path d="M12 13.5 V5.5" stroke="#1A2238" strokeWidth="0.9" strokeLinecap="round" opacity="0.45" />
              <path d="M15.5 13.5 V8" stroke="#1A2238" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
              {/* Base Headband of the chef cap */}
              <rect x="5" y="13" width="14" height="3" rx="0.8" fill={`url(#chefCapGold_${size})`} />
            </svg>
            <span className="inline-block">ı</span>
          </span>
          <span className="text-[#D4AF37] font-medium">x</span>
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

export const ChefLogicLogo = ChefLogixLogo;
