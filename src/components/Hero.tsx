import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign, 
  Sparkles, 
  ChefHat, 
  Clock, 
  Flame, 
  Copy, 
  Check, 
  Zap,
  AlertTriangle
} from 'lucide-react';
import { INGREDIENTS_DATA, SUGGESTED_RECIPES_DATA } from '../data/culinaryData';
import { HERO_KITCHEN_IMG } from '../assets/images';

interface HeroProps {
  onOpenTrialModal: () => void;
  onLoginClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal, onLoginClick }) => {
  // Interactive 3-second demo state
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([
    'ing-1', // Salmon
    'ing-3', // Chanterelles
    'ing-4', // Carrots
  ]);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle ingredient in quick interactive playground
  const handleToggle = (id: string) => {
    if (selectedIngredientIds.includes(id)) {
      if (selectedIngredientIds.length > 1) {
        setSelectedIngredientIds(selectedIngredientIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIngredientIds([...selectedIngredientIds, id]);
    }
  };

  // Determine best matching recipe based on selected ingredients
  const getMatchedRecipe = () => {
    // If duck is selected, prefer duck recipe
    if (selectedIngredientIds.includes('ing-7')) {
      return SUGGESTED_RECIPES_DATA[2]; // Duck
    }
    // If truffle or rice is selected without salmon, prefer risotto
    if (selectedIngredientIds.includes('ing-2') || selectedIngredientIds.includes('ing-6')) {
      return SUGGESTED_RECIPES_DATA[1]; // Risotto
    }
    // Default to Salmon
    return SUGGESTED_RECIPES_DATA[0];
  };

  const matchedRecipe = getMatchedRecipe();

  // Calculate live numbers
  const selectedIngs = INGREDIENTS_DATA.filter((ing) => selectedIngredientIds.includes(ing.id));
  const estimatedStockAtRisk = selectedIngs.reduce((acc, curr) => acc + curr.unitCost * 3.2, 0);
  const potentialProfitPerCover = matchedRecipe.menuPrice - matchedRecipe.plateCost;

  const handleCopySpec = () => {
    const text = `ChefLogic Dish Formulation:\nDish: ${matchedRecipe.title}\nMenu Price: $${matchedRecipe.menuPrice.toFixed(2)}\nPlate Cost: $${matchedRecipe.plateCost.toFixed(2)}\nFood Cost: ${matchedRecipe.foodCostPct}%\nGross Profit / Cover: $${potentialProfitPerCover.toFixed(2)}\nCalculated via cheflogic.ai.studio`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const scrollToEngine = () => {
    const el = document.getElementById('engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#1f2226]">
      {/* Background radial gradient subtle highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#c5a059]/15 via-transparent to-transparent pointer-events-none -z-10 blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 3-Second Problem Hook Pill */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Live Tool · Zero Sign-Up Wall</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1e22] border border-[#2b2f36] text-[#c5a059] text-xs font-medium">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Culinary Math & Spoilage Prevention Engine</span>
          </div>
        </div>

        {/* Marquee Headline Focused Directly on the Core Problem */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-culinary font-normal text-[#ede8df] leading-[1.12] tracking-tight max-w-4xl text-balance">
          Got expiring food in your walk-in? Turn tonight's surplus into a{' '}
          <span className="text-[#c5a059] underline decoration-[#c5a059]/40 underline-offset-4 font-serif-culinary">
            $38 high-margin special
          </span>{' '}
          before it hits the dumpster.
        </h1>

        {/* Narrative Subtitle - Crystal clear problem & utility */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#a7a29a] font-normal max-w-3xl leading-relaxed">
          The average restaurant kitchen throws away <strong className="text-[#ede8df] font-semibold">$2,400 every month</strong> in spoiled proteins, produce, and dairy. 
          ChefLogic is a free culinary math engine that turns whatever is expiring in your cooler into chef-crafted recipes with exact plate costing and guaranteed sub-28% food cost.
        </p>

        {/* ------------------------------------------------------------- */}
        {/* INSTANT 3-SECOND INTERACTIVE SANDBOX (NO SIGN UP REQUIRED)   */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-8 p-5 sm:p-7 bg-[#141618] border-2 border-[#c5a059]/40 rounded-xl shadow-2xl relative overflow-hidden">
          {/* Subtle gold aura */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Sandbox Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#25282c] gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ede8df]">
                Live Instant Simulator: Test Your Walk-in Spoilage
              </span>
            </div>
            <div className="text-xs text-[#88837a] flex items-center gap-2">
              <span className="text-emerald-400 font-semibold font-mono-num">No email or login needed</span>
              <span>·</span>
              <span>Instant real-time math</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Step 1: Click what's expiring (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5" />
                  1. Click what's about to spoil in your cooler:
                </span>
                <span className="text-[11px] text-[#78746c] font-mono-num">
                  {selectedIngredientIds.length} ingredients selected
                </span>
              </div>

              {/* Quick Clickable Ingredient Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INGREDIENTS_DATA.slice(0, 6).map((ing) => {
                  const isSelected = selectedIngredientIds.includes(ing.id);
                  return (
                    <button
                      key={ing.id}
                      onClick={() => handleToggle(ing.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#22272e] border-[#c5a059] shadow-sm shadow-[#c5a059]/10'
                          : 'bg-[#0f1113] border-[#25282c] text-[#78746c] hover:border-[#383d46]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className={`text-xs font-medium ${isSelected ? 'text-[#ede8df]' : 'text-[#88837a]'}`}>
                          {ing.name}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-[#c5a059] text-[#0c0d0e]' : 'border border-[#383c44]'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono-num">
                        <span className="text-[#a7a29a]">${ing.unitCost.toFixed(2)}/{ing.unit}</span>
                        <span className={ing.riskOfWaste === 'high' ? 'text-amber-400 font-semibold' : 'text-[#68635c]'}>
                          {ing.shelfLifeDays}d left
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Instant Stock At Risk Summary */}
              <div className="mt-4 p-3 bg-[#0c0d0e] border border-[#202327] rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#a7a29a]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dumpster value of these items if unused:</span>
                </div>
                <div className="font-mono-num font-bold text-amber-400 text-sm">
                  ${estimatedStockAtRisk.toFixed(2)} at risk
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-[#78746c]">
                <span className="text-[#88837a]">Quick Presets:</span>
                <button
                  onClick={() => setSelectedIngredientIds(['ing-1', 'ing-3', 'ing-4'])}
                  className="px-2 py-0.5 rounded bg-[#1c1f24] hover:bg-[#282d34] text-[#c5a059] cursor-pointer transition-colors"
                >
                  🐟 Salmon + Chanterelles
                </button>
                <button
                  onClick={() => setSelectedIngredientIds(['ing-2', 'ing-3', 'ing-5', 'ing-6'])}
                  className="px-2 py-0.5 rounded bg-[#1c1f24] hover:bg-[#282d34] text-[#c5a059] cursor-pointer transition-colors"
                >
                  🖤 Truffle + Cream
                </button>
                <button
                  onClick={() => setSelectedIngredientIds(['ing-7', 'ing-4', 'ing-3'])}
                  className="px-2 py-0.5 rounded bg-[#1c1f24] hover:bg-[#282d34] text-[#c5a059] cursor-pointer transition-colors"
                >
                  🦆 Duck Breast + Carrots
                </button>
              </div>
            </div>

            {/* Step 2: Instant ChefLogic Solution Output (5 cols) */}
            <div className="lg:col-span-5 bg-[#0c0d0e] border border-[#2d3137] rounded-lg p-4 sm:p-5 relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#202327] mb-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  2. ChefLogic Instant Formula:
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono-num font-semibold">
                  Saves ~${estimatedStockAtRisk.toFixed(0)} Waste
                </span>
              </div>

              {/* Dish Visual & Title */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={matchedRecipe.image || matchedRecipe.fallbackImage || '/images/recipe_dish.jpg'}
                  alt={matchedRecipe.title}
                  className="w-16 h-16 rounded-md object-cover border border-[#2d3137] shrink-0"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-serif-culinary text-[#ede8df] leading-snug line-clamp-1">
                    {matchedRecipe.title}
                  </h3>
                  <p className="text-[11px] text-[#c5a059] font-serif-culinary italic line-clamp-1">
                    {matchedRecipe.subTitle}
                  </p>
                  <span className="text-[10px] text-[#78746c] font-mono-num">
                    Prep: {matchedRecipe.prepTimeMin} mins · Boston Matrix: Star Dish
                  </span>
                </div>
              </div>

              {/* Financial Math Grid */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#141618] border border-[#202327] rounded text-center mb-4">
                <div>
                  <span className="text-[10px] text-[#88837a] uppercase block">Plate Cost</span>
                  <span className="font-mono-num text-sm sm:text-base font-bold text-[#ede8df]">
                    ${matchedRecipe.plateCost.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#88837a] uppercase block">Menu Price</span>
                  <span className="font-mono-num text-sm sm:text-base font-bold text-[#c5a059]">
                    ${matchedRecipe.menuPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#88837a] uppercase block">Food Cost</span>
                  <span className="font-mono-num text-sm sm:text-base font-bold text-emerald-400">
                    {matchedRecipe.foodCostPct}%
                  </span>
                </div>
              </div>

              {/* Profit Callout */}
              <div className="text-xs text-[#d5cfc4] flex items-center justify-between mb-4 px-1">
                <span className="text-[#88837a]">Net Profit per Cover:</span>
                <span className="font-mono-num font-bold text-emerald-400">
                  +${potentialProfitPerCover.toFixed(2)} / plate
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={scrollToEngine}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Open Full Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopySpec}
                  className="py-2.5 px-3 text-xs font-medium text-[#ede8df] hover:text-white bg-[#1c1f24] hover:bg-[#252a30] border border-[#2d3137] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Copy recipe spec & food cost math"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#88837a]" />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Primary Action Zone for Visitors who want to bookmark or get full account */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#141618]/70 border border-[#22252a] rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs sm:text-sm text-[#a7a29a]">
              <strong className="text-[#ede8df] font-medium">Want ChefLogic for your whole restaurant team?</strong> 
              {' '}Save custom menus, track walk-ins, and export kitchen PDFs with a 90-day complimentary pass.
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTrialModal}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer shadow-md whitespace-nowrap"
            >
              Get Free 90-Day Access
            </button>
            <button
              onClick={onLoginClick}
              className="px-4 py-2.5 text-xs font-medium text-[#ede8df] hover:text-white bg-[#1c1f24] hover:bg-[#282d33] border border-[#2d3137] rounded transition-all cursor-pointer whitespace-nowrap"
            >
              Login
            </button>
          </div>
        </div>

        {/* Real Back-of-House Impact Metrics */}
        <div className="mt-8 pt-6 border-t border-[#1f2226] grid grid-cols-2 md:grid-cols-4 gap-4 text-[#88837a]">
          <div className="p-3 bg-[#0e1012] border border-[#1b1e22] rounded">
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">5.8%</span>
            <span className="text-[11px] uppercase tracking-wider text-[#88837a]">Avg Food Cost Reduction</span>
          </div>
          <div className="p-3 bg-[#0e1012] border border-[#1b1e22] rounded">
            <span className="font-mono-num text-2xl font-bold text-emerald-400 block">-41%</span>
            <span className="text-[11px] uppercase tracking-wider text-[#88837a]">Perishable Waste Diverted</span>
          </div>
          <div className="p-3 bg-[#0e1012] border border-[#1b1e22] rounded">
            <span className="font-mono-num text-2xl font-bold text-[#c5a059] block">&lt; 14 Days</span>
            <span className="text-[11px] uppercase tracking-wider text-[#88837a]">Payback Period</span>
          </div>
          <div className="p-3 bg-[#0e1012] border border-[#1b1e22] rounded">
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] block">340+</span>
            <span className="text-[11px] uppercase tracking-wider text-[#88837a]">Kitchens & Chefs Using It</span>
          </div>
        </div>

      </div>
    </section>
  );
};
