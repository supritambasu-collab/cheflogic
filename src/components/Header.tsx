import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { ChefLogicLogo } from './ChefLogicLogo';
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
    <header className="sticky top-0 z-50 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#25282c]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-left transition-opacity hover:opacity-90"
          aria-label="ChefLogic Home"
        >
          <ChefLogicLogo size="sm" />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a7a29a]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer hover:text-[#ede8df] ${
              currentView === 'home' ? 'text-[#c5a059]' : ''
            }`}
          >
            Overview
          </button>
          <a
            href="#engine"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-[#ede8df] transition-colors"
          >
            Kitchen Engine
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
            className="hover:text-[#ede8df] transition-colors"
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
            className="hover:text-[#ede8df] transition-colors"
          >
            ROI Calculator
          </a>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer hover:text-[#ede8df] ${
              currentView === 'about' ? 'text-[#c5a059]' : ''
            }`}
          >
            Our Mission
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors cursor-pointer hover:text-[#ede8df] ${
              currentView === 'contact' ? 'text-[#c5a059]' : ''
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
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#16181b] border border-[#c5a059]/40 hover:border-[#c5a059] transition-all cursor-pointer shadow-sm"
              title={`${currentUser.fullName} (${currentUser.restaurantName})`}
            >
              <div className="w-5 h-5 rounded-full bg-[#c5a059] text-[#0c0d0e] font-serif-culinary font-bold text-[11px] flex items-center justify-center">
                {currentUser.fullName.charAt(0)}
              </div>
              <span className="text-xs text-[#ede8df] font-medium hidden sm:inline">
                {currentUser.fullName.split(' ')[0]}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`hidden sm:inline-flex text-xs uppercase tracking-widest px-3 py-2 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'login' ? 'text-[#c5a059] font-semibold' : 'text-[#d5cfc4] hover:text-[#ede8df]'
              }`}
            >
              Login
            </button>
          )}

          <button
            onClick={onOpenTrialModal}
            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.98] rounded transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            Start 3-Month Free Trial
          </button>
        </div>
      </div>
    </header>
  );
};
