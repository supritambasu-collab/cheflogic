import React, { useState } from 'react';
import { DollarSign, TrendingDown, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenTrialModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenTrialModal }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(45000);
  const [annualRecipesCount, setAnnualRecipesCount] = useState<number>(24);
  const [currentFoodCostPct, setCurrentFoodCostPct] = useState<number>(33);

  // Financial calculations
  const annualSpend = monthlySpend * 12;
  // Food cost optimization: 5.2 points drop through precision costing & portion specs
  const foodCostSavingsPerYear = annualSpend * 0.052;
  // External lab testing fees saved: $1,500 per recipe/SKU for certified FDA/EU panels
  const labTestingSavingsPerYear = annualRecipesCount * 1500;
  // Administrative culinary labor saved: 6 hours/week @ $35/hr = $10,920/yr
  const laborSavingsPerYear = 10920;
  
  const totalAnnualSavings = foodCostSavingsPerYear + labTestingSavingsPerYear + laborSavingsPerYear;
  const projectedFoodCostPct = Math.max(22, currentFoodCostPct - 5.2);

  return (
    <section id="calculator" className="py-20 sm:py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
            <span>Financial Modeling</span>
            <span aria-hidden="true" className="text-[#64748b]">·</span>
            <span>Recipe Unit Economics & Lab Cost Recovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-white leading-tight">
            Calculate your kitchen's annual profit recovery.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
            Every point of food cost optimized and every lab testing fee eliminated flows straight to your restaurant's EBITDA. Adjust the parameters below to project what <strong className="text-white font-mono">cheflogic.ai.studio</strong> returns to your business.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Box (6 cols) */}
          <div className="lg:col-span-6 bg-[#1A2238] border border-[#273352] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-7">
              {/* Slider 1: Monthly Spend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-white font-medium">
                    Monthly Kitchen Food Purchases (USD)
                  </label>
                  <span className="font-mono-num text-base font-bold text-[#D4AF37]">
                    ${monthlySpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#101524] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[11px] text-[#94a3b8] font-mono-num mt-1">
                  <span>$10,000 / mo</span>
                  <span>$100,000 / mo</span>
                  <span>$250,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Annual Commercial Recipes Developed */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-white font-medium">
                    New Recipes / Menu SKUs Formulated Per Year
                  </label>
                  <span className="font-mono-num text-base font-bold text-emerald-400">
                    {annualRecipesCount} dishes / year
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="100"
                  step="2"
                  value={annualRecipesCount}
                  onChange={(e) => setAnnualRecipesCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#101524] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[11px] text-[#94a3b8] font-mono-num mt-1">
                  <span>4 (Boutique Cafe)</span>
                  <span>24 (Seasonal Menu)</span>
                  <span>100+ (Hotel / CPG Group)</span>
                </div>
              </div>

              {/* Slider 3: Current Food Cost % */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-white font-medium">
                    Current Baseline Food Cost %
                  </label>
                  <span className="font-mono-num text-base font-bold text-amber-400">
                    {currentFoodCostPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="45"
                  step="0.5"
                  value={currentFoodCostPct}
                  onChange={(e) => setCurrentFoodCostPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#101524] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[11px] text-[#94a3b8] font-mono-num mt-1">
                  <span>24% (Strict Control)</span>
                  <span>33% (Industry Average)</span>
                  <span>45% (Critical Margin Bleed)</span>
                </div>
              </div>
            </div>

            {/* Assumptions Reassurance */}
            <div className="mt-8 pt-6 border-t border-[#273352] flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Audited on 340+ Commercial Kitchens</span>
              <span className="text-[#D4AF37] font-medium">Instant 90-Day Access</span>
            </div>
          </div>

          {/* Projection Card (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0F382C] via-[#1A2238] to-[#101524] border-2 border-[#D4AF37]/50 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle radial glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#273352] mb-6">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                  Projected Annual Net Financial Recovery
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0F382C] border border-[#1a5c48] text-emerald-300 font-semibold">
                  EBITDA Margin Return
                </span>
              </div>

              {/* Headline Savings Metric */}
              <div className="mb-6">
                <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  ${Math.round(totalAnnualSavings).toLocaleString()}
                </div>
                <span className="text-xs text-[#cbd5e1] mt-1 block">
                  Total annual financial savings returned to restaurant operations.
                </span>
              </div>

              {/* Granular Breakdown */}
              <div className="space-y-3 pt-4 border-t border-[#273352] text-xs font-mono">
                <div className="flex items-center justify-between text-white">
                  <span className="text-[#94a3b8]">Food Cost Variance Recaptured:</span>
                  <span className="text-emerald-400 font-semibold">+${Math.round(foodCostSavingsPerYear).toLocaleString()} / yr</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="text-[#94a3b8]">Regulatory Lab Testing Fees Saved:</span>
                  <span className="text-[#D4AF37] font-semibold">+${Math.round(labTestingSavingsPerYear).toLocaleString()} / yr</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="text-[#94a3b8]">Admin Culinary Hours Automated:</span>
                  <span className="text-emerald-300 font-semibold">+${Math.round(laborSavingsPerYear).toLocaleString()} / yr</span>
                </div>
                <div className="flex items-center justify-between text-white pt-2 border-t border-[#273352]">
                  <span className="text-[#94a3b8]">Projected Kitchen Food Cost %:</span>
                  <span className="text-[#D4AF37] font-bold">{projectedFoodCostPct.toFixed(1)}% (was {currentFoodCostPct}%)</span>
                </div>
              </div>
            </div>

            {/* Action Call to Action */}
            <div className="mt-8 pt-6 border-t border-[#273352]">
              <button
                onClick={onOpenTrialModal}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#D4AF37]/20"
              >
                <span>Deploy ChefLogix on 90-Day VIP Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
