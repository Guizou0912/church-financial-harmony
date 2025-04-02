
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/Layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Package, Plus, Search, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for inventory items
const initialItems = [
  { id: '1', name: 'Chaises', category: 'Mobilier', quantity: 200, location: 'Salle principale', status: 'En stock', lastUpdate: '2023-07-10' },
  { id: '2', name: 'Tables', category: 'Mobilier', quantity: 30, location: 'Salle annexe', status: 'En stock', lastUpdate: '2023-07-15' },
  { id: '3', name: 'Micros HF', category: 'Équipement audio', quantity: 5, location: 'Local technique', status: 'En stock', lastUpdate: '2023-08-05' },
  { id: '4', name: 'Bibles', category: 'Livres', quantity: 100, location: 'Bibliothèque', status: 'En stock', lastUpdate: '2023-06-22' },
  { id: '5', name: 'Projecteurs', category: 'Équipement vidéo', quantity: 3, location: 'Salle principale', status: 'En stock', lastUpdate: '2023-09-01' },
  { id: '6', name: 'Instruments de musique', category: 'Équipement musical', quantity: 8, location: 'Estrade', status: 'En stock', lastUpdate: '2023-08-12' },
  { id: '7', name: 'Tasses', category: 'Ustensiles', quantity: 80, location: 'Cuisine', status: 'En stock', lastUpdate: '2023-07-20' },
  { id: '8', name: 'Nappes', category: 'Textile', quantity: 20, location: 'Réserve', status: 'En stock', lastUpdate: '2023-08-15' },
];

// Categories for selection
const categories = [
  'Mobilier', 
  'Équipement audio', 
  'Équipement vidéo', 
  'Équipement musical',
  'Livres', 
  'Ustensiles', 
  'Textile', 
  'Matériel de bureau',
  'Autre'
];

// Locations for selection
const locations = [
  'Salle principale',
  'Salle annexe',
  'Local technique',
  'Bibliothèque',
  'Estrade',
  'Cuisine',
  'Réserve',
  'Bureau administratif',
  'Autre'
];

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  status: string;
  lastUpdate: string;
}

const Inventory = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLowStockDialogOpen, setIsLowStockDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'lastUpdate'>>({
    name: '',
    category: '',
    quantity: 1,
    location: '',
    status: 'En stock'
  });

  // Filter items based on search query and active tab
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'lowStock') return matchesSearch && item.quantity < 10;
    
    return matchesSearch && item.category.toLowerCase() === activeTab.toLowerCase();
  });

  // Low stock items for alert
  const lowStockItems = items.filter(item => item.quantity < 10);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.location) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newId = (items.length + 1).toString();
    
    setItems([
      ...items, 
      { 
        ...newItem, 
        id: newId, 
        lastUpdate: today 
      }
    ]);
    
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      category: '',
      quantity: 1,
      location: '',
      status: 'En stock'
    });
    
    toast({
      title: "Élément ajouté",
      description: `${newItem.name} a été ajouté à l'inventaire.`,
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
          status: newQuantity === 0 ? 'Rupture de stock' : 'En stock',
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Gestion de l'Inventaire</h1>
            <p className="text-gray-400 mt-1">Suivez et gérez tous les biens et équipements de l'église</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {lowStockItems.length > 0 && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsLowStockDialogOpen(true)}
              >
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                {lowStockItems.length} articles en stock faible
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Export en cours",
                  description: "L'inventaire est en cours d'exportation.",
                });
              }}
            >
              <FileText className="h-4 w-4" />
              Exporter
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Ajouter un élément
            </Button>
          </div>
        </div>
        
        <div className="glass-card p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher dans l'inventaire..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="lowStock">Stock faible</TabsTrigger>
                <TabsTrigger value="mobilier">Mobilier</TabsTrigger>
                <TabsTrigger value="équipement">Équipement</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Dernière mise à jour</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                      Aucun élément trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} className="transition-colors hover:bg-white/5">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className={item.quantity < 10 ? "text-yellow-500" : ""}>
                        {item.quantity}
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          item.status === 'En stock' 
                            ? 'bg-green-100/10 text-green-500' 
                            : 'bg-red-100/10 text-red-500'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            disabled={item.quantity === 0}
                          >
                            -
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>

      {/* Dialog for adding new inventory item */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Ajouter un nouvel élément</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel élément à l'inventaire de l'église
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'élément</Label>
              <Input
                id="name"
                placeholder="Ex: Chaises pliantes"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select 
                value={newItem.category} 
                onValueChange={(value) => setNewItem({...newItem, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Select 
                value={newItem.location} 
                onValueChange={(value) => setNewItem({...newItem, location: value})}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Sélectionner un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddItem}>Ajouter à l'inventaire</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for low stock items */}
      <Dialog open={isLowStockDialogOpen} onOpenChange={setIsLowStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Éléments en stock faible
            </DialogTitle>
            <DialogDescription>
              Ces éléments nécessitent votre attention
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-yellow-500">{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsLowStockDialogOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Inventory;
