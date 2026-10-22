import React from 'react';
import { FileSpreadsheet, Globe2, ShieldCheck, Cpu, ArrowRight, Check } from 'lucide-react';

interface PlatformFeaturesProps {
  onOpenTrialModal: () => void;
}

export const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({ onOpenTrialModal }) => {
  const features = [
    {
      number: '01',
      title: 'Commercial Recipe Formulation & Costing',
      tagline: 'End spreadsheet chaos with gram-level precision',
      description: 'ChefLogix tracks every gram and ingredient spec down to thousandths of a dollar. Auto-calculates preparation wastage factors, country-specific VAT deductions, packaging overheads, and target gross margins before dishes hit the line.',
      benefits: [
        'Automatic food cost % threshold enforcement (< 26%)',
        'Batch yield scaling from single covers to 10,000 banquet servings',
        'Multi-tier sub-recipes (sauces, marinades, prep bases to finish)'
      ]
    },
    {
      number: '02',
      title: 'Multi-Authority Food Regulatory Matrix',
      tagline: 'Instant legal compliance across FDA, EU, GCC, and FSSAI',
      description: 'Eliminate $1,500 laboratory testing fees and 3-week waiting periods. ChefLogix synthesizes certified nutritional declarations with standard rounding rules for the US FDA (21 CFR 101.9), European Union (FIC 1169/2011), Saudi / Gulf GCC (GSO 2233), and India FSSAI.',
      benefits: [
        'Official Nutrition Facts panel layout ready for label printing',
        'Bilingual Arabic/English calorie declarations for Gulf & SFDA markets',
        'Automatic % Daily Value (DV) calibration on 2,000 kcal diet reference'
      ]
    },
    {
      number: '03',
      title: '14 Statutory Allergens & Health Compliance',
      tagline: 'Zero-liability allergen safety for modern hospitality',
      description: 'Synchronize every ingredient with the 14 international statutory allergens. Protect your guests and your business under UK Natasha’s Law, EU FIC regulations, and US FASTER Act standards with instant dish formulation declarations and kitchen line alerts.',
      benefits: [
        'Direct formulation vs. trace cross-contact separation',
        'Instant sync to commercial kitchen display systems (KDS)',
        'One-click export of allergen cards for front-of-house staff'
      ]
    },
    {
      number: '04',
      title: 'AI Recipe Studio & Bulk Master Catalog',
      tagline: '2,633 audited ingredients + instant AI document ingestion',
      description: 'Import legacy recipe PDFs, Word files, photos of handwritten spec sheets, or distributor spreadsheets with AI OCR. ChefLogix normalizes ingredient names, matches SKUs to our pre-costed USDA & EU master catalog, and generates clean digital spec cards.',
      benefits: [
        'AI OCR scanner converts paper kitchen binders into digital sheets in seconds',
        'Pre-indexed master catalog with 2,600+ costed and nutritional ingredients',
        'Multi-currency support (USD, EUR, GBP, SAR, AED, INR) across global units'
      ]
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
              <span>Enterprise Infrastructure</span>
              <span aria-hidden="true" className="text-[#64748b]">·</span>
              <span>Inside cheflogic.ai.studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-white leading-tight">
              Built for commercial kitchens, hotel brigades & food brands.
            </h2>
          </div>
          <p className="text-sm text-[#cbd5e1] max-w-md leading-relaxed">
            Every feature in <strong className="text-white font-mono">cheflogic.ai.studio</strong> was architected alongside certified food scientists, culinary directors, and hospitality executives to eliminate legal risks and guarantee profitability.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => (
            <div
              key={feat.number}
              className="p-7 sm:p-8 bg-[#1A2238] border border-[#273352] rounded-xl flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#273352] mb-5">
                  <span className="font-mono text-2xl font-bold text-[#D4AF37]">{feat.number}</span>
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#0F382C] text-emerald-300 border border-[#1a5c48]">
                    Enterprise Standard
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-culinary text-white mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium mb-4">
                  {feat.tagline}
                </p>
                <p className="text-sm text-[#cbd5e1] leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#273352]">
                <span className="text-[11px] uppercase tracking-wider text-white font-semibold block mb-2.5">
                  Institutional Capabilities:
                </span>
                <ul className="space-y-2">
                  {feat.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
