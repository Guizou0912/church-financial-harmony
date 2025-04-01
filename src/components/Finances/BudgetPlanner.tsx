
import React, { useState } from 'react';
import { Wallet, Plus, Minus, Save, Calculator } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatMGA } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetItem {
  id: string;
  name: string;
  allocated: number;
  used: number;
  category: string;
}

interface BudgetPlannerProps {
  onSaveBudget: (items: BudgetItem[]) => void;
  existingBudget?: BudgetItem[];
}

const defaultBudget: BudgetItem[] = [
  { id: '1', name: 'Ministère du Culte', allocated: 30000000, used: 25000000, category: 'operations' },
  { id: '2', name: 'Programmes Jeunesse', allocated: 25000000, used: 18000000, category: 'programs' },
  { id: '3', name: 'Missions & Sensibilisation', allocated: 32000000, used: 30000000, category: 'outreach' },
  { id: '4', name: 'Administration', allocated: 18000000, used: 15000000, category: 'admin' },
];

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({ onSaveBudget, existingBudget = defaultBudget }) => {
  const { toast } = useToast();
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(existingBudget);
  const [newItem, setNewItem] = useState({
    name: '',
    allocated: '',
    category: 'operations'
  });

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = budgetItems.reduce((sum, item) => sum + item.used, 0);
  
  const handleSaveBudget = () => {
    onSaveBudget(budgetItems);
    toast({
      title: "Budget mis à jour",
      description: "Les modifications du budget ont été enregistrées avec succès."
    });
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.allocated) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive"
      });
      return;
    }

    const allocated = Number(newItem.allocated);
    if (isNaN(allocated) || allocated <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive"
      });
      return;
    }

    const newBudgetItem: BudgetItem = {
      id: Date.now().toString(),
      name: newItem.name,
      allocated: allocated,
      used: 0,
      category: newItem.category
    };

    setBudgetItems([...budgetItems, newBudgetItem]);
    setNewItem({ name: '', allocated: '', category: 'operations' });
    
    toast({
      title: "Poste budgétaire ajouté",
      description: `"${newItem.name}" a été ajouté au budget.`
    });
  };

  const handleRemoveItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
    toast({
      title: "Poste budgétaire supprimé",
      description: "Le poste budgétaire a été supprimé avec succès."
    });
  };

  const handleUpdateAllocation = (id: string, value: string) => {
    const amount = Number(value);
    if (isNaN(amount) || amount < 0) return;

    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, allocated: amount } : item
    ));
  };

  const categories = [
    { value: 'operations', label: 'Opérations courantes' },
    { value: 'programs', label: 'Programmes' },
    { value: 'outreach', label: 'Sensibilisation' },
    { value: 'admin', label: 'Administration' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'events', label: 'Événements' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Budget total</h3>
          <span className="text-lg font-semibold">{formatMGA(totalAllocated)}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-400">Utilisé</h3>
          <span className="text-sm text-gray-400">{formatMGA(totalUsed)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 my-3">
          <div 
            className="bg-gradient-to-r from-church-cyan to-blue-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min(100, (totalUsed / totalAllocated) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-400">Restant</h3>
          <span className="text-sm text-gray-400">{formatMGA(totalAllocated - totalUsed)}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Postes budgétaires</h3>
        <div className="space-y-4">
          {budgetItems.map(item => (
            <div key={item.id} className="flex flex-col space-y-2 p-3 border border-white/10 rounded-lg">
              <div className="flex justify-between">
                <h4 className="font-medium">{item.name}</h4>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Minus size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Allocation:</span>
                <Input
                  type="number"
                  value={item.allocated}
                  onChange={(e) => handleUpdateAllocation(item.id, e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Utilisé: {formatMGA(item.used)}</span>
                <span className="text-gray-400">
                  {Math.round((item.used / item.allocated) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    item.category === 'operations' ? 'bg-church-cyan' :
                    item.category === 'programs' ? 'bg-church-purple' :
                    item.category === 'outreach' ? 'bg-green-500' :
                    item.category === 'admin' ? 'bg-blue-500' :
                    item.category === 'maintenance' ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(100, (item.used / item.allocated) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-4">
        <h3 className="text-lg font-medium mb-3">Ajouter un poste budgétaire</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="new-item-name">Nom</Label>
            <Input
              id="new-item-name"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              placeholder="Ex: Missions communautaires"
              className="text-base"
            />
          </div>
          <div>
            <Label htmlFor="new-item-amount">Montant alloué</Label>
            <Input
              id="new-item-amount"
              type="number"
              value={newItem.allocated}
              onChange={(e) => setNewItem({...newItem, allocated: e.target.value})}
              placeholder="Montant en Ar"
              className="text-base"
            />
          </div>
          <div>
            <Label htmlFor="new-item-category">Catégorie</Label>
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem({...newItem, category: value})}
            >
              <SelectTrigger id="new-item-category" className="text-base">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="button" 
            onClick={handleAddItem}
            className="w-full mt-2 text-base"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter au budget
          </Button>
        </div>
      </div>
      
      <Button 
        onClick={handleSaveBudget} 
        className="w-full text-base"
      >
        <Save className="mr-2 h-4 w-4" />
        Enregistrer les modifications
      </Button>
    </div>
  );
};

export default BudgetPlanner;
