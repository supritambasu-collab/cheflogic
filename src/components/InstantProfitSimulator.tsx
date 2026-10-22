import React, { useState, useId } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Sliders, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  RotateCcw,
  Percent,
  Utensils
} from 'lucide-react';
import { 
  WAGYU_BURGER_IMG, 
  KING_SALMON_IMG, 
  TRUFFLE_PASTA_IMG, 
  HOT_CHICKEN_IMG 
} from '../assets/images';

interface DishPreset {
  id: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
  defaultPrice: number;
  defaultVolume: number;
  ingredients: {
    name: string;
    category: 'Protein' | 'Dairy' | 'Produce' | 'Carb' | 'Packaging';
    cost: number;
    color: string;
  }[];
  allergens: string[];
}

const DISH_PRESETS: DishPreset[] = [
  {
    id: 'wagyu-burger',
    name: 'Prime Wagyu Truffle Burger',
    tagline: 'Aged cheddar, brioche bun, black truffle aioli & crispy shallots',
    image: WAGYU_BURGER_IMG,
    category: 'Gourmet Handheld',
    defaultPrice: 28.00,
    defaultVolume: 75,
    allergens: ['Gluten / Cereals', 'Milk / Dairy', 'Eggs'],
    ingredients: [
      { name: '200g Wagyu Chuck Patty', category: 'Protein', cost: 4.40, color: '#D4AF37' },
      { name: 'Aged Truffle Cheddar', category: 'Dairy', cost: 1.15, color: '#E5C358' },
      { name: 'Artisan Brioche Bun', category: 'Carb', cost: 0.85, color: '#0F382C' },
      { name: 'Black Truffle Aioli', category: 'Produce', cost: 0.65, color: '#165b46' },
      { name: 'Eco-Craft Box & Liner', category: 'Packaging', cost: 0.55, color: '#273352' },
    ]
  },
  {
    id: 'king-salmon',
    name: 'Crisp Skin King Salmon',
    tagline: 'Pan-seared Ora King fillet, asparagus, lemon velouté & heirloom carrots',
    image: KING_SALMON_IMG,
    category: 'Seafood Entrée',
    defaultPrice: 38.00,
    defaultVolume: 50,
    allergens: ['Fish / Finfish', 'Milk / Dairy'],
    ingredients: [
      { name: '180g Ora King Salmon', category: 'Protein', cost: 7.65, color: '#D4AF37' },
      { name: 'Normandy Crème Velouté', category: 'Dairy', cost: 0.70, color: '#E5C358' },
      { name: 'Wild Chanterelle Sauté', category: 'Produce', cost: 1.40, color: '#0F382C' },
      { name: 'Baby Glazed Carrots', category: 'Produce', cost: 0.45, color: '#165b46' },
      { name: 'Plating Garnish & Seasoning', category: 'Packaging', cost: 0.35, color: '#273352' },
    ]
  },
  {
    id: 'truffle-pasta',
    name: 'Handcrafted Truffle Tagliatelle',
    tagline: 'Fresh egg pasta, shaved black truffles, 24-mo Parmigiano emulsion',
    image: TRUFFLE_PASTA_IMG,
    category: 'Artisan Pasta',
    defaultPrice: 26.00,
    defaultVolume: 65,
    allergens: ['Gluten / Cereals', 'Milk / Dairy', 'Eggs'],
    ingredients: [
      { name: '160g Handcrafted Egg Pasta', category: 'Carb', cost: 1.20, color: '#D4AF37' },
      { name: 'Shaved Black Truffle Butter', category: 'Dairy', cost: 2.10, color: '#E5C358' },
      { name: '24-Mo Parmigiano Reggiano', category: 'Dairy', cost: 1.30, color: '#0F382C' },
      { name: 'Wild Field Herbs & Garlic', category: 'Produce', cost: 0.45, color: '#165b46' },
      { name: 'Service Prep Overhead', category: 'Packaging', cost: 0.30, color: '#273352' },
    ]
  },
  {
    id: 'hot-chicken',
    name: 'Nashville Crispy Hot Chicken',
    tagline: 'Spiced cayenne dredge, sweet slaw, house dill pickles on butter brioche',
    image: HOT_CHICKEN_IMG,
    category: 'Gastropub Favorite',
    defaultPrice: 19.50,
    defaultVolume: 110,
    allergens: ['Gluten / Cereals', 'Milk / Dairy', 'Mustard'],
    ingredients: [
      { name: '220g Brined Chicken Breast', category: 'Protein', cost: 2.45, color: '#D4AF37' },
      { name: 'Nashville Spice Dredge & Oil', category: 'Produce', cost: 0.65, color: '#E5C358' },
      { name: 'Toasted Potato Brioche Bun', category: 'Carb', cost: 0.85, color: '#0F382C' },
      { name: 'Creamy Slaw & Dill Pickles', category: 'Produce', cost: 0.75, color: '#165b46' },
      { name: 'Biodegradable Wrap & Bag', category: 'Packaging', cost: 0.50, color: '#273352' },
    ]
  }
];

interface InstantProfitSimulatorProps {
  onOpenTrialModal: () => void;
  onExploreFullStudio: () => void;
}

export const InstantProfitSimulator: React.FC<InstantProfitSimulatorProps> = ({
  onOpenTrialModal,
  onExploreFullStudio
}) => {
  const [selectedDishId, setSelectedDishId] = useState<string>('wagyu-burger');
  const activeDish = DISH_PRESETS.find(d => d.id === selectedDishId) || DISH_PRESETS[0];

  const priceSliderId = useId();
  const volumeSliderId = useId();

  const [sellPrice, setSellPrice] = useState<number>(activeDish.defaultPrice);
  const [dailyVolume, setDailyVolume] = useState<number>(activeDish.defaultVolume);
  const [inflationShock, setInflationShock] = useState<boolean>(false);

  // When changing dish preset, reset sliders to dish defaults
  const handleSelectDish = (dish: DishPreset) => {
    setSelectedDishId(dish.id);
    setSellPrice(dish.defaultPrice);
    setDailyVolume(dish.defaultVolume);
  };

  // Base ingredient cost
  const rawBaseCost = activeDish.ingredients.reduce((acc, item) => acc + item.cost, 0);
  const totalPlateCost = inflationShock ? rawBaseCost * 1.15 : rawBaseCost;

  // Real-time metrics
  const foodCostPct = sellPrice > 0 ? (totalPlateCost / sellPrice) * 100 : 0;
  const grossMarginPct = 100 - foodCostPct;
  const profitPerPlate = Math.max(0, sellPrice - totalPlateCost);
  const monthlyRevenue = sellPrice * dailyVolume * 30;
  const monthlyCost = totalPlateCost * dailyVolume * 30;
  const monthlyProfit = monthlyRevenue - monthlyCost;
  const annualProfit = monthlyProfit * 12;

  // Food cost status benchmark
  // <28% = Excellent | 28-34% = Standard Healthy | 34-40% = Borderline | >40% = Critical Loss
  const getStatus = () => {
    if (foodCostPct <= 28.5) {
      return {
        label: 'Prime Profit Zone',
        badge: 'bg-[#0F382C] text-emerald-300 border-[#1a5c48]',
        text: 'text-emerald-400',
        advice: 'Outstanding margins. High gross profit cushion against supplier shocks.'
      };
    } else if (foodCostPct <= 34.0) {
      return {
        label: 'Healthy Industry Benchmark',
        badge: 'bg-[#1A2238] text-[#D4AF37] border-[#D4AF37]/40',
        text: 'text-[#D4AF37]',
        advice: 'Balanced commercial pricing. Sustainable for full-service hospitality.'
      };
    } else if (foodCostPct <= 40.0) {
      return {
        label: 'Caution: Margin Squeeze',
        badge: 'bg-amber-950/60 text-amber-300 border-amber-700/50',
        text: 'text-amber-400',
        advice: 'Tight margin. Small supplier price hikes will push this dish into the red.'
      };
    } else {
      return {
        label: 'Critical Leak: Losing Money',
        badge: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
        text: 'text-rose-400',
        advice: 'Severe underpricing or oversized portions. Immediate menu repricing required!'
      };
    }
  };

  const status = getStatus();

  // One-click Auto-Fix to 28% golden food cost
  const handleAutoOptimize = () => {
    const targetPrice = Math.ceil((totalPlateCost / 0.28) * 2) / 2; // round to nearest $0.50
    setSellPrice(targetPrice);
  };

  return (
    <div className="w-full bg-[#1A2238] border border-[#273352] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      
      {/* Top Banner Hook - 30-Second Attention Promise */}
      <div className="px-5 sm:px-8 py-4 bg-gradient-to-r from-[#0F382C] via-[#1A2238] to-[#101524] border-b border-[#273352] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                30-Second Plate Profit Simulator
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0F382C] border border-emerald-500/40 text-emerald-300 font-medium">
                Live Interactive
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              Pick a dish below, drag the price or volume, and see your exact kitchen profit in real time.
            </p>
          </div>
        </div>

        <button
          onClick={handleAutoOptimize}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
          title="Auto-calculate the mathematically ideal price for 28% food cost"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-Fix to 28% Margin</span>
        </button>
      </div>

      {/* Preset Dish Cards: 4 Real Commercial Dishes with mouth-watering photography */}
      <div className="p-4 sm:p-6 bg-[#101524]/60 border-b border-[#273352]">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-3 flex items-center justify-between">
          <span>Step 1: Choose a Commercial Recipe</span>
          <span className="text-[11px] text-[#D4AF37] font-normal">Click any dish to test</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DISH_PRESETS.map((dish) => {
            const isSelected = dish.id === selectedDishId;
            return (
              <button
                key={dish.id}
                onClick={() => handleSelectDish(dish)}
                className={`relative group rounded-xl p-2.5 sm:p-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#1A2238] border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15 ring-2 ring-[#D4AF37]/20' 
                    : 'bg-[#1A2238]/60 border border-[#273352] hover:border-[#D4AF37]/50 hover:bg-[#1A2238]'
                }`}
              >
                {/* Dish Photo */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2.5 bg-[#101524]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-semibold text-white tracking-wide uppercase">
                    {dish.category}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A2238]" />
                    </div>
                  )}
                </div>

                {/* Dish Name & Quick Tag */}
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-1 ${
                    isSelected ? 'text-[#D4AF37]' : 'text-white'
                  }`}>
                    {dish.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#94a3b8] font-mono-num">
                    <span>Default: ${dish.defaultPrice.toFixed(2)}</span>
                    <span className="text-emerald-400 font-semibold">{dish.defaultVolume}/day</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: Sliders on Left, Live Financial Feedback on Right */}
      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Tactile Controls & Ingredient Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dish Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Active Recipe</span>
              <span className="text-[#475569]">·</span>
              <span className="text-xs text-[#94a3b8]">{activeDish.category}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-culinary text-white font-medium">
              {activeDish.name}
            </h2>
            <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
              {activeDish.tagline}
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="p-4 bg-[#101524] border border-[#273352] rounded-xl space-y-5">
            
            {/* Slider 1: Menu Selling Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={priceSliderId} className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Menu Selling Price</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono-num text-[#D4AF37]">
                    ${sellPrice.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">/ plate</span>
                </div>
              </div>
              <input
                id={priceSliderId}
                type="range"
                min="12"
                max="60"
                step="0.5"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#273352] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                aria-label="Menu Selling Price"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#64748b] font-mono-num">
                <span>Value: $12.00</span>
                <span>Fast Casual: $22.00</span>
                <span>Premium: $38.00</span>
                <span>Fine Dining: $60.00</span>
              </div>
            </div>

            {/* Slider 2: Daily Volume Sold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={volumeSliderId} className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Estimated Daily Covers (Plates Sold)</span>
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono-num text-white">
                    {dailyVolume}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">plates / day</span>
                </div>
              </div>
              <input
                id={volumeSliderId}
                type="range"
                min="15"
                max="250"
                step="5"
                value={dailyVolume}
                onChange={(e) => setDailyVolume(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#273352] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                aria-label="Daily Plates Sold"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#64748b] font-mono-num">
                <span>Boutique: 15/day</span>
                <span>Mid-Size: 75/day</span>
                <span>High Volume: 150/day</span>
                <span>Enterprise: 250/day</span>
              </div>
            </div>

            {/* Inflation Shock Toggle */}
            <div className="pt-3 border-t border-[#273352]/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${inflationShock ? 'text-amber-400' : 'text-[#64748b]'}`} />
                <div>
                  <span className="text-xs font-semibold text-white">Test Supplier Inflation (+15%)</span>
                  <p className="text-[10px] text-[#94a3b8]">Simulate wholesale meat & dairy price surges</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInflationShock(!inflationShock)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  inflationShock ? 'bg-[#D4AF37]' : 'bg-[#273352]'
                }`}
                aria-pressed={inflationShock}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#101524] shadow ring-0 transition duration-200 ease-in-out ${
                    inflationShock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Visual Ingredient Cost Stack Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-white uppercase tracking-wider">
                Gram-Level Cost Composition (${totalPlateCost.toFixed(2)})
              </span>
              <span className="text-[11px] text-[#94a3b8] font-mono-num">
                {activeDish.ingredients.length} Costed Components
              </span>
            </div>

            {/* Stacked bar */}
            <div className="h-3.5 w-full bg-[#101524] rounded-full overflow-hidden flex border border-[#273352]">
              {activeDish.ingredients.map((ing, i) => {
                const effectiveCost = inflationShock ? ing.cost * 1.15 : ing.cost;
                const widthPct = (effectiveCost / totalPlateCost) * 100;
                return (
                  <div
                    key={i}
                    style={{ width: `${widthPct}%`, backgroundColor: ing.color }}
                    className="h-full transition-all hover:opacity-80"
                    title={`${ing.name}: $${effectiveCost.toFixed(2)} (${widthPct.toFixed(1)}%)`}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#cbd5e1]">
              {activeDish.ingredients.map((ing, i) => {
                const effectiveCost = inflationShock ? ing.cost * 1.15 : ing.cost;
                return (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ing.color }} />
                    <span className="text-[#94a3b8] truncate max-w-[130px]">{ing.name}:</span>
                    <span className="font-semibold font-mono-num text-white">${effectiveCost.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statutory Allergens Instant Detection */}
          <div className="p-3 bg-[#0F382C]/30 border border-[#1a5c48] rounded-xl flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white">Statutory Allergens Detected:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeDish.allergens.map((all, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#0F382C] border border-emerald-400/40 text-emerald-200 font-medium">
                  {all}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: High-Impact Financial Impact Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#101524] to-[#1A2238] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 relative">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Status Badge */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.badge}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{status.label}</span>
            </div>
            <span className="text-xs text-[#94a3b8]">Live Margin Analysis</span>
          </div>

          {/* The Big Food Cost % Gauge */}
          <div className="text-center py-4 bg-[#101524]/80 border border-[#273352] rounded-xl mb-6">
            <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-semibold block mb-1">
              Food Cost Percentage
            </span>
            <div className={`text-5xl sm:text-6xl font-bold font-mono-num tracking-tight ${status.text}`}>
              {foodCostPct.toFixed(1)}%
            </div>
            <div className="mt-2 text-xs font-medium text-white flex items-center justify-center gap-1">
              <span>Gross Margin:</span>
              <span className="font-bold text-[#D4AF37] font-mono-num">{grossMarginPct.toFixed(1)}%</span>
              <span className="text-[#94a3b8]">(Industry Target: 28–32%)</span>
            </div>
          </div>

          {/* Key Profit Figures */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 bg-[#1A2238] border border-[#273352] rounded-lg">
              <span className="text-[11px] text-[#94a3b8] block">Profit Per Plate</span>
              <span className="text-xl font-bold font-mono-num text-emerald-400">
                +${profitPerPlate.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#64748b] block mt-0.5">after raw ingredient cost</span>
            </div>

            <div className="p-3.5 bg-[#1A2238] border border-[#273352] rounded-lg">
              <span className="text-[11px] text-[#94a3b8] block">Plate Cost</span>
              <span className="text-xl font-bold font-mono-num text-[#D4AF37]">
                ${totalPlateCost.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#64748b] block mt-0.5">
                {inflationShock ? 'incl. +15% surge' : 'standard wholesale'}
              </span>
            </div>
          </div>

          {/* Monthly Cash Impact Strip */}
          <div className="p-4 bg-[#0F382C]/40 border border-[#1a5c48] rounded-xl mb-6">
            <div className="flex items-center justify-between text-xs text-emerald-200 mb-1">
              <span>Projected Net Monthly Profit</span>
              <span className="font-mono-num text-emerald-400 text-xs font-semibold">({dailyVolume} plates/day × 30 days)</span>
            </div>
            <div className="text-3xl font-bold font-mono-num text-white">
              ${monthlyProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              <span className="text-sm font-normal text-emerald-300"> / month</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-300/80 font-mono-num">
              Annual dish contribution: ${annualProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / year
            </div>
          </div>

          {/* ChefLogix Prescriptive Advice */}
          <div className="p-3 bg-[#101524] border border-[#273352] rounded-lg text-xs text-[#cbd5e1] leading-relaxed mb-6">
            <span className="text-[#D4AF37] font-semibold block mb-0.5">ChefLogix Recommendation:</span>
            {status.advice}
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              onClick={onExploreFullStudio}
              className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.99] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
            >
              <span>Open in Full Commercial Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-2.5 px-4 text-xs font-medium text-emerald-300 hover:text-white bg-[#0F382C]/50 hover:bg-[#0F382C] border border-[#1a5c48] rounded-lg transition-all text-center cursor-pointer"
            >
              Start 90-Day Free Enterprise Trial (No Card Needed)
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
