import { Ingredient, MenuItemMatrix, SuggestedRecipe, Testimonial } from '../types';
import { SALMON_DISH_IMG, RISOTTO_DISH_IMG, DUCK_DISH_IMG } from '../assets/images';

export const INGREDIENTS_DATA: Ingredient[] = [
  { id: 'ing-1', name: 'Ora King Salmon Fillet', category: 'protein', unitCost: 18.5, unit: 'lb', shelfLifeDays: 2, riskOfWaste: 'high' },
  { id: 'ing-2', name: 'Black Winter Truffle', category: 'pantry', unitCost: 65.0, unit: 'oz', shelfLifeDays: 5, riskOfWaste: 'high' },
  { id: 'ing-3', name: 'Chanterelle Mushrooms', category: 'produce', unitCost: 14.0, unit: 'lb', shelfLifeDays: 3, riskOfWaste: 'high' },
  { id: 'ing-4', name: 'Heirloom Baby Carrots', category: 'produce', unitCost: 3.2, unit: 'bunch', shelfLifeDays: 6, riskOfWaste: 'medium' },
  { id: 'ing-5', name: 'Double Crème Normandy', category: 'dairy', unitCost: 7.5, unit: 'qt', shelfLifeDays: 4, riskOfWaste: 'medium' },
  { id: 'ing-6', name: 'Aged Carnaroli Rice', category: 'pantry', unitCost: 4.8, unit: 'lb', shelfLifeDays: 90, riskOfWaste: 'low' },
  { id: 'ing-7', name: 'Hudson Valley Duck Breast', category: 'protein', unitCost: 16.0, unit: 'lb', shelfLifeDays: 3, riskOfWaste: 'high' },
  { id: 'ing-8', name: 'Shallots & French Chives', category: 'produce', unitCost: 2.5, unit: 'lb', shelfLifeDays: 8, riskOfWaste: 'low' },
];

export const SUGGESTED_RECIPES_DATA: SuggestedRecipe[] = [
  {
    id: 'rec-1',
    title: 'Pan-Roasted King Salmon with Chanterelle Emulsion',
    subTitle: 'Crispy skin, glazed baby heirloom carrots & chive velouté',
    category: 'Entrée',
    prepTimeMin: 18,
    matchingIngredients: ['Ora King Salmon Fillet', 'Chanterelle Mushrooms', 'Heirloom Baby Carrots', 'Double Crème Normandy'],
    plateCost: 11.85,
    menuPrice: 46.00,
    foodCostPct: 25.8,
    marginScore: 'Star',
    wasteDivertedKg: 4.5,
    description: 'Utilizes high-risk expiring salmon loins and delicate wild mushrooms into an elevated fine dining signature dish with premium 74.2% gross margin.',
    image: SALMON_DISH_IMG,
    fallbackImage: '/images/recipe_dish.jpg'
  },
  {
    id: 'rec-2',
    title: 'Wild Forest Risotto with Shaved Black Truffle',
    subTitle: 'Slow-cooked Carnaroli, whipped Normandy crème, garden shallots',
    category: 'Primi',
    prepTimeMin: 22,
    matchingIngredients: ['Black Winter Truffle', 'Chanterelle Mushrooms', 'Aged Carnaroli Rice', 'Double Crème Normandy', 'Shallots & French Chives'],
    plateCost: 8.90,
    menuPrice: 38.00,
    foodCostPct: 23.4,
    marginScore: 'Star',
    wasteDivertedKg: 2.8,
    description: 'High profitability course designed to deplete open crème and volatile truffle stock while keeping total plate food cost below 24%.',
    image: RISOTTO_DISH_IMG,
    fallbackImage: '/images/risotto_dish.jpg'
  },
  {
    id: 'rec-3',
    title: 'Spiced Duck Breast with Honey-Carrot Purée',
    subTitle: 'Cross-hatched crispy magret, chanterelle jus, glazed roots',
    category: 'Entrée',
    prepTimeMin: 24,
    matchingIngredients: ['Hudson Valley Duck Breast', 'Heirloom Baby Carrots', 'Chanterelle Mushrooms', 'Shallots & French Chives'],
    plateCost: 12.40,
    menuPrice: 44.00,
    foodCostPct: 28.2,
    marginScore: 'Star',
    wasteDivertedKg: 3.6,
    description: 'Calculated portion yield maximizes center-of-plate protein economics and pairs perfectly with surplus root vegetables.',
    image: DUCK_DISH_IMG,
    fallbackImage: '/images/duck_dish.jpg'
  }
];

export const MENU_MATRIX_DATA: MenuItemMatrix[] = [
  {
    id: 'mat-1',
    name: 'Truffle & Chanterelle Tagliolini',
    quadrant: 'Star',
    salesVolume: 'High',
    profitMargin: 'High',
    foodCostPct: 21.4,
    currentPrice: 39.00,
    recommendedAction: 'Protect item consistency. Keep prime menu focal positioning; do not alter portion specs.',
    impactMetric: '+$1,840 monthly gross profit'
  },
  {
    id: 'mat-2',
    name: 'Wagyu Beef Burger & Triple Truffle Frites',
    quadrant: 'Plowhorse',
    salesVolume: 'High',
    profitMargin: 'Low',
    foodCostPct: 35.8,
    currentPrice: 28.00,
    recommendedAction: 'Re-engineer brioche and garnish sourcing; increase price by $2.50 or reduce ground trim portion by 15g.',
    impactMetric: 'Restores food cost from 35.8% to 28.5%'
  },
  {
    id: 'mat-3',
    name: 'Dry-Aged Duck Magret with Currant Glaze',
    quadrant: 'Puzzle',
    salesVolume: 'Low',
    profitMargin: 'High',
    foodCostPct: 22.8,
    currentPrice: 48.00,
    recommendedAction: 'Reposition at top of Entrée section; train floor staff on tableside pour narrative to double orders.',
    impactMetric: 'Projected 42% volume lift'
  },
  {
    id: 'mat-4',
    name: 'Steamed Pacific Turbot Bowl',
    quadrant: 'Dog',
    salesVolume: 'Low',
    profitMargin: 'Low',
    foodCostPct: 38.2,
    currentPrice: 34.00,
    recommendedAction: 'Phase out from next menu print cycle. Shift turbot allocations into seasonal market special to deplete inventory.',
    impactMetric: 'Eliminates $940/mo perishable spoilage'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'ChefLogic bridged the gap between our culinary standards and back-of-house financial discipline. We slashed our kitchen waste by 41% in the first 60 days without compromising a single recipe.',
    author: 'Chef Marcus Vance',
    role: 'Executive Chef & Partner',
    restaurant: 'L’Atelier Moderne',
    location: 'Chicago, IL',
    starsOrDistinction: 'Michelin Guide Selected',
    metrics: {
      foodCostDrop: '33.2% → 27.4%',
      wasteReduced: '-41%',
      annualSavings: '$68,400'
    }
  },
  {
    id: 'test-2',
    quote: 'Before ChefLogic, taking walk-in inventory felt like an autopsy on wasted money. Now, the instant an ingredient sits for more than 48 hours, the platform formulates our evening specials automatically.',
    author: 'Elena Rostova',
    role: 'Director of Food & Beverage',
    restaurant: 'Aurelia Hospitality Group',
    location: 'Miami, FL',
    starsOrDistinction: '4 Contemporary Concepts',
    metrics: {
      foodCostDrop: '31.8% → 26.9%',
      wasteReduced: '-48%',
      annualSavings: '$142,000'
    }
  },
  {
    id: 'test-3',
    quote: 'The Menu Engineering Matrix gave us hard math on which dishes were secretly draining margin. We re-engineered two plowhorses and captured $3,200 more net profit every single week.',
    author: 'Jean-Philippe Boyer',
    role: 'Chef Patron',
    restaurant: 'Brasserie Montaigne',
    location: 'New York, NY',
    starsOrDistinction: 'James Beard Nominee',
    metrics: {
      foodCostDrop: '34.0% → 28.1%',
      wasteReduced: '-37%',
      annualSavings: '$84,600'
    }
  }
];

export const FAQS_DATA = [
  {
    question: 'What is ChefLogic and how does it connect to https://cheflogic.ai.studio/?',
    answer: 'ChefLogic is the dedicated culinary intelligence platform designed specifically for restaurant executive chefs, culinary directors, and F&B managers. The production application at https://cheflogic.ai.studio/ manages live kitchen inventory, continuously calculates real-time plate costs, automatically suggests dishes to deplete perishable stock before it spoils, and maps your menu against profitability matrices.'
  },
  {
    question: 'How do I access the 3-Month Free Trial?',
    answer: 'Clicking any "Start 3-Month Free Trial" or "Login to ChefLogic" link on this site connects you directly to https://cheflogic.ai.studio/ with complimentary 90-day enterprise access automatically pre-configured. No credit card is required to begin, and your kitchen onboarding specialist is assigned within 24 hours.'
  },
  {
    question: 'How does ChefLogic generate recipes from surplus walk-in stock?',
    answer: 'Our algorithmic culinary engine tracks batch purchase invoices, delivery dates, and shelf-life expiration timers. When items like fresh wild fish or delicate berries reach critical thresholds, ChefLogic synthesizes classic culinary flavor pairings, balanced macros, and target food cost parameters (typically 24%-28%) to deliver ready-to-execute service specials.'
  },
  {
    question: 'Does ChefLogic integrate with my existing POS and supplier invoices?',
    answer: 'Yes. ChefLogic synchronizes seamlessly with leading hospitality POS systems (Toast, Square, Micros Simphony, Lightspeed, Aloha) and features automated optical invoice scanning for major food distributors (Sysco, US Foods, Baldor, Chefs’ Warehouse, and local artisanal purveyors).'
  },
  {
    question: 'What is the Boston Menu Engineering Matrix and why is it critical?',
    answer: 'Developed by culinary economists, menu engineering categorizes every item into Stars (high margin, high popularity), Plowhorses (low margin, high popularity), Puzzles (high margin, low popularity), and Dogs (low margin, low popularity). ChefLogic calculates this continuously as ingredient wholesale prices fluctuate, giving you actionable steps to protect your bottom line.'
  }
];
