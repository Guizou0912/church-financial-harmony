
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
  onClick?: () => void;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  className, 
  onClick,
  description 
}) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
      toast({
        title: `${title}`,
        description: description || `Vous consultez les détails de ${title.toLowerCase()}`,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass-card p-5 relative overflow-hidden group transition-all duration-300",
        onClick ? "cursor-pointer hover:shadow-lg hover:bg-white/15" : "",
        className
      )}
      onClick={handleClick}
    >
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5 z-0" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <div className="text-gray-300 p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 group-hover:text-white transition-colors duration-300">{value}</h3>
        {trend !== undefined && (
          <div className="flex items-center">
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
              {Math.abs(trend)}% du mois précédent
            </span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-church-cyan to-church-magenta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
};

export default StatCard;
