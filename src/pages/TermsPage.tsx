import React from 'react';
import { ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface TermsPageProps {
  onOpenTrialModal: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenTrialModal }) => {
  return (
    <div className="py-16 sm:py-24 bg-[#0c0d0e]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-4">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>Effective Date: March 2026</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
          Master User Agreement & Terms of Service
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
          Please read this Master User Agreement (“Agreement”) carefully prior to accessing or using the ChefLogic culinary platform, hosted at <strong className="text-[#ede8df] font-mono">https://cheflogic.supritamone.com/</strong>. By activating an account or enrolling in the 3-Month Free Trial, you agree to be bound by these commercial terms.
        </p>

        {/* Highlighted Trial Box */}
        <div className="my-10 p-6 bg-[#141618] border border-[#c5a059]/40 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-[#c5a059]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-semibold uppercase tracking-wider">
              Special Stipulation: 3-Month Free Trial Terms
            </h3>
          </div>
          <p className="text-xs text-[#d5cfc4] leading-relaxed">
            All qualifying restaurant operators are granted full, unrestricted access to the ChefLogic platform for ninety (90) calendar days from account creation without mandatory advance payment details. At the expiration of the trial term, you will have the elective option to subscribe to an ongoing monthly license. If you elect not to subscribe, your account will smoothly transition to archived mode and your proprietary recipe data may be exported in full at zero charge.
          </p>
        </div>

        {/* Formal Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-[#a7a29a] leading-relaxed">
          
          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              1. Platform Services & License Grant
            </h3>
            <p className="mb-2">
              ChefLogic Systems Inc. (“ChefLogic”, “we”, “us”) grants your culinary organization a non-exclusive, non-transferable, revocable commercial license to access the web application at <span className="font-mono text-[#ede8df]">https://cheflogic.supritamone.com/</span> solely for internal hospitality inventory tracking, recipe formulation, supplier invoice analysis, and menu engineering.
            </p>
            <p>
              You agree not to reverse engineer, decompile, scrape, or resell the underlying algorithmic weighting mechanisms, portion matrices, or platform APIs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              2. Absolute Sovereignty Over Culinary Intellectual Property
            </h3>
            <p className="mb-2">
              <strong>Your Recipes Belong to You:</strong> We recognize that proprietary recipes, curing times, secret ratios, and signature techniques represent the core commercial value of your culinary team. All culinary recipes, ingredient lists, prep procedures, and pricing strategies entered into ChefLogic remain the sole, unencumbered intellectual property of the restaurant subscriber.
            </p>
            <p>
              ChefLogic does not claim ownership, nor do we disclose, syndicate, or license your individual kitchen formulations to any competitor or third-party food supplier.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              3. Food Safety, Allergen & Operational Responsibility
            </h3>
            <p className="mb-2">
              ChefLogic provides mathematical models, cost estimations, and automated pairing suggestions based on data input by the subscriber and public culinary references. 
            </p>
            <p>
              <strong>Disclaimer:</strong> The platform is an analytical tool and does not substitute for certified food safety management (ServSafe, HACCP). The executive chef and restaurant management remain exclusively responsible for verifying critical control temperatures, cross-contamination prevention, food allergen disclaimers, local health department ordinances, and consumption safety.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              4. Third-Party POS & Supplier Data Feeds
            </h3>
            <p className="mb-2">
              By authorizing integrations with point-of-sale systems (such as Toast, Square, Micros) or optical scanning of distributor invoices (Sysco, US Foods, Baldor), you warrant that you possess requisite authorization to transmit such transaction data to ChefLogic.
            </p>
            <p>
              We process such data strictly to calculate plate costs, sales velocity, and inventory depletions pursuant to our Privacy Policy.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              5. Service Level Agreement & Data Backups
            </h3>
            <p className="mb-2">
              ChefLogic maintains a target uptime of 99.9% for our cloud infrastructure. In the rare event of unscheduled service interruptions, our engineering team acts with emergency priority to restore service.
            </p>
            <p>
              All kitchen inventory and recipe databases are backed up continuously across geographically redundant cloud regions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              6. Limitation of Liability
            </h3>
            <p>
              To the maximum extent permitted by applicable law, ChefLogic shall not be liable for any indirect, incidental, punitive, or consequential damages, including loss of profits, inventory spoilage arising from external mechanical refrigeration failures, or dining room operational interruptions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              7. Governing Law & Dispute Resolution
            </h3>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles. Any dispute arising under this Agreement shall be resolved through confidential binding arbitration.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-[#1f2226] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#88837a]">
            Questions regarding our commercial terms? Contact our legal team at <strong className="text-[#ede8df]">legal@cheflogic.ai</strong>.
          </span>
          <button
            onClick={onOpenTrialModal}
            className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Agree & Activate 3-Month Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
