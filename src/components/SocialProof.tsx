import React from 'react';
import { TESTIMONIALS_DATA } from '../data/culinaryData';
import { Quote, Star } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
            <span>Executive Chef Endorsements</span>
            <span aria-hidden="true" className="text-[#64748b]">·</span>
            <span>Real Kitchen Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-white leading-tight">
            Tested on the front line of high-volume service.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            From Michelin-starred tasting menus to high-pace urban brasseries, culinary leaders use ChefLogic to elevate quality and secure margins.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-[#1A2238] border border-[#273352] rounded-lg p-7 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Distinction / Star Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                    {t.starsOrDistinction}
                  </span>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Body */}
                <p className="text-sm text-white font-serif-culinary text-lg italic leading-relaxed mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div>
                {/* Quantitative Proof Panel */}
                <div className="p-3 bg-[#101524] border border-[#273352] rounded mb-5 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] uppercase text-[#94a3b8] block">Food Cost</span>
                    <span className="font-mono-num text-xs font-semibold text-emerald-400">
                      {t.metrics.foodCostDrop}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#94a3b8] block">Margin Lift</span>
                    <span className="font-mono-num text-xs font-semibold text-white">
                      {t.metrics.wasteReduced}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#94a3b8] block">Saved</span>
                    <span className="font-mono-num text-xs font-semibold text-[#D4AF37]">
                      {t.metrics.annualSavings}
                    </span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="border-t border-[#273352] pt-4">
                  <span className="text-xs font-semibold text-white block">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-[#cbd5e1] block">
                    {t.role} · <strong className="text-[#D4AF37] font-normal">{t.restaurant}</strong>
                  </span>
                  <span className="text-[11px] text-[#94a3b8] block">
                    {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
