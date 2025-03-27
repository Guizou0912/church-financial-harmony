
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, ShoppingCart, CheckCircle } from 'lucide-react';

export type ActivityType = 'donation' | 'expense' | 'event' | 'task';

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: ActivityType;
}

interface RecentActivityCardProps {
  activities: Activity[];
  onActivityClick?: (activity: Activity) => void;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities, onActivityClick }) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'donation':
        return <DollarSign className="h-4 w-4 text-green-400" />;
      case 'expense':
        return <ShoppingCart className="h-4 w-4 text-red-400" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-blue-400" />;
      case 'task':
        return <CheckCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="glass-card p-5">
      <h3 className="text-lg font-bold mb-4">Activité Récente</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ${onActivityClick ? "cursor-pointer" : ""}`}
            onClick={() => onActivityClick && onActivityClick(activity)}
          >
            <div className="p-2 rounded-full bg-white/10 mr-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{activity.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
