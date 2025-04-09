
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FinanceHeaderProps {
  onFilterClick: () => void;
  onExportClick: () => void;
  onAddTransactionClick: (newTransaction?: any) => void;  // Updated to accept an optional parameter
  onApplyFilter?: (filters: TransactionFilters) => void;
  onGenerateReport?: (options: ReportOptions) => void;
}

// Liste des départements pour la sélection
const departments = [
  { id: '1', name: 'Ministère du Culte' },
  { id: '2', name: 'Programmes Jeunesse' },
  { id: '3', name: 'Missions & Sensibilisation' },
  { id: '4', name: 'Administration' },
  { id: '5', name: 'Maintenance Bâtiment' },
  { id: '6', name: 'Médias et Communication' },
];

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
    type: 'don',
    fromDepartment: '',
    toDepartment: ''
  });

  const handleAddTransactionOpen = () => {
    setIsAddDialogOpen(true);
    onAddTransactionClick();
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation seulement pour le département source
    if (transactionType === 'depense' && !transactionData.fromDepartment) {
      toast({
        title: "Département manquant",
        description: "Veuillez sélectionner le département qui effectue la dépense.",
        variant: "destructive"
      });
      return;
    }
    
    // Le département bénéficiaire n'est plus obligatoire
    
    toast({
      title: "Transaction ajoutée",
      description: `La transaction "${transactionData.description}" a été ajoutée avec succès.`
    });
    setIsAddDialogOpen(false);
    setTransactionData({
      date: '',
      description: '',
      montant: '',
      type: 'don',
      fromDepartment: '',
      toDepartment: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransactionData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
              
              {transactionType === 'depense' && (
                <>
                  <div className="space-y-2">
                    <label className="text-base font-medium">Département source</label>
                    <Select
                      value={transactionData.fromDepartment}
                      onValueChange={(value) => handleSelectChange('fromDepartment', value)}
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Sélectionner le département qui paie" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-base font-medium">Département bénéficiaire <span className="text-gray-400 text-sm">(optionnel)</span></label>
                    <Select
                      value={transactionData.toDepartment}
                      onValueChange={(value) => handleSelectChange('toDepartment', value)}
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Sélectionner le département qui reçoit (optionnel)" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <label className="text-base font-medium">Type</label>
                <Select
                  value={transactionData.type}
                  onValueChange={(value) => handleSelectChange('type', value)}
                >
                  <SelectTrigger className="w-full text-base">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType === 'revenu' ? (
                      <>
                        <SelectItem value="don">Don</SelectItem>
                        <SelectItem value="dime">Dîme</SelectItem>
                        <SelectItem value="contribution">Contribution</SelectItem>
                        <SelectItem value="autre">Autre revenu</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="utilitaire">Utilitaire</SelectItem>
                        <SelectItem value="equipement">Équipement</SelectItem>
                        <SelectItem value="salaire">Salaire</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="autre">Autre dépense</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
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
