
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface BudgetItem {
  id: string;
  name: string;
  spent: number;
  total: number;
  color: string;
}

interface BudgetProgressCardProps {
  items: BudgetItem[];
}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({ items }) => {
  // Fonction d'affichage de la monnaie MGA avec format
  const formatMGA = (value: number) => {
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-lg font-bold mb-4">Aperçu du Budget</h3>
      <div className="space-y-5">
        {items.map((item) => {
          const percentage = Math.round((item.spent / item.total) * 100);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-gray-400">
                  {formatMGA(item.spent)} / {formatMGA(item.total)}
                </span>
              </div>
              <div className="relative pt-1">
                <Progress 
                  value={percentage} 
                  className="h-2 bg-gray-700"
                />
                <span className={`absolute right-0 -top-6 text-xs font-semibold ${
                  percentage >= 90 ? 'text-red-400' : 'text-green-400'
                }`}>
                  {percentage}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgressCard;
