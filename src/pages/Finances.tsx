
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  Download, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  ShoppingCart,
  Search,
  FileText,
  CalendarRange,
  ArrowDown,
  ArrowUp,
  Filter,
  Bell
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PageLayout from '@/components/Layout/PageLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';
import { formatMGA } from '@/lib/utils';

const Finances = () => {
  const [activeTab, setActiveTab] = useState('revenus');
  const { toast } = useToast();

  // Données exemple pour les graphiques
  const revenueData = [
    { name: 'Jan', value: 12000000 },
    { name: 'Fév', value: 19000000 },
    { name: 'Mar', value: 15000000 },
    { name: 'Avr', value: 22000000 },
    { name: 'Mai', value: 25000000 },
    { name: 'Juin', value: 28000000 },
    { name: 'Juil', value: 30000000 },
  ];

  const depenseData = [
    { name: 'Jan', value: 9000000 },
    { name: 'Fév', value: 14000000 },
    { name: 'Mar', value: 12000000 },
    { name: 'Avr', value: 18000000 },
    { name: 'Mai', value: 20000000 },
    { name: 'Juin', value: 22000000 },
    { name: 'Juil', value: 26000000 },
  ];

  const depenseParCategorieData = [
    { name: 'Services', value: 35 },
    { name: 'Personnel', value: 25 },
    { name: 'Sensibilisation', value: 15 },
    { name: 'Événements', value: 15 },
    { name: 'Installations', value: 10 },
  ];

  const donParSourceData = [
    { name: 'Dons individuels', value: 55 },
    { name: 'Événements', value: 25 },
    { name: 'Subventions', value: 15 },
    { name: 'Autres', value: 5 },
  ];

  // Données des budgets
  const budgetItems = [
    {
      id: '1',
      name: 'Ministère du Culte',
      spent: 25000000,
      total: 30000000,
      color: 'from-church-cyan to-blue-500',
    },
    {
      id: '2',
      name: 'Programmes Jeunesse',
      spent: 18000000,
      total: 25000000,
      color: 'from-church-purple to-church-magenta',
    },
    {
      id: '3',
      name: 'Missions & Sensibilisation',
      spent: 30000000,
      total: 32000000,
      color: 'from-green-500 to-church-cyan',
    },
    {
      id: '4',
      name: 'Administration',
      spent: 15000000,
      total: 18000000,
      color: 'from-church-magenta to-red-500',
    },
  ];

  // Données de transactions
  const transactionsRevenues = [
    { id: 1, date: '15/07/2023', description: 'Don hebdomadaire', montant: 3500000, type: 'don' },
    { id: 2, date: '10/07/2023', description: 'Dîme de Jean Ravalison', montant: 1200000, type: 'dime' },
    { id: 3, date: '05/07/2023', description: 'Contribution événement', montant: 5000000, type: 'contribution' },
    { id: 4, date: '01/07/2023', description: 'Don projet construction', montant: 10000000, type: 'don' },
  ];

  const transactionsDepenses = [
    { id: 1, date: '14/07/2023', description: 'Facture électricité', montant: 980000, type: 'utilitaire' },
    { id: 2, date: '12/07/2023', description: 'Matériel technique', montant: 3500000, type: 'equipement' },
    { id: 3, date: '08/07/2023', description: 'Salaires personnel', montant: 8000000, type: 'salaire' },
    { id: 4, date: '02/07/2023', description: 'Rénovation salle', montant: 6500000, type: 'maintenance' },
  ];

  const handleStatCardClick = (type: string) => {
    switch(type) {
      case 'revenus':
        setActiveTab('revenus');
        toast({
          title: "Données des revenus",
          description: "Affichage des données détaillées des revenus",
        });
        break;
      case 'depenses':
        setActiveTab('depenses');
        toast({
          title: "Données des dépenses",
          description: "Affichage des données détaillées des dépenses",
        });
        break;
      case 'solde':
        toast({
          title: "Solde actuel",
          description: "Analyse détaillée du solde financier disponible",
        });
        break;
      case 'croissance':
        toast({
          title: "Analyse de croissance",
          description: "Visualisation de la croissance financière sur l'année en cours",
        });
        break;
      default:
        break;
    }
  };

  const handleChartClick = (chartType: string) => {
    toast({
      title: `Graphique: ${chartType}`,
      description: "Ouverture de l'analyse détaillée et des options d'exportation",
    });
  };

  const handleTransactionClick = (transaction: any, type: 'revenu' | 'depense') => {
    toast({
      title: `Transaction: ${transaction.description}`,
      description: `Détails de la ${type === 'revenu' ? 'recette' : 'dépense'} de ${formatMGA(transaction.montant)}`,
    });
  };

  const handleAddTransaction = () => {
    toast({
      title: "Nouvelle transaction",
      description: "Formulaire d'ajout de transaction ouvert",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportation des données",
      description: "Rapport financier exporté avec succès",
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtrer les données",
      description: "Options de filtrage avancées ouvertes",
    });
  };

  const handleBudgetItemClick = (id: string) => {
    const budgetItem = budgetItems.find(item => item.id === id);
    if (budgetItem) {
      toast({
        title: `Budget: ${budgetItem.name}`,
        description: `Consultation des détails et des transactions liées au budget ${budgetItem.name}`,
      });
    }
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Gestion Financière</h1>
            <p className="text-gray-400 mt-1">Suivez, analysez et gérez les finances de votre église</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleFilterClick}
            >
              <Filter size={16} />
              Filtrer
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <Download size={16} />
              Exporter
            </Button>
            <Button 
              className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
              onClick={handleAddTransaction}
            >
              <PlusCircle size={16} />
              Nouvelle transaction
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Revenus Totaux"
            value={formatMGA(158640000)}
            icon={<DollarSign className="h-5 w-5" />}
            trend={8}
            className="border-l-4 border-l-green-500"
            onClick={() => handleStatCardClick('revenus')}
            description="Consultation des revenus totaux et des sources de financement"
          />
          <StatCard
            title="Dépenses Totales"
            value={formatMGA(98450000)}
            icon={<ShoppingCart className="h-5 w-5" />}
            trend={5}
            className="border-l-4 border-l-red-500"
            onClick={() => handleStatCardClick('depenses')}
            description="Analyse détaillée des dépenses par catégorie"
          />
          <StatCard
            title="Solde Actuel"
            value={formatMGA(60190000)}
            icon={<BarChart3 className="h-5 w-5" />}
            trend={12}
            className="border-l-4 border-l-church-cyan"
            onClick={() => handleStatCardClick('solde')}
            description="Visualisation du solde disponible et des prévisions"
          />
          <StatCard
            title="Croissance Annuelle"
            value="24%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={3}
            className="border-l-4 border-l-church-purple"
            onClick={() => handleStatCardClick('croissance')}
            description="Analyse de la croissance financière sur plusieurs périodes"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ChartCard
              title="Répartition des Dons"
              subtitle="Par source de financement"
              type="pie"
              data={donParSourceData}
              onClick={() => handleChartClick('Répartition des Dons')}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChartCard
              title="Répartition des Dépenses"
              subtitle="Par catégorie"
              type="pie"
              data={depenseParCategorieData}
              onClick={() => handleChartClick('Répartition des Dépenses')}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card p-5">
              <Tabs 
                defaultValue="revenus" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                  <TabsTrigger value="revenus">Revenus</TabsTrigger>
                  <TabsTrigger value="depenses">Dépenses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="revenus" className="mt-6">
                  <div className="mb-6">
                    <ChartCard
                      title="Évolution des Revenus"
                      subtitle="Revenus mensuels pour l'année en cours"
                      type="area"
                      data={revenueData}
                      onClick={() => handleChartClick('Évolution des Revenus')}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Transactions récentes</h3>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-church-cyan"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-left">
                          <th className="p-3 text-sm font-semibold">Date</th>
                          <th className="p-3 text-sm font-semibold">Description</th>
                          <th className="p-3 text-sm font-semibold">Type</th>
                          <th className="p-3 text-sm font-semibold text-right">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionsRevenues.map((tx) => (
                          <motion.tr 
                            key={tx.id} 
                            className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                            onClick={() => handleTransactionClick(tx, 'revenu')}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <td className="p-3 text-sm">{tx.date}</td>
                            <td className="p-3 text-sm">{tx.description}</td>
                            <td className="p-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                tx.type === 'don' ? 'bg-green-500/20 text-green-400' : 
                                tx.type === 'dime' ? 'bg-blue-500/20 text-blue-400' : 
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                              </span>
                            </td>
                            <td className="p-3 text-sm text-right font-medium text-green-400">
                              {formatMGA(tx.montant)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="depenses" className="mt-6">
                  <div className="mb-6">
                    <ChartCard
                      title="Évolution des Dépenses"
                      subtitle="Dépenses mensuelles pour l'année en cours"
                      type="area"
                      data={depenseData}
                      onClick={() => handleChartClick('Évolution des Dépenses')}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Transactions récentes</h3>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-church-cyan"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-left">
                          <th className="p-3 text-sm font-semibold">Date</th>
                          <th className="p-3 text-sm font-semibold">Description</th>
                          <th className="p-3 text-sm font-semibold">Type</th>
                          <th className="p-3 text-sm font-semibold text-right">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionsDepenses.map((tx) => (
                          <motion.tr 
                            key={tx.id} 
                            className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors duration-200"
                            onClick={() => handleTransactionClick(tx, 'depense')}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <td className="p-3 text-sm">{tx.date}</td>
                            <td className="p-3 text-sm">{tx.description}</td>
                            <td className="p-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                tx.type === 'utilitaire' ? 'bg-yellow-500/20 text-yellow-400' : 
                                tx.type === 'equipement' ? 'bg-blue-500/20 text-blue-400' : 
                                tx.type === 'salaire' ? 'bg-red-500/20 text-red-400' :
                                'bg-orange-500/20 text-orange-400'
                              }`}>
                                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                              </span>
                            </td>
                            <td className="p-3 text-sm text-right font-medium text-red-400">
                              {formatMGA(tx.montant)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BudgetProgressCard 
              items={budgetItems}
              onItemClick={handleBudgetItemClick}
            />
            
            <div className="glass-card p-5 mt-6">
              <h3 className="text-lg font-bold mb-4">Actions Rapides</h3>
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Approbation des paiements",
                      description: "Accès au workflow d'approbation des paiements",
                    });
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Approuver les paiements
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Génération de rapport",
                      description: "Assistant de création de rapport financier ouvert",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Générer un rapport
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Planification budgétaire",
                      description: "Outil de planification budgétaire ouvert",
                    });
                  }}
                >
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Planifier le budget
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-white/10"
                  onClick={() => {
                    toast({
                      title: "Notifications financières",
                      description: "Configuration des alertes et notifications",
                    });
                  }}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Configurer les alertes
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Finances;
