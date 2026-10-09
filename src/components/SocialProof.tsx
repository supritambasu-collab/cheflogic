import React from 'react';
import { TESTIMONIALS_DATA } from '../data/culinaryData';
import { Quote, Star } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#0e1012] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
            <span>Executive Chef Endorsements</span>
            <span aria-hidden="true" className="text-[#4e4941]">·</span>
            <span>Real Kitchen Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
            Tested on the front line of high-volume service.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
            From Michelin-starred tasting menus to high-pace urban brasseries, culinary leaders use ChefLogic to elevate quality and secure margins.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-[#141618] border border-[#25282c] rounded-lg p-7 flex flex-col justify-between"
            >
              <div>
                {/* Distinction / Star Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium">
                    {t.starsOrDistinction}
                  </span>
                  <div className="flex text-[#c5a059]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote Body */}
                <p className="text-sm text-[#ede8df] font-serif-culinary text-lg italic leading-relaxed mb-6">
                  “{t.quote}”
                </p>
              </div>

              <div>
                {/* Quantitative Proof Panel */}
                <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded mb-5 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] uppercase text-[#716d66] block">Food Cost</span>
                    <span className="font-mono-num text-xs font-semibold text-emerald-400">
                      {t.metrics.foodCostDrop}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#716d66] block">Waste</span>
                    <span className="font-mono-num text-xs font-semibold text-[#ede8df]">
                      {t.metrics.wasteReduced}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#716d66] block">Saved</span>
                    <span className="font-mono-num text-xs font-semibold text-[#c5a059]">
                      {t.metrics.annualSavings}
                    </span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="border-t border-[#22252a] pt-4">
                  <span className="text-xs font-semibold text-[#ede8df] block">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-[#a7a29a] block">
                    {t.role} · <strong className="text-[#c5a059] font-normal">{t.restaurant}</strong>
                  </span>
                  <span className="text-[11px] text-[#716d66] block">
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
