
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { formatMGA } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'montant' | 'description'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column: 'date' | 'montant' | 'description') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setIsDetailsOpen(true);
    onTransactionClick(tx, type);
  };

  const handleApprove = () => {
    if (selectedTransaction) {
      // In a real app, this would call a backend API to approve the transaction
      alert(`Transaction ${selectedTransaction.id} approuvée!`);
      setIsDetailsOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedTransaction) {
      // In a real app, this would call a backend API to reject the transaction
      alert(`Transaction ${selectedTransaction.id} rejetée!`);
      setIsDetailsOpen(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.date.includes(searchTerm)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortBy === 'montant') {
      return sortOrder === 'asc' ? a.montant - b.montant : b.montant - a.montant;
    } else {
      return sortOrder === 'asc' 
        ? a.description.localeCompare(b.description) 
        : b.description.localeCompare(a.description);
    }
  });

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
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5 text-left">
              <th className="p-3 text-sm font-semibold cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center">
                  Date
                  {sortBy === 'date' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="p-3 text-sm font-semibold cursor-pointer" onClick={() => handleSort('description')}>
                <div className="flex items-center">
                  Description
                  {sortBy === 'description' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="p-3 text-sm font-semibold">Type</th>
              <th className="p-3 text-sm font-semibold text-right cursor-pointer" onClick={() => handleSort('montant')}>
                <div className="flex items-center justify-end">
                  Montant
                  {sortBy === 'montant' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx) => (
              <motion.tr 
                key={tx.id} 
                className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                onClick={() => handleTransactionClick(tx)}
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
                <td className={`p-3 text-sm text-right font-medium ${type === 'revenu' ? 'text-green-400' : 'text-red-400'}`}>
                  {formatMGA(tx.montant)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la transaction</DialogTitle>
            <DialogDescription>
              Consultez les détails et gérez cette transaction.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">ID</p>
                  <p>{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Date</p>
                  <p>{selectedTransaction.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Description</p>
                  <p>{selectedTransaction.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Type</p>
                  <p>{selectedTransaction.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Montant</p>
                  <p className={type === 'revenu' ? 'text-green-400' : 'text-red-400'}>
                    {formatMGA(selectedTransaction.montant)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Statut</p>
                  <p className="text-yellow-400">En attente</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {type === 'depense' && (
                  <Button variant="destructive" onClick={handleReject}>
                    Rejeter
                  </Button>
                )}
                <Button onClick={handleApprove}>
                  {type === 'revenu' ? 'Confirmer' : 'Approuver'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionTable;
