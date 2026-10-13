import React, { useState } from 'react';
import { INGREDIENTS_DATA, SUGGESTED_RECIPES_DATA } from '../data/culinaryData';
import { Ingredient, SuggestedRecipe } from '../types';
import { Check, Sparkles, ChefHat, AlertTriangle, ArrowRight, Layers, RefreshCw, Flame } from 'lucide-react';
import { RECIPE_DISH_IMG } from '../assets/images';

interface InteractiveKitchenEngineProps {
  onOpenTrialModal: () => void;
}

export const InteractiveKitchenEngine: React.FC<InteractiveKitchenEngineProps> = ({ onOpenTrialModal }) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  // Selected ingredients state
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'ing-1', // Salmon
    'ing-3', // Chanterelles
    'ing-4', // Carrots
    'ing-5', // Double Creme
  ]);

  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

  const toggleIngredient = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Derive dynamic metrics
  const activeRecipe = SUGGESTED_RECIPES_DATA[activeRecipeIndex] || SUGGESTED_RECIPES_DATA[0];
  const selectedIngredients = INGREDIENTS_DATA.filter((ing) => selectedIds.includes(ing.id));
  const highRiskCount = selectedIngredients.filter((ing) => ing.riskOfWaste === 'high').length;
  
  // Real-time calculated inventory value
  const totalStockAtRisk = selectedIngredients.reduce((acc, curr) => acc + curr.unitCost * 3.5, 0);

  // Active dish image resolution
  const currentDishImage = failedImages[activeRecipe.id]
    ? (activeRecipe.fallbackImage || '/images/recipe_dish.jpg')
    : (activeRecipe.image || activeRecipe.fallbackImage || '/images/recipe_dish.jpg');

  return (
    <section id="engine" className="py-24 bg-[#0e1012] border-b border-[#1f2226]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
              <span>Back-of-House Simulator</span>
              <span aria-hidden="true" className="text-[#4e4941]">·</span>
              <span>Live Engine Demonstration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
              See how cheflogic.ai.studio turns surplus stock into margin.
            </h2>
          </div>
          <p className="text-sm text-[#a7a29a] max-w-md leading-relaxed">
            Select items currently in your walk-in cooler. ChefLogic instantly pairs complementary flavors, calculates plate cost thresholds, and structures high-margin service specials.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Walk-in Inventory Selector (5 cols) */}
          <div className="lg:col-span-5 bg-[#141618] border border-[#25282c] rounded-lg p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#25282c] mb-5">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#c5a059]" />
                <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold">Walk-in Cooler Inventory</span>
              </div>
              <span className="text-xs font-mono-num text-[#c5a059]">
                {selectedIngredients.length} Active Ingredients
              </span>
            </div>

            <p className="text-xs text-[#88837a] mb-4">
              Click ingredients to toggle available on-hand stock and watch ChefLogic re-engineer plate economics in real time:
            </p>

            {/* Ingredient Toggle List */}
            <div className="space-y-2">
              {INGREDIENTS_DATA.map((ingredient) => {
                const isSelected = selectedIds.includes(ingredient.id);
                return (
                  <button
                    key={ingredient.id}
                    onClick={() => toggleIngredient(ingredient.id)}
                    className={`w-full flex items-center justify-between p-3 rounded text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1b1f24] border-[#c5a059]/40 text-[#ede8df]'
                        : 'bg-[#0f1113] border-[#202327] text-[#78746c] hover:border-[#33373e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#c5a059] text-[#0c0d0e]' : 'border border-[#383c44]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-medium block">{ingredient.name}</span>
                        <span className="text-[11px] text-[#716d66] font-mono-num">
                          ${ingredient.unitCost.toFixed(2)} / {ingredient.unit} · {ingredient.shelfLifeDays}d shelf life
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {ingredient.riskOfWaste === 'high' ? (
                        <span className="text-[11px] text-amber-400 font-medium">Spoilage Alert</span>
                      ) : (
                        <span className="text-[11px] text-[#5e5a53]">Stable</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Inventory Status Bar */}
            <div className="mt-6 pt-5 border-t border-[#25282c] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#88837a] block">Perishable Stock At Risk</span>
                <span className="font-mono-num text-base font-semibold text-[#ede8df]">
                  ${totalStockAtRisk.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[#88837a] block">Critical Batch Alerts</span>
                <span className="font-mono-num text-base font-semibold text-amber-400">
                  {highRiskCount} batches expiring &lt; 48h
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Recipe Formulation Output (7 cols) */}
          <div className="lg:col-span-7 bg-[#141618] border border-[#25282c] rounded-lg p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#25282c] mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <span className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold">
                  ChefLogic Generated Recipe & Plate Costing
                </span>
              </div>

              {/* Recipe Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#0c0d0e] rounded">
                {SUGGESTED_RECIPES_DATA.map((recipe, idx) => (
                  <button
                    key={recipe.id}
                    onClick={() => setActiveRecipeIndex(idx)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                      activeRecipeIndex === idx
                        ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                        : 'text-[#88837a] hover:text-[#ede8df]'
                    }`}
                  >
                    Formula {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Recipe Header */}
            <div>
              <div className="flex items-center gap-3 text-xs text-[#88837a] mb-1">
                <span>{activeRecipe.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeRecipe.prepTimeMin} Min Prep</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">Boston Matrix: {activeRecipe.marginScore}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] leading-snug">
                {activeRecipe.title}
              </h3>
              <p className="text-xs text-[#c5a059] italic mt-1 font-serif-culinary text-base">
                {activeRecipe.subTitle}
              </p>
            </div>

            {/* Image Preview of Gourmet Plating */}
            <div className="mt-5 relative rounded overflow-hidden border border-[#25282c] h-52 bg-[#0c0d0e]">
              <img
                key={activeRecipe.id}
                src={currentDishImage}
                alt={activeRecipe.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
                onError={() => {
                  setFailedImages((prev) => ({ ...prev, [activeRecipe.id]: true }));
                }}
              />
              <div className="absolute bottom-3 left-3 bg-[#0c0d0e]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#2d3137] text-[11px] font-mono-num text-[#ede8df]">
                Waste Diverted: <span className="text-emerald-400 font-semibold">{activeRecipe.wasteDivertedKg} kg</span>
              </div>
            </div>

            {/* Financial & Yield Breakdown Cards */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Target Menu Price</span>
                <span className="font-mono-num text-xl font-bold text-[#ede8df]">
                  ${activeRecipe.menuPrice.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Batch Plate Cost</span>
                <span className="font-mono-num text-xl font-bold text-[#ede8df]">
                  ${activeRecipe.plateCost.toFixed(2)}
                </span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded text-center">
                <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Food Cost Pct</span>
                <span className="font-mono-num text-xl font-bold text-emerald-400">
                  {activeRecipe.foodCostPct.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Culinary & Operational Rationale */}
            <p className="mt-5 text-xs text-[#a7a29a] leading-relaxed border-l-2 border-[#c5a059] pl-3 py-1">
              {activeRecipe.description}
            </p>

            {/* Matched Ingredients List */}
            <div className="mt-4 pt-4 border-t border-[#25282c]">
              <span className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-2">
                Ingredients Allocated from Current Inventory:
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-[#d5cfc4]">
                {activeRecipe.matchingIngredients.map((item, idx) => (
                  <span key={idx} className="bg-[#1b1e22] border border-[#2c3036] px-2.5 py-1 rounded text-[11px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="mt-6 pt-5 border-t border-[#25282c] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#88837a]">
                Ready to sync your walk-in cooler on <strong className="text-[#ede8df]">cheflogic.ai.studio</strong>?
              </span>
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <span>Activate Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
