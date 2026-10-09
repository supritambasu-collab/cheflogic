import React from 'react';
import { PageView } from '../types';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenTrialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenTrialModal }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#25282c]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-2xl font-serif-culinary tracking-wide text-[#ede8df] hover:text-[#c5a059] transition-colors cursor-pointer text-left font-medium"
        >
          ChefLogic
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('login')}
            className={`hidden sm:inline-flex text-xs uppercase tracking-widest px-3 py-2 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'login' ? 'text-[#c5a059] font-semibold' : 'text-[#d5cfc4] hover:text-[#ede8df]'
            }`}
          >
            Login
          </button>
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
