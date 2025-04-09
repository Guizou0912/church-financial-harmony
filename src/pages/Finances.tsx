
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/Layout/PageLayout';
import { RequireAuth } from '@/contexts/AuthContext';

// Import our enhanced components
import FinanceHeader from '@/components/Finances/FinanceHeader';
import FinanceStats from '@/components/Finances/FinanceStats';
import FinanceCharts from '@/components/Finances/FinanceCharts';
import FinanceMainContent from '@/components/Finances/FinanceMainContent';
import { useFinancesHandlers } from '@/hooks/useFinancesHandlers';
import { Loader2 } from 'lucide-react';

const Finances = () => {
  const {
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
    revenueData,
    depenseData,
    transactionsRevenues,
    transactionsDepenses,
    donParSourceData,
    depenseParCategorieData,
    budgetItems,
    loading
  } = useFinancesHandlers();

  // Calculer les totaux
  const revenuTotal = transactionsRevenues.reduce((sum, t) => sum + t.montant, 0);
  const depenseTotal = transactionsDepenses.reduce((sum, t) => sum + t.montant, 0);
  const soldeActuel = revenuTotal - depenseTotal;
  const croissance = revenuTotal > 0 ? Math.round((soldeActuel / revenuTotal) * 100) : 0;

  return (
    <RequireAuth>
      <PageLayout>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Chargement des données financières...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <FinanceHeader 
              onFilterClick={handleFilterClick}
              onExportClick={handleExport}
              onAddTransactionClick={() => handleAddTransaction}  {/* Updated to pass the function reference correctly */}
              onApplyFilter={handleApplyFilter}
              onGenerateReport={handleGenerateReport}
            />

            <FinanceStats 
              onStatCardClick={handleStatCardClick} 
              revenuTotal={revenuTotal}
              depenseTotal={depenseTotal}
              soldeActuel={soldeActuel}
              croissance={croissance}
            />

            <FinanceCharts 
              donParSourceData={donParSourceData}
              depenseParCategorieData={depenseParCategorieData}
              onChartClick={handleChartClick}
            />

            <FinanceMainContent 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleBudgetItemClick={handleBudgetItemClick}
              handleQuickActionClick={handleQuickActionClick}
              handleTransactionClick={handleTransactionClick}
              handleChartClick={handleChartClick}
              revenueData={revenueData}
              depenseData={depenseData}
              transactionsRevenues={transactionsRevenues}
              transactionsDepenses={transactionsDepenses}
              budgetItems={budgetItems}
            />
          </motion.div>
        )}
      </PageLayout>
    </RequireAuth>
  );
};

export default Finances;
