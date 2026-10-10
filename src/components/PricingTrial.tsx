import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingTrialProps {
  onOpenTrialModal: () => void;
}

export const PricingTrial: React.FC<PricingTrialProps> = ({ onOpenTrialModal }) => {
  return (
    <section className="py-24 bg-[#0c0d0e] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
            <span>Transparent Hospitality Licensing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
            Every plan includes an unrestricted 3-month free trial.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
            Experience the real financial impact of ChefLogic in your kitchen for 90 full days before committing. No credit card required to begin.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Single Kitchen / Atelier */}
          <div className="bg-[#141618] border border-[#25282c] rounded-lg p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#88837a] font-medium block mb-2">
                Independent Kitchen
              </span>
              <h3 className="text-2xl font-serif-culinary text-[#ede8df]">
                L’Atelier
              </h3>
              <p className="text-xs text-[#a7a29a] mt-1 mb-6">
                Designed for single independent restaurants, bistros, and boutique culinary concepts.
              </p>

              <div className="mb-6 pb-6 border-b border-[#22252a]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-[#ede8df]">$189</span>
                  <span className="text-xs text-[#88837a]">/ month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#c5a059]">
                  First 3 Months: $0 Complimentary
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#d5cfc4] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Real-time walk-in inventory tracking for up to 3 coolers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Dynamic surplus recipe formulation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Menu Engineering Boston Matrix audit</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Single POS integration (Toast, Square, etc.)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#ede8df] hover:text-white bg-[#1c1f23] hover:bg-[#25292f] border border-[#32363c] rounded transition-all cursor-pointer"
            >
              Start 90-Day Free Trial
            </button>
          </div>

          {/* Tier 2: Executive (Featured Marquee) */}
          <div className="bg-[#171a1d] border-2 border-[#c5a059] rounded-lg p-7 flex flex-col justify-between relative shadow-2xl">
            {/* Callout Tag */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a059] text-[#0c0d0e] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
              Most Popular in Fine Dining
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium block mb-2 mt-1">
                High-Volume & Tasting Menu
              </span>
              <h3 className="text-2xl font-serif-culinary text-[#ede8df]">
                Executive Brigade
              </h3>
              <p className="text-xs text-[#a7a29a] mt-1 mb-6">
                For busy culinary operations requiring multi-station line prep, supplier invoice OCR, and deep margin modeling.
              </p>

              <div className="mb-6 pb-6 border-b border-[#292d34]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-[#ede8df]">$389</span>
                  <span className="text-xs text-[#88837a]">/ month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#c5a059]">
                  First 3 Months: $0 Complimentary
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#d5cfc4] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Unlimited walk-in & dry storage zones</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Automated optical invoice scanning (OCR)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Live supplier price variance & inflation alerts</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Unlimited POS terminals & prep station tablets</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Dedicated Culinary Onboarding Concierge</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer shadow-lg shadow-[#c5a059]/10"
            >
              Claim Executive 3-Month Trial
            </button>
          </div>

          {/* Tier 3: Multi-Unit / Group */}
          <div className="bg-[#141618] border border-[#25282c] rounded-lg p-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#88837a] font-medium block mb-2">
                Hospitality Groups & Hotels
              </span>
              <h3 className="text-2xl font-serif-culinary text-[#ede8df]">
                Group Enterprise
              </h3>
              <p className="text-xs text-[#a7a29a] mt-1 mb-6">
                Custom architecture for hotel properties, restaurant groups, and commissary central production kitchens.
              </p>

              <div className="mb-6 pb-6 border-b border-[#22252a]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-[#ede8df]">Custom</span>
                  <span className="text-xs text-[#88837a]">per property</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#c5a059]">
                  Includes 90-Day Multi-Location Pilot
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#d5cfc4] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Cross-location stock transfers & central commissary</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>ERP & accounting integrations (NetSuite, QuickBooks)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Custom recipe IP vault & NDA encryption</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>99.9% uptime SLA & 24/7 kitchen emergency hotline</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#ede8df] hover:text-white bg-[#1c1f23] hover:bg-[#25292f] border border-[#32363c] rounded transition-all cursor-pointer"
            >
              Inquire Enterprise Pilot
            </button>
          </div>

        </div>

        {/* Bottom Assurance */}
        <div className="mt-12 text-center text-xs text-[#716d66] flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            No credit card required upfront
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            Full access to all features on cheflogic.supritamone.com
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#c5a059]" />
            Cancel or export your data at any time with 1 click
          </span>
        </div>

      </div>
    </section>
  );
};
