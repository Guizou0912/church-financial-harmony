
import React from 'react';
import { motion } from 'framer-motion';
import ChartCard from '@/components/Dashboard/ChartCard';

interface FinanceChartsProps {
  donParSourceData: { name: string; value: number }[];
  depenseParCategorieData: { name: string; value: number }[];
  onChartClick: (chartType: string) => void;
}

const FinanceCharts: React.FC<FinanceChartsProps> = ({ 
  donParSourceData, 
  depenseParCategorieData, 
  onChartClick 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ChartCard
          title="Répartition des Dons"
          subtitle="Par source de financement"
          type="pie"
          data={donParSourceData}
          onClick={() => onChartClick('Répartition des Dons')}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ChartCard
          title="Répartition des Dépenses"
          subtitle="Par catégorie"
          type="pie"
          data={depenseParCategorieData}
          onClick={() => onChartClick('Répartition des Dépenses')}
        />
      </motion.div>
    </div>
  );
};

export default FinanceCharts;
