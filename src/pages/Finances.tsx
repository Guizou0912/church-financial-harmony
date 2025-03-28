import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { 
  PlusCircle, 
  Download, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  ShoppingCart,
  Search
} from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import { formatMGA } from '@/lib/utils';

const Finances = () => {
  const [activeTab, setActiveTab] = useState('revenus');

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

  // Nouvelles fonctions interactives
  const handleStatCardClick = (type: string) => {
    let message = "";
    switch(type) {
      case 'revenue':
        message = "Analyse des revenus en cours...";
        break;
      case 'expenses':
        message = "Détails des dépenses en cours de chargement...";
        break;
      case 'balance':
        message = "Visualisation du solde actuel...";
        break;
      case 'growth':
        message = "Analyse de la croissance annuelle...";
        break;
    }
    toast({
      title: "Information financière",
      description: message,
    });
  };

  const handleTransactionClick = (id: number, description: string) => {
    toast({
      title: "Détails de la transaction",
      description: `Affichage des détails pour: ${description}`,
    });
  };

  const handleButtonClick = (action: string) => {
    switch(action) {
      case 'add':
        toast({
          title: "Nouvelle transaction",
          description: "Formulaire d'ajout de transaction ouvert",
        });
        break;
      case 'export':
        toast({
          title: "Exportation",
          description: "Préparation de l'exportation des données financières",
        });
        break;
    }
  };

  const handleChartClick = (type: string) => {
    toast({
      title: "Analyse graphique",
      description: `Affichage détaillé du graphique: ${type}`,
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Gestion Financière</h1>
            <p className="text-gray-400 mt-1">Suivez, analysez et gérez les finances de votre église</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-white/10"
              onClick={() => handleButtonClick('export')}
            >
              <Download size={16} />
              Exporter
            </Button>
            <Button 
              className="bg-gradient-to-r from-church-cyan to-church-purple hover:opacity-90 transition-opacity"
              onClick={() => handleButtonClick('add')}
            >
              <PlusCircle size={16} className="mr-1" />
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
            className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleStatCardClick('revenue')}
          />
          <StatCard
            title="Dépenses Totales"
            value={formatMGA(98450000)}
            icon={<ShoppingCart className="h-5 w-5" />}
            trend={5}
            className="border-l-4 border-l-red-500 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleStatCardClick('expenses')}
          />
          <StatCard
            title="Solde Actuel"
            value={formatMGA(60190000)}
            icon={<BarChart3 className="h-5 w-5" />}
            trend={12}
            className="border-l-4 border-l-church-cyan cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleStatCardClick('balance')}
          />
          <StatCard
            title="Croissance Annuelle"
            value="24%"
            icon={<TrendingUp className="h-5 w-5" />}
            trend={3}
            className="border-l-4 border-l-church-purple cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleStatCardClick('growth')}
          />
        </div>

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
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChartClick('Revenus mensuels')}
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
                      <tr 
                        key={tx.id} 
                        className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                        onClick={() => handleTransactionClick(tx.id, tx.description)}
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
                      </tr>
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
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChartClick('Dépenses mensuelles')}
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
                      <tr 
                        key={tx.id} 
                        className="border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                        onClick={() => handleTransactionClick(tx.id, tx.description)}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Finances;
