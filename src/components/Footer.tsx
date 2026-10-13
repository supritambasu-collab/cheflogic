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
    <footer className="bg-[#08090a] text-[#88837a] border-t border-[#1a1c1e] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1f2226]">
          
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4">
            <button
              onClick={() => onNavigate('home')}
              className="cursor-pointer text-left block mb-4 transition-opacity hover:opacity-90"
              aria-label="ChefLogic Home"
            >
              <ChefLogicLogo size="md" showSubtitle />
            </button>
            <p className="text-xs text-[#88837a] leading-relaxed max-w-sm">
              The hospitality intelligence engine that empowers culinary leaders to eliminate food waste, automate recipe yield costing, and engineer high-margin menus.
            </p>
            <div className="mt-4 text-xs font-mono text-[#c5a059] flex items-center gap-1.5">
              <span>Production URL:</span>
              <a
                href="https://cheflogic.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[#ede8df] flex items-center gap-1"
              >
                https://cheflogic.ai.studio/
                <ArrowUpRight className="w-3 h-3 text-[#c5a059]" />
              </a>
            </div>
          </div>

          {/* Navigation Mirrors (8 cols in 3 sub-columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Col 1: Platform */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold block mb-3">
                Platform
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    Overview & Simulator
                  </button>
                </li>
                <li>
                  <a href="#engine" className="hover:text-[#ede8df] transition-colors">
                    Walk-in Cooler Engine
                  </a>
                </li>
                <li>
                  <a href="#matrix" className="hover:text-[#ede8df] transition-colors">
                    Menu Engineering Matrix
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-[#ede8df] transition-colors">
                    Food Cost ROI Calculator
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenTrialModal}
                    className="text-[#c5a059] hover:underline cursor-pointer"
                  >
                    3-Month Free Trial
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Company */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold block mb-3">
                Company
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    About & Mission
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    Contact Concierge
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('login')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer text-left"
                  >
                    Kitchen Portal Login
                  </button>
                </li>
                <li>
                  <span className="text-[#55514b]">Kitchen Audits</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Regulatory */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold block mb-3">
                Legal & Governance
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => onNavigate('terms')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    User Agreement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    Detailed Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('copyright')}
                    className="hover:text-[#ede8df] transition-colors cursor-pointer"
                  >
                    Copyright & IP Notice
                  </button>
                </li>
                <li>
                  <span className="text-[#55514b]">Recipe Data Sovereignty</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5e5a53]">
          <div>
            © {new Date().getFullYear()} ChefLogic Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('terms')} className="hover:text-[#88837a] cursor-pointer">
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#88837a] cursor-pointer">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('copyright')} className="hover:text-[#88837a] cursor-pointer">
              Copyright
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#c5a059] cursor-pointer flex items-center gap-1 opacity-70 hover:opacity-100"
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
