
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import PageLayout from '@/components/Layout/PageLayout';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';

// Import our enhanced components
import FinanceHeader from '@/components/Finances/FinanceHeader';
import FinanceStats from '@/components/Finances/FinanceStats';
import FinanceCharts from '@/components/Finances/FinanceCharts';
import TransactionTabs from '@/components/Finances/TransactionTabs';
import QuickActions from '@/components/Finances/QuickActions';
import { TransactionFilters } from '@/components/Finances/TransactionFilter'; 
import { ReportOptions } from '@/components/Finances/FinancialReportGenerator';
import { generateFinancialReportPDF } from '@/utils/pdfGenerator';

// Import financial data
import {
  revenueData,
  depenseData,
  depenseParCategorieData,
  donParSourceData,
  budgetItems,
  transactionsRevenues,
  transactionsDepenses
} from '@/services/financeData';

const Finances = () => {
  const [activeTab, setActiveTab] = useState('revenus');
  const { toast } = useToast();

  const handleStatCardClick = (type: string) => {
    switch(type) {
      case 'revenus':
        setActiveTab('revenus');
        toast({
          title: "Données des revenus",
          description: "Affichage des données détaillées des revenus",
        });
        break;
      case 'depenses':
        setActiveTab('depenses');
        toast({
          title: "Données des dépenses",
          description: "Affichage des données détaillées des dépenses",
        });
        break;
      case 'solde':
        toast({
          title: "Solde actuel",
          description: "Analyse détaillée du solde financier disponible",
        });
        break;
      case 'croissance':
        toast({
          title: "Analyse de croissance",
          description: "Visualisation de la croissance financière sur l'année en cours",
        });
        break;
      default:
        break;
    }
  };

  const handleChartClick = (chartType: string) => {
    toast({
      title: `Graphique: ${chartType}`,
      description: "Ouverture de l'analyse détaillée et des options d'exportation",
    });
  };

  const handleTransactionClick = (transaction: any, type: 'revenu' | 'depense') => {
    toast({
      title: `Transaction: ${transaction.description}`,
      description: `Détails de la ${type === 'revenu' ? 'recette' : 'dépense'} de ${new Intl.NumberFormat('fr-MG', {
        style: 'currency',
        currency: 'MGA',
        minimumFractionDigits: 0,
      }).format(transaction.montant)}`,
    });
  };

  const handleAddTransaction = () => {
    toast({
      title: "Nouvelle transaction",
      description: "Formulaire d'ajout de transaction ouvert",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportation des données",
      description: "Rapport financier exporté avec succès",
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtrer les données",
      description: "Options de filtrage avancées ouvertes",
    });
  };

  const handleBudgetItemClick = (id: string) => {
    const budgetItem = budgetItems.find(item => item.id === id);
    if (budgetItem) {
      toast({
        title: `Budget: ${budgetItem.name}`,
        description: `Consultation des détails et des transactions liées au budget ${budgetItem.name}`,
      });
    }
  };

  const handleQuickActionClick = (actionType: string) => {
    switch(actionType) {
      case 'payments':
        toast({
          title: "Approbation des paiements",
          description: "Accès au workflow d'approbation des paiements",
        });
        break;
      case 'report':
        toast({
          title: "Génération de rapport",
          description: "Assistant de création de rapport financier ouvert",
        });
        break;
      case 'budget':
        toast({
          title: "Planification budgétaire",
          description: "Outil de planification budgétaire ouvert",
        });
        break;
      case 'alerts':
        toast({
          title: "Notifications financières",
          description: "Configuration des alertes et notifications",
        });
        break;
      default:
        break;
    }
  };

  const handleApplyFilter = (filters: TransactionFilters) => {
    toast({
      title: "Filtres appliqués",
      description: "Les transactions ont été filtrées selon vos critères.",
    });
    // In a real implementation, we would filter the transaction data here
  };

  const handleGenerateReport = (options: ReportOptions) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport "${options.title}" a été généré au format ${options.format.toUpperCase()}.`,
    });

    if (options.format === 'pdf') {
      try {
        // Create combined transactions data
        const transactions = [
          ...options.includeRevenues ? transactionsRevenues : [],
          ...options.includeExpenses ? transactionsDepenses : []
        ];

        // Get period text
        const getPeriodText = (period: string): string => {
          switch (period) {
            case 'month': return 'Mois courant';
            case 'quarter': return 'Trimestre courant';
            case 'year': return 'Année courante';
            case 'custom': return 'Période personnalisée';
            default: return period;
          }
        };

        // Generate and download PDF
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
        
        doc.save(`${options.title.replace(/\s+/g, '_')}.pdf`);
      } catch (error) {
        console.error('Error generating PDF from Finances page:', error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la génération du PDF.",
          variant: "destructive"
        });
      }
    }
    // In a real implementation, we would generate the report here for other formats
  };

  const handleSaveBudget = (items: any[]) => {
    toast({
      title: "Budget mis à jour",
      description: "Les modifications du budget ont été enregistrées avec succès.",
    });
    // In a real implementation, we would update the budget data here
  };
  
  const handleSaveAlerts = (alerts: any[]) => {
    toast({
      title: "Alertes mises à jour",
      description: "Les configurations d'alertes ont été enregistrées avec succès.",
    });
    // In a real implementation, we would save the alerts configuration here
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <FinanceHeader 
          onFilterClick={handleFilterClick}
          onExportClick={handleExport}
          onAddTransactionClick={handleAddTransaction}
          onApplyFilter={handleApplyFilter}
          onGenerateReport={handleGenerateReport}
        />

        <FinanceStats onStatCardClick={handleStatCardClick} />

        <FinanceCharts 
          donParSourceData={donParSourceData}
          depenseParCategorieData={depenseParCategorieData}
          onChartClick={handleChartClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TransactionTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              revenueData={revenueData}
              depenseData={depenseData}
              transactionsRevenues={transactionsRevenues}
              transactionsDepenses={transactionsDepenses}
              handleTransactionClick={handleTransactionClick}
              handleChartClick={handleChartClick}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BudgetProgressCard 
              items={budgetItems}
              onItemClick={handleBudgetItemClick}
            />
            
            <QuickActions onActionClick={handleQuickActionClick} />
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Finances;
