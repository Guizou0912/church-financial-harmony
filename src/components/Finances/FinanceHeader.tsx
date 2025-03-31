
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, PlusCircle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import TransactionFilter, { TransactionFilters } from './TransactionFilter';
import FinancialReportGenerator, { ReportOptions } from './FinancialReportGenerator';

interface FinanceHeaderProps {
  onFilterClick: () => void;
  onExportClick: () => void;
  onAddTransactionClick: () => void;
  onApplyFilter?: (filters: TransactionFilters) => void;
  onGenerateReport?: (options: ReportOptions) => void;
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({ 
  onFilterClick, 
  onExportClick, 
  onAddTransactionClick,
  onApplyFilter = () => {},
  onGenerateReport = () => {}
}) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('revenu');
  const [transactionData, setTransactionData] = useState({
    date: '',
    description: '',
    montant: '',
    type: 'don'
  });

  const handleAddTransactionOpen = () => {
    setIsAddDialogOpen(true);
    onAddTransactionClick();
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction ajoutée",
      description: `La transaction "${transactionData.description}" a été ajoutée avec succès.`
    });
    setIsAddDialogOpen(false);
    setTransactionData({
      date: '',
      description: '',
      montant: '',
      type: 'don'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransactionData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Gestion Financière</h1>
        <p className="text-gray-400 mt-1">Suivez, analysez et gérez les finances de votre église</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <TransactionFilter onApplyFilter={onApplyFilter} />
        
        <FinancialReportGenerator onGenerateReport={onGenerateReport} />

        <Button 
          className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2 text-base font-medium"
          onClick={handleAddTransactionOpen}
        >
          <PlusCircle className="h-5 w-5" />
          Nouvelle transaction
        </Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Ajouter une transaction</DialogTitle>
            <DialogDescription>
              Entrez les détails de la nouvelle transaction
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleTransactionSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className={`flex-1 py-3 rounded-md text-center text-base ${
                    transactionType === 'revenu' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setTransactionType('revenu')}
                >
                  Revenu
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 rounded-md text-center text-base ${
                    transactionType === 'depense' 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setTransactionType('depense')}
                >
                  Dépense
                </button>
              </div>
              
              <div className="space-y-2">
                <label className="text-base font-medium">Date</label>
                <Input
                  type="date"
                  name="date"
                  value={transactionData.date}
                  onChange={handleInputChange}
                  className="text-base"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-base font-medium">Description</label>
                <Input
                  type="text"
                  name="description"
                  value={transactionData.description}
                  onChange={handleInputChange}
                  className="text-base"
                  placeholder="Entrez une description"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-base font-medium">Montant (Ar)</label>
                <Input
                  type="number"
                  name="montant"
                  value={transactionData.montant}
                  onChange={handleInputChange}
                  className="text-base"
                  placeholder="Entrez le montant"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-base font-medium">Type</label>
                <select
                  name="type"
                  value={transactionData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border bg-white/5 text-base"
                  required
                >
                  {transactionType === 'revenu' ? (
                    <>
                      <option value="don">Don</option>
                      <option value="dime">Dîme</option>
                      <option value="contribution">Contribution</option>
                      <option value="autre">Autre revenu</option>
                    </>
                  ) : (
                    <>
                      <option value="utilitaire">Utilitaire</option>
                      <option value="equipement">Équipement</option>
                      <option value="salaire">Salaire</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="autre">Autre dépense</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="text-base">
                Annuler
              </Button>
              <Button type="submit" className="text-base">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinanceHeader;
