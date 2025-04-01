
import jsPDF from 'jspdf';
import { formatMGA } from '@/lib/utils';

// Function to generate financial reports PDF
export const generateFinancialReportPDF = (options: {
  title: string;
  period: string;
  includeRevenues?: boolean;
  includeExpenses?: boolean;
  includeSummary?: boolean;
  includeCharts?: boolean;
  includeTransactions?: boolean;
  revenueData?: any[];
  expenseData?: any[];
  transactionData?: any[];
}) => {
  const {
    title,
    period,
    includeRevenues = true,
    includeExpenses = true,
    includeSummary = true,
    includeTransactions = true,
    revenueData = [],
    expenseData = [],
    transactionData = []
  } = options;

  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set default font size
  const defaultFontSize = 10;
  doc.setFontSize(defaultFontSize);
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  // Add period
  doc.setFontSize(12);
  doc.text(`Période: ${period}`, 20, 30);
  
  let yPosition = 40;
  
  // Include summary if requested
  if (includeSummary && revenueData.length && expenseData.length) {
    doc.setFontSize(14);
    doc.text('Résumé Financier', 20, yPosition);
    yPosition += 10;
    
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
    const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
    const balance = totalRevenue - totalExpense;
    
    doc.setFontSize(defaultFontSize);
    doc.text(`Total des Revenus: ${formatMGA(totalRevenue)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Total des Dépenses: ${formatMGA(totalExpense)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Solde: ${formatMGA(balance)}`, 20, yPosition);
    yPosition += 15;
  }
  
  // Include revenue data if requested
  if (includeRevenues && revenueData.length) {
    doc.setFontSize(14);
    doc.text('Analyse des Revenus', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(defaultFontSize);
    revenueData.forEach(item => {
      doc.text(`${item.name}: ${formatMGA(item.value)}`, 20, yPosition);
      yPosition += 7;
      
      // Reset to a new page if we're near the bottom
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    yPosition += 8;
  }
  
  // Include expense data if requested
  if (includeExpenses && expenseData.length) {
    doc.setFontSize(14);
    doc.text('Analyse des Dépenses', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(defaultFontSize);
    expenseData.forEach(item => {
      doc.text(`${item.name}: ${formatMGA(item.value)}`, 20, yPosition);
      yPosition += 7;
      
      // Reset to a new page if we're near the bottom
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    yPosition += 8;
  }
  
  // Include transactions if requested
  if (includeTransactions && transactionData.length) {
    doc.setFontSize(14);
    doc.text('Transactions', 20, yPosition);
    yPosition += 10;
    
    // Add new page if content would be too long
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Create a simple table header
    doc.setFontSize(defaultFontSize);
    doc.text('Date', 20, yPosition);
    doc.text('Description', 50, yPosition);
    doc.text('Montant', 140, yPosition);
    doc.text('Type', 180, yPosition);
    yPosition += 7;
    
    // Add a line
    doc.line(20, yPosition - 3, 190, yPosition - 3);
    
    // Add transaction data
    transactionData.forEach(transaction => {
      doc.text(transaction.date, 20, yPosition);
      doc.text(transaction.description.substring(0, 30), 50, yPosition);
      doc.text(formatMGA(transaction.montant), 140, yPosition);
      doc.text(transaction.type, 180, yPosition);
      yPosition += 7;
      
      // Reset to a new page if we're near the bottom
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }
  
  // Add footer
  // In jsPDF v3, we need to get the page count differently
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} sur ${pageCount}`, 20, 285);
    doc.text(`Généré le ${new Date().toLocaleDateString()}`, 160, 285);
  }
  
  return doc;
};
