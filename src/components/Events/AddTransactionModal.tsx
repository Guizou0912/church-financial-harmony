
import React, { useState } from 'react';
import { EventType, EventTransaction } from '@/types/EventTypes';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: EventType | null;
  onAddTransaction: (transaction: Omit<EventTransaction, 'id'>) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  selectedEvent,
  onAddTransaction
}) => {
  const [newTransaction, setNewTransaction] = useState<Omit<EventTransaction, 'id'>>({
    description: '',
    amount: 0,
    type: 'income',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {
    onAddTransaction(newTransaction);
    resetForm();
  };

  const resetForm = () => {
    setNewTransaction({
      description: '',
      amount: 0,
      type: 'income',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Ajouter une transaction pour {selectedEvent?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-center text-base ${
                newTransaction.type === 'income' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setNewTransaction({...newTransaction, type: 'income'})}
            >
              <PlusIcon className="h-4 w-4 inline mr-2" />
              Revenu
            </button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-md text-center text-base ${
                newTransaction.type === 'expense' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setNewTransaction({...newTransaction, type: 'expense'})}
            >
              <MinusIcon className="h-4 w-4 inline mr-2" />
              Dépense
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-base font-medium">Description</label>
            <Input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              className="text-base"
              placeholder="Entrez une description"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-base font-medium">Montant (Ar)</label>
            <Input
              type="number"
              value={newTransaction.amount === 0 ? '' : newTransaction.amount}
              onChange={(e) => setNewTransaction({
                ...newTransaction, 
                amount: e.target.value ? parseFloat(e.target.value) : 0
              })}
              className="text-base"
              placeholder="Entrez le montant"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-base font-medium">Date</label>
            <Input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
              className="text-base"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
