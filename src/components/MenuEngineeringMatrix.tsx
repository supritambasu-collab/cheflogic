import React, { useState } from 'react';
import { MENU_MATRIX_DATA } from '../data/culinaryData';
import { MenuItemMatrix } from '../types';
import { Star, TrendingUp, HelpCircle, AlertOctagon, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface MenuEngineeringMatrixProps {
  onOpenTrialModal: () => void;
}

export const MenuEngineeringMatrix: React.FC<MenuEngineeringMatrixProps> = ({ onOpenTrialModal }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('mat-1');

  const selectedItem = MENU_MATRIX_DATA.find((item) => item.id === selectedItemId) || MENU_MATRIX_DATA[0];

  const getQuadrantIcon = (quadrant: MenuItemMatrix['quadrant']) => {
    switch (quadrant) {
      case 'Star':
        return <Star className="w-4 h-4 text-amber-300 fill-amber-300" />;
      case 'Plowhorse':
        return <TrendingUp className="w-4 h-4 text-sky-400" />;
      case 'Puzzle':
        return <HelpCircle className="w-4 h-4 text-violet-400" />;
      case 'Dog':
        return <AlertOctagon className="w-4 h-4 text-rose-400" />;
    }
  };

  const getQuadrantBadge = (quadrant: MenuItemMatrix['quadrant']) => {
    switch (quadrant) {
      case 'Star':
        return 'text-amber-300 border-amber-400/30 bg-amber-400/10';
      case 'Plowhorse':
        return 'text-sky-300 border-sky-400/30 bg-sky-400/10';
      case 'Puzzle':
        return 'text-violet-300 border-violet-400/30 bg-violet-400/10';
      case 'Dog':
        return 'text-rose-300 border-rose-400/30 bg-rose-400/10';
    }
  };

  return (
    <section id="matrix" className="py-24 bg-[#0c0d0e] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
            <span>Hospitality Economics</span>
            <span aria-hidden="true" className="text-[#4e4941]">·</span>
            <span>Boston Matrix Algorithmic Audit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
            Stop guessing which dishes drive profit. Engineer your menu with precision.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
            ChefLogic at <strong className="text-[#ede8df] font-mono">https://cheflogic.ai.studio/</strong> monitors ticket volumes from your POS alongside dynamic ingredient cost fluctuations, categorizing every plate into the 4 standard hospitality quadrants.
          </p>
        </div>

        {/* 4 Quadrants Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Matrix Interactive Board (7 cols) */}
          <div className="lg:col-span-7 bg-[#141618] border border-[#25282c] rounded-lg p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#25282c] mb-6">
              <span className="text-xs uppercase tracking-wider text-[#a7a29a] font-medium">
                Live Kitchen Menu Map (Click any dish to inspect)
              </span>
              <span className="text-xs font-mono-num text-[#c5a059]">
                Continuous POS Sync
              </span>
            </div>

            {/* Matrix 2x2 Layout */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              {MENU_MATRIX_DATA.map((item) => {
                const isSelected = item.id === selectedItemId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-4 sm:p-5 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[170px] ${
                      isSelected
                        ? 'bg-[#1b1f24] border-[#c5a059] shadow-lg shadow-[#c5a059]/5'
                        : 'bg-[#0f1113] border-[#22252a] hover:border-[#383c44]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border ${getQuadrantBadge(item.quadrant)} flex items-center gap-1.5`}>
                          {getQuadrantIcon(item.quadrant)}
                          <span>{item.quadrant}</span>
                        </span>
                        <span className="font-mono-num text-xs text-[#88837a]">
                          ${item.currentPrice.toFixed(2)}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-serif-culinary text-[#ede8df] leading-snug line-clamp-2 mt-2">
                        {item.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-[#22252a] mt-3 flex items-center justify-between text-[11px] font-mono-num text-[#88837a]">
                      <span>FC: <strong className="text-[#ede8df]">{item.foodCostPct}%</strong></span>
                      <span>Vol: <strong className="text-[#ede8df]">{item.salesVolume}</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Matrix Axis Explanations */}
            <div className="mt-6 pt-4 border-t border-[#22252a] flex flex-wrap items-center justify-between gap-2 text-xs text-[#88837a]">
              <span>Vertical Axis: <strong>Contribution Margin ($)</strong></span>
              <span>Horizontal Axis: <strong>Sales Velocity (Covers)</strong></span>
            </div>
          </div>

          {/* Right Column: Deep Strategic Breakdown for Selected Dish (5 cols) */}
          <div className="lg:col-span-5 bg-[#141618] border border-[#25282c] rounded-lg p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded border ${getQuadrantBadge(selectedItem.quadrant)} flex items-center gap-1.5`}>
                {getQuadrantIcon(selectedItem.quadrant)}
                <span>Quadrant: {selectedItem.quadrant}</span>
              </span>
            </div>

            <h3 className="text-2xl font-serif-culinary text-[#ede8df] leading-snug">
              {selectedItem.name}
            </h3>

            {/* Numbers Table */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded">
                <span className="text-[#88837a] block text-[11px] uppercase">Current Food Cost</span>
                <span className="font-mono-num text-lg font-bold text-[#ede8df]">
                  {selectedItem.foodCostPct}%
                </span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded">
                <span className="text-[#88837a] block text-[11px] uppercase">Menu Plate Price</span>
                <span className="font-mono-num text-lg font-bold text-[#ede8df]">
                  ${selectedItem.currentPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* ChefLogic Prescriptive Recommendation */}
            <div className="mt-5 p-4 bg-[#0c0d0e] border border-[#25282c] rounded">
              <span className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold block mb-1.5">
                ChefLogic Prescriptive Directive:
              </span>
              <p className="text-xs text-[#d5cfc4] leading-relaxed">
                {selectedItem.recommendedAction}
              </p>
            </div>

            {/* Quantified Financial Impact */}
            <div className="mt-4 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-emerald-400 font-medium block">Projected Bottom-Line Impact:</span>
                <span className="text-[#d5cfc4] font-mono-num">{selectedItem.impactMetric}</span>
              </div>
            </div>

            {/* Connect to Full Platform */}
            <div className="mt-7 pt-5 border-t border-[#25282c]">
              <p className="text-xs text-[#88837a] mb-3">
                Run this analysis on your entire menu catalog with live POS integration on cheflogic.ai.studio.
              </p>
              <button
                onClick={onOpenTrialModal}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Audit Your Menu in 3-Month Trial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
