import React, { useState } from 'react';
import { FAQS_DATA } from '../data/culinaryData';
import { ChevronDown, HelpCircle, ExternalLink } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Hospitality FAQ</span>
            <span aria-hidden="true" className="text-[#64748b]">·</span>
            <span>Platform Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            Everything you need to know about the ChefLogix system, our 3-month free trial, and deploying on <strong className="text-white font-mono">cheflogic.ai.studio</strong>.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#1A2238] border border-[#273352] rounded-lg overflow-hidden transition-colors shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#222B45] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif-culinary text-white font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#cbd5e1] leading-relaxed border-t border-[#273352] animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Link Anchor */}
        <div className="mt-12 text-center text-xs text-[#94a3b8]">
          Have a bespoke technical or POS architecture question?{' '}
          <a
            href="https://cheflogic.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>Visit the Live Platform at cheflogic.ai.studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
