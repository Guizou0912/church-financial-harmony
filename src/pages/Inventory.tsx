
import React, { useState, useEffect } from 'react';
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
import { Package, Plus, Search, FileText, AlertTriangle, Trash2, Edit, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

// Sample data for inventory items
const initialItems = [
  { id: '1', name: 'Chaises', category: 'Mobilier', quantity: 200, location: 'Salle principale', status: 'En stock', lastUpdate: '2023-07-10', notes: 'Chaises pliantes en bon état' },
  { id: '2', name: 'Tables', category: 'Mobilier', quantity: 30, location: 'Salle annexe', status: 'En stock', lastUpdate: '2023-07-15', notes: 'Tables rectangulaires' },
  { id: '3', name: 'Micros HF', category: 'Équipement audio', quantity: 5, location: 'Local technique', status: 'En stock', lastUpdate: '2023-08-05', notes: 'Micros sans fil Shure' },
  { id: '4', name: 'Bibles', category: 'Livres', quantity: 100, location: 'Bibliothèque', status: 'En stock', lastUpdate: '2023-06-22', notes: 'Bibles en français' },
  { id: '5', name: 'Projecteurs', category: 'Équipement vidéo', quantity: 3, location: 'Salle principale', status: 'En stock', lastUpdate: '2023-09-01', notes: 'Projecteurs HD' },
  { id: '6', name: 'Instruments de musique', category: 'Équipement musical', quantity: 8, location: 'Estrade', status: 'En stock', lastUpdate: '2023-08-12', notes: 'Guitares, piano, batterie' },
  { id: '7', name: 'Tasses', category: 'Ustensiles', quantity: 8, location: 'Cuisine', status: 'En stock', lastUpdate: '2023-07-20', notes: 'Stock faible' },
  { id: '8', name: 'Nappes', category: 'Textile', quantity: 20, location: 'Réserve', status: 'En stock', lastUpdate: '2023-08-15', notes: 'Nappes blanches' },
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
  notes?: string;
}

const Inventory = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLowStockDialogOpen, setIsLowStockDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'lastUpdate'>>({
    name: '',
    category: '',
    quantity: 1,
    location: '',
    status: 'En stock',
    notes: ''
  });

  useEffect(() => {
    // Load items from localStorage if available
    const savedItems = localStorage.getItem('inventoryItems');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Error loading inventory from localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever items change
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  // Filter items based on search query and active tab
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
      status: 'En stock',
      notes: ''
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

  const handleEditItem = () => {
    if (!selectedItem) return;

    if (!selectedItem.name || !selectedItem.category || !selectedItem.location) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...selectedItem,
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));

    setIsEditDialogOpen(false);
    setSelectedItem(null);

    toast({
      title: "Élément modifié",
      description: `${selectedItem.name} a été mis à jour.`,
    });
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;

    setItems(items.filter(item => item.id !== selectedItem.id));
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);

    toast({
      title: "Élément supprimé",
      description: `${selectedItem.name} a été supprimé de l'inventaire.`,
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ["ID", "Nom", "Catégorie", "Quantité", "Emplacement", "État", "Dernière mise à jour", "Notes"],
      ...items.map(item => [
        item.id,
        item.name,
        item.category,
        item.quantity.toString(),
        item.location,
        item.status,
        item.lastUpdate,
        item.notes || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventaire_eglise_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export réussi",
      description: "L'inventaire a été exporté au format CSV.",
    });
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
              onClick={exportToCSV}
            >
              <Download className="h-4 w-4" />
              Exporter CSV
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                placeholder="Informations supplémentaires..."
                value={newItem.notes || ''}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
              />
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
      
      {/* Dialog for editing inventory item */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Modifier un élément</DialogTitle>
            <DialogDescription>
              Modifiez les informations de cet élément
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom de l'élément</Label>
                <Input
                  id="edit-name"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Catégorie</Label>
                <Select 
                  value={selectedItem.category} 
                  onValueChange={(value) => setSelectedItem({...selectedItem, category: value})}
                >
                  <SelectTrigger id="edit-category">
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
                <Label htmlFor="edit-quantity">Quantité</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="0"
                  value={selectedItem.quantity}
                  onChange={(e) => setSelectedItem({...selectedItem, quantity: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Emplacement</Label>
                <Select 
                  value={selectedItem.location} 
                  onValueChange={(value) => setSelectedItem({...selectedItem, location: value})}
                >
                  <SelectTrigger id="edit-location">
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

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes (optionnel)</Label>
                <Textarea
                  id="edit-notes"
                  placeholder="Informations supplémentaires..."
                  value={selectedItem.notes || ''}
                  onChange={(e) => setSelectedItem({...selectedItem, notes: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditItem}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for deleting inventory item */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer un élément</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="py-4">
              <p>
                Vous êtes sur le point de supprimer <strong>{selectedItem.name}</strong> de l'inventaire.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>Supprimer définitivement</Button>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-yellow-500">{item.quantity}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          handleUpdateQuantity(item.id, 10);
                          toast({
                            title: "Stock mis à jour",
                            description: `10 unités de ${item.name} ont été ajoutées.`,
                          });
                        }}
                      >
                        Réapprovisionner
                      </Button>
                    </TableCell>
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
