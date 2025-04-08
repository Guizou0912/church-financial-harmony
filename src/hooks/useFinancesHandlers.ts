import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { TransactionFilters } from "@/components/Finances/TransactionFilter";
import { ReportOptions } from "@/components/Finances/FinancialReportGenerator";
import { generateFinancialReportPDF } from "@/utils/pdfGenerator";
import { useSupabaseData, Transaction as SupabaseTransaction, Budget as SupabaseBudget } from '@/hooks/useSupabaseData';

const mapTransactionToUi = (transaction: SupabaseTransaction) => {
  return {
    id: transaction.id,
    date: new Date(transaction.transaction_date).toLocaleDateString('fr-MG'),
    description: transaction.description,
    montant: Number(transaction.amount),
    type: transaction.category || '',
    fromDepartment: transaction.transaction_type === 'expense' ? undefined : transaction.department,
    toDepartment: transaction.transaction_type === 'expense' ? transaction.department : undefined
  };
};

const mapBudgetToUi = (budget: SupabaseBudget) => {
  return {
    id: budget.id,
    name: budget.name,
    spent: Number(budget.spent),
    total: Number(budget.total),
    color: budget.color || 'from-church-cyan to-blue-500'
  };
};

export const useFinancesHandlers = () => {
  const [activeTab, setActiveTab] = useState('revenus');
  const { toast } = useToast();
  const {
    loading,
    fetchTransactions,
    addTransaction,
    fetchBudgets,
    addBudget,
    updateBudget
  } = useSupabaseData();
  
  const [transactionsRevenues, setTransactionsRevenues] = useState<any[]>([]);
  const [transactionsDepenses, setTransactionsDepenses] = useState<any[]>([]);
  const [budgetItems, setBudgetItems] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const transactions = await fetchTransactions();
      
      const revenus = transactions
        .filter(t => t.transaction_type === 'income')
        .map(mapTransactionToUi);
        
      const depenses = transactions
        .filter(t => t.transaction_type === 'expense')
        .map(mapTransactionToUi);
      
      setTransactionsRevenues(revenus);
      setTransactionsDepenses(depenses);
      
      const budgets = await fetchBudgets();
      setBudgetItems(budgets.map(mapBudgetToUi));
    };
    
    loadData();
  }, []);

  const revenueData = Array.from(
    transactionsRevenues.reduce((acc, transaction) => {
      const dateParts = transaction.date.split('/');
      const month = parseInt(dateParts[1]) - 1;
      const monthName = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][month];
      
      if (!acc.has(monthName)) {
        acc.set(monthName, 0);
      }
      
      acc.set(monthName, acc.get(monthName)! + transaction.montant);
      return acc;
    }, new Map<string, number>())
  ).map(([name, value]) => ({ name, value }));
  
  const depenseData = Array.from(
    transactionsDepenses.reduce((acc, transaction) => {
      const dateParts = transaction.date.split('/');
      const month = parseInt(dateParts[1]) - 1;
      const monthName = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][month];
      
      if (!acc.has(monthName)) {
        acc.set(monthName, 0);
      }
      
      acc.set(monthName, acc.get(monthName)! + transaction.montant);
      return acc;
    }, new Map<string, number>())
  ).map(([name, value]) => ({ name, value }));
  
  const depenseParCategorieData = Array.from(
    transactionsDepenses.reduce((acc, transaction) => {
      const category = transaction.type || 'Autres';
      
      if (!acc.has(category)) {
        acc.set(category, 0);
      }
      
      acc.set(category, acc.get(category)! + transaction.montant);
      return acc;
    }, new Map<string, number>())
  ).map(([name, value]) => {
    const total = transactionsDepenses.reduce((sum, t) => sum + t.montant, 0);
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return { name, value: percentage };
  });
  
  const donParSourceData = Array.from(
    transactionsRevenues.reduce((acc, transaction) => {
      const category = transaction.type || 'Autres';
      
      if (!acc.has(category)) {
        acc.set(category, 0);
      }
      
      acc.set(category, acc.get(category)! + transaction.montant);
      return acc;
    }, new Map<string, number>())
  ).map(([name, value]) => {
    const total = transactionsRevenues.reduce((sum, t) => sum + t.montant, 0);
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return { name, value: percentage };
  });

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

  const handleAddTransaction = async (newTransaction: any) => {
    const transaction = {
      description: newTransaction.description,
      amount: newTransaction.amount,
      transaction_date: newTransaction.date || new Date().toISOString().split('T')[0],
      transaction_type: newTransaction.type === 'revenu' ? 'income' : 'expense',
      category: newTransaction.category,
      department: newTransaction.department
    };
    
    const result = await addTransaction(transaction);
    
    if (result) {
      const uiTransaction = mapTransactionToUi(result);
      
      if (result.transaction_type === 'income') {
        setTransactionsRevenues(prev => [uiTransaction, ...prev]);
      } else {
        setTransactionsDepenses(prev => [uiTransaction, ...prev]);
      }
    }
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
    
    const fetchFilteredTransactions = async () => {
      let query = supabase.from('transactions').select('*');
      
      if (filters.dateRange.from) {
        const fromDate = filters.dateRange.from.toISOString().split('T')[0];
        query = query.gte('transaction_date', fromDate);
      }
      
      if (filters.dateRange.to) {
        const toDate = filters.dateRange.to.toISOString().split('T')[0];
        query = query.lte('transaction_date', toDate);
      }
      
      if (filters.minAmount !== null) {
        query = query.gte('amount', filters.minAmount);
      }
      
      if (filters.maxAmount !== null) {
        query = query.lte('amount', filters.maxAmount);
      }
      
      if (filters.categories.length > 0) {
        query = query.in('category', filters.categories);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching filtered transactions:', error);
        return;
      }
      
      const revenus = data
        .filter((t: any) => t.transaction_type === 'income')
        .map(mapTransactionToUi);
        
      const depenses = data
        .filter((t: any) => t.transaction_type === 'expense')
        .map(mapTransactionToUi);
      
      setTransactionsRevenues(revenus);
      setTransactionsDepenses(depenses);
    };
    
    fetchFilteredTransactions();
  };

  const handleGenerateReport = (options: ReportOptions) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport "${options.title}" a été généré au format ${options.format.toUpperCase()}.`,
    });

    if (options.format === 'pdf') {
      try {
        const transactions = [
          ...options.includeRevenues ? transactionsRevenues : [],
          ...options.includeExpenses ? transactionsDepenses : []
        ];

        const getPeriodText = (period: string): string => {
          switch (period) {
            case 'month': return 'Mois courant';
            case 'quarter': return 'Trimestre courant';
            case 'year': return 'Année courante';
            case 'custom': return 'Période personnalisée';
            default: return period;
          }
        };

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
  };

  const handleSaveBudget = async (items: any[]) => {
    for (const item of items) {
      await updateBudget(item.id, {
        name: item.name,
        spent: item.spent,
        total: item.total,
        color: item.color
      });
    }
    
    toast({
      title: "Budget mis à jour",
      description: "Les modifications du budget ont été enregistrées avec succès.",
    });
  };

  return {
    activeTab,
    setActiveTab,
    handleStatCardClick,
    handleChartClick,
    handleTransactionClick,
    handleAddTransaction,
    handleExport,
    handleFilterClick,
    handleBudgetItemClick,
    handleQuickActionClick,
    handleApplyFilter,
    handleGenerateReport,
    handleSaveBudget,
    revenueData,
    depenseData,
    transactionsRevenues,
    transactionsDepenses,
    donParSourceData,
    depenseParCategorieData,
    budgetItems,
    loading
  };
};

export const getBudgetItems = () => {
  const { fetchBudgets } = useSupabaseData();
  return fetchBudgets().then(budgets => budgets.map(mapBudgetToUi));
};
