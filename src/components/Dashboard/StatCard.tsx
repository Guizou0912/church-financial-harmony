
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, className, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass-card p-5 relative overflow-hidden group",
        onClick ? "hover:bg-white/10 cursor-pointer transition-all" : "",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5 z-0 group-hover:bg-white/10 transition-colors" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <motion.div 
            className="text-gray-300 p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {icon}
          </motion.div>
        </div>
        <h3 className="text-2xl font-bold mb-1 group-hover:text-white transition-colors">{value}</h3>
        {trend !== undefined && (
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span
              className={`inline-block mr-1 ${
                trend >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend >= 0 ? "↑" : "↓"}
            </span>
            <span
              className={`text-sm ${
                trend >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Math.abs(trend)}% from last month
            </span>
          </motion.div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-church-cyan to-church-magenta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

export default StatCard;
