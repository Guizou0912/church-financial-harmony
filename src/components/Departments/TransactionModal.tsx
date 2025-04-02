
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from '@/hooks/useDepartmentsHandlers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  departmentId: number;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ open, onClose, onSave, departmentId }) => {
  const [transaction, setTransaction] = useState<Omit<Transaction, 'id'>>({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    type: 'income'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setTransaction({
        ...transaction,
        [name]: Number(value)
      });
    } else {
      setTransaction({
        ...transaction,
        [name]: value
      });
    }
  };

  const handleTypeChange = (value: string) => {
    setTransaction({
      ...transaction,
      type: value as 'income' | 'expense'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(transaction);
    
    // Reset form
    setTransaction({
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      type: 'income'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Nouvelle transaction</DialogTitle>
          <DialogDescription>
            Enregistrez une entrée ou sortie d'argent pour ce département
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de transaction</Label>
              <Select
                value={transaction.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Entrée d'argent</SelectItem>
                  <SelectItem value="expense">Sortie d'argent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={transaction.description}
                onChange={handleChange}
                placeholder="Ex: Don pour instruments"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (Ar)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={transaction.amount || ''}
                onChange={handleChange}
                placeholder="Ex: 500000"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={transaction.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className={transaction.type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {transaction.type === 'income' ? 'Ajouter entrée' : 'Ajouter sortie'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
