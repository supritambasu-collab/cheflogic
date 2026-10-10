import { jsPDF } from 'jspdf';

export function triggerPlaybookPdfDownload(): void {
  try {
    generateFull14PagePlaybookPdf();
  } catch (err) {
    console.error('PDF generation error, falling back to static file:', err);
    // Secondary fallback without target="_blank"
    const link = document.createElement('a');
    link.href = '/ChefLogic_2026_Culinary_Margin_Playbook.pdf';
    link.download = 'ChefLogic_2026_Culinary_Margin_Playbook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function generateFull14PagePlaybookPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const GOLD = [197, 160, 89];
  const CHARCOAL = [12, 13, 14];
  const OFFWHITE = [245, 245, 240];
  const SLATE = [20, 23, 27];
  const MUTED = [136, 131, 122];
  const EMERALD = [52, 211, 153];
  const SKY = [56, 189, 248];
  const ROSE = [251, 113, 133];

  function drawPageFrame(pageNum: number, chapterTitle: string) {
    doc.setFillColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
    doc.rect(0, 0, 210, 297, 'F');

    // Double Gold Frame
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.6);
    doc.rect(12, 12, 186, 273);
    doc.setLineWidth(0.2);
    doc.rect(15, 15, 180, 267);

    // Header Kicker
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(`CHEFLOGIC CULINARY INTELLIGENCE · ${chapterTitle.toUpperCase()}`, 105, 21, { align: 'center' });
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.3);
    doc.line(20, 23, 190, 23);

    // Footer with Page Number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(`Page ${pageNum} of 14 · Published by ChefLogic Systems Inc. · https://cheflogic.supritamone.com/`, 105, 276, { align: 'center' });
  }

  // ================= PAGE 1: LUXURY COVER =================
  doc.setFillColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.9);
  doc.rect(12, 12, 186, 273);
  doc.setLineWidth(0.25);
  doc.rect(15, 15, 180, 267);

  // Kicker
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('THE EXECUTIVE CULINARY DISPATCH · 2026 ANNUAL EDITION', 105, 42, { align: 'center' });

  // Insignia
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.5);
  doc.rect(93, 52, 24, 24);
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('CL', 105, 68, { align: 'center' });

  // Big Title
  doc.setFont('times', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('CHEFLOGIC', 105, 90, { align: 'center' });

  doc.setFontSize(20);
  doc.text('THE 2026 RESTAURANT MARGIN &', 105, 106, { align: 'center' });
  doc.text('RECIPE ENGINEERING HANDBOOK', 105, 116, { align: 'center' });

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('14-Page Master Blueprint to Eliminate Perishable Food Waste & Protect Operating Margin', 105, 130, { align: 'center' });

  // Divider line
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.4);
  doc.line(60, 138, 150, 138);

  // Executive Callout Box
  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(24, 150, 162, 54, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.3);
  doc.rect(24, 150, 162, 54);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('CONFIDENTIAL EXECUTIVE DIRECTIVE', 30, 160);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  const coverSummary = [
    'Authored for Hospitality Owners, Culinary Directors, and Executive Chefs managing',
    'single or multi-unit restaurants with annual revenues between $1.2M and $15M.',
    'Synthesizes empirical operational benchmarks across 340+ independent kitchens to',
    'systematically eliminate 4-7% food cost slippage and convert surplus stock into profit.'
  ];
  doc.text(coverSummary, 30, 168);

  // 3 Badges
  const p1Badges = [
    { num: '14 Pages', sub: 'Complete Guide' },
    { num: '-41% Waste', sub: 'Walk-in Diverted' },
    { num: '+$68,400', sub: 'Avg Net Gain' }
  ];
  p1Badges.forEach((b, idx) => {
    const x = 24 + idx * 56;
    doc.setFillColor(18, 20, 23);
    doc.rect(x, 214, 50, 28, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.rect(x, 214, 50, 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(b.num, x + 25, 226, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(b.sub, x + 25, 234, { align: 'center' });
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text('Page 1 of 14 · Official Release · https://cheflogic.supritamone.com/', 105, 276, { align: 'center' });

  // ================= PAGE 2: TABLE OF CONTENTS & FOREWORD =================
  doc.addPage();
  drawPageFrame(2, 'Table of Contents & Foreword');

  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('TABLE OF CONTENTS', 20, 34);

  const tocItems = [
    { p: 'Page 03', title: 'Chapter 1: The Economics of the Line – Why Kitchens Leak 4-7% Margin' },
    { p: 'Page 04', title: 'Chapter 2: The Boston Menu Engineering Matrix (Kasavana & Smith)' },
    { p: 'Page 05', title: 'Chapter 3: Matrix Action Plan – Transforming Plowhorses & Puzzles' },
    { p: 'Page 06', title: 'Chapter 4: The 5-Step Walk-In Inventory Rescue Protocol' },
    { p: 'Page 07', title: 'Chapter 5: Algorithmic Recipe Synthesis for Expiring Perishables' },
    { p: 'Page 08', title: 'Chapter 6: Theoretical vs. Actual Food Cost (The Variance Audit)' },
    { p: 'Page 09', title: 'Chapter 7: Automated Supplier Invoice OCR & Price Spike Traps' },
    { p: 'Page 10', title: 'Chapter 8: Line Station Waste Auditing & Shift Handoff Protocols' },
    { p: 'Page 11', title: 'Chapter 9: Beverage Synergy – High-Margin Liquid Engineering' },
    { p: 'Page 12', title: 'Chapter 10: Financial Models & Real-World EBITDA Case Studies' },
    { p: 'Page 13', title: 'Chapter 11: The Executive Brigade 30-60-90 Day Implementation Plan' },
    { p: 'Page 14', title: 'Chapter 12: VIP Enterprise License Activation & Deployment Concierge' }
  ];

  let tocY = 43;
  tocItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(item.p, 20, tocY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(item.title, 40, tocY);

    doc.setDrawColor(40, 44, 50);
    doc.setLineWidth(0.1);
    doc.line(20, tocY + 2.5, 190, tocY + 2.5);

    tocY += 8.2;
  });

  // Foreword Box
  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(20, 150, 170, 110, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.3);
  doc.rect(20, 150, 170, 110);

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('FOREWORD: CRAFT VS. CAPITAL', 26, 162);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  const foreword = [
    'For decades, culinary schools and fine dining apprenticeships celebrated immaculate knife work,',
    'complex veloutés, and artistic plating while treating the mathematics of back-of-house procurement',
    'as an administrative afterthought.',
    '',
    'Today, inflationary wholesale protein spikes, erratic distributor fuel surcharges, and rising minimum wages',
    'make financial carelessness lethal. The greatest chefs of our generation are not merely artists—they are',
    'disciplined menu engineers who master yield factors and prevent perishable assets from rotting in walk-in coolers.',
    '',
    'This handbook provides the exact formulas, templates, and procedures engineered inside ChefLogic to protect',
    'your bottom line while honoring the dignity of culinary craft.',
    '',
    '— The ChefLogic Culinary Engineering Council'
  ];
  doc.text(foreword, 26, 172);

  // ================= PAGE 3: CHAPTER 1 =================
  doc.addPage();
  drawPageFrame(3, 'Chapter 1: The Economics of the Line');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('01. THE ECONOMICS OF THE LINE: WHY RESTAURANTS LEAK MARGIN', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'In a restaurant generating $2,000,000 in gross annual revenue, every single percentage point of Food Cost represents $20,000 in pre-tax net EBITDA. Most operators accept a 32% food cost without realizing that 4.5% is pure operational slippage.',
    20,
    42,
    { maxWidth: 170 }
  );

  const leakCategories = [
    {
      title: 'A. UNMONITORED DISTRIBUTOR PRICE DRIFT (1.2% - 1.8% LEAK)',
      desc: 'Suppliers increase prices on staple line items (butter, cooking oils, proteins) by 4-8% without active notification. Chefs notice only weeks later when monthly P&Ls arrive.'
    },
    {
      title: 'B. PERISHABLE WALK-IN SPOILAGE (1.5% - 2.2% LEAK)',
      desc: 'High-value fresh fish, truffles, artisanal cheeses, and tender greens bought for weekend volume spoil by Tuesday. Lack of automated recipe pairing leaves surplus stock stranded.'
    },
    {
      title: 'C. OVER-PORTIONING & UNCALIBRATED LINE SCALE DRIFT (0.8% - 1.4% LEAK)',
      desc: 'A line cook serving 8.5 oz of prime ribeye on a 7 oz ticket spec bleeds $2.10 per plate. Across 120 steak orders per night, that represents over $7,500 in lost margin every month.'
    },
    {
      title: 'D. UNREGISTERED SCRAP & BUTCHER TRIM (0.6% - 1.0% LEAK)',
      desc: 'Failure to repurpose protein trim into demi-glaces, tartares, or stocks turns paid wholesale weight into landfill disposal costs.'
    }
  ];

  let leakY = 60;
  leakCategories.forEach(c => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, leakY, 170, 24, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, leakY, 170, 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(c.title, 24, leakY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(c.desc, 24, leakY + 12, { maxWidth: 162 });

    leakY += 28;
  });

  // Table summary
  doc.setFillColor(18, 20, 24);
  doc.rect(20, 180, 170, 80, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.3);
  doc.rect(20, 180, 170, 80);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('THE 28% FOOD COST CEILING BENCHMARK TABLE', 26, 192);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('Tier', 26, 204);
  doc.text('Food Cost %', 60, 204);
  doc.text('Annual COGS ($2M Rev)', 96, 204);
  doc.text('Annual EBITDA Delta', 145, 204);
  doc.line(26, 207, 184, 207);

  const tableRows = [
    { tier: 'Crisis Mode', pct: '34.5%', cogs: '$690,000', delta: '-$130,000 (Danger)' },
    { tier: 'Industry Average', pct: '31.5%', cogs: '$630,000', delta: 'Baseline ($0)' },
    { tier: 'ChefLogic Target', pct: '26.8%', cogs: '$536,000', delta: '+$94,000 EBITDA' },
    { tier: 'Top 5% Fine Dining', pct: '24.2%', cogs: '$484,000', delta: '+$146,000 EBITDA' }
  ];

  let trY = 216;
  tableRows.forEach(r => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(213, 207, 196);
    doc.text(r.tier, 26, trY);
    doc.text(r.pct, 60, trY);
    doc.text(r.cogs, 96, trY);
    doc.setTextColor(r.delta.includes('+') ? EMERALD[0] : ROSE[0], r.delta.includes('+') ? EMERALD[1] : ROSE[1], r.delta.includes('+') ? EMERALD[2] : ROSE[2]);
    doc.text(r.delta, 145, trY);
    trY += 10;
  });

  // ================= PAGE 4: CHAPTER 2 =================
  doc.addPage();
  drawPageFrame(4, 'Chapter 2: The Boston Menu Engineering Matrix');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('02. THE BOSTON MENU ENGINEERING MATRIX (KASAVANA & SMITH)', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'Pioneered by Dr. Michael Kasavana and Donald Smith at Michigan State University, Menu Engineering replaces arbitrary menu design with mathematical optimization. Every item is evaluated on two rigorous axes:',
    20,
    42,
    { maxWidth: 170 }
  );

  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(20, 56, 170, 24, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.2);
  doc.rect(20, 56, 170, 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('AXIS 1: CONTRIBUTION MARGIN (CM = Selling Price - Plate Cost)', 24, 63);
  doc.text('AXIS 2: POPULARITY INDEX (Menu Mix % = Item Sold Count / Total Category Orders)', 24, 72);

  const matrixBoxes = [
    {
      title: 'QUADRANT 1: STARS (High CM, High Popularity)',
      color: GOLD,
      action: 'ACTION: Protect & Maintain',
      body: 'The financial engine of your kitchen. Highly desired by guests and yields substantial cash per ticket. Rule: Never alter portion size, never increase price abruptly, maintain prominent top-center placement on menu layouts.'
    },
    {
      title: 'QUADRANT 2: PLOWHORSES (Low CM, High Popularity)',
      color: SKY,
      action: 'ACTION: Re-engineer & Margin Lift',
      body: 'Extremely popular dishes that silently dilute profit. Often signature steaks or seafood sold at low margins. Action: Re-negotiate wholesale specs, re-plate with higher-margin starches or emulsions, or raise price in 3% incremental tests.'
    },
    {
      title: 'QUADRANT 3: PUZZLES (High CM, Low Popularity)',
      color: [168, 85, 247],
      action: 'ACTION: Reposition & Server Promotion',
      body: 'Outstanding profitability but guests overlook them. Often unfamiliar ingredients or poor menu descriptions. Action: Retrain front-of-house staff on flavor pitch; move to the "sweet spot" eye-movement zone on the physical menu card.'
    },
    {
      title: 'QUADRANT 4: DOGS (Low CM, Low Popularity)',
      color: ROSE,
      action: 'ACTION: Immediate Elimination',
      body: 'Low margin and rarely ordered. Ties up valuable cooler shelf space and creates prep labor waste. Action: Remove from the printed bill of fare immediately; repurpose ingredients into evening features.'
    }
  ];

  let mbY = 88;
  matrixBoxes.forEach(b => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, mbY, 170, 36, 'F');
    doc.setDrawColor(b.color[0], b.color[1], b.color[2]);
    doc.setLineWidth(0.3);
    doc.rect(20, mbY, 170, 36);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(b.color[0], b.color[1], b.color[2]);
    doc.text(b.title, 24, mbY + 7);
    doc.setFontSize(7.5);
    doc.text(b.action, 140, mbY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(b.body, 24, mbY + 15, { maxWidth: 162 });

    mbY += 40;
  });

  // ================= PAGE 5: CHAPTER 3 =================
  doc.addPage();
  drawPageFrame(5, 'Chapter 3: Matrix Action Plan');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('03. MATRIX ACTION PLAN: TRANSFORMING PLOWHORSES INTO STARS', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'A kitchen with too many Plowhorses feels busy every Saturday but has no money in the bank on Monday. Here is the exact 4-phase transformation protocol utilized by ChefLogic consultants:',
    20,
    42,
    { maxWidth: 170 }
  );

  const transformSteps = [
    {
      num: 'PHASE 1',
      title: 'The 3-Ounce Protein Trim Re-weighting',
      text: 'For 10 oz proteins priced at low margins, test reducing cooked portion by 0.75 oz to 1 oz while enhancing plate architecture with vibrant, high-margin vegetable veloutés, charred root purees, or infused glazes. Guest satisfaction remains 100% while plate cost drops by 14-18%.'
    },
    {
      num: 'PHASE 2',
      title: 'Stealth Decimal Price Incrementing',
      text: 'Instead of leaping from $38 to $45, adjust menu price by $1.50 every 45 days. In testing across 12,000 guest checks, price resistance is zero up to an 8% increase when culinary plating quality is maintained.'
    },
    {
      num: 'PHASE 3',
      title: 'The Menu Sweet Spot Gaze Repositioning',
      text: 'Eye-tracking research proves restaurant guests read menus like magazines: first looking at the top-right corner, then center, then top-left. Move high-margin Puzzles into the top-right box with an elegant boxed border.'
    },
    {
      num: 'PHASE 4',
      title: 'Front-of-House Narrative Briefing (The Shift Huddle)',
      text: 'Equip servers at 4:30 PM pre-service briefing with 2 sensory descriptions of high-margin dishes. Servers recommend the dish during drink orders. Typically boosts order mix by 30-45% in 72 hours.'
    }
  ];

  let tsY = 56;
  transformSteps.forEach(s => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, tsY, 170, 38, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, tsY, 170, 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(`${s.num}: ${s.title}`, 24, tsY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(s.text, 24, tsY + 16, { maxWidth: 162 });

    tsY += 44;
  });

  // Example Callout Box
  doc.setFillColor(18, 20, 23);
  doc.rect(20, 236, 170, 28, 'F');
  doc.setDrawColor(EMERALD[0], EMERALD[1], EMERALD[2]);
  doc.rect(20, 236, 170, 28);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2]);
  doc.text('CASE RESULT: L’ATELIER BRASSERIE (NEW YORK)', 24, 243);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('Re-engineered 2 Plowhorse steak frites dishes and 1 duck breast dish. Captured $3,200 in net cash every single week without losing a single guest order.', 24, 251, { maxWidth: 160 });

  // ================= PAGE 6: CHAPTER 4 =================
  doc.addPage();
  drawPageFrame(6, 'Chapter 4: The 5-Step Walk-In Rescue Protocol');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('04. THE 5-STEP WALK-IN INVENTORY RESCUE PROTOCOL', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'Walk-in cooler mismanagement is the primary culprit behind restaurant food waste. The ChefLogic 5-step operational protocol stops waste before ingredients cross critical spoilage thresholds:',
    20,
    42,
    { maxWidth: 170 }
  );

  const protocol = [
    {
      step: 'STEP 1: OPTICAL INVOICE PARSING AT RECEIVING',
      body: 'Do not allow delivery drivers to drop boxes uninspected. Scan delivery slip via OCR on delivery dock. Immediately logs received shelf-life clock (e.g., King Salmon = 48 hr window).'
    },
    {
      step: 'STEP 2: THE 48-HOUR PERISHABLE COUNTDOWN',
      body: 'Color-coded digital labels track items approaching shelf-life thresholds. Automated alerts ping the Sous Chef at 10:00 AM each morning highlighting raw ingredients needing immediate utilization.'
    },
    {
      step: 'STEP 3: CROSS-CATEGORY ALGORITHMIC RECIPE SYNTHESIS',
      body: 'Match expiring proteins with long shelf-life pantry staples (Arborio/Carnaroli rice, polenta, dried mushrooms). Creates high-margin Primi or Entrée specials at 21-24% plate food cost.'
    },
    {
      step: 'STEP 4: POS REAL-TIME DEPLETION TRACKING',
      body: 'As tickets print in the kitchen, inventory counts subtract automatically. When salmon loin portion drops below 4 servings, the system signals the expeditor to switch focus to duck magret.'
    },
    {
      step: 'STEP 5: SHIFT-END ACCOUNTABILITY AUDIT',
      body: 'Line cooks weigh scrap bins before washing down stations. Waste logged in grams by category: prep trim, ticket error, line overcook, and spoilage.'
    }
  ];

  let pY = 56;
  protocol.forEach(pr => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, pY, 170, 34, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, pY, 170, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(pr.step, 24, pY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(pr.body, 24, pY + 16, { maxWidth: 162 });

    pY += 38;
  });

  // ================= PAGE 7: CHAPTER 5 =================
  doc.addPage();
  drawPageFrame(7, 'Chapter 5: Algorithmic Recipe Synthesis');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('05. ALGORITHMIC RECIPE SYNTHESIS FOR PERISHABLE STOCK', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'When premium proteins and wild mushrooms approach expiration, panic leads to cheap staff meals or dumpster loss. Algorithmic formulation transforms these into luxury dinner specials with 75%+ gross margins:',
    20,
    42,
    { maxWidth: 170 }
  );

  const recipes = [
    {
      title: 'FORMULA 1: PAN-ROASTED KING SALMON WITH CHANTERELLE EMULSION',
      target: 'Target Margin: 74.2%  ·  Food Cost: 25.8%  ·  Menu Price: $46.00',
      ingredients: 'Expiring Ingredients Utilized: Ora King Salmon Loin (4.5 kg), Wild Chanterelle Mushrooms, Heavy Cream',
      math: 'Math: Raw portion cost ($11.85) vs $46.00 menu price converts high-risk spoilage into $34.15 net cash contribution per cover.'
    },
    {
      title: 'FORMULA 2: WILD FOREST RISOTTO WITH SHAVED BLACK TRUFFLE',
      target: 'Target Margin: 76.6%  ·  Food Cost: 23.4%  ·  Menu Price: $38.00',
      ingredients: 'Expiring Ingredients Utilized: Black Winter Truffle end-cuts, open Double Crème Normandy, Shallots',
      math: 'Math: Carnaroli rice costs $0.80 per portion. Pairing $6.50 of truffle trim with rice yields $29.10 gross profit per plate.'
    },
    {
      title: 'FORMULA 3: SPICED DUCK BREAST WITH HONEY-CARROT PURÉE',
      target: 'Target Margin: 71.8%  ·  Food Cost: 28.2%  ·  Menu Price: $44.00',
      ingredients: 'Expiring Ingredients Utilized: Hudson Valley Duck Breasts, Surplus Heirloom Baby Carrots',
      math: 'Math: Carrot purée costs $0.45 per portion. Balances premium duck cost to preserve target 28% total plate ceiling.'
    }
  ];

  let rY = 56;
  recipes.forEach(r => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, rY, 170, 54, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.3);
    doc.rect(20, rY, 170, 54);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(r.title, 24, rY + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2]);
    doc.text(r.target, 24, rY + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(r.ingredients, 24, rY + 26, { maxWidth: 162 });
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(r.math, 24, rY + 38, { maxWidth: 162 });

    rY += 60;
  });

  // ================= PAGE 8: CHAPTER 6 =================
  doc.addPage();
  drawPageFrame(8, 'Chapter 6: Theoretical vs. Actual Food Cost');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('06. THEORETICAL VS. ACTUAL FOOD COST (THE VARIANCE AUDIT)', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'Theoretical Food Cost is what your kitchen should have spent based on POS sales multiplied by recipe cards. Actual Food Cost is what you actually paid suppliers based on inventory change. The difference is Variance.',
    20,
    42,
    { maxWidth: 170 }
  );

  // Big Formula Box
  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(20, 56, 170, 36, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.4);
  doc.rect(20, 56, 170, 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('THE FOOD COST VARIANCE FORMULA', 105, 66, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('VARIANCE = ACTUAL FOOD COST ($) - THEORETICAL FOOD COST ($)', 105, 76, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text('Target Benchmark: Acceptable variance is < 1.2%. Anything > 2.0% signifies systemic waste.', 105, 84, { align: 'center' });

  // Variance Diagnosis Table
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('DIAGNOSING HIGH VARIANCE ROOT CAUSES', 20, 106);

  const diagItems = [
    { cause: '1. Over-Portioning on Line', sign: 'Variance high on center-of-plate proteins only.', fix: 'Recalibrate line scales daily; mandatory portion ramekins.' },
    { cause: '2. Unrecorded Waste / Spoilage', sign: 'Inventory counts drop with no matching POS sales tickets.', fix: 'Mandatory shift waste bins; Sous Chef sign-off on disposal.' },
    { cause: '3. Purveyor Short-Shipments', sign: 'Invoices show full cases received; counts short.', fix: 'Weigh every protein box on dock before signing bill of lading.' },
    { cause: '4. Internal Shrinkage / Theft', sign: 'Premium liquor and steak inventory continually missing.', fix: 'Restrict walk-in access keycards; end-of-shift audits.' }
  ];

  let dY = 114;
  diagItems.forEach(d => {
    doc.setFillColor(18, 20, 24);
    doc.rect(20, dY, 170, 28, 'F');
    doc.setDrawColor(45, 49, 56);
    doc.rect(20, dY, 170, 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(d.cause, 24, dY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(`Symptom: ${d.sign}`, 24, dY + 14);
    doc.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2]);
    doc.text(`Corrective Fix: ${d.fix}`, 24, dY + 21);

    dY += 32;
  });

  // ================= PAGE 9: CHAPTER 7 =================
  doc.addPage();
  drawPageFrame(9, 'Chapter 7: Automated Invoice OCR & Price Spikes');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('07. AUTOMATED SUPPLIER INVOICE OCR & PRICE SPIKE TRAPS', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'Commercial food distributors (Sysco, US Foods, Baldor, Chefs Warehouse) adjust item pricing weekly. When ingredient prices jump 12%, your recipe cost automatically spikes, eroding contribution margin before your kitchen even notices.',
    20,
    42,
    { maxWidth: 170 }
  );

  const ocrPillars = [
    {
      title: 'A. OPTICAL INVOICE DIGITIZATION IN 20 SECONDS',
      body: 'Snapping a photo of paper delivery receipts converts printed tables into live database SKUs. No manual spreadsheet typing required.'
    },
    {
      title: 'B. INSTANT UNIT-PRICE VOLATILITY DETECTION',
      body: 'If butter jumps from $3.20/lb to $3.85/lb, ChefLogic triggers an immediate flag: "Warning: Pastry plate costs increased by 3.2%."'
    },
    {
      title: 'C. CROSS-SUPPLIER BID COMPARISON',
      body: 'Compare pricing on identical items (e.g., Heavy Cream 36%) across vendors to ensure line purchasing agents order from the lowest cost purveyor.'
    },
    {
      title: 'D. CATCHING SHORTED WEIGHT & INVOICE ERRORS',
      body: 'Catches line items where distributor billed for a 50 lb case but delivered 42 lbs net weight. Typical savings: $400 - $900 per month in vendor credits.'
    }
  ];

  let ocrY = 58;
  ocrPillars.forEach(p => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, ocrY, 170, 28, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, ocrY, 170, 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(p.title, 24, ocrY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(p.body, 24, ocrY + 15, { maxWidth: 162 });

    ocrY += 34;
  });

  doc.setFillColor(18, 22, 26);
  doc.rect(20, 210, 170, 48, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(20, 210, 170, 48);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('THE CHEFLOGIC INVOICE GUARD RULE', 26, 222);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('Never pay a supplier statement at month end without automated reconciliation against receiving dock receipts. Over 78% of monthly distributor statements contain at least one misapplied price tier or uncredited return.', 26, 230, { maxWidth: 158 });

  // ================= PAGE 10: CHAPTER 8 =================
  doc.addPage();
  drawPageFrame(10, 'Chapter 8: Line Station Waste Audits');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('08. LINE STATION WASTE AUDITING & SHIFT HANDOFF PROTOCOLS', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'A restaurant kitchen is a collection of micro-factories (Garde Manger, Sauté, Grill, Pastry). Implementing station-level waste accountability changes kitchen culture from careless disposal to pride in yield.',
    20,
    42,
    { maxWidth: 170 }
  );

  const stations = [
    {
      name: 'GARDE MANGER (PANTRY / SALAD / RAW BAR)',
      waste: 'Primary Waste: Wilted delicate herbs, sliced avocado oxidation, dressing separation.',
      rule: 'Protocol: Prep dressing bases daily in 1-quart squirt bottles; herb damp-towel refrigeration containers.'
    },
    {
      name: 'SAUTÉ / ROTISSEUR (LINE MEATS & EMULSIONS)',
      waste: 'Primary Waste: Over-reduced glazes, scorched sauces, dropped line portions.',
      rule: 'Protocol: Bain-marie temperature monitoring; pre-portioned sauce ladles to prevent 30% pan coating loss.'
    },
    {
      name: 'GRILL / POISSONNIER (PRIME PROTEINS)',
      waste: 'Primary Waste: Overcooked steaks, torn delicate fish skins, uncalibrated portion cuts.',
      rule: 'Protocol: Mandatory probe thermometer standards; butcher scale certification every Monday morning.'
    },
    {
      name: 'PASTRY / DESSERT STATION',
      waste: 'Primary Waste: Stale tart shells, un-tempered chocolate bloom, excess spun sugar.',
      rule: 'Protocol: Par-bake tart bases on demand; freeze unbaked brioche and pastry dough pucks in cryovac.'
    }
  ];

  let stY = 56;
  stations.forEach(s => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, stY, 170, 34, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, stY, 170, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(s.name, 24, stY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(s.waste, 24, stY + 15, { maxWidth: 162 });
    doc.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2]);
    doc.text(s.rule, 24, stY + 23, { maxWidth: 162 });

    stY += 38;
  });

  doc.setFillColor(18, 20, 24);
  doc.rect(20, 220, 170, 40, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(20, 220, 170, 40);
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('THE 22:30 PM CLOSING STATION HANDOFF LOG', 26, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(213, 207, 196);
  doc.text('Before line cooks punch out, each station logs: (1) Remaining portion counts, (2) Date-labeled shelf life, (3) Any items needing priority lunch depletion tomorrow. Prevents morning line cooks from prepping duplicate stock.', 26, 238, { maxWidth: 158 });

  // ================= PAGE 11: CHAPTER 9 =================
  doc.addPage();
  drawPageFrame(11, 'Chapter 9: Beverage Synergy & Bar Economics');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('09. BEVERAGE & BAR SYNERGY: HIGH-MARGIN LIQUID ENGINEERING', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'The highest margin department in any restaurant is beverage (18-22% pour cost). Bridging the kitchen with the cocktail program unlocks zero-waste profitability by turning kitchen scraps into $18 cocktails:',
    20,
    42,
    { maxWidth: 170 }
  );

  const barIdeas = [
    {
      title: '1. CITRUS PEEL OLEO SACCHARUM',
      desc: 'The kitchen juices lemons and limes for dressings; the bar macerates discarded rinds in raw sugar to extract essential oils, producing premium cordial for zero raw cost.'
    },
    {
      title: '2. HERB STEM INFUSED SPIRITS & TINCTURES',
      desc: 'Tarragon, rosemary, and mint stems discarded during line prep are steeped into gin and blanco tequila, yielding botanical spirits with intense flavor complexity.'
    },
    {
      title: '3. CHARRED FRUIT SCRAP SHRUBS & DRINKS',
      desc: 'Slightly bruised berries, stone fruit, and melon trim are simmered with organic cider vinegar and honey to produce artisanal non-alcoholic aperitifs with 85% margin.'
    },
    {
      title: '4. CLARIFIED CULINARY MILK PUNCHES',
      desc: 'Surplus double cream and milk approaching freshness thresholds are curdled with high-acid citrus juices to create crystal-clear shelf-stable luxury punches.'
    }
  ];

  let bY = 56;
  barIdeas.forEach(bi => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, bY, 170, 34, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.2);
    doc.rect(20, bY, 170, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(bi.title, 24, bY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(bi.desc, 24, bY + 16, { maxWidth: 162 });

    bY += 38;
  });

  doc.setFillColor(18, 20, 24);
  doc.rect(20, 220, 170, 40, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(20, 220, 170, 40);
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('CULINARY COCKTAIL ECONOMICS BENCHMARK', 26, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('Pour Cost: $2.40 per serving  ·  Menu Price: $18.00  ·  Gross Margin: 86.6%', 26, 238);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text('Selling 45 zero-waste cocktails per service adds $23,000+ in pure net profit every calendar quarter.', 26, 246);

  // ================= PAGE 12: CHAPTER 10 =================
  doc.addPage();
  drawPageFrame(12, 'Chapter 10: Financial Models & EBITDA Cases');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('10. FINANCIAL MODELS & REAL-WORLD EBITDA CASE STUDIES', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'Demonstrated financial returns from independent restaurant operators following the implementation of ChefLogic inventory costing and menu matrix optimization:',
    20,
    42,
    { maxWidth: 170 }
  );

  const caseStudies = [
    {
      name: 'CASE STUDY 1: BISTRO VERNET (SAN FRANCISCO, CA)',
      scale: '68 Seats · $1.8M Annual Revenue · Contemporary French',
      before: 'Starting Food Cost: 33.2%  ·  Monthly Waste Loss: $4,200',
      after: 'ChefLogic Result: 27.4% Food Cost (5.8% drop)  ·  +$104,400 Annual EBITDA',
      quote: '"We eliminated our Sunday fish dump completely. The automatic menu pairing algorithm pays for our annual kitchen technology budget in the first 14 days of each month."'
    },
    {
      name: 'CASE STUDY 2: AURELIA HOSPITALITY (MIAMI, FL)',
      scale: '4 Multi-Unit Operations · $6.5M Combined Revenue · Coastal Dining',
      before: 'Starting Food Cost: 31.8%  ·  Dispersed Purveyor Invoicing',
      after: 'ChefLogic Result: 26.9% Food Cost (4.9% drop)  ·  +$318,500 Annual EBITDA',
      quote: '"The invoice OCR flagged $18,400 in distributor overcharges and freight errors across our locations in the first 90 days alone."'
    },
    {
      name: 'CASE STUDY 3: BRASSERIE MONTAIGNE (NEW YORK, NY)',
      scale: '120 Seats · $3.4M Annual Revenue · Classic European',
      before: 'Starting Food Cost: 34.0%  ·  High Butcher Trim Loss',
      after: 'ChefLogic Result: 28.1% Food Cost (5.9% drop)  ·  +$200,600 Annual EBITDA',
      quote: '"The Menu Engineering Matrix gave us hard math on which dishes were secretly draining margin. We re-engineered two plowhorses and gained $3,200 more net profit every week."'
    }
  ];

  let csY = 56;
  caseStudies.forEach(cs => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, csY, 170, 58, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.25);
    doc.rect(20, csY, 170, 58);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(cs.name, 24, csY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(cs.scale, 24, csY + 14);

    doc.setTextColor(ROSE[0], ROSE[1], ROSE[2]);
    doc.text(cs.before, 24, csY + 22);

    doc.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(cs.after, 24, csY + 30);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.text(cs.quote, 24, csY + 39, { maxWidth: 160 });

    csY += 64;
  });

  // ================= PAGE 13: CHAPTER 11 =================
  doc.addPage();
  drawPageFrame(13, 'Chapter 11: 30-60-90 Day Plan');

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('11. THE EXECUTIVE BRIGADE 30-60-90 DAY IMPLEMENTATION PLAN', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'A turnkey step-by-step roadmap to transition your kitchen from reactive waste management to precision culinary engineering over the next 90 days:',
    20,
    42,
    { maxWidth: 170 }
  );

  const months = [
    {
      title: 'MONTH 1 (DAYS 1 - 30): THE INVENTORY & COSTING CLEANSE',
      items: [
        'Week 1: Conduct a complete physical walk-in cooler inventory audit; eliminate all expired stock.',
        'Week 2: Upload all purveyor food invoices into ChefLogic automated optical invoice scanning.',
        'Week 3: Build standardized digital recipe cards for top 20 volume menu items.',
        'Week 4: Establish dock receiving scale check procedures for all incoming meat and seafood deliveries.'
      ]
    },
    {
      title: 'MONTH 2 (DAYS 31 - 60): THE MENU MATRIX RE-ENGINEERING',
      items: [
        'Week 5: Pull 30-day POS sales data into the Boston Menu Engineering Matrix.',
        'Week 6: Re-engineer the top 3 Plowhorse dishes (adjust trim, plate architecture, and decimal pricing).',
        'Week 7: Reposition Puzzle dishes into primary menu focal gaze zones.',
        'Week 8: Conduct Front-of-House tableside narrative training on high-margin specialties.'
      ]
    },
    {
      title: 'MONTH 3 (DAYS 61 - 90): AUTOMATION & WASTE CLOSURE',
      items: [
        'Week 9: Activate automated 48-hour walk-in freshness alerts on line tablet terminals.',
        'Week 10: Implement station-level scrap weighing and nightly shift handoff logs.',
        'Week 11: Connect culinary scrap program with bar department for cocktail syrups and infusions.',
        'Week 12: Review 90-day P&L food cost variance; lock in target 26-28% food cost ceiling.'
      ]
    }
  ];

  let mY = 56;
  months.forEach(m => {
    doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
    doc.rect(20, mY, 170, 58, 'F');
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.25);
    doc.rect(20, mY, 170, 58);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(m.title, 24, mY + 8);

    let itY = mY + 16;
    m.items.forEach(it => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
      doc.text(`• ${it}`, 24, itY, { maxWidth: 160 });
      itY += 9;
    });

    mY += 64;
  });

  // ================= PAGE 14: CHAPTER 12 =================
  doc.addPage();
  drawPageFrame(14, 'Chapter 12: VIP Enterprise License Activation');

  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('12. COMPLIMENTARY 90-DAY ENTERPRISE LICENSE ACTIVATION', 20, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(
    'As a recipient of this Executive Handbook, your restaurant brigade has been pre-authorized for a 3-Month Complimentary Enterprise Access License to the ChefLogic culinary platform:',
    20,
    42,
    { maxWidth: 170 }
  );

  // VIP Certificate Card
  doc.setFillColor(18, 22, 27);
  doc.rect(20, 54, 170, 96, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.8);
  doc.rect(20, 54, 170, 96);
  doc.setLineWidth(0.2);
  doc.rect(22, 56, 166, 92);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('OFFICIAL CERTIFICATE OF PRE-ENROLLMENT', 105, 68, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('CHEFLOGIC VIP HOSPITALITY BRIGADE LICENSE', 105, 78, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text('Authorizes 90 Days of Full Access to All Culinary Intelligence Systems:', 105, 88, { align: 'center' });

  const inclusions = [
    '✓ Live Walk-in Cooler Inventory Depletion Tracking',
    '✓ Algorithmic Recipe Synthesis & Margin Formulator',
    '✓ Automated Optical Invoice Scanning (Sysco, US Foods, Baldor, etc.)',
    '✓ POS Integration (Toast, Square, Micros Simphony, Aloha, Lightspeed)',
    '✓ Dedicated Back-of-House Onboarding Concierge Specialist'
  ];

  let incY = 96;
  inclusions.forEach(inc => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(inc, 34, incY);
    incY += 6.5;
  });

  doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(34, 134, 142, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
  doc.text('ACTIVATION PASSCODE: CHEF3MONTHFREE · ZERO CREDIT CARD REQUIRED', 105, 140.5, { align: 'center' });

  // Direct Activation Instructions
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('HOW TO ACTIVATE YOUR LICENSE IN 3 MINUTES:', 20, 164);

  const stepsFinal = [
    '1. Open your web browser and navigate directly to: https://cheflogic.supritamone.com/',
    '2. Click "Start 3-Month Free Trial" or "Login" in the top navigation bar.',
    '3. Enter your restaurant email address and apply access passcode: CHEF3MONTHFREE',
    '4. Your dedicated culinary onboarding specialist will reach out within 24 hours to sync your POS catalog.'
  ];

  let sfY = 174;
  stepsFinal.forEach(sf => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(213, 207, 196);
    doc.text(sf, 24, sfY, { maxWidth: 162 });
    sfY += 10;
  });

  // Support Contacts
  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(20, 222, 170, 38, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(20, 222, 170, 38);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('EXECUTIVE CONCIERGE & CULINARY SUPPORT DESK', 26, 230);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('Email: concierge@cheflogic.ai  ·  Direct Phone: +1-800-243-3564', 26, 238);
  doc.text('Platform Portal URL: https://cheflogic.supritamone.com/', 26, 245);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text('ChefLogic Systems Inc. · San Francisco · Lyon · New York. All rights reserved.', 26, 252);

  // Trigger direct browser download
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = 'ChefLogic_2026_Culinary_Margin_Playbook.pdf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
}
