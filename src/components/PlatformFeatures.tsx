import React from 'react';
import { Package, UtensilsCrossed, Receipt, BarChart3, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface PlatformFeaturesProps {
  onOpenTrialModal: () => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({ onOpenTrialModal }) => {
  const features = [
    {
      number: '01',
      title: 'Real-Time Walk-in Inventory Sync',
      tagline: 'End spreadsheet friction and blind cooler audits',
      description: 'ChefLogic tracks every gram and case delivered to your kitchen. When distributor invoices arrive, optical line-item parsing automatically updates purchase prices, unit costs, and theoretical on-hand counts.',
      benefits: ['Instant OCR invoice capture (Sysco, US Foods, Baldor)', 'Automated batch expiration countdowns', 'Zero manual spreadsheet reconciliation']
    },
    {
      number: '02',
      title: 'Dynamic Recipe Synthesis from Surplus Stock',
      tagline: 'Transform perishable ingredients into tonight’s prime special',
      description: 'When perishable items like wild fish, soft herbs, or prime butchery cuts approach their critical freshness horizon, ChefLogic formulates complete dishes that honor culinary tradition while protecting profitability.',
      benefits: ['Calibrated flavor pairing taxonomy', 'Batch yield scaling from 10 to 500 covers', 'Target food cost bounds (22% - 28%)']
    },
    {
      number: '03',
      title: 'Live Menu Engineering Matrix',
      tagline: 'Pinpoint Stars, Plowhorses, Puzzles, and Dogs',
      description: 'Never wait for end-of-month P&L reports to learn a plate was bleeding margin. ChefLogic maps every recipe against your POS sales velocity, providing clear directives on price adjustments, portion trims, or menu phasing.',
      benefits: ['Continuous POS synchronization', 'Real-time wholesale price variance alerts', 'Portion size optimization models']
    },
    {
      number: '04',
      title: 'Culinary Waste Reduction Auditing',
      tagline: 'Cut restaurant food waste by an average of 41%',
      description: 'Track prep trim waste, spoilage write-offs, and over-portioning in a clean back-of-house log. Export verified sustainability reports showing food diverted from landfills and emissions prevented.',
      benefits: ['Actionable prep trim yield metrics', 'Standardized station waste logging', 'Executive group reporting across multiple units']
    }
  ];

  return (
    <section className="py-24 bg-[#0c0d0e] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
              <span>Core Architecture</span>
              <span aria-hidden="true" className="text-[#4e4941]">·</span>
              <span>Inside cheflogic.ai.studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
              A complete operating system built for working restaurant kitchens.
            </h2>
          </div>
          <p className="text-sm text-[#a7a29a] max-w-md leading-relaxed">
            Every feature in <strong className="text-[#ede8df] font-mono">cheflogic.ai.studio</strong> was architected alongside Michelin-starred executive chefs and commercial F&B directors.
          </p>
        </div>

        {/* Feature Bento/List with Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => (
            <div
              key={feat.number}
              className="bg-[#141618] border border-[#25282c] rounded-lg p-7 sm:p-8 flex flex-col justify-between hover:border-[#383c44] transition-all"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono-num text-sm text-[#c5a059] font-semibold tracking-wider">
                    {feat.number}
                  </span>
                  <span className="text-[11px] text-[#716d66] uppercase tracking-wider">
                    Production Module
                  </span>
                </div>

                <h3 className="text-2xl font-serif-culinary text-[#ede8df] leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#c5a059] mt-1 mb-4 font-medium">
                  {feat.tagline}
                </p>

                <p className="text-sm text-[#a7a29a] leading-relaxed mb-6">
                  {feat.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#22252a]">
                  {feat.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#d5cfc4]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#22252a] flex items-center justify-between">
                <span className="text-xs text-[#88837a]">
                  Included in 3-Month Trial
                </span>
                <button
                  onClick={onOpenTrialModal}
                  className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:text-[#ede8df] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Live</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
