
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type BudgetItem = {
  id: string;
  name: string;
  spent: number;
  total: number;
  color: string;
};

interface BudgetProgressCardProps {
  items: BudgetItem[];
  className?: string;
}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({ items, className }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-5",
        className
      )}
    >
      <h3 className="text-lg font-bold mb-4">Budget Overview</h3>
      <div className="space-y-5">
        {items.map((item) => {
          const percentage = Math.round((item.spent / item.total) * 100);
          
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm text-gray-400">
                  ${item.spent.toLocaleString()} / ${item.total.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={percentage}
                  className="h-2 bg-gray-700"
                  indicatorClassName={`bg-gradient-to-r ${item.color}`}
                />
                <span className="absolute right-0 -top-7 text-xs text-gray-400">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <button className="text-sm text-church-cyan hover:text-church-purple transition-colors">
          Manage Budget Allocations
        </button>
      </div>
    </motion.div>
  );
};

export default BudgetProgressCard;
