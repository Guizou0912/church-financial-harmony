
import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/Layout/PageLayout';

// Import our enhanced components
import FinanceHeader from '@/components/Finances/FinanceHeader';
import FinanceStats from '@/components/Finances/FinanceStats';
import FinanceCharts from '@/components/Finances/FinanceCharts';
import FinanceMainContent from '@/components/Finances/FinanceMainContent';
import { useFinancesHandlers } from '@/hooks/useFinancesHandlers';

// Import financial chart data
import {
  donParSourceData,
  depenseParCategorieData,
} from '@/services/financeData';

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
  } = useFinancesHandlers();

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

        <FinanceMainContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleBudgetItemClick={handleBudgetItemClick}
          handleQuickActionClick={handleQuickActionClick}
          handleTransactionClick={handleTransactionClick}
          handleChartClick={handleChartClick}
        />
      </motion.div>
    </PageLayout>
  );
};

export default Finances;
