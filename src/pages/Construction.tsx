
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/Layout/PageLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMGA } from '@/lib/utils';
import { Building, Calendar, CreditCard, FileText, Plus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for projects and expenses
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Planifié' | 'En cours' | 'Terminé' | 'En pause';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  manager: string;
  lastUpdate: string;
}

interface Expense {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  supplier: string;
  approved: boolean;
}

// Sample data
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Rénovation du toit',
    description: 'Remplacement complet du toit et isolation thermique',
    status: 'En cours',
    budget: 45000000,
    spent: 30000000,
    startDate: '2023-06-15',
    endDate: '2023-12-20',
    manager: 'Jean Rakoto',
    lastUpdate: '2023-10-05'
  },
  {
    id: '2',
    name: 'Installation système sonore',
    description: 'Mise à niveau complète du système audio de la salle principale',
    status: 'Terminé',
    budget: 20000000,
    spent: 19500000,
    startDate: '2023-04-10',
    endDate: '2023-05-30',
    manager: 'Marie Rasoa',
    lastUpdate: '2023-05-30'
  },
  {
    id: '3',
    name: 'Extension aile est',
    description: 'Construction de 3 nouvelles salles pour les activités jeunesse',
    status: 'Planifié',
    budget: 80000000,
    spent: 0,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    manager: 'Paul Rabe',
    lastUpdate: '2023-09-20'
  },
  {
    id: '4',
    name: 'Rénovation sanitaires',
    description: 'Mise aux normes et modernisation des toilettes',
    status: 'En pause',
    budget: 15000000,
    spent: 8000000,
    startDate: '2023-07-01',
    endDate: '2023-08-30',
    manager: 'Sylvie Randria',
    lastUpdate: '2023-08-10'
  }
];

const initialExpenses: Expense[] = [
  {
    id: '1',
    projectId: '1',
    description: 'Matériaux toiture',
    amount: 15000000,
    date: '2023-06-20',
    category: 'Matériaux',
    supplier: 'Bâtiment Pro',
    approved: true
  },
  {
    id: '2',
    projectId: '1',
    description: 'Main d\'œuvre semaine 1-2',
    amount: 8000000,
    date: '2023-07-05',
    category: 'Main d\'œuvre',
    supplier: 'Équipe Rakoto',
    approved: true
  },
  {
    id: '3',
    projectId: '1',
    description: 'Isolation',
    amount: 7000000,
    date: '2023-07-15',
    category: 'Matériaux',
    supplier: 'Iso Plus',
    approved: true
  },
  {
    id: '4',
    projectId: '2',
    description: 'Amplis et haut-parleurs',
    amount: 12000000,
    date: '2023-04-15',
    category: 'Équipement',
    supplier: 'Sound Master',
    approved: true
  },
  {
    id: '5',
    projectId: '2',
    description: 'Câblage et installation',
    amount: 7500000,
    date: '2023-05-10',
    category: 'Main d\'œuvre',
    supplier: 'Tech Audio',
    approved: true
  },
  {
    id: '6',
    projectId: '4',
    description: 'Sanitaires et robinetterie',
    amount: 5000000,
    date: '2023-07-10',
    category: 'Équipement',
    supplier: 'Plomberie Plus',
    approved: true
  },
  {
    id: '7',
    projectId: '4',
    description: 'Travaux de plomberie',
    amount: 3000000,
    date: '2023-07-25',
    category: 'Main d\'œuvre',
    supplier: 'Artisans Réunis',
    approved: true
  }
];

// Status options for filter
const statusOptions = ['Tous', 'Planifié', 'En cours', 'Terminé', 'En pause'];

// Category options for expenses
const expenseCategories = [
  'Matériaux',
  'Main d\'œuvre',
  'Équipement',
  'Consultation',
  'Permis et licences',
  'Transport',
  'Autre'
];

const Construction = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [activeTab, setActiveTab] = useState('projects');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'spent' | 'lastUpdate'>>({
    name: '',
    description: '',
    status: 'Planifié',
    budget: 0,
    startDate: '',
    endDate: '',
    manager: '',
  });
  
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id' | 'approved'>>({
    projectId: '',
    description: '',
    amount: 0,
    date: '',
    category: '',
    supplier: '',
  });

  // Filter projects based on status
  const filteredProjects = statusFilter === 'Tous' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);

  // Get expenses for a specific project
  const getProjectExpenses = (projectId: string) => {
    return expenses.filter(expense => expense.projectId === projectId);
  };

  // Calculate total approved expenses for a project
  const calculateProjectExpenses = (projectId: string) => {
    return getProjectExpenses(projectId)
      .filter(expense => expense.approved)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Calculate progress percentage
  const calculateProgress = (spent: number, budget: number) => {
    if (budget === 0) return 0;
    const percentage = (spent / budget) * 100;
    return Math.min(100, percentage);
  };

  // Handle adding a new project
  const handleAddProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.budget) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newId = (projects.length + 1).toString();
    
    const projectToAdd: Project = {
      ...newProject,
      id: newId,
      spent: 0,
      lastUpdate: today
    };
    
    setProjects([...projects, projectToAdd]);
    setIsAddProjectOpen(false);
    
    // Reset form
    setNewProject({
      name: '',
      description: '',
      status: 'Planifié',
      budget: 0,
      startDate: '',
      endDate: '',
      manager: '',
    });
    
    toast({
      title: "Projet ajouté",
      description: `Le projet "${newProject.name}" a été créé avec succès.`,
    });
  };

  // Handle adding a new expense
  const handleAddExpense = () => {
    if (!newExpense.projectId || !newExpense.description || !newExpense.amount || !newExpense.date || !newExpense.category) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const newId = (expenses.length + 1).toString();
    
    const expenseToAdd: Expense = {
      ...newExpense,
      id: newId,
      approved: false,
    };
    
    setExpenses([...expenses, expenseToAdd]);
    
    // Update project spent amount for approved expenses
    // (This one isn't approved yet, so we don't update project spent)
    
    setIsAddExpenseOpen(false);
    
    // Reset form
    setNewExpense({
      projectId: '',
      description: '',
      amount: 0,
      date: '',
      category: '',
      supplier: '',
    });
    
    toast({
      title: "Dépense ajoutée",
      description: `La dépense a été ajoutée au projet et attend approbation.`,
    });
  };

  // Handle approving an expense
  const handleApproveExpense = (expenseId: string) => {
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === expenseId) {
        return {...expense, approved: true};
      }
      return expense;
    });
    
    setExpenses(updatedExpenses);
    
    // Update the project's spent amount
    const approvedExpense = expenses.find(e => e.id === expenseId);
    if (approvedExpense) {
      const updatedProjects = projects.map(project => {
        if (project.id === approvedExpense.projectId) {
          return {
            ...project,
            spent: project.spent + approvedExpense.amount,
            lastUpdate: new Date().toISOString().split('T')[0]
          };
        }
        return project;
      });
      
      setProjects(updatedProjects);
    }
    
    toast({
      title: "Dépense approuvée",
      description: "La dépense a été approuvée et ajoutée au total du projet.",
    });
  };

  // Open project details modal
  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsViewDetailsOpen(true);
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
            <h1 className="text-3xl font-bold gradient-text">Construction & Rénovation</h1>
            <p className="text-gray-400 mt-1">Gérez les projets de construction et de rénovation de l'église</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Export en cours",
                  description: "Le rapport des projets est en cours d'exportation.",
                });
              }}
            >
              <FileText className="h-4 w-4" />
              Exporter rapport
            </Button>
            
            {activeTab === 'projects' ? (
              <Button 
                className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
                onClick={() => setIsAddProjectOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Nouveau projet
              </Button>
            ) : (
              <Button 
                className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
                onClick={() => setIsAddExpenseOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Nouvelle dépense
              </Button>
            )}
          </div>
        </div>
        
        <div className="glass-card p-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Projets
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Dépenses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="pt-6">
              <div className="flex justify-end mb-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projet</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Dépensé</TableHead>
                    <TableHead>Progrès</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                        Aucun projet trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProjects.map((project) => (
                      <TableRow key={project.id} className="transition-colors hover:bg-white/5">
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-xs text-gray-400">
                              <Calendar className="inline-block h-3 w-3 mr-1" />
                              {project.startDate} - {project.endDate || 'Non défini'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            project.status === 'En cours' 
                              ? 'bg-blue-100/10 text-blue-500' 
                              : project.status === 'Terminé'
                                ? 'bg-green-100/10 text-green-500'
                                : project.status === 'En pause'
                                  ? 'bg-yellow-100/10 text-yellow-500'
                                  : 'bg-purple-100/10 text-purple-500'
                          }`}>
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatMGA(project.budget)}</TableCell>
                        <TableCell>{formatMGA(project.spent)}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-church-cyan to-church-purple h-2.5 rounded-full" 
                              style={{ width: `${calculateProgress(project.spent, project.budget)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs mt-1 text-gray-400">
                            {calculateProgress(project.spent, project.budget).toFixed(0)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-gray-400" />
                            <span>{project.manager}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(project)}
                          >
                            Détails
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="expenses" className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projet</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-gray-400">
                        Aucune dépense trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenses.map((expense) => {
                      const project = projects.find(p => p.id === expense.projectId);
                      return (
                        <TableRow key={expense.id} className="transition-colors hover:bg-white/5">
                          <TableCell>{project?.name || 'Projet inconnu'}</TableCell>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell>{formatMGA(expense.amount)}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.supplier}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              expense.approved 
                                ? 'bg-green-100/10 text-green-500' 
                                : 'bg-yellow-100/10 text-yellow-500'
                            }`}>
                              {expense.approved ? 'Approuvé' : 'En attente'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {!expense.approved && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleApproveExpense(expense.id)}
                              >
                                Approuver
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* Add Project Dialog */}
      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Nouveau projet</DialogTitle>
            <DialogDescription>
              Créez un nouveau projet de construction ou de rénovation
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du projet</Label>
              <Input
                id="name"
                placeholder="Ex: Rénovation du toit"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description du projet"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={newProject.status} 
                onValueChange={(value: 'Planifié' | 'En cours' | 'Terminé' | 'En pause') => 
                  setNewProject({...newProject, status: value})
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="En pause">En pause</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Ar)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Ex: 50000000"
                value={newProject.budget || ''}
                onChange={(e) => setNewProject({...newProject, budget: Number(e.target.value)})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin prévue</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manager">Responsable</Label>
              <Input
                id="manager"
                placeholder="Nom du responsable"
                value={newProject.manager}
                onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddProject}>Créer le projet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Nouvelle dépense</DialogTitle>
            <DialogDescription>
              Ajoutez une dépense pour un projet
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="projectId">Projet</Label>
              <Select 
                value={newExpense.projectId} 
                onValueChange={(value) => setNewExpense({...newExpense, projectId: value})}
              >
                <SelectTrigger id="projectId">
                  <SelectValue placeholder="Sélectionner un projet" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Ex: Achat de matériaux"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (Ar)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Ex: 5000000"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select 
                value={newExpense.category} 
                onValueChange={(value) => setNewExpense({...newExpense, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Fournisseur</Label>
              <Input
                id="supplier"
                placeholder="Nom du fournisseur"
                value={newExpense.supplier}
                onChange={(e) => setNewExpense({...newExpense, supplier: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddExpense}>Ajouter la dépense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Project Details Dialog */}
      {selectedProject && (
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedProject.name}</DialogTitle>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-gray-400 text-sm">Statut</div>
                  <div className="font-medium">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedProject.status === 'En cours' 
                        ? 'bg-blue-100/10 text-blue-500' 
                        : selectedProject.status === 'Terminé'
                          ? 'bg-green-100/10 text-green-500'
                          : selectedProject.status === 'En pause'
                            ? 'bg-yellow-100/10 text-yellow-500'
                            : 'bg-purple-100/10 text-purple-500'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Responsable</div>
                  <div className="font-medium">{selectedProject.manager}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Budget</div>
                  <div className="font-medium">{formatMGA(selectedProject.budget)}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Dépensé</div>
                  <div className="font-medium">{formatMGA(selectedProject.spent)}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Date de début</div>
                  <div className="font-medium">{selectedProject.startDate}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm">Date de fin prévue</div>
                  <div className="font-medium">{selectedProject.endDate || 'Non défini'}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-2">Progrès</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-church-cyan to-church-purple h-2.5 rounded-full" 
                    style={{ width: `${calculateProgress(selectedProject.spent, selectedProject.budget)}%` }}
                  ></div>
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  {calculateProgress(selectedProject.spent, selectedProject.budget).toFixed(0)}% ({formatMGA(selectedProject.spent)} sur {formatMGA(selectedProject.budget)})
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3">Dépenses du projet</h4>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getProjectExpenses(selectedProject.id).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-400">
                          Aucune dépense pour ce projet
                        </TableCell>
                      </TableRow>
                    ) : (
                      getProjectExpenses(selectedProject.id).map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell>{formatMGA(expense.amount)}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              expense.approved 
                                ? 'bg-green-100/10 text-green-500' 
                                : 'bg-yellow-100/10 text-yellow-500'
                            }`}>
                              {expense.approved ? 'Approuvé' : 'En attente'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
                Fermer
              </Button>
              <Button 
                onClick={() => {
                  setIsAddExpenseOpen(true);
                  setIsViewDetailsOpen(false);
                  setNewExpense({...newExpense, projectId: selectedProject.id});
                }}
              >
                Ajouter une dépense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </PageLayout>
  );
};

export default Construction;
