
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventType, getEventTypeColor, getEventTypeLabel, getEventStatusColor, getEventStatusLabel, calculateEventBalance } from '@/types/EventTypes';
import { Calendar, Clock, MapPin, Users, DollarSign, PlusCircle, FileText, X } from 'lucide-react';
import { formatMGA } from '@/lib/utils';

interface EventCardProps {
  event: EventType;
  onOpenTransactionModal: (event: EventType) => void;
  onDeleteTransaction: (eventId: number, transactionId: number) => void;
  onExportTransactionsCSV: (event: EventType) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onOpenTransactionModal, 
  onDeleteTransaction,
  onExportTransactionsCSV
}) => {
  const [showFinancialDetails, setShowFinancialDetails] = useState(false);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">{event.title}</h4>
            <Badge className={getEventTypeColor(event.type)}>
              {getEventTypeLabel(event.type)}
            </Badge>
            <Badge className={getEventStatusColor(event.status)}>
              {getEventStatusLabel(event.status)}
            </Badge>
          </div>
          <p className="text-sm text-gray-400 mb-2">{event.description}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-gray-400" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-gray-400" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} className="text-gray-400" />
              {event.attendees} participants
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          {event.cost && (
            <span className="text-sm font-medium">{formatMGA(event.cost)}</span>
          )}
          <Button variant="ghost" size="sm" className="rounded-full" 
            onClick={() => setShowFinancialDetails(!showFinancialDetails)}>
            <DollarSign size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full" 
            onClick={() => onOpenTransactionModal(event)}>
            <PlusCircle size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full"
            onClick={() => onExportTransactionsCSV(event)}>
            <FileText size={16} />
          </Button>
        </div>
      </div>
      
      {showFinancialDetails && (
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex justify-between items-center">
            <h5 className="font-medium">Transactions financières</h5>
            <Button variant="ghost" size="sm" onClick={() => setShowFinancialDetails(false)}>
              <X size={16} />
            </Button>
          </div>
          
          {event.transactions.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Description</th>
                      <th className="px-4 py-2 text-left font-medium">Type</th>
                      <th className="px-4 py-2 text-left font-medium">Montant</th>
                      <th className="px-4 py-2 text-left font-medium">Date</th>
                      <th className="px-4 py-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {event.transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-white/5">
                        <td className="px-4 py-2">{transaction.description}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === 'income' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {transaction.type === 'income' ? 'Revenu' : 'Dépense'}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-medium">
                          <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                            {transaction.type === 'income' ? '+' : '-'} {formatMGA(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-4 py-2">{transaction.date}</td>
                        <td className="px-4 py-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDeleteTransaction(event.id, transaction.id)}
                          >
                            <X size={14} className="text-red-400" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-white/10">
                      <td colSpan={2} className="px-4 py-2 font-medium">Total</td>
                      <td colSpan={3} className="px-4 py-2 font-medium">
                        <div className="flex flex-col">
                          <span className="text-green-400">
                            Revenus: {formatMGA(calculateEventBalance(event.transactions).income)}
                          </span>
                          <span className="text-red-400">
                            Dépenses: {formatMGA(calculateEventBalance(event.transactions).expenses)}
                          </span>
                          <span className={`${
                            calculateEventBalance(event.transactions).balance >= 0 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            Solde: {formatMGA(calculateEventBalance(event.transactions).balance)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Aucune transaction enregistrée pour cet événement
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EventCard;
