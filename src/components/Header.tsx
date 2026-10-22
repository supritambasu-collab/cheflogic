import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { ChefLogixLogo } from './ChefLogixLogo';
import { getCurrentUser, UserAccount } from '../utils/authStore';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenTrialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenTrialModal }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(getCurrentUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('cheflogic_auth_changed', handleAuthChange);
    return () => window.removeEventListener('cheflogic_auth_changed', handleAuthChange);
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-[#1A2238]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-left transition-opacity hover:opacity-90"
          aria-label="ChefLogix Home"
        >
          <ChefLogixLogo size="sm" />
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer hover:text-white ${
              currentView === 'home' ? 'text-[#D4AF37]' : ''
            }`}
          >
            Overview
          </button>
          <a
            href="#commercial-studio"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('commercial-studio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Recipe Studio</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0F382C] border border-[#1a5c48] text-emerald-300 font-mono-num font-semibold">Live Pro</span>
          </a>
          <a
            href="#matrix"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors"
          >
            Menu Matrix
          </a>
          <a
            href="#calculator"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors"
          >
            ROI Calculator
          </a>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer hover:text-white ${
              currentView === 'about' ? 'text-[#D4AF37]' : ''
            }`}
          >
            Our Mission
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors cursor-pointer hover:text-white ${
              currentView === 'contact' ? 'text-[#D4AF37]' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#101524] border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all cursor-pointer shadow-sm"
              title={`${currentUser.fullName} (${currentUser.restaurantName})`}
            >
              <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1A2238] font-serif-culinary font-bold text-[11px] flex items-center justify-center">
                {currentUser.fullName.charAt(0)}
              </div>
              <span className="text-xs text-white font-medium hidden sm:inline">
                {currentUser.fullName.split(' ')[0]}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`hidden sm:inline-flex text-xs uppercase tracking-widest px-3 py-2 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'login' ? 'text-[#D4AF37] font-semibold' : 'text-[#cbd5e1] hover:text-white'
              }`}
            >
              Login
            </button>
          )}

          <button
            onClick={onOpenTrialModal}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.98] rounded transition-all whitespace-nowrap shadow-md shadow-[#D4AF37]/20 cursor-pointer"
          >
            Start 3-Month Free Trial
          </button>
        </div>
      </div>
    </header>
  );
};
