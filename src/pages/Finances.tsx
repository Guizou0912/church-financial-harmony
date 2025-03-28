
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import PageLayout from '@/components/Layout/PageLayout';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';

// Import our new components
import FinanceHeader from '@/components/Finances/FinanceHeader';
import FinanceStats from '@/components/Finances/FinanceStats';
import FinanceCharts from '@/components/Finances/FinanceCharts';
import TransactionTabs from '@/components/Finances/TransactionTabs';
import QuickActions from '@/components/Finances/QuickActions';

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
