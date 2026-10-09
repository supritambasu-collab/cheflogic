export type PageView = 'home' | 'about' | 'contact' | 'terms' | 'copyright' | 'privacy' | 'login';

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
