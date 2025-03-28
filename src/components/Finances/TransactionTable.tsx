
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { formatMGA } from '@/lib/utils';

interface Transaction {
  id: number;
  date: string;
  description: string;
  montant: number;
  type: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction, type: 'revenu' | 'depense') => void;
  type: 'revenu' | 'depense';
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  onTransactionClick,
  type
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Transactions récentes</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-church-cyan"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5 text-left">
              <th className="p-3 text-sm font-semibold">Date</th>
              <th className="p-3 text-sm font-semibold">Description</th>
              <th className="p-3 text-sm font-semibold">Type</th>
              <th className="p-3 text-sm font-semibold text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <motion.tr 
                key={tx.id} 
                className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                onClick={() => onTransactionClick(tx, type)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <td className="p-3 text-sm">{tx.date}</td>
                <td className="p-3 text-sm">{tx.description}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    type === 'revenu' ? (
                      tx.type === 'don' ? 'bg-green-500/20 text-green-400' : 
                      tx.type === 'dime' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-purple-500/20 text-purple-400'
                    ) : (
                      tx.type === 'utilitaire' ? 'bg-yellow-500/20 text-yellow-400' : 
                      tx.type === 'equipement' ? 'bg-blue-500/20 text-blue-400' : 
                      tx.type === 'salaire' ? 'bg-red-500/20 text-red-400' :
                      'bg-orange-500/20 text-orange-400'
                    )
                  }`}>
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </span>
                </td>
                <td className="p-3 text-sm text-right font-medium" className={type === 'revenu' ? 'text-green-400' : 'text-red-400'}>
                  {formatMGA(tx.montant)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
