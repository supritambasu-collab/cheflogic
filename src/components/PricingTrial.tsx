import React from 'react';
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingTrialProps {
  onOpenTrialModal: () => void;
}

export const PricingTrial: React.FC<PricingTrialProps> = ({ onOpenTrialModal }) => {
  return (
    <section className="py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
            <span>Transparent Hospitality Licensing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-white leading-tight">
            Every plan includes an unrestricted 3-month free trial.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            Experience the real financial impact of ChefLogic in your kitchen for 90 full days before committing. No credit card required to begin.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Single Kitchen / Atelier */}
          <div className="bg-[#1A2238] border border-[#273352] rounded-lg p-7 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#94a3b8] font-medium block mb-2">
                Independent Kitchen
              </span>
              <h3 className="text-2xl font-serif-culinary text-white">
                L’Atelier
              </h3>
              <p className="text-xs text-[#cbd5e1] mt-1 mb-6">
                Designed for single independent restaurants, bistros, and boutique culinary concepts.
              </p>

              <div className="mb-6 pb-6 border-b border-[#273352]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-white">$189</span>
                  <span className="text-xs text-[#94a3b8]">/ month</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#D4AF37]">
                  First 3 Months: $0 Complimentary
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#cbd5e1] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Gram-level recipe costing & wastage factor calculation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Multi-authority nutrition facts engine (FDA, EU, GCC, FSSAI)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Menu Engineering Boston Matrix audit</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Single POS integration (Toast, Square, etc.)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#101524] hover:bg-[#222B45] border border-[#273352] hover:border-[#D4AF37] rounded transition-all cursor-pointer"
            >
              Start 90-Day Free Trial
            </button>
          </div>

          {/* Tier 2: Executive (Featured Marquee) */}
          <div className="bg-gradient-to-b from-[#0F382C] to-[#1A2238] border-2 border-[#D4AF37] rounded-lg p-7 flex flex-col justify-between relative shadow-2xl shadow-[#D4AF37]/15">
            {/* Callout Tag */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1A2238] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-md">
              Most Popular in Fine Dining
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2 mt-1">
                High-Volume & Tasting Menu
              </span>
              <h3 className="text-2xl font-serif-culinary text-white">
                Executive Brigade
              </h3>
              <p className="text-xs text-[#cbd5e1] mt-1 mb-6">
                For busy culinary operations requiring multi-station line prep, supplier invoice OCR, and deep margin modeling.
              </p>

              <div className="mb-6 pb-6 border-b border-[#273352]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-white">$389</span>
                  <span className="text-xs text-[#94a3b8]">/ month</span>
                </div>
                <div className="mt-2 text-xs font-bold text-[#D4AF37]">
                  First 3 Months: $0 Complimentary
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#cbd5e1] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Unlimited commercial recipe specifications & batching</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Automated optical recipe scanning (AI OCR)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Full access to 2,633-item pre-costed Master Catalog</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>14 Statutory Allergen Matrix with auto-sync to POS/KDS</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Dedicated Culinary Onboarding Concierge</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20"
            >
              Claim Executive 3-Month Trial
            </button>
          </div>

          {/* Tier 3: Multi-Unit / Group */}
          <div className="bg-[#1A2238] border border-[#273352] rounded-lg p-7 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#94a3b8] font-medium block mb-2">
                Hospitality Groups & Hotels
              </span>
              <h3 className="text-2xl font-serif-culinary text-white">
                Group Enterprise
              </h3>
              <p className="text-xs text-[#cbd5e1] mt-1 mb-6">
                Custom architecture for hotel properties, restaurant groups, and commissary central production kitchens.
              </p>

              <div className="mb-6 pb-6 border-b border-[#273352]">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-num text-3xl font-bold text-white">Custom</span>
                  <span className="text-xs text-[#94a3b8]">per property</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#D4AF37]">
                  Includes 90-Day Multi-Location Pilot
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#cbd5e1] mb-8">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Multi-unit formulation governance & commissary distribution</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>ERP & accounting integrations (NetSuite, SAP, Micros)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Custom recipe IP vault & cryptographic access control</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>99.99% SLA & 24/7 dedicated enterprise response line</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#101524] hover:bg-[#222B45] border border-[#273352] hover:border-[#D4AF37] rounded transition-all cursor-pointer"
            >
              Inquire Enterprise Pilot
            </button>
          </div>

        </div>

        {/* Bottom Assurance */}
        <div className="mt-12 text-center text-xs text-[#94a3b8] flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            No credit card required upfront
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            Full access to all features on cheflogic.ai.studio
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Cancel or export your data at any time with 1 click
          </span>
        </div>

      </div>
    </section>
  );
};
