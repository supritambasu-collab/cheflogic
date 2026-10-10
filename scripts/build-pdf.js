import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

// Color definitions
const GOLD = [197, 160, 89];
const CHARCOAL = [12, 13, 14];
const OFFWHITE = [245, 245, 240];
const SLATE = [30, 33, 37];
const MUTED = [136, 131, 122];

// ================= PAGE 1: COVER & EXECUTIVE SUMMARY =================
// Background
doc.setFillColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
doc.rect(0, 0, 210, 297, 'F');

// Gold Accent Borders
doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
doc.setLineWidth(0.8);
doc.rect(12, 12, 186, 273);
doc.setLineWidth(0.2);
doc.rect(15, 15, 180, 267);

// Kicker
doc.setFont('times', 'normal');
doc.setFontSize(10);
doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
doc.text('THE EXECUTIVE CULINARY DISPATCH · ANNUAL WHITE PAPER', 105, 35, { align: 'center' });

// Title
doc.setFont('times', 'bold');
doc.setFontSize(26);
doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
doc.text('CHEFLOGIC', 105, 52, { align: 'center' });

doc.setFontSize(18);
doc.text('2026 RESTAURANT MARGIN &', 105, 66, { align: 'center' });
doc.text('RECIPE ENGINEERING PLAYBOOK', 105, 76, { align: 'center' });

// Subtitle
doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
doc.text('Strategic Back-of-House Systems to Eliminate Food Waste & Expand Net EBITDA', 105, 88, { align: 'center' });

// Decorative Divider
doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
doc.setLineWidth(0.5);
doc.line(60, 96, 150, 96);

// Executive Summary Box
doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
doc.rect(22, 108, 166, 68, 'F');
doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
doc.setLineWidth(0.3);
doc.rect(22, 108, 166, 68);

doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
doc.text('EXECUTIVE SUMMARY: THE 28% FOOD COST CEILING', 28, 118);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(213, 207, 196);
const summaryText = [
  'In high-volume restaurant operations, food cost variance between 33% and 27% represents the entire',
  'difference between insolvency and sustainable hospitality profitability. Across 340+ fine dining and',
  'bistro kitchens tracked by ChefLogic, approximately 41% of avoidable food waste stems from surplus',
  'walk-in inventory that passes peak freshness prior to formulation into revenue-generating specials.',
  '',
  'This playbook presents four core mathematical frameworks developed with Michelin-starred executive',
  'chefs to bridge culinary creativity with back-of-house financial discipline.'
];
doc.text(summaryText, 28, 126);

// Metrics Grid
const metrics = [
  { val: '4.8%', label: 'Average Food Cost Reduction' },
  { val: '-41%', label: 'Perishable Food Waste Diverted' },
  { val: '$68,400', label: 'Average Annual EBITDA Gain' }
];

let startX = 22;
metrics.forEach((m, idx) => {
  const x = startX + idx * 56;
  doc.setFillColor(20, 22, 24);
  doc.rect(x, 185, 52, 32, 'F');
  doc.setDrawColor(60, 64, 70);
  doc.rect(x, 185, 52, 32);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text(m.val, x + 26, 198, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text(m.label, x + 26, 208, { align: 'center', maxWidth: 46 });
});

// Footer Notice
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
doc.text('Published by ChefLogic Systems Inc. · Platform Portal: https://cheflogic.supritamone.com/', 105, 274, { align: 'center' });

// ================= PAGE 2: CHAPTER 1 & 2 =================
doc.addPage();

// Background
doc.setFillColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
doc.rect(0, 0, 210, 297, 'F');

doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
doc.setLineWidth(0.4);
doc.rect(12, 12, 186, 273);

// Header
doc.setFont('times', 'normal');
doc.setFontSize(9);
doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
doc.text('CHEFLOGIC CULINARY INTELLIGENCE · CHAPTER 1 & 2', 105, 22, { align: 'center' });
doc.line(20, 25, 190, 25);

// Chapter 1
doc.setFont('times', 'bold');
doc.setFontSize(14);
doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
doc.text('01. THE MENU ENGINEERING MATRIX (KASAVANA & SMITH)', 20, 36);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(213, 207, 196);
doc.text(
  'Every dish on your menu belongs to one of four definitive quadrants based on Contribution Margin ($) and Sales Velocity (Pops):',
  20,
  44,
  { maxWidth: 170 }
);

// Quadrants Table
const quads = [
  { name: '1. STARS (High Profit, High Popularity)', desc: 'Protect recipe standards rigorously. Maintain focal menu placement without alteration.' },
  { name: '2. PLOWHORSES (Low Profit, High Popularity)', desc: 'High guest demand, margin-diluting. Re-negotiate bulk protein costs or reduce portion trim by 5-10%.' },
  { name: '3. PUZZLES (High Profit, Low Popularity)', desc: 'High culinary value, under-ordered. Reposition at the top of category; train service staff on tableside narrative.' },
  { name: '4. DOGS (Low Profit, Low Popularity)', desc: 'Drain on cooler shelf space. Eliminate immediately or recycle ingredients into evening market features.' }
];

let qY = 56;
quads.forEach((q) => {
  doc.setFillColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.rect(20, qY, 170, 18, 'F');
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.2);
  doc.rect(20, qY, 170, 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text(q.name, 24, qY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text(q.desc, 24, qY + 12, { maxWidth: 162 });

  qY += 21;
});

// Chapter 2
doc.setFont('times', 'bold');
doc.setFontSize(14);
doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
doc.text('02. THE 5-STEP WALK-IN INVENTORY RESCUE PROTOCOL', 20, 155);

const steps = [
  'Step 1: Automated Invoice Parsing - Optical scanning captures price changes immediately upon delivery.',
  'Step 2: 48-Hour Freshness Window - Flags high-value proteins approaching expiration thresholds.',
  'Step 3: Algorithmic Recipe Synthesis - Pair expiring items with pantry staples at target 22-26% food cost.',
  'Step 4: POS Ticket Volume Sync - Tracks exact plate count depletions across line prep stations in real time.',
  'Step 5: Daily Spoilage Audit - Logs waste by station (Prep, Line, Over-portion) for executive accountability.'
];

let sY = 166;
steps.forEach((st) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('•', 22, sY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(213, 207, 196);
  doc.text(st, 28, sY, { maxWidth: 162 });
  sY += 12;
});

// CTA Box at bottom of Page 2
doc.setFillColor(20, 24, 28);
doc.rect(20, 235, 170, 36, 'F');
doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
doc.setLineWidth(0.4);
doc.rect(20, 235, 170, 36);

doc.setFont('times', 'bold');
doc.setFontSize(11);
doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
doc.text('ACTIVATE YOUR COMPLIMENTARY 90-DAY CHEFLOGIC LICENSE', 105, 244, { align: 'center' });

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
doc.text('Deploy automated inventory costing and menu matrix optimization directly on your kitchen stations.', 105, 252, { align: 'center' });
doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
doc.text('Direct Portal URL: https://cheflogic.supritamone.com/   ·   Passcode: CHEF3MONTHFREE', 105, 261, { align: 'center' });

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
const outputPath = path.resolve('public', 'ChefLogic_2026_Culinary_Margin_Playbook.pdf');
fs.writeFileSync(outputPath, pdfBuffer);
console.log('Successfully generated PDF at:', outputPath, 'Bytes:', pdfBuffer.length);
