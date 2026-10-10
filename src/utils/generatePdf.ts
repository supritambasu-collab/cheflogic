import { jsPDF } from 'jspdf';

export function triggerPlaybookPdfDownload(): void {
  // First attempt: direct link download to static pre-generated PDF
  try {
    const link = document.createElement('a');
    link.href = '/ChefLogic_2026_Culinary_Margin_Playbook.pdf';
    link.download = 'ChefLogic_2026_Culinary_Margin_Playbook.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    // Fallback: Generate on-the-fly via jsPDF
    generateAndDownloadPdfFallback();
  }
}

export function generateAndDownloadPdfFallback(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const GOLD = [197, 160, 89];
  const CHARCOAL = [12, 13, 14];
  const OFFWHITE = [245, 245, 240];
  const SLATE = [30, 33, 37];

  // Page 1
  doc.setFillColor(CHARCOAL[0], CHARCOAL[1], CHARCOAL[2]);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.8);
  doc.rect(12, 12, 186, 273);

  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('THE EXECUTIVE CULINARY DISPATCH · ANNUAL WHITE PAPER', 105, 35, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
  doc.text('CHEFLOGIC', 105, 52, { align: 'center' });

  doc.setFontSize(18);
  doc.text('2026 RESTAURANT MARGIN &', 105, 66, { align: 'center' });
  doc.text('RECIPE ENGINEERING PLAYBOOK', 105, 76, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('Strategic Back-of-House Systems to Eliminate Food Waste & Expand Net EBITDA', 105, 88, { align: 'center' });

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

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(136, 131, 122);
  doc.text('Published by ChefLogic Systems Inc. · Portal: https://cheflogic.supritamone.com/', 105, 274, { align: 'center' });

  doc.save('ChefLogic_2026_Culinary_Margin_Playbook.pdf');
}
