
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import PageLayout from '@/components/Layout/PageLayout';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import RecentActivityCard, { Activity } from '@/components/Dashboard/RecentActivityCard';
import BudgetProgressCard from '@/components/Dashboard/BudgetProgressCard';

// Données exemple
const revenueData = [
  { name: 'Jan', value: 12000000 },
  { name: 'Fév', value: 19000000 },
  { name: 'Mar', value: 15000000 },
  { name: 'Avr', value: 22000000 },
  { name: 'Mai', value: 25000000 },
  { name: 'Juin', value: 28000000 },
  { name: 'Juil', value: 30000000 },
];

const expenseData = [
  { name: 'Services', value: 15 },
  { name: 'Personnel', value: 35 },
  { name: 'Sensibilisation', value: 25 },
  { name: 'Événements', value: 15 },
  { name: 'Installations', value: 10 },
];

const departmentData = [
  { name: 'Culte', value: 30000000 },
  { name: 'Jeunesse', value: 25000000 },
  { name: 'Missions', value: 32000000 },
  { name: 'Admin', value: 18000000 },
  { name: 'Communauté', value: 22000000 },
];

const recentActivities: Activity[] = [
  {
    id: '1',
    title: 'Nouveau Don Reçu',
    description: 'Jean Dupont a fait un don de 2 500 000 MGA au Ministère de la Jeunesse',
    timestamp: 'il y a 2 heures',
    type: 'donation',
  },
  {
    id: '2',
    title: 'Dépense Approuvée',
    description: 'Achat de nouveaux équipements sonores pour 6 000 000 MGA',
    timestamp: 'il y a 5 heures',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Événement Programmé',
    description: 'Camp d\'été des jeunes programmé du 15 au 20 juillet',
    timestamp: 'il y a 1 jour',
    type: 'event',
  },
  {
    id: '4',
    title: 'Révision Budgétaire Terminée',
    description: 'Révision budgétaire du 2e trimestre terminée par l\'équipe financière',
    timestamp: 'il y a 2 jours',
    type: 'task',
  },
];

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

const Index = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Fonction d'affichage de la monnaie MGA avec format
  const formatMGA = (value: number) => {
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleStatCardClick = (type: string) => {
    switch(type) {
      case 'donations':
        navigate('/finances');
        break;
      case 'members':
        navigate('/departments');
        break;
      case 'events':
        navigate('/events');
        break;
      case 'budget':
        navigate('/finances');
        break;
      default:
        break;
    }
  };

  const handleQuickAccessClick = (action: string) => {
    switch(action) {
      case 'createReport':
        navigate('/reports');
        break;
      case 'addDonation':
        navigate('/finances');
        toast({
          title: "Accès à l'ajout de don",
          description: "Vous pouvez maintenant ajouter un nouveau don",
        });
        break;
      case 'planEvent':
        navigate('/events');
        toast({
          title: "Accès à la planification d'événement",
          description: "Vous pouvez maintenant planifier un événement",
        });
        break;
      case 'analyzeDonations':
        navigate('/reports');
        toast({
          title: "Accès à l'analyse des dons",
          description: "Vous pouvez maintenant analyser les dons",
        });
        break;
      default:
        break;
    }
  };

  const handleActivityClick = (activity: Activity) => {
    switch(activity.type) {
      case 'donation':
        navigate('/finances');
        break;
      case 'expense':
        navigate('/finances');
        break;
      case 'event':
        navigate('/events');
        break;
      case 'task':
        navigate('/departments');
        break;
      default:
        break;
    }
  };

  const handleBudgetItemClick = (id: string) => {
    navigate('/finances');
    toast({
      title: "Détails du budget",
      description: `Consultation des détails du budget pour l'ID: ${id}`,
    });
  };

  return (
    <PageLayout>
      <div className="mb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold gradient-text mb-2"
        >
          Tableau de Bord ChurchFinPro+
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Bienvenue dans votre centre de gestion financière. Surveillez les dons, suivez les dépenses et gérez les départements en un seul endroit.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Aperçu des statistiques */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Dons Totaux"
              value={formatMGA(128540000)}
              icon={<DollarSign className="h-5 w-5" />}
              trend={12}
              className="border-l-4 border-l-church-cyan cursor-pointer"
              onClick={() => handleStatCardClick('donations')}
            />
            <StatCard
              title="Membres Actifs"
              value="856"
              icon={<Users className="h-5 w-5" />}
              trend={5}
              className="border-l-4 border-l-church-magenta cursor-pointer"
              onClick={() => handleStatCardClick('members')}
            />
            <StatCard
              title="Événements à Venir"
              value="12"
              icon={<Calendar className="h-5 w-5" />}
              trend={-2}
              className="border-l-4 border-l-church-purple cursor-pointer"
              onClick={() => handleStatCardClick('events')}
            />
            <StatCard
              title="Utilisation du Budget"
              value="76%"
              icon={<TrendingUp className="h-5 w-5" />}
              trend={8}
              className="border-l-4 border-l-church-blue cursor-pointer"
              onClick={() => handleStatCardClick('budget')}
            />
          </div>
        </motion.div>

        {/* Section des graphiques */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Croissance des Dons"
            subtitle="Revenus mensuels pour l'année en cours"
            type="area"
            data={revenueData}
            className="cursor-pointer"
            onClick={() => navigate('/reports')}
          />
          <ChartCard
            title="Répartition des Dépenses"
            subtitle="Allocation des dépenses par catégorie"
            type="pie"
            data={expenseData}
            className="cursor-pointer"
            onClick={() => navigate('/reports')}
          />
        </motion.div>

        {/* Performance des départements et aperçu du budget */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Financement des Départements"
            subtitle="Allocation budgétaire par département"
            type="bar"
            data={departmentData}
            className="cursor-pointer"
            onClick={() => navigate('/departments')}
          />
          <BudgetProgressCard 
            items={budgetItems} 
            onItemClick={handleBudgetItemClick}
          />
        </motion.div>

        {/* Activité récente */}
        <motion.div variants={itemVariants}>
          <RecentActivityCard 
            activities={recentActivities} 
            onActivityClick={handleActivityClick}
          />
        </motion.div>

        {/* Accès rapide */}
        <motion.div variants={itemVariants}>
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold mb-4">Accès Rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'createReport', title: 'Créer un Rapport', icon: <BarChart3 className="h-5 w-5" />, color: 'from-church-cyan to-blue-500' },
                { id: 'addDonation', title: 'Ajouter un Don', icon: <DollarSign className="h-5 w-5" />, color: 'from-church-magenta to-purple-500' },
                { id: 'planEvent', title: 'Planifier un Événement', icon: <Calendar className="h-5 w-5" />, color: 'from-green-500 to-teal-500' },
                { id: 'analyzeDonations', title: 'Analyser les Dons', icon: <PieChart className="h-5 w-5" />, color: 'from-yellow-500 to-red-500' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => handleQuickAccessClick(item.id)}
                >
                  <div className={`p-3 rounded-full mb-2 bg-gradient-to-r ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Index;
