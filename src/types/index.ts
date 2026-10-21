export type PageView = 'home' | 'about' | 'contact' | 'terms' | 'copyright' | 'privacy' | 'login' | 'admin';

export type RegulatoryAuthority = 'FDA' | 'EU' | 'GCC' | 'FSSAI';

export interface StatutoryAllergen {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface CatalogIngredient {
  id: string;
  sku: string;
  name: string;
  category: 'protein' | 'dairy' | 'produce' | 'pantry' | 'bakery' | 'spices';
  costPerKg: number;
  costPer100g: number;
  kcalPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  satFatPer100g: number;
  transFatPer100g: number;
  carbPer100g: number;
  fiberPer100g: number;
  sugarsPer100g: number;
  addedSugarsPer100g: number;
  sodiumMgPer100g: number;
  saltPer100g: number;
  allergens: string[];
}

export interface RecipeIngredientRow {
  ingredientId: string;
  sku: string;
  name: string;
  grams: number;
  kcal: number;
  protein: number;
  fat: number;
  satFat: number;
  transFat: number;
  carbs: number;
  fiber: number;
  sugars: number;
  addedSugars: number;
  sodiumMg: number;
  salt: number;
  cost: number;
  allergens: string[];
}

export interface CommercialRecipe {
  id: string;
  title: string;
  subtitle: string;
  outlet: string;
  itemCode: string;
  group: string;
  category: string;
  type: string;
  portions: number;
  portionWeightGrams: number;
  wastageFactorPct: number;
  vatPct: number;
  packagingOverhead: number;
  sellingPrice: number;
  idealFoodCostPct: number;
  implementationDate: string;
  ingredients: RecipeIngredientRow[];
  image?: string;
  fallbackImage?: string;
  isNonVeg?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'protein' | 'produce' | 'dairy' | 'pantry';
  unitCost: number;
  unit: string;
  shelfLifeDays: number;
  riskOfWaste: 'high' | 'medium' | 'low';
}

export interface SuggestedRecipe {
  id: string;
  title: string;
  subTitle: string;
  category: string;
  prepTimeMin: number;
  matchingIngredients: string[];
  plateCost: number;
  menuPrice: number;
  foodCostPct: number;
  marginScore: 'Star' | 'Plowhorse' | 'Puzzle' | 'Dog';
  wasteDivertedKg: number;
  description: string;
  image?: string;
  fallbackImage?: string;
}

export interface MenuItemMatrix {
  id: string;
  name: string;
  quadrant: 'Star' | 'Plowhorse' | 'Puzzle' | 'Dog';
  salesVolume: 'High' | 'Low';
  profitMargin: 'High' | 'Low';
  foodCostPct: number;
  currentPrice: number;
  recommendedAction: string;
  impactMetric: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  restaurant: string;
  location: string;
  starsOrDistinction: string;
  metrics: {
    foodCostDrop: string;
    wasteReduced: string;
    annualSavings: string;
  };
}
