import React from 'react';
import { PageView } from '../types';
import { ArrowUpRight, Lock } from 'lucide-react';
import { ChefLogicLogo } from './ChefLogicLogo';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenTrialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrialModal }) => {
  return (
    <footer className="bg-[#101524] text-[#94a3b8] border-t border-[#273352] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#273352]">
          
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4">
            <button
              onClick={() => onNavigate('home')}
              className="cursor-pointer text-left block mb-4 transition-opacity hover:opacity-90"
              aria-label="ChefLogic Home"
            >
              <ChefLogicLogo size="md" showSubtitle />
            </button>
            <p className="text-xs text-[#cbd5e1] leading-relaxed max-w-sm">
              The commercial recipe costing and multi-authority food regulatory platform that empowers culinary leaders, hotel brigades, and food brands to formulate dishes with gram-level precision, guarantee FDA/EU/GCC/FSSAI compliance, and engineer high-margin menus.
            </p>
            <div className="mt-4 text-xs font-mono text-[#D4AF37] flex items-center gap-1.5">
              <span>Production URL:</span>
              <a
                href="https://cheflogic.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white flex items-center gap-1 font-semibold"
              >
                https://cheflogic.ai.studio/
                <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
              </a>
            </div>
          </div>

          {/* Navigation Mirrors (8 cols in 3 sub-columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Col 1: Platform */}
            <div>
              <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-3">
                Platform
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Overview & Simulator
                  </button>
                </li>
                <li>
                  <a href="#commercial-studio" className="hover:text-white transition-colors">
                    Commercial Recipe Studio
                  </a>
                </li>
                <li>
                  <a href="#matrix" className="hover:text-white transition-colors">
                    Menu Engineering Matrix
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-white transition-colors">
                    Food Cost ROI Calculator
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenTrialModal}
                    className="text-[#D4AF37] hover:underline cursor-pointer font-medium"
                  >
                    3-Month Free Trial
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Company */}
            <div>
              <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-3">
                Company
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About & Mission
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact Concierge
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('login')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Kitchen Portal Login
                  </button>
                </li>
                <li>
                  <span className="text-[#64748b]">Kitchen Audits</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Regulatory */}
            <div>
              <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-3">
                Legal & Governance
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    User Agreement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Detailed Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('copyright')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Copyright & IP Notice
                  </button>
                </li>
                <li>
                  <span className="text-[#64748b]">Recipe Data Sovereignty</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div>
            © {new Date().getFullYear()} ChefLogic Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('terms')} className="hover:text-white cursor-pointer">
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-white cursor-pointer">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('copyright')} className="hover:text-white cursor-pointer">
              Copyright
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#D4AF37] cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100"
              title="Restricted Owner Credentials Console"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Console</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>https://cheflogic.ai.studio/</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
