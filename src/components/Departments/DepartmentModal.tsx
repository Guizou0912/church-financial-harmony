
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Department } from '@/hooks/useDepartmentsHandlers';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

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
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const updated = {...prev};
        delete updated[name];
        return updated;
      });
    }
    
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (less than 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'avatar doit faire moins de 2 Mo",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner une image (JPEG, PNG, GIF)",
        variant: "destructive"
      });
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    
    // In a real app, we would upload the file to a server/storage
    // and get back a URL, which we would store in formData.leaderAvatar
    // For now, we'll just store the preview URL as a placeholder
    setFormData({
      ...formData,
      leaderAvatar: previewUrl
    });
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData({
      ...formData,
      status: checked ? 'active' : 'inactive'
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom du département est requis";
    }
    
    if (!formData.leader.trim()) {
      newErrors.leader = "Le nom du responsable est requis";
    }
    
    if (formData.memberCount < 0) {
      newErrors.memberCount = "Le nombre de membres ne peut pas être négatif";
    }
    
    if (formData.budget < 0) {
      newErrors.budget = "Le budget ne peut pas être négatif";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
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
    setAvatarPreview(null);
    setErrors({});
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      leader: '',
      leaderAvatar: null,
      memberCount: 0,
      budget: 0,
      status: 'active'
    });
    setAvatarPreview(null);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
                className={errors.name ? "border-red-500" : ""}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leader">Responsable</Label>
              <Input
                id="leader"
                name="leader"
                value={formData.leader}
                onChange={handleChange}
                placeholder="Ex: Jean Dupont"
                className={errors.leader ? "border-red-500" : ""}
                required
              />
              {errors.leader && (
                <p className="text-red-500 text-xs mt-1">{errors.leader}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Avatar du responsable</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white/20">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <AvatarFallback className="bg-white/10">
                      <User className="h-8 w-8 text-gray-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 py-2 px-3 bg-white/5 hover:bg-white/10 rounded-md transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Télécharger une image</span>
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG ou GIF. Max 2MB.
                  </p>
                </div>
              </div>
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
                className={errors.memberCount ? "border-red-500" : ""}
                required
              />
              {errors.memberCount && (
                <p className="text-red-500 text-xs mt-1">{errors.memberCount}</p>
              )}
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
                className={errors.budget ? "border-red-500" : ""}
                required
              />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
              )}
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
            <Button variant="outline" type="button" onClick={handleClose}>
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
