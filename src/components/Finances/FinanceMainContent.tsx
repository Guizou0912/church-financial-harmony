
import React from 'react';
import { motion } from 'framer-motion';
import TransactionTabs from './TransactionTabs';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';
import QuickActions from '@/components/Finances/QuickActions';

interface FinanceMainContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  handleBudgetItemClick: (id: string) => void;
  handleQuickActionClick: (actionType: string) => void;
  handleTransactionClick: (transaction: any, type: 'revenu' | 'depense') => void;
  handleChartClick: (chartType: string) => void;
  revenueData: { name: string; value: number }[];
  depenseData: { name: string; value: number }[];
  transactionsRevenues: any[];
  transactionsDepenses: any[];
  budgetItems: any[];
}

const FinanceMainContent: React.FC<FinanceMainContentProps> = ({ 
  activeTab, 
  setActiveTab, 
  handleBudgetItemClick, 
  handleQuickActionClick, 
  handleTransactionClick,
  handleChartClick,
  revenueData,
  depenseData,
  transactionsRevenues,
  transactionsDepenses,
  budgetItems 
}) => {
  return (
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
  );
};

export default FinanceMainContent;
