import React from 'react';
import { Copyright, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

interface CopyrightPageProps {
  onOpenTrialModal: () => void;
}

export const CopyrightPage: React.FC<CopyrightPageProps> = ({ onOpenTrialModal }) => {
  return (
    <div className="py-16 sm:py-24 bg-[#101524]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-4">
          <Copyright className="w-4 h-4" />
          <span>Intellectual Property</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>Notice & Brand Standards</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
          Copyright, Trademarks & IP Notice
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
          This document delineates the ownership rights, trademark protection, and copyright policies governing the ChefLogix digital ecosystem and web portal at <strong className="text-[#ede8df] font-mono">https://cheflogic.ai.studio/</strong>.
        </p>

        <div className="space-y-10 mt-12 text-xs sm:text-sm text-[#a7a29a] leading-relaxed">
          
          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              1. Platform Copyright & Proprietary Code
            </h3>
            <p className="mb-2">
              All software architecture, user interface graphics, proprietary database schemas, algorithm workflows, and editorial documentation comprising ChefLogix (including the frontend website and the web app hosted at https://cheflogic.ai.studio/) are protected by copyright law and international treaties.
            </p>
            <p>
              © {new Date().getFullYear()} ChefLogix Systems Inc. All rights reserved. Unauthorized reproduction, scraping, reverse engineering, or redistribution of the software is strictly prohibited.
            </p>
          </div>

          <div className="p-6 bg-[#1A2238] border border-[#273352] rounded-lg">
            <h3 className="text-base font-serif-culinary text-[#D4AF37] mb-2 font-medium flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>2. Recipe IP Safe Harbor: Chefs Always Retain 100% Rights</span>
            </h3>
            <p className="text-xs text-[#d5cfc4] leading-relaxed">
              We uphold the sacred tradition of culinary creativity. All culinary formulas, secret marinade proportions, signature plating guidelines, and operational prep guides entered by restaurant users into ChefLogix remain the exclusive, inalienable property of the chef and restaurant entity. ChefLogix makes no claim of ownership or copyright over user-generated culinary recipes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              3. Registered Trademarks
            </h3>
            <p className="mb-2">
              “ChefLogix”, the ChefLogix wordmark, the ChefLogix emblem, and “The Modern Kitchen Briefing” are trademarks or registered trademarks of ChefLogix Systems Inc. in the United States and other jurisdictions.
            </p>
            <p>
              Third-party POS trademarks (including Toast, Square, Micros Simphony, Lightspeed, Aloha) and distributor names (Sysco, US Foods, Baldor) referenced on this site belong to their respective owners and are utilized strictly for factual compatibility reference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              4. DMCA / Notice and Takedown Procedure
            </h3>
            <p className="mb-2">
              If you believe in good faith that any materials accessible on or from https://cheflogic.ai.studio/ infringe your copyright, you may submit a formal notification pursuant to the Digital Millennium Copyright Act (17 U.S.C. § 512(c)(3)) to our designated Copyright Agent:
            </p>
            <div className="p-4 bg-[#101524] border border-[#202327] rounded text-xs font-mono text-[#d5cfc4] space-y-1">
              <div>Attn: Copyright Agent / Legal Directorate</div>
              <div>ChefLogix Systems Inc.</div>
              <div>580 Howard Street, Suite 400, San Francisco, CA 94105</div>
              <div>Email: dmca@cheflogic.ai</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              5. Permitted Editorial Quotations & Press Usage
            </h3>
            <p>
              Culinary journals, hospitality analysts, and journalists are permitted to reference ChefLogix statistics, research reports, and industry food waste indices provided that clear attribution is rendered to <strong>ChefLogix (https://cheflogic.ai.studio/)</strong>.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-[#1f2226] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#88837a]">
            Ready to explore our culinary operating system?
          </span>
          <button
            onClick={onOpenTrialModal}
            className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#101524] bg-[#D4AF37] hover:bg-[#E5C358] rounded transition-all cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Activate 3-Month Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
