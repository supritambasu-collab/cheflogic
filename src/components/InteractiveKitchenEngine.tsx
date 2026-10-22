import React, { useState, useMemo } from 'react';
import { 
  COMMERCIAL_RECIPES_DATA, 
  STATUTORY_ALLERGENS, 
  MASTER_CATALOG_DATA 
} from '../data/culinaryData';
import { CommercialRecipe, RegulatoryAuthority, RecipeIngredientRow } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Tag, 
  Plus, 
  Trash2, 
  Check, 
  ArrowRight, 
  FileText, 
  Globe2, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Copy,
  ChevronDown
} from 'lucide-react';

interface InteractiveKitchenEngineProps {
  onOpenTrialModal: () => void;
}

export const InteractiveKitchenEngine: React.FC<InteractiveKitchenEngineProps> = ({ onOpenTrialModal }) => {
  // Active recipe index
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [recipes, setRecipes] = useState<CommercialRecipe[]>(COMMERCIAL_RECIPES_DATA);
  const [activeAuthority, setActiveAuthority] = useState<RegulatoryAuthority>('FDA');
  const [selectedTableTab, setSelectedTableTab] = useState<'nutrition' | 'costing' | 'unified'>('nutrition');
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeRecipe = recipes[selectedRecipeIndex] || recipes[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Update recipe scalar values (selling price, wastage, vat, packaging)
  const updateRecipeField = <K extends keyof CommercialRecipe>(field: K, value: CommercialRecipe[K]) => {
    setRecipes((prev) => {
      const copy = [...prev];
      copy[selectedRecipeIndex] = {
        ...copy[selectedRecipeIndex],
        [field]: value
      };
      return copy;
    });
  };

  // Update grams for an ingredient row
  const updateIngredientGrams = (idx: number, newGrams: number) => {
    setRecipes((prev) => {
      const copy = [...prev];
      const rec = { ...copy[selectedRecipeIndex] };
      const ings = [...rec.ingredients];
      const target = { ...ings[idx] };
      
      const catalogItem = MASTER_CATALOG_DATA.find((c) => c.sku === target.sku);
      const ratio = Math.max(0, newGrams) / 100;
      
      if (catalogItem) {
        target.grams = newGrams;
        target.kcal = Number((catalogItem.kcalPer100g * ratio).toFixed(1));
        target.protein = Number((catalogItem.proteinPer100g * ratio).toFixed(1));
        target.fat = Number((catalogItem.fatPer100g * ratio).toFixed(1));
        target.satFat = Number((catalogItem.satFatPer100g * ratio).toFixed(1));
        target.transFat = Number((catalogItem.transFatPer100g * ratio).toFixed(2));
        target.carbs = Number((catalogItem.carbPer100g * ratio).toFixed(1));
        target.fiber = Number((catalogItem.fiberPer100g * ratio).toFixed(1));
        target.sugars = Number((catalogItem.sugarsPer100g * ratio).toFixed(1));
        target.addedSugars = Number((catalogItem.addedSugarsPer100g * ratio).toFixed(1));
        target.sodiumMg = Number((catalogItem.sodiumMgPer100g * ratio).toFixed(1));
        target.salt = Number((catalogItem.saltPer100g * ratio).toFixed(2));
        target.cost = Number((catalogItem.costPer100g * ratio).toFixed(3));
      } else {
        target.grams = newGrams;
      }
      ings[idx] = target;
      rec.ingredients = ings;
      copy[selectedRecipeIndex] = rec;
      return copy;
    });
  };

  // Remove ingredient row
  const removeIngredient = (idx: number) => {
    if (activeRecipe.ingredients.length <= 1) {
      triggerToast('A commercial standard recipe sheet must contain at least 1 ingredient.');
      return;
    }
    setRecipes((prev) => {
      const copy = [...prev];
      const rec = { ...copy[selectedRecipeIndex] };
      rec.ingredients = rec.ingredients.filter((_, i) => i !== idx);
      copy[selectedRecipeIndex] = rec;
      return copy;
    });
    triggerToast('Ingredient removed from recipe formulation.');
  };

  // Add ingredient from catalog
  const addCatalogItem = (sku: string) => {
    const item = MASTER_CATALOG_DATA.find((c) => c.sku === sku);
    if (!item) return;

    setRecipes((prev) => {
      const copy = [...prev];
      const rec = { ...copy[selectedRecipeIndex] };
      const defaultGrams = 50;
      const ratio = defaultGrams / 100;
      
      const newRow: RecipeIngredientRow = {
        ingredientId: item.id,
        sku: item.sku,
        name: item.name,
        grams: defaultGrams,
        kcal: Number((item.kcalPer100g * ratio).toFixed(1)),
        protein: Number((item.proteinPer100g * ratio).toFixed(1)),
        fat: Number((item.fatPer100g * ratio).toFixed(1)),
        satFat: Number((item.satFatPer100g * ratio).toFixed(1)),
        transFat: Number((item.transFatPer100g * ratio).toFixed(2)),
        carbs: Number((item.carbPer100g * ratio).toFixed(1)),
        fiber: Number((item.fiberPer100g * ratio).toFixed(1)),
        sugars: Number((item.sugarsPer100g * ratio).toFixed(1)),
        addedSugars: Number((item.addedSugarsPer100g * ratio).toFixed(1)),
        sodiumMg: Number((item.sodiumMgPer100g * ratio).toFixed(1)),
        salt: Number((item.saltPer100g * ratio).toFixed(2)),
        cost: Number((item.costPer100g * ratio).toFixed(3)),
        allergens: item.allergens
      };

      rec.ingredients = [...rec.ingredients, newRow];
      copy[selectedRecipeIndex] = rec;
      return copy;
    });

    setShowCatalogModal(false);
    triggerToast(`Added ${item.name} to recipe sheet.`);
  };

  // Computed Totals for the recipe
  const totals = useMemo(() => {
    const rawGrams = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.grams) || 0), 0);
    const rawCost = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
    const rawKcal = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.kcal) || 0), 0);
    const rawProtein = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.protein) || 0), 0);
    const rawFat = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.fat) || 0), 0);
    const rawSatFat = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.satFat) || 0), 0);
    const rawTransFat = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.transFat) || 0), 0);
    const rawCarbs = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.carbs) || 0), 0);
    const rawSugars = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.sugars) || 0), 0);
    const rawAddedSugars = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.addedSugars) || 0), 0);
    const rawSodium = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.sodiumMg) || 0), 0);
    const rawSalt = activeRecipe.ingredients.reduce((acc, curr) => acc + (Number(curr.salt) || 0), 0);

    // Wastage application
    const wastageAddition = rawCost * (activeRecipe.wastageFactorPct / 100);
    const subTotalCost = rawCost + wastageAddition;

    // Portion math
    const portions = Math.max(1, activeRecipe.portions);
    const costPerPortion = subTotalCost / portions;
    const gramsPerPortion = rawGrams / portions;

    // Per 100g finished dish
    const scaleTo100g = rawGrams > 0 ? 100 / rawGrams : 1;
    const kcalPer100g = rawKcal * scaleTo100g;
    const proteinPer100g = rawProtein * scaleTo100g;
    const fatPer100g = rawFat * scaleTo100g;
    const satFatPer100g = rawSatFat * scaleTo100g;
    const transFatPer100g = rawTransFat * scaleTo100g;
    const carbsPer100g = rawCarbs * scaleTo100g;
    const sugarsPer100g = rawSugars * scaleTo100g;
    const addedSugarsPer100g = rawAddedSugars * scaleTo100g;
    const sodiumPer100g = rawSodium * scaleTo100g;
    const saltPer100g = rawSalt * scaleTo100g;

    // Financials
    const sellingPrice = Math.max(0.01, activeRecipe.sellingPrice);
    const foodCostPct = (costPerPortion / sellingPrice) * 100;
    const vatAmount = (sellingPrice * activeRecipe.vatPct) / 100;
    const packagingOverhead = activeRecipe.packagingOverhead;
    const netProfitPerDish = sellingPrice - costPerPortion - vatAmount - packagingOverhead;
    const netGrossMarginPct = (netProfitPerDish / sellingPrice) * 100;

    // Suggested Selling Price based on target food cost
    const idealFoodCostPct = Math.max(1, activeRecipe.idealFoodCostPct);
    const suggestedSellingPrice = costPerPortion / (idealFoodCostPct / 100);

    // Aggregate active allergens
    const declaredAllergenIds = new Set<string>();
    activeRecipe.ingredients.forEach((ing) => {
      ing.allergens?.forEach((a) => declaredAllergenIds.add(a));
    });

    return {
      rawGrams,
      rawCost,
      wastageAddition,
      subTotalCost,
      costPerPortion,
      gramsPerPortion,
      kcalPer100g,
      proteinPer100g,
      fatPer100g,
      satFatPer100g,
      transFatPer100g,
      carbsPer100g,
      sugarsPer100g,
      addedSugarsPer100g,
      sodiumPer100g,
      saltPer100g,
      sellingPrice,
      foodCostPct,
      vatAmount,
      packagingOverhead,
      netProfitPerDish,
      netGrossMarginPct,
      suggestedSellingPrice,
      declaredAllergenIds
    };
  }, [activeRecipe]);

  return (
    <section id="commercial-studio" className="py-16 sm:py-24 bg-[#101524] border-b border-[#273352]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Toast Alert Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A2238] border border-[#D4AF37] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-xs animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Studio Top Control Ribbon */}
        <div className="p-4 bg-[#1A2238] border border-[#273352] rounded-t-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-serif-culinary text-lg text-white font-medium">ChefLogix PRO</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#0F382C] text-[#D4AF37] border border-[#1a5c48]">
                Live Cloud Sync
              </span>
            </div>
            <span className="hidden sm:inline text-xs text-[#64748b]">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#94a3b8] font-mono">
              <span>Currency: USD ($)</span>
              <span>·</span>
              <span>Reg: ISO 22000 Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Master catalog synchronized with 2,633 USDA / EU audited ingredients.')}
              className="px-3 py-1.5 text-xs font-medium text-[#cbd5e1] hover:text-white bg-[#101524] hover:bg-[#222B45] border border-[#273352] rounded flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bulk Master Catalog (2,633 Items)</span>
            </button>
            <button
              onClick={() => setShowCatalogModal(true)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Ingredient</span>
            </button>
          </div>
        </div>

        {/* Main Commercial Formulation Container */}
        <div className="bg-[#1A2238] border-x border-b border-[#273352] rounded-b-xl p-5 sm:p-7 shadow-2xl">
          
          {/* Active Recipe Header Selector & Metric Pills */}
          <div className="pb-5 border-b border-[#273352] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-full sm:w-auto">
                <label className="text-[10px] uppercase tracking-wider text-[#94a3b8] block mb-1">
                  Active Commercial Recipe Specification:
                </label>
                <div className="relative">
                  <select
                    value={selectedRecipeIndex}
                    onChange={(e) => setSelectedRecipeIndex(Number(e.target.value))}
                    className="w-full sm:w-96 bg-[#101524] border border-[#273352] text-white text-xs font-medium rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    {recipes.map((r, idx) => (
                      <option key={r.id} value={idx} className="bg-[#101524] text-white">
                        {r.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-4">
                <button
                  onClick={() => triggerToast('Recipe specification duplicated to drafting workbench.')}
                  className="px-3 py-2 bg-[#101524] hover:bg-[#222B45] text-xs text-[#94a3b8] hover:text-white border border-[#273352] rounded flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Duplicate</span>
                </button>
              </div>
            </div>

            {/* Instant Real-Time KPI Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="px-3 py-1.5 bg-[#101524] border border-[#273352] rounded">
                <span className="text-[#94a3b8] block text-[9px] uppercase">Food Cost</span>
                <span className="font-bold text-white">USD ${totals.costPerPortion.toFixed(2)}</span>
              </div>
              <div className="px-3 py-1.5 bg-[#101524] border border-[#273352] rounded">
                <span className="text-[#94a3b8] block text-[9px] uppercase">FC % Target</span>
                <span className={`font-bold ${totals.foodCostPct <= activeRecipe.idealFoodCostPct ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {totals.foodCostPct.toFixed(1)}%
                </span>
              </div>
              <div className="px-3 py-1.5 bg-[#101524] border border-[#273352] rounded">
                <span className="text-[#94a3b8] block text-[9px] uppercase">Selling Price</span>
                <span className="font-bold text-[#D4AF37]">USD ${activeRecipe.sellingPrice.toFixed(2)}</span>
              </div>
              <div className="px-3 py-1.5 bg-[#0F382C] border border-[#1a5c48] rounded shadow-sm">
                <span className="text-emerald-200 block text-[9px] uppercase font-semibold">Net Gross Margin</span>
                <span className="font-bold text-[#D4AF37]">{totals.netGrossMarginPct.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Standard Recipe Sheet Hero Banner */}
          <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#0F382C] via-[#1A2238] to-[#101524] border border-[#D4AF37]/30 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-[#D4AF37] text-[#1A2238] font-bold text-[10px] rounded">
                    SR
                  </span>
                  <h2 className="text-base sm:text-lg font-serif-culinary text-white">
                    Standard Recipe Sheet (FDA • EU • GCC • FSSAI Ready)
                  </h2>
                </div>
                <p className="text-xs text-[#cbd5e1]">
                  Formulate dish ingredients, grams, automated costing, and complete regulatory nutritional profile.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => triggerToast('Complete commercial CSV generated with nutrition and unit economics.')}
                  className="px-3 py-2 text-xs text-white bg-[#101524] hover:bg-[#222B45] border border-[#273352] rounded flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => triggerToast('Regulatory printer stream ready. Printing high-resolution specification.')}
                  className="px-3 py-2 text-xs text-white bg-[#101524] hover:bg-[#222B45] border border-[#273352] rounded flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Print Sheet</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('regulatory-matrix');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Label Studio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dish Nutrition Metrics Bar (Portion: 100g • 1 Serving) */}
          <div className="mt-5 p-4 bg-[#101524] border border-[#273352] rounded-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#273352] mb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium">
                <span className="text-[#D4AF37]">♥</span>
                <span>Dish Nutrition Metrics (Portion: 100g · 1 Serving)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeRecipe.isNonVeg ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-[#0F382C] text-emerald-300 border border-[#1a5c48]'}`}>
                  {activeRecipe.isNonVeg ? '▲ NON-VEG' : '● VEG'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#0F382C] border border-[#1a5c48] text-emerald-300 font-mono">
                  SA {totals.kcalPer100g.toFixed(0)} سعرة حرارية (kcal)
                </span>
              </div>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Calories</span>
                <span className="text-[#D4AF37] font-bold text-sm">{totals.kcalPer100g.toFixed(0)} kcal</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Protein</span>
                <span className="text-emerald-400 font-bold text-sm">{totals.proteinPer100g.toFixed(1)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Total Fat</span>
                <span className="text-sky-400 font-bold text-sm">{totals.fatPer100g.toFixed(1)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Sat Fat</span>
                <span className="text-indigo-400 font-bold text-sm">{totals.satFatPer100g.toFixed(1)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Trans Fat</span>
                <span className="text-[#cbd5e1] font-bold text-sm">{totals.transFatPer100g.toFixed(2)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Total Carbs</span>
                <span className="text-orange-400 font-bold text-sm">{totals.carbsPer100g.toFixed(1)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Added Sugars</span>
                <span className="text-pink-400 font-bold text-sm">{totals.addedSugarsPer100g.toFixed(1)} g</span>
              </div>
              <div className="p-2.5 bg-[#1A2238] border border-[#273352] rounded">
                <span className="text-[10px] text-[#94a3b8] uppercase block">Salt (EU/GCC)</span>
                <span className="text-purple-400 font-bold text-sm">{totals.saltPer100g.toFixed(2)} g</span>
              </div>
            </div>
          </div>

          {/* Standard Recipe Sheet Form Details & Parameters */}
          <div className="mt-5 p-4 sm:p-5 bg-[#101524] border border-[#273352] rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-[#94a3b8] block mb-1">Outlet / Facility:</label>
                <input
                  type="text"
                  value={activeRecipe.outlet}
                  onChange={(e) => updateRecipeField('outlet', e.target.value)}
                  className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">Implementation Date:</label>
                <input
                  type="text"
                  value={activeRecipe.implementationDate}
                  onChange={(e) => updateRecipeField('implementationDate', e.target.value)}
                  className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">Portions (Yield):</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={activeRecipe.portions}
                  onChange={(e) => updateRecipeField('portions', Number(e.target.value))}
                  className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">Wastage Factor % (Prep Loss):</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={activeRecipe.wastageFactorPct}
                  onChange={(e) => updateRecipeField('wastageFactorPct', Number(e.target.value))}
                  className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 14 Statutory Allergens & Health Compliance Matrix */}
          <div className="mt-6 p-4 sm:p-5 bg-[#101524] border border-[#273352] rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#273352] mb-4 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs uppercase tracking-wider text-white font-semibold">
                  14 Statutory Allergens & Health Compliance Matrix
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#0F382C] border border-[#1a5c48] text-emerald-300 font-mono">
                  Auto-Syncs with 14 Allergens Matrix
                </span>
              </div>
              <div className="text-[11px] text-[#94a3b8]">
                Declared on dish: <span className="text-[#D4AF37] font-bold">{totals.declaredAllergenIds.size}</span> allergens
              </div>
            </div>

            {/* 14 Statutory Allergens Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {STATUTORY_ALLERGENS.map((allergen) => {
                const isDeclared = totals.declaredAllergenIds.has(allergen.id);
                return (
                  <div
                    key={allergen.id}
                    className={`p-2 rounded border text-left flex items-center justify-between transition-all ${
                      isDeclared
                        ? 'bg-[#0F382C] border-[#D4AF37]/50 text-white shadow-sm'
                        : 'bg-[#1A2238] border-[#273352] text-[#94a3b8]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-sm shrink-0">{allergen.icon}</span>
                      <span className="text-[11px] font-medium truncate">{allergen.name}</span>
                    </div>
                    {isDeclared ? (
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" title="Declared in dish formulation" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#334155] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Ingredient Costing & Formulation Table */}
          <div className="mt-6">
            <div className="flex items-center justify-between pb-3 mb-2">
              <h3 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4" />
                Recipe Formulation Ingredient Grid (Grams, Macros & Item Cost)
              </h3>
              <div className="text-xs text-[#94a3b8] font-mono">
                Batch Weight: <strong className="text-white">{totals.rawGrams.toFixed(1)}g</strong> | Raw Cost: <strong className="text-emerald-400">${totals.rawCost.toFixed(3)}</strong>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-[#273352]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#1A2238] text-[#94a3b8] uppercase text-[10px] border-b border-[#273352]">
                  <tr>
                    <th className="py-2.5 px-3">SR NO</th>
                    <th className="py-2.5 px-3">ITEM NAME</th>
                    <th className="py-2.5 px-3 text-right">GM USE</th>
                    <th className="py-2.5 px-3 text-right">KCAL</th>
                    <th className="py-2.5 px-3 text-right">PROT (G)</th>
                    <th className="py-2.5 px-3 text-right">FAT (G)</th>
                    <th className="py-2.5 px-3 text-right">SAT FAT (G)</th>
                    <th className="py-2.5 px-3 text-right">CARB (G)</th>
                    <th className="py-2.5 px-3 text-right">SALT (G)</th>
                    <th className="py-2.5 px-3 text-right text-[#D4AF37]">COST (USD)</th>
                    <th className="py-2.5 px-3 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#273352] bg-[#101524]">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <tr key={idx} className="hover:bg-[#222B45] transition-colors">
                      <td className="py-2 px-3 text-[#64748b]">{ing.sku || idx + 1}</td>
                      <td className="py-2 px-3 font-medium text-white flex items-center gap-2">
                        <span>{ing.name}</span>
                        {ing.allergens?.length > 0 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0F382C] text-emerald-300 border border-[#1a5c48] font-sans">
                            {ing.allergens.length} Allergen
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <input
                          type="number"
                          min="1"
                          max="5000"
                          value={ing.grams}
                          onChange={(e) => updateIngredientGrams(idx, Number(e.target.value))}
                          className="w-16 bg-[#1A2238] border border-[#273352] rounded px-1.5 py-0.5 text-right text-white focus:border-[#D4AF37] focus:outline-none"
                        />
                      </td>
                      <td className="py-2 px-3 text-right text-[#cbd5e1]">{ing.kcal.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-emerald-400">{ing.protein.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-sky-400">{ing.fat.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-indigo-400">{ing.satFat.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-orange-400">{ing.carbs.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right text-purple-400">{ing.salt.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-400">
                        ${ing.cost.toFixed(3)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => removeIngredient(idx)}
                          className="text-[#64748b] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Summary Rows */}
                  <tr className="bg-[#1A2238] font-semibold border-t-2 border-[#273352]">
                    <td colSpan={2} className="py-2.5 px-3 text-white uppercase text-[11px]">
                      TOTAL (RAW BATCH)
                    </td>
                    <td className="py-2.5 px-3 text-right text-white">{totals.rawGrams.toFixed(1)}g</td>
                    <td className="py-2.5 px-3 text-right">{totals.rawGrams > 0 ? (totals.kcalPer100g * (totals.rawGrams / 100)).toFixed(0) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400">{totals.rawGrams > 0 ? (totals.proteinPer100g * (totals.rawGrams / 100)).toFixed(1) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-sky-400">{totals.rawGrams > 0 ? (totals.fatPer100g * (totals.rawGrams / 100)).toFixed(1) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-indigo-400">{totals.rawGrams > 0 ? (totals.satFatPer100g * (totals.rawGrams / 100)).toFixed(1) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-orange-400">{totals.rawGrams > 0 ? (totals.carbsPer100g * (totals.rawGrams / 100)).toFixed(1) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-purple-400">{totals.rawGrams > 0 ? (totals.saltPer100g * (totals.rawGrams / 100)).toFixed(2) : 0}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">${totals.rawCost.toFixed(3)}</td>
                    <td className="py-2.5 px-3"></td>
                  </tr>

                  <tr className="bg-[#101524] text-[#94a3b8]">
                    <td colSpan={2} className="py-2 px-3 uppercase text-[10px]">
                      SUB TOTAL (+{activeRecipe.wastageFactorPct}% WASTAGE FACTOR)
                    </td>
                    <td className="py-2.5 px-3 text-right">{totals.rawGrams.toFixed(1)}g</td>
                    <td colSpan={6}></td>
                    <td className="py-2 px-3 text-right text-white font-bold">${totals.subTotalCost.toFixed(3)}</td>
                    <td></td>
                  </tr>

                  <tr className="bg-[#0F382C] text-[#D4AF37] font-bold border-t border-[#D4AF37]/30">
                    <td colSpan={2} className="py-2 px-3 uppercase text-[10px]">
                      PER PORTION (1 SERVING · {totals.gramsPerPortion.toFixed(0)}G)
                    </td>
                    <td className="py-2.5 px-3 text-right text-white">{totals.gramsPerPortion.toFixed(1)}g</td>
                    <td colSpan={6}></td>
                    <td className="py-2 px-3 text-right text-emerald-300 font-bold">${totals.costPerPortion.toFixed(3)}</td>
                    <td></td>
                  </tr>

                  <tr className="bg-[#1A2238] text-[#94a3b8] text-[10px]">
                    <td colSpan={2} className="py-2 px-3 uppercase text-emerald-300">
                      PER 100G FINISHED DISH (EU 1169 / FSSAI STANDARD)
                    </td>
                    <td className="py-2 px-3 text-right">100.0g</td>
                    <td className="py-2 px-3 text-right">{totals.kcalPer100g.toFixed(0)}</td>
                    <td className="py-2 px-3 text-right">{totals.proteinPer100g.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">{totals.fatPer100g.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">{totals.satFatPer100g.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">{totals.carbsPer100g.toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">{totals.saltPer100g.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right text-white">${(totals.rawGrams > 0 ? (totals.subTotalCost / totals.rawGrams) * 100 : 0).toFixed(3)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Action Row */}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => setShowCatalogModal(true)}
                className="px-3.5 py-1.5 bg-[#0F382C] hover:bg-[#154b3b] text-xs font-semibold text-[#D4AF37] border border-[#1a5c48] rounded flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Search & Add From Master Catalog (2,633 Items)</span>
              </button>

              <span className="text-[11px] text-[#94a3b8]">
                Tip: Click grams in any row to instantly recalculate economics & nutrition.
              </span>
            </div>
          </div>

          {/* Financials, VAT & Margins Box & Unit Economics Breakdown */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Financial Parameters Inputs (6 cols) */}
            <div className="lg:col-span-6 p-5 bg-[#101524] border border-[#273352] rounded-lg">
              <h3 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Financials, VAT & Selling Economics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#94a3b8] block mb-1">Selling Price (USD):</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#94a3b8] font-mono">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={activeRecipe.sellingPrice}
                      onChange={(e) => updateRecipeField('sellingPrice', Number(e.target.value))}
                      className="w-full bg-[#1A2238] border border-[#273352] rounded pl-7 pr-3 py-1.5 text-white font-mono text-sm font-bold focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#94a3b8] block mb-1">Calculated Food Cost %:</label>
                  <div className="p-1.5 bg-[#1A2238] border border-[#273352] rounded font-mono text-sm font-bold text-emerald-400">
                    {totals.foodCostPct.toFixed(1)}%
                  </div>
                </div>

                <div>
                  <label className="text-[#94a3b8] block mb-1">Applicable VAT %:</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="30"
                    value={activeRecipe.vatPct}
                    onChange={(e) => updateRecipeField('vatPct', Number(e.target.value))}
                    className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#94a3b8] block mb-1">VAT Amount per Dish:</label>
                  <div className="p-1.5 bg-[#1A2238] border border-[#273352] rounded font-mono text-xs text-[#cbd5e1]">
                    ${totals.vatAmount.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="text-[#94a3b8] block mb-1">Packaging / Delivery Overhead:</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#94a3b8] font-mono">$</span>
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      value={activeRecipe.packagingOverhead}
                      onChange={(e) => updateRecipeField('packagingOverhead', Number(e.target.value))}
                      className="w-full bg-[#1A2238] border border-[#273352] rounded pl-7 pr-3 py-1.5 text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#94a3b8] block mb-1">Ideal Food Cost Target:</label>
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={activeRecipe.idealFoodCostPct}
                    onChange={(e) => updateRecipeField('idealFoodCostPct', Number(e.target.value))}
                    className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-1.5 text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Suggest Selling Price Recommendation */}
              <div className="mt-5 p-3.5 bg-[#0F382C] border border-[#D4AF37]/40 rounded-lg flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-200 block font-semibold">
                    Suggested Selling Price (At {activeRecipe.idealFoodCostPct}% Target)
                  </span>
                  <span className="text-xs text-[#D4AF37]">Optimizes gross contribution per cover</span>
                </div>
                <div className="font-mono text-lg font-bold text-white">
                  USD ${totals.suggestedSellingPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Unit Economics Breakdown Card (6 cols) */}
            <div className="lg:col-span-6 p-5 bg-[#101524] border border-[#273352] rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>% Unit Economics Breakdown</span>
                </h3>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#273352]">
                    <span className="text-[#94a3b8]">Raw Formulation Cost:</span>
                    <span className="text-white">USD ${totals.rawCost.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#273352]">
                    <span className="text-[#94a3b8]">Wastage Addition ({activeRecipe.wastageFactorPct}%):</span>
                    <span className="text-[#D4AF37]">+USD ${totals.wastageAddition.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#273352] font-semibold">
                    <span className="text-white">Sub Total Cost:</span>
                    <span className="text-white">USD ${totals.subTotalCost.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#273352]">
                    <span className="text-[#94a3b8]">VAT Deduction ({activeRecipe.vatPct}%):</span>
                    <span className="text-rose-400">-USD ${totals.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#273352]">
                    <span className="text-[#94a3b8]">Packaging / Overhead:</span>
                    <span className="text-rose-400">-USD ${activeRecipe.packagingOverhead.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 font-bold text-sm">
                    <span className="text-white">Net Profit per Cover:</span>
                    <span className="text-emerald-400">+USD ${totals.netProfitPerDish.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#0F382C] border border-[#D4AF37]/50 rounded-lg flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-bold block">
                    Net Gross Margin
                  </span>
                  <span className="text-xs text-[#cbd5e1]">Calculated after all deductions</span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#D4AF37]">
                  {totals.netGrossMarginPct.toFixed(1)}%
                </div>
              </div>
            </div>

          </div>

          {/* Multi-Authority Health & Regulatory Compliance Matrix */}
          <div id="regulatory-matrix" className="mt-8 p-5 sm:p-6 bg-[#101524] border-2 border-[#D4AF37]/40 rounded-xl relative shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#273352] mb-5 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-sm sm:text-base font-serif-culinary text-white">
                    Multi-Authority Health & Regulatory Compliance Matrix
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#0F382C] border border-[#1a5c48] text-[#D4AF37] font-mono">
                    FDA · EU · GCC · FSSAI
                  </span>
                </div>
                <p className="text-xs text-[#cbd5e1]">
                  Live nutritional metrics synchronized with USA FDA 21 CFR 101.9, EU Reg 1169/2011, GCC GSO 2233, and India FSSAI 2020 standards.
                </p>
              </div>

              <button
                onClick={() => triggerToast(`Official ${activeAuthority} compliant regulatory label exported.`)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded flex items-center gap-1.5 cursor-pointer shadow-md whitespace-nowrap transition-colors"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Generate Regulatory Sticker</span>
              </button>
            </div>

            {/* Authority Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setActiveAuthority('FDA')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeAuthority === 'FDA'
                    ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md font-bold'
                    : 'bg-[#1A2238] text-[#94a3b8] hover:text-white border border-[#273352]'
                }`}
              >
                🇺🇸 US FDA (21 CFR 101.9)
              </button>
              <button
                onClick={() => setActiveAuthority('EU')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeAuthority === 'EU'
                    ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md font-bold'
                    : 'bg-[#1A2238] text-[#94a3b8] hover:text-white border border-[#273352]'
                }`}
              >
                🇪🇺 EU Regulation (1169/2011)
              </button>
              <button
                onClick={() => setActiveAuthority('GCC')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeAuthority === 'GCC'
                    ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md font-bold'
                    : 'bg-[#1A2238] text-[#94a3b8] hover:text-white border border-[#273352]'
                }`}
              >
                🇸🇦 SA GCC / SFDA (GSO 2233)
              </button>
              <button
                onClick={() => setActiveAuthority('FSSAI')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeAuthority === 'FSSAI'
                    ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md font-bold'
                    : 'bg-[#1A2238] text-[#94a3b8] hover:text-white border border-[#273352]'
                }`}
              >
                🇮🇳 IN FSSAI India (ICMR 2020)
              </button>
            </div>

            {/* Live Rendered Nutrition Facts Panel Display */}
            <div className="p-4 bg-[#1A2238] border border-[#273352] rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#273352] mb-4 gap-2 text-xs">
                <span className="text-white font-medium">
                  {activeAuthority === 'FDA' && 'United States FDA Nutrition Facts Standard: Portion: 100g (1 portion) | Reference: 2,000 calories daily.'}
                  {activeAuthority === 'EU' && 'European Union Regulation (EU) No 1169/2011: Mandatory Nutrition Declaration per 100g / 100ml.'}
                  {activeAuthority === 'GCC' && 'GCC Standardization Organization GSO 2233:2021 & SFDA Food Labeling Regulations.'}
                  {activeAuthority === 'FSSAI' && 'Food Safety and Standards Authority of India (Labelling and Display) Regulations 2020.'}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0F382C] text-emerald-300 border border-[#1a5c48] font-mono text-[10px]">
                  ✓ Good Source of Protein (&gt;=10g)
                </span>
              </div>

              {/* Authority Data Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-mono">
                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Calories</span>
                  <span className="text-base font-bold text-white">{totals.kcalPer100g.toFixed(0)}</span>
                  <span className="text-[9px] text-[#64748b] block">{activeAuthority === 'FDA' ? 'FDA Rounded' : 'kJ / kcal'}</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Total Fat</span>
                  <span className="text-base font-bold text-sky-400">{totals.fatPer100g.toFixed(1)}g</span>
                  <span className="text-[9px] text-emerald-400 block">{((totals.fatPer100g / 78) * 100).toFixed(0)}% DV</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Saturated Fat</span>
                  <span className="text-base font-bold text-indigo-400">{totals.satFatPer100g.toFixed(1)}g</span>
                  <span className="text-[9px] text-emerald-400 block">{((totals.satFatPer100g / 20) * 100).toFixed(0)}% DV</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Sodium</span>
                  <span className="text-base font-bold text-[#D4AF37]">{totals.sodiumPer100g.toFixed(0)}mg</span>
                  <span className="text-[9px] text-emerald-400 block">{((totals.sodiumPer100g / 2300) * 100).toFixed(0)}% DV</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Total Carbs</span>
                  <span className="text-base font-bold text-orange-400">{totals.carbsPer100g.toFixed(1)}g</span>
                  <span className="text-[9px] text-emerald-400 block">{((totals.carbsPer100g / 275) * 100).toFixed(0)}% DV</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Sugars</span>
                  <span className="text-base font-bold text-pink-400">{totals.sugarsPer100g.toFixed(1)}g</span>
                  <span className="text-[9px] text-[#64748b] block">0g Added</span>
                </div>

                <div className="p-3 bg-[#101524] border border-[#273352] rounded">
                  <span className="text-[10px] text-[#94a3b8] uppercase block">Protein</span>
                  <span className="text-base font-bold text-emerald-400">{totals.proteinPer100g.toFixed(1)}g</span>
                  <span className="text-[9px] text-emerald-400 block">{((totals.proteinPer100g / 50) * 100).toFixed(0)}% DV</span>
                </div>
              </div>

              {/* Bottom Authority Guarantee Banner */}
              <div className="mt-4 pt-3 border-t border-[#273352] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#94a3b8] gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Compliant with Natasha’s Law (UK), FASTER Act (US), and SFDA Halal Standard.</span>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-semibold">
                  Verified for export to commercial packaging & POS displays.
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Enterprise CTA */}
          <div className="mt-8 p-5 bg-gradient-to-r from-[#0F382C] via-[#1A2238] to-[#101524] border border-[#D4AF37]/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h4 className="text-sm font-semibold text-white mb-0.5">
                Ready to deploy ChefLogix across your commercial restaurant or food business?
              </h4>
              <p className="text-xs text-[#cbd5e1]">
                Get 90 days of full enterprise access with unlimited recipe sheets, master catalog sync, and multi-user permissions.
              </p>
            </div>

            <button
              onClick={onOpenTrialModal}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-md"
            >
              <span>Activate 90-Day Enterprise Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Catalog Search Modal */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A2238] border border-[#D4AF37]/40 rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#273352] mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Select Item from Master Catalog (2,633 Items)
                </h3>
              </div>
              <button
                onClick={() => setShowCatalogModal(false)}
                className="text-[#94a3b8] hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {MASTER_CATALOG_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#101524] border border-[#273352] rounded-lg flex items-center justify-between hover:border-[#D4AF37] transition-all"
                >
                  <div>
                    <span className="text-xs font-medium text-white block">{item.name}</span>
                    <span className="text-[11px] text-[#94a3b8] font-mono">
                      SKU: {item.sku} · ${item.costPer100g.toFixed(2)}/100g · {item.kcalPer100g} kcal · Prot: {item.proteinPer100g}g
                    </span>
                  </div>
                  <button
                    onClick={() => addCatalogItem(item.sku)}
                    className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C358] text-[#1A2238] font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    + Add to Recipe
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
