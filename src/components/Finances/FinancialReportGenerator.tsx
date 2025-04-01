
import React, { useState } from 'react';
import { FileText, Download, PieChart, BarChart, Table, Printer } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateFinancialReportPDF } from '@/utils/pdfGenerator';
import { 
  revenueData, 
  depenseData, 
  transactionsRevenues, 
  transactionsDepenses 
} from '@/services/financeData';

interface FinancialReportGeneratorProps {
  onGenerateReport: (options: ReportOptions) => void;
}

export interface ReportOptions {
  title: string;
  period: 'month' | 'quarter' | 'year' | 'custom';
  customDateRange?: { from: Date; to: Date };
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeTransactions: boolean;
  includeExpenses: boolean;
  includeRevenues: boolean;
  includeSummary: boolean;
}

const FinancialReportGenerator: React.FC<FinancialReportGeneratorProps> = ({ onGenerateReport }) => {
  const { toast } = useToast();
  const [options, setOptions] = useState<ReportOptions>({
    title: "Rapport financier",
    period: 'month',
    format: 'pdf',
    includeCharts: true,
    includeTransactions: true,
    includeExpenses: true,
    includeRevenues: true,
    includeSummary: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPeriodText = (period: string): string => {
    switch (period) {
      case 'month': return 'Mois courant';
      case 'quarter': return 'Trimestre courant';
      case 'year': return 'Année courante';
      case 'custom': return 'Période personnalisée';
      default: return period;
    }
  };

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    
    try {
      // Generate transactions data
      const transactions = [
        ...options.includeRevenues ? transactionsRevenues : [],
        ...options.includeExpenses ? transactionsDepenses : []
      ];

      // Create the PDF document
      const doc = generateFinancialReportPDF({
        title: options.title,
        period: getPeriodText(options.period),
        includeRevenues: options.includeRevenues,
        includeExpenses: options.includeExpenses,
        includeSummary: options.includeSummary,
        includeTransactions: options.includeTransactions,
        revenueData: revenueData,
        expenseData: depenseData,
        transactionData: transactions
      });
      
      // Save the PDF
      doc.save(`${options.title.replace(/\s+/g, '_')}.pdf`);
      
      toast({
        title: "PDF généré avec succès",
        description: `Le rapport "${options.title}" a été téléchargé au format PDF.`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur de génération",
        description: "Une erreur s'est produite lors de la génération du PDF.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
    
    // Still call the parent function for any additional logic
    onGenerateReport(options);
  };

  const handleGenerateReport = () => {
    if (options.format === 'pdf') {
      handleDownloadPDF();
    } else {
      // For other format types
      onGenerateReport(options);
      toast({
        title: "Génération du rapport",
        description: `Le rapport "${options.title}" est en cours de génération au format ${options.format.toUpperCase()}.`
      });
    }
  };

  const handlePrintPreview = () => {
    toast({
      title: "Aperçu avant impression",
      description: "Préparation de l'aperçu avant impression..."
    });
    // In a real implementation, this would show a print preview
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-base font-medium">
          <FileText className="h-5 w-5" />
          Générer un rapport
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Générer un rapport financier</SheetTitle>
          <SheetDescription>
            Configurez les paramètres de votre rapport personnalisé
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Titre du rapport</Label>
            <Input 
              id="title"
              name="title"
              value={options.title}
              onChange={handleInputChange}
              className="text-base"
              placeholder="Rapport financier mensuel"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period" className="text-base">Période</Label>
            <select 
              id="period"
              name="period"
              value={options.period}
              onChange={handleSelectChange}
              className="w-full p-3 rounded-md border bg-white/5 text-base"
            >
              <option value="month">Mois courant</option>
              <option value="quarter">Trimestre courant</option>
              <option value="year">Année courante</option>
              <option value="custom">Période personnalisée</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format" className="text-base">Format d'exportation</Label>
            <select 
              id="format"
              name="format"
              value={options.format}
              onChange={handleSelectChange}
              className="w-full p-3 rounded-md border bg-white/5 text-base"
            >
              <option value="pdf">PDF Document (.pdf)</option>
              <option value="excel">Excel Spreadsheet (.xlsx)</option>
              <option value="csv">CSV File (.csv)</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base">Contenu du rapport</Label>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeSummary"
                name="includeSummary"
                checked={options.includeSummary}
                onChange={handleInputChange}
                className="h-5 w-5"
              />
              <Label htmlFor="includeSummary" className="text-base font-normal">Résumé financier</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeRevenues"
                name="includeRevenues"
                checked={options.includeRevenues}
                onChange={handleInputChange}
                className="h-5 w-5"
              />
              <Label htmlFor="includeRevenues" className="text-base font-normal">Analyse des revenus</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeExpenses"
                name="includeExpenses"
                checked={options.includeExpenses}
                onChange={handleInputChange}
                className="h-5 w-5"
              />
              <Label htmlFor="includeExpenses" className="text-base font-normal">Analyse des dépenses</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeTransactions"
                name="includeTransactions"
                checked={options.includeTransactions}
                onChange={handleInputChange}
                className="h-5 w-5"
              />
              <Label htmlFor="includeTransactions" className="text-base font-normal">Liste des transactions</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeCharts"
                name="includeCharts"
                checked={options.includeCharts}
                onChange={handleInputChange}
                className="h-5 w-5"
              />
              <Label htmlFor="includeCharts" className="text-base font-normal">Graphiques et diagrammes</Label>
            </div>
          </div>
        </div>
        
        <SheetFooter className="mt-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full text-base"
              onClick={handlePrintPreview}
            >
              <Printer className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
            <Button
              type="button"
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full text-base"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? 'Génération...' : 'Générer'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FinancialReportGenerator;
