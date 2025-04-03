
import React from 'react';
import { motion } from 'framer-motion';
import { EventType, calculateEventBalance } from '@/types/EventTypes';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { formatMGA } from '@/lib/utils';

interface EventStatsProps {
  upcomingEvents: EventType[];
  pastEvents: EventType[];
  allEvents: EventType[];
}

const EventStats: React.FC<EventStatsProps> = ({ upcomingEvents, pastEvents, allEvents }) => {
  const totalFinancials = allEvents.reduce(
    (acc, event) => {
      const { income, expenses } = calculateEventBalance(event.transactions);
      return {
        income: acc.income + income,
        expenses: acc.expenses + expenses
      };
    },
    { income: 0, expenses: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {[
        { label: 'Événements à venir', count: upcomingEvents.length, icon: <Calendar className="h-5 w-5" />, color: 'from-church-cyan to-blue-500' },
        { label: 'Événements passés', count: pastEvents.length, icon: <Clock className="h-5 w-5" />, color: 'from-church-purple to-church-magenta' },
        { label: 'Revenus totaux', count: formatMGA(totalFinancials.income), icon: <DollarSign className="h-5 w-5" />, color: 'from-green-500 to-church-cyan' },
        { label: 'Dépenses totales', count: formatMGA(totalFinancials.expenses), icon: <DollarSign className="h-5 w-5" />, color: 'from-church-magenta to-red-500' },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white/5 p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.count}</p>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventStats;
