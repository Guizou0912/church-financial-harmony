
import React from 'react';
import { motion } from 'framer-motion';
import TransactionTabs from './TransactionTabs';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';
import QuickActions from '@/components/Finances/QuickActions';
import { revenueData, depenseData, transactionsRevenues, transactionsDepenses } from '@/services/financeData';

interface FinanceMainContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  handleBudgetItemClick: (id: string) => void;
  handleQuickActionClick: (actionType: string) => void;
  handleTransactionClick: (transaction: any, type: 'revenu' | 'depense') => void;
  handleChartClick: (chartType: string) => void;
}

const FinanceMainContent: React.FC<FinanceMainContentProps> = ({ 
  activeTab, 
  setActiveTab, 
  handleBudgetItemClick, 
  handleQuickActionClick, 
  handleTransactionClick, 
  handleChartClick 
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

// Import budgetItems directly to avoid circular dependencies
const budgetItems = [
  {
    id: '1',
    name: 'Ministère du Culte',
    spent: 25000000,
    total: 30000000,
    color: 'from-church-cyan to-blue-500',
  },
  {
    id: '2',
    name: 'Programmes Jeunesse',
    spent: 18000000,
    total: 25000000,
    color: 'from-church-purple to-church-magenta',
  },
  {
    id: '3',
    name: 'Missions & Sensibilisation',
    spent: 30000000,
    total: 32000000,
    color: 'from-green-500 to-church-cyan',
  },
  {
    id: '4',
    name: 'Administration',
    spent: 15000000,
    total: 18000000,
    color: 'from-church-magenta to-red-500',
  },
];

export default FinanceMainContent;
