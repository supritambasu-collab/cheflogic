import React, { useState } from 'react';
import { DollarSign, TrendingDown, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenTrialModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenTrialModal }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(45000);
  const [currentWastePct, setCurrentWastePct] = useState<number>(12);
  const [currentFoodCostPct, setCurrentFoodCostPct] = useState<number>(33);

  // Financial calculations
  // Conservative recovery: ChefLogic reduces waste by 40% and optimizes food cost margin by 4.5%
  const annualSpend = monthlySpend * 12;
  const wasteSavedPerYear = annualSpend * (currentWastePct / 100) * 0.42;
  const marginSavingsPerYear = annualSpend * 0.045;
  const totalAnnualSavings = wasteSavedPerYear + marginSavingsPerYear;
  const projectedFoodCostPct = Math.max(24, currentFoodCostPct - 4.8);
  const estimatedLbsWasteDiverted = Math.round((wasteSavedPerYear / 4.2) * 1.8);

  return (
    <section id="calculator" className="py-24 bg-[#0e1012] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
            <span>Financial Modeling</span>
            <span aria-hidden="true" className="text-[#4e4941]">·</span>
            <span>Food Cost & Waste Recovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
            Calculate your kitchen's annual profit recovery.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed">
            Every point of food cost saved flows directly to restaurant net EBITDA. Adjust the parameters below to project what automated inventory management and recipe suggestions on <strong className="text-[#ede8df] font-mono">cheflogic.ai.studio</strong> return to your bottom line.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Box (6 cols) */}
          <div className="lg:col-span-6 bg-[#141618] border border-[#25282c] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-7">
              {/* Slider 1: Monthly Spend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#ede8df] font-medium">
                    Monthly Kitchen Food Purchases
                  </label>
                  <span className="font-mono-num text-base font-bold text-[#c5a059]">
                    ${monthlySpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#25282c] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div className="flex justify-between text-[11px] text-[#6b6760] font-mono-num mt-1">
                  <span>$10,000 / mo</span>
                  <span>$100,000 / mo</span>
                  <span>$200,000+ / mo</span>
                </div>
              </div>

              {/* Slider 2: Estimated Waste */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#ede8df] font-medium">
                    Estimated Current Food Waste Rate
                  </label>
                  <span className="font-mono-num text-base font-bold text-amber-400">
                    {currentWastePct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={currentWastePct}
                  onChange={(e) => setCurrentWastePct(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#25282c] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div className="flex justify-between text-[11px] text-[#6b6760] font-mono-num mt-1">
                  <span>5% (Strict Control)</span>
                  <span>12% (Industry Avg)</span>
                  <span>25% (High Spoilage)</span>
                </div>
              </div>

              {/* Slider 3: Current Food Cost % */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#ede8df] font-medium">
                    Current Food Cost Percentage
                  </label>
                  <span className="font-mono-num text-base font-bold text-[#ede8df]">
                    {currentFoodCostPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="42"
                  step="0.5"
                  value={currentFoodCostPct}
                  onChange={(e) => setCurrentFoodCostPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#25282c] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div className="flex justify-between text-[11px] text-[#6b6760] font-mono-num mt-1">
                  <span>26% (High Margin)</span>
                  <span>33% (Typical Full-Service)</span>
                  <span>42% (Compressed)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#25282c] flex items-center gap-3 text-xs text-[#88837a]">
              <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Calculated based on actual benchmark data across 340+ restaurants utilizing cheflogic.ai.studio.</span>
            </div>
          </div>

          {/* Results Box (6 cols) */}
          <div className="lg:col-span-6 bg-[#181b1f] border border-[#2d3137] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium block mb-1">
                Projected Annual Net Recovery
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-num text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ede8df] tracking-tight">
                  ${Math.round(totalAnnualSavings).toLocaleString()}
                </span>
                <span className="text-sm text-[#88837a] font-normal">/ year</span>
              </div>
              <p className="text-xs text-[#a7a29a] mt-2">
                Equivalent to adding <strong className="text-[#ede8df] font-mono">${Math.round(totalAnnualSavings / 12).toLocaleString()}</strong> in pure monthly profit back into your hospitality operations.
              </p>

              {/* Dynamic Breakdown Cards */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0c0d0e] border border-[#25282c] rounded">
                  <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">
                    Optimized Food Cost %
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono-num text-2xl font-bold text-emerald-400">
                      {projectedFoodCostPct.toFixed(1)}%
                    </span>
                    <span className="text-xs text-[#88837a] line-through font-mono-num">
                      {currentFoodCostPct}%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#716d66] block mt-0.5">
                    -{(currentFoodCostPct - projectedFoodCostPct).toFixed(1)}% margin gain
                  </span>
                </div>

                <div className="p-4 bg-[#0c0d0e] border border-[#25282c] rounded">
                  <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">
                    Annual Spoilage Diverted
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono-num text-2xl font-bold text-[#ede8df]">
                      {estimatedLbsWasteDiverted.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#88837a]">lbs/yr</span>
                  </div>
                  <span className="text-[11px] text-[#716d66] block mt-0.5">
                    Recovered food stock
                  </span>
                </div>
              </div>
            </div>

            {/* CTA in Calculator */}
            <div className="mt-8 pt-6 border-t border-[#25282c]">
              <button
                onClick={onOpenTrialModal}
                className="w-full py-4 px-6 text-sm font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/10"
              >
                <span>Unlock These Savings in 3-Month Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#6b6760]">
                  No payment method required · Full access to https://cheflogic.ai.studio for 90 days
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
