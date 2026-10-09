import React, { useState } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, TrendingDown, DollarSign } from 'lucide-react';
import { HERO_KITCHEN_IMG } from '../assets/images';

interface HeroProps {
  onOpenTrialModal: () => void;
  onLoginClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onLoginClick }) => {
  const [imgSrc, setImgSrc] = useState<string>(HERO_KITCHEN_IMG);
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-[#1f2226]">
      {/* Background radial gradient subtle highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#c5a059]/10 via-transparent to-transparent pointer-events-none -z-10 blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Unboxed editorial kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-4">
          <span>Culinary Intelligence Platform</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>Powered by cheflogic.ai.studio</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>90-Day Complimentary Access</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-culinary font-normal text-[#ede8df] leading-[1.08] tracking-tight max-w-4xl text-balance">
          Master kitchen inventory. Turn surplus stock into high-margin recipes.
        </h1>

        {/* Narrative Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#a7a29a] font-normal max-w-2xl leading-relaxed">
          The hospitality operating system that bridges culinary artistry with back-of-house financial rigor. 
          Synchronize walk-in inventory, generate chef-crafted dishes from perishable ingredients, and engineer menus for peak gross margin.
        </p>

        {/* Primary Action Zone */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenTrialModal}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#c5a059]/10"
          >
            <span>Start 3-Month Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLoginClick}
            className="px-6 py-4 text-sm font-medium text-[#ede8df] hover:text-white bg-[#141618] hover:bg-[#1c1f23] border border-[#2d3137] rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Login to cheflogic.ai.studio</span>
            <ChevronRight className="w-4 h-4 text-[#88837a]" />
          </button>
        </div>

        {/* Trust & Proof Adjacency */}
        <div className="mt-10 pt-8 border-t border-[#1f2226] grid grid-cols-2 md:grid-cols-4 gap-6 text-[#88837a]">
          <div>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">5.8%</span>
            <span className="text-xs uppercase tracking-wider text-[#88837a]">Avg Food Cost Reduction</span>
          </div>
          <div>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">-41%</span>
            <span className="text-xs uppercase tracking-wider text-[#88837a]">Perishable Waste Diverted</span>
          </div>
          <div>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">&lt; 14 Days</span>
            <span className="text-xs uppercase tracking-wider text-[#88837a]">Payback Period</span>
          </div>
          <div>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">340+</span>
            <span className="text-xs uppercase tracking-wider text-[#88837a]">Fine Dining & Hotel Kitchens</span>
          </div>
        </div>

        {/* Hero Visual Asset with 16:9 aspect ratio and fallback container */}
        <div className="mt-12 relative rounded-lg overflow-hidden border border-[#25282c] shadow-2xl bg-[#141618]">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={imgSrc}
              alt="High-end luxury restaurant kitchen brigade in evening service using ChefLogic intelligence"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => {
                if (imgSrc !== '/images/hero_kitchen.jpg') {
                  setImgSrc('/images/hero_kitchen.jpg');
                }
              }}
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-black/20 to-transparent" />

            {/* Overlaid Live Intelligence Snapshot */}
            <div className="absolute bottom-6 left-6 right-6 hidden md:flex items-center justify-between p-4 bg-[#0c0d0e]/90 backdrop-blur-md border border-[#2d3137] rounded">
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-xs">
                  <span className="text-[#a7a29a] block">Active Walk-in Engine Telemetry</span>
                  <span className="text-[#ede8df] font-medium">Auto-calibrated for Service 18:00 – 23:00</span>
                </div>
              </div>
              <div className="flex items-center gap-8 text-xs font-mono-num">
                <div>
                  <span className="text-[#88837a]">Target Food Cost:</span>{' '}
                  <span className="text-emerald-400 font-semibold">26.4%</span>
                </div>
                <div>
                  <span className="text-[#88837a]">Today's Waste Diverted:</span>{' '}
                  <span className="text-[#ede8df] font-semibold">12.8 kg</span>
                </div>
                <div>
                  <span className="text-[#88837a]">Plate Gross Margin:</span>{' '}
                  <span className="text-[#c5a059] font-semibold">73.6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
