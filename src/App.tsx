import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { CopyrightPage } from './pages/CopyrightPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Sync with browser hash for shareable links & SEO friendliness
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['about', 'contact', 'terms', 'copyright', 'privacy', 'login', 'admin'].includes(hash)) {
        setCurrentView(hash as PageView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || ['engine', 'matrix', 'calculator'].includes(hash)) {
        setCurrentView('home');
      }
    };

    // Check initial hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    if (view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${view}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#101524] text-[#ede8df] flex flex-col selection:bg-[#D4AF37] selection:text-[#1A2238]">
      {/* Top Hospitality Privilege Ribbon */}
      {showTopBanner && (
        <div className="bg-[#1A2238] border-b border-[#D4AF37]/20 px-4 py-2 text-xs text-[#cbd5e1] relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong className="text-white font-medium">ChefLogix Enterprise:</strong>{' '}
                <span className="text-[#D4AF37] font-semibold">Commercial Recipe Costing & Multi-Authority Regulatory Matrix.</span>{' '}
                <span className="text-[#94a3b8] hidden lg:inline">FDA 21 CFR 101.9 · EU 1169/2011 · GCC GSO 2233 · FSSAI Certified.</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#commercial-studio"
                onClick={(e) => {
                  if (currentView !== 'home') {
                    e.preventDefault();
                    handleNavigate('home');
                    setTimeout(() => {
                      document.getElementById('commercial-studio')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Live Recipe Studio ↓</span>
              </a>
              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="text-xs font-medium text-[#cbd5e1] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <span>90-Day Free Pass</span>
              </button>
              <button
                onClick={() => setShowTopBanner(false)}
                className="text-[#94a3b8] hover:text-white p-1 cursor-pointer transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      {/* Dynamic View Body */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onOpenTrialModal={() => setIsTrialModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onOpenTrialModal={() => setIsTrialModalOpen(true)}
          />
        )}
        {currentView === 'about' && (
          <AboutPage onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}
        {currentView === 'contact' && (
          <ContactPage onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}
        {currentView === 'terms' && (
          <TermsPage onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}
        {currentView === 'copyright' && (
          <CopyrightPage onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}
        {currentView === 'privacy' && (
          <PrivacyPage onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}
        {currentView === 'admin' && (
          <AdminDashboard onNavigate={handleNavigate} />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      {/* VIP 3-Month Free Trial Activation Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />
    </div>
  );
}
