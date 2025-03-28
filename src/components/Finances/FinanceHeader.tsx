
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, PlusCircle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FinanceHeaderProps {
  onFilterClick: () => void;
  onExportClick: () => void;
  onAddTransactionClick: () => void;
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({ 
  onFilterClick, 
  onExportClick, 
  onAddTransactionClick 
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('revenu');
  const [transactionData, setTransactionData] = useState({
    date: '',
    description: '',
    montant: '',
    type: 'don'
  });

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
    onFilterClick();
  };

  const handleExportOpen = () => {
    setIsExportOpen(true);
    onExportClick();
  };

  const handleAddTransactionOpen = () => {
    setIsAddDialogOpen(true);
    onAddTransactionClick();
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transaction ${transactionData.description} ajoutée avec succès!`);
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

  const exportFormats = [
    { label: 'PDF (.pdf)', value: 'pdf' },
    { label: 'Excel (.xlsx)', value: 'excel' },
    { label: 'CSV (.csv)', value: 'csv' }
  ];

  const handleExport = (format: string) => {
    alert(`Export au format ${format} lancé avec succès!`);
    setIsExportOpen(false);
  };

  const filterOptions = [
    { label: 'Aujourd\'hui', value: 'today' },
    { label: 'Cette semaine', value: 'week' },
    { label: 'Ce mois', value: 'month' },
    { label: 'Cette année', value: 'year' },
    { label: 'Personnalisé', value: 'custom' }
  ];

  const handleApplyFilter = (filter: string) => {
    alert(`Filtre ${filter} appliqué avec succès!`);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Gestion Financière</h1>
        <p className="text-gray-400 mt-1">Suivez, analysez et gérez les finances de votre église</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleFilterOpen}
            >
              <Filter size={16} />
              Filtrer
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-3">
              <h3 className="font-medium">Filtrer par période</h3>
              <div className="space-y-2">
                {filterOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <button 
                      className="w-full text-left p-2 text-sm hover:bg-white/10 rounded"
                      onClick={() => handleApplyFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={isExportOpen} onOpenChange={setIsExportOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExportOpen}
            >
              <Download size={16} />
              Exporter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-3">
              <h3 className="font-medium">Format d'exportation</h3>
              <div className="space-y-2">
                {exportFormats.map(format => (
                  <div key={format.value} className="flex items-center">
                    <button 
                      className="w-full text-left p-2 text-sm hover:bg-white/10 rounded"
                      onClick={() => handleExport(format.value)}
                    >
                      {format.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
          onClick={handleAddTransactionOpen}
        >
          <PlusCircle size={16} />
          Nouvelle transaction
        </Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter une transaction</DialogTitle>
            <DialogDescription>
              Entrez les détails de la nouvelle transaction
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleTransactionSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-md text-center ${
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
                  className={`flex-1 py-2 rounded-md text-center ${
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
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={transactionData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={transactionData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                  placeholder="Entrez une description"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Montant (Ar)</label>
                <input
                  type="number"
                  name="montant"
                  value={transactionData.montant}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                  placeholder="Entrez le montant"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  name="type"
                  value={transactionData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                  required
                >
                  {transactionType === 'revenu' ? (
                    <>
                      <option value="don">Don</option>
                      <option value="dime">Dîme</option>
                      <option value="autre">Autre revenu</option>
                    </>
                  ) : (
                    <>
                      <option value="utilitaire">Utilitaire</option>
                      <option value="equipement">Équipement</option>
                      <option value="salaire">Salaire</option>
                      <option value="autre">Autre dépense</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinanceHeader;
