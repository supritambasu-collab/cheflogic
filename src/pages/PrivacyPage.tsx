import React from 'react';
import { Lock, ShieldCheck, Database, EyeOff, UserCheck, ArrowRight } from 'lucide-react';

interface PrivacyPageProps {
  onOpenTrialModal: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onOpenTrialModal }) => {
  return (
    <div className="py-16 sm:py-24 bg-[#101524]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb / Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-4">
          <Lock className="w-4 h-4" />
          <span>Privacy & Security Governance</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>GDPR & CCPA/CPRA Compliant</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
          Comprehensive Privacy Policy
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
          At ChefLogic Systems Inc., we are committed to safeguarding the privacy and commercial confidentiality of restaurant operators, culinary professionals, and enterprise hospitality teams accessing our platform via <strong className="text-[#ede8df] font-mono">https://cheflogic.ai.studio/</strong>.
        </p>

        {/* High-Level Pledge Box */}
        <div className="my-10 p-6 bg-[#1A2238] border border-[#273352] rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-[#ede8df] block mb-1">Zero Data Selling</span>
              <span className="text-xs text-[#88837a] leading-relaxed">
                We never monetize, broker, or sell your food invoices, recipes, or POS records to third-party vendors.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-[#ede8df] block mb-1">Isolated Tenancy</span>
              <span className="text-xs text-[#88837a] leading-relaxed">
                Each restaurant’s walk-in stock and recipe margins are cryptographically segregated.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-[#ede8df] block mb-1">End-to-End Encryption</span>
              <span className="text-xs text-[#88837a] leading-relaxed">
                Data in transit uses TLS 1.3; all stored data uses bank-grade AES-256 encryption.
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-[#a7a29a] leading-relaxed">
          
          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              1. Information We Collect
            </h3>
            <p className="mb-2">
              We collect information strictly necessary to provide intelligent culinary analytics:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d5cfc4]">
              <li><strong>Account Credentials:</strong> Full name, professional email, phone number, and restaurant job title.</li>
              <li><strong>Kitchen & Concept Details:</strong> Restaurant business name, culinary concept, seating capacity, and physical kitchen address.</li>
              <li><strong>Inventory & Invoice Feeds:</strong> Supplier invoice line items (item codes, pack sizes, wholesale costs), delivery dates, and walk-in count audits.</li>
              <li><strong>Point-of-Sale (POS) Transaction Records:</strong> Aggregated dish sales velocity, timestamped cover counts, and menu pricing. (Note: We do not collect individual diner credit card numbers).</li>
              <li><strong>Platform Telemetry:</strong> Technical logs, IP address, browser type, and interaction telemetry necessary for platform stability.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              2. How We Utilize Your Culinary Data
            </h3>
            <p className="mb-2">
              Your kitchen data is processed exclusively to deliver the functionality of <span className="font-mono text-[#ede8df]">https://cheflogic.ai.studio/</span>:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#d5cfc4]">
              <li>Calculating real-time recipe plate costs and portion yields.</li>
              <li>Synthesizing algorithmic recipe formulations to rescue expiring ingredients.</li>
              <li>Populating the Menu Engineering Boston Matrix (Stars, Plowhorses, Puzzles, Dogs).</li>
              <li>Generating distributor price volatility alerts and food waste tracking dashboards.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              3. Data Retention & Right to Erasure (GDPR / CCPA)
            </h3>
            <p className="mb-2">
              Under the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA/CPRA), you possess comprehensive rights over your personal and operational data:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#d5cfc4]">
              <li><strong>Right of Access:</strong> Request a full archive of all stored kitchen and profile data at any time.</li>
              <li><strong>Right of Portability:</strong> Export your recipe library, yield sheets, and inventory history in JSON or CSV format with 1 click.</li>
              <li><strong>Right to Deletion ("Right to be Forgotten"):</strong> Request complete erasure of your account, kitchen logs, and recipe records upon terminating your service.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              4. Cookies & Web Tracking
            </h3>
            <p>
              We utilize essential authentication cookies necessary to maintain secure sessions on <span className="font-mono text-[#ede8df]">https://cheflogic.ai.studio/</span>. We do not deploy third-party advertising tracking cookies, cross-site pixels, or intrusive behavioral trackers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2 font-medium">
              5. Contact Our Data Protection Officer
            </h3>
            <p className="mb-2">
              For any questions regarding privacy governance, data processing agreements (DPAs), or exercising privacy rights, contact our Data Protection Office:
            </p>
            <div className="p-4 bg-[#101524] border border-[#202327] rounded text-xs font-mono text-[#d5cfc4] space-y-1">
              <div>Attn: Data Protection Officer</div>
              <div>ChefLogic Systems Inc.</div>
              <div>Email: privacy@cheflogic.ai</div>
              <div>Direct Data Inquiries: +1 (800) 243-3564</div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-[#1f2226] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#88837a]">
            Ready to deploy with complete security?
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
