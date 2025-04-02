
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Department } from '@/hooks/useDepartmentsHandlers';

interface DepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (department: Omit<Department, 'id' | 'transactions' | 'balance'>) => void;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Department, 'id' | 'transactions' | 'balance'>>({
    name: '',
    leader: '',
    leaderAvatar: null,
    memberCount: 0,
    budget: 0,
    status: 'active'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'memberCount' || name === 'budget') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData({
      ...formData,
      status: checked ? 'active' : 'inactive'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    
    // Reset form
    setFormData({
      name: '',
      leader: '',
      leaderAvatar: null,
      memberCount: 0,
      budget: 0,
      status: 'active'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Nouveau département</DialogTitle>
          <DialogDescription>
            Créez un nouveau département pour votre église
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du département</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Ministère des jeunes"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leader">Responsable</Label>
              <Input
                id="leader"
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memberCount">Nombre de membres</Label>
              <Input
                id="memberCount"
                name="memberCount"
                type="number"
                value={formData.memberCount || ''}
                onChange={handleChange}
                placeholder="Ex: 15"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Ar)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget || ''}
                onChange={handleChange}
                placeholder="Ex: 20000000"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === 'active'}
                onCheckedChange={handleStatusChange}
              />
              <Label htmlFor="status">Département actif</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer le département</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentModal;
