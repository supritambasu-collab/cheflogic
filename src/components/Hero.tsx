import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  FileSpreadsheet, 
  Globe2, 
  Cpu,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { InstantProfitSimulator } from './InstantProfitSimulator';

interface HeroProps {
  onOpenTrialModal: () => void;
  onLoginClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onLoginClick }) => {
  const scrollToStudio = () => {
    const el = document.getElementById('commercial-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#273352] bg-gradient-to-b from-[#1A2238] via-[#101524] to-[#101524]">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-[#0F382C]/35 rounded-full pointer-events-none -z-10 blur-3xl" />
      <div className="absolute top-12 right-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/15 rounded-full pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 3-Second Eye-Catching Header Pill */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A2238] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Kitchen Financial Engine</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F382C] border border-[#1a5c48] text-emerald-200 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FDA · EU FIC · GCC GSO · FSSAI Standardized</span>
          </div>
        </div>

        {/* Marquee Headline - Instant Comprehension within 3 Seconds */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-culinary font-normal text-white leading-[1.12] tracking-tight text-balance">
            Stop Guessing Your Menu Margins.{' '}
            <span className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-8 font-serif-culinary font-medium">
              Know Exactly What Every Plate Earns.
            </span>
          </h1>

          {/* Subtitle - The Concrete Problem & High-Value Solution */}
          <p className="mt-4 sm:mt-5 text-base sm:text-xl text-[#cbd5e1] font-normal leading-relaxed max-w-3xl">
            Food costs silently consume 30% to 40% of restaurant revenue. ChefLogix calculates exact dish cost down to the gram, protects your kitchen against wholesale supplier spikes, and auto-detects 14 statutory allergens in 10 seconds.
          </p>
        </div>

        {/* Quick Proof Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#94a3b8]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>No Signup Required to Test</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>2,600+ Pre-Costed Ingredients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>14 Statutory Allergens Detected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Used by 1,400+ Hospitality Venues</span>
          </div>
        </div>

        {/* HERO CENTERPIECE: The 30-Second Interactive Plate Profit Simulator */}
        <div className="mt-8">
          <InstantProfitSimulator 
            onOpenTrialModal={onOpenTrialModal}
            onExploreFullStudio={scrollToStudio}
          />
        </div>

        {/* 4 Core Pillars: How ChefLogix Solves Critical Industry Bottlenecks */}
        <div className="mt-14 pt-10 border-t border-[#273352] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#1A2238] border border-[#273352] hover:border-[#D4AF37]/50 transition-all rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">Gram-Level Recipe Costing</h2>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Auto-calculates dish cost, wastage factor %, VAT deduction, packaging overhead, and suggested selling price.
            </p>
          </div>

          <div className="p-4 bg-[#1A2238] border border-[#273352] hover:border-emerald-500/50 transition-all rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded bg-[#0F382C] border border-[#1a5c48] flex items-center justify-center mb-3">
              <Globe2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">Multi-Authority Compliance</h2>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Instant switchable regulatory engine: US FDA (21 CFR 101.9), EU FIC (1169/2011), GCC (GSO 2233), and FSSAI India.
            </p>
          </div>

          <div className="p-4 bg-[#1A2238] border border-[#273352] hover:border-[#D4AF37]/50 transition-all rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">14 Statutory Allergens Matrix</h2>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Automated compliance with UK Natasha’s Law & FDA FASTER Act. Cross-references formulations and trace warnings.
            </p>
          </div>

          <div className="p-4 bg-[#1A2238] border border-[#273352] hover:border-emerald-500/50 transition-all rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded bg-[#0F382C] border border-[#1a5c48] flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4 text-emerald-300" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">AI Recipe Studio & OCR</h2>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Import paper recipe sheets, PDFs, and Excel tables with AI OCR into standardized commercial digital recipe cards.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

