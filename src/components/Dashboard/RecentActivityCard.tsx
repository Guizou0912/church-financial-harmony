
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Activity = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'donation' | 'expense' | 'event' | 'task';
};

interface RecentActivityCardProps {
  activities: Activity[];
  className?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities, className }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'donation':
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/20 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.5a1 1 0 01-.8-.4l-1.2-1.6a1 1 0 00-.8-.4H9.5a1 1 0 00-.8.4L7.5 3.6a1 1 0 01-.8.4H4zm7 5a1 1 0 100-2 1 1 0 000 2zm-2 2a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'expense':
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H14a1 1 0 100-2H8.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'event':
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'task':
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-5",
        className
      )}
    >
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{activity.title}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
            </div>
            <div className="text-xs text-gray-400">{activity.timestamp}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-sm text-church-cyan hover:text-church-purple transition-colors">
          View All Activities
        </button>
      </div>
    </motion.div>
  );
};

export default RecentActivityCard;
