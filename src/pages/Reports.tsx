
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  FileText, 
  Filter,
  ChevronDown,
  Eye,
  Download as DownloadIcon,
  Share
} from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import ChartCard from '@/components/Dashboard/ChartCard';
import { formatMGA } from '@/lib/utils';

// Types pour les rapports
interface ReportType {
  id: number;
  title: string;
  description: string;
  type: 'finances' | 'membres' | 'evenements' | 'autres';
  date: string;
  author: string;
  views: number;
  downloadUrl: string;
}

const Reports = () => {
  const [period, setPeriod] = useState('lastMonth');

  // Données exemple pour les rapports
  const reports: ReportType[] = [
    {
      id: 1,
      title: 'Rapport Financier - Juin 2023',
      description: 'Rapport mensuel sur les revenus et dépenses de l\'église',
      type: 'finances',
      date: '05/07/2023',
      author: 'Natacha Rasolofo',
      views: 28,
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Statistiques de Fréquentation - Juin 2023',
      description: 'Analyse de la fréquentation des cultes et activités',
      type: 'membres',
      date: '03/07/2023',
      author: 'Jean Ravalison',
      views: 42,
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Rapport d\'Activité Mission Analakely',
      description: 'Compte-rendu de la mission d\'évangélisation à Analakely',
      type: 'evenements',
      date: '18/06/2023',
      author: 'François Andriamasy',
      views: 36,
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Rapport Financier - Mai 2023',
      description: 'Rapport mensuel sur les revenus et dépenses de l\'église',
      type: 'finances',
      date: '05/06/2023',
      author: 'Natacha Rasolofo',
      views: 45,
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Plan Stratégique 2023-2024',
      description: 'Planification stratégique pour l\'année à venir',
      type: 'autres',
      date: '15/05/2023',
      author: 'Sophie Rakoto',
      views: 67,
      downloadUrl: '#'
    },
    {
      id: 6,
      title: 'Rapport de Croissance - T2 2023',
      description: 'Analyse de la croissance de l\'église au 2ème trimestre',
      type: 'membres',
      date: '12/07/2023',
      author: 'Jean Ravalison',
      views: 21,
      downloadUrl: '#'
    }
  ];

  // Données de graphiques
  const revenueData = [
    { name: 'Jan', value: 12000000 },
    { name: 'Fév', value: 19000000 },
    { name: 'Mar', value: 15000000 },
    { name: 'Avr', value: 22000000 },
    { name: 'Mai', value: 25000000 },
    { name: 'Juin', value: 28000000 },
    { name: 'Juil', value: 30000000 },
  ];

  const attendanceData = [
    { name: 'Semaine 1', value: 245 },
    { name: 'Semaine 2', value: 278 },
    { name: 'Semaine 3', value: 230 },
    { name: 'Semaine 4', value: 265 },
  ];

  const donationTypeData = [
    { name: 'Dons Réguliers', value: 40 },
    { name: 'Dîmes', value: 30 },
    { name: 'Missions', value: 20 },
    { name: 'Projets', value: 10 },
  ];

  // Fonction pour obtenir la classe de couleur en fonction du type de rapport
  const getReportTypeClass = (type: ReportType['type']) => {
    switch (type) {
      case 'finances': return 'bg-green-500/20 text-green-400';
      case 'membres': return 'bg-blue-500/20 text-blue-400';
      case 'evenements': return 'bg-purple-500/20 text-purple-400';
      case 'autres': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Fonction pour obtenir le libellé du type en français
  const getReportTypeLabel = (type: ReportType['type']) => {
    switch (type) {
      case 'finances': return 'Finances';
      case 'membres': return 'Membres';
      case 'evenements': return 'Événements';
      case 'autres': return 'Autres';
      default: return type;
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
            <h1 className="text-3xl font-bold gradient-text">Rapports</h1>
            <p className="text-gray-400 mt-1">Générez et consultez les rapports de votre église</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Période:</span>
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none"
              >
                <option value="lastWeek">Dernière Semaine</option>
                <option value="lastMonth">Dernier Mois</option>
                <option value="lastQuarter">Dernier Trimestre</option>
                <option value="lastYear">Dernière Année</option>
              </select>
              <ChevronDown size={14} />
            </Button>
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
              <BarChart3 size={16} className="mr-1" />
              Générer un rapport
            </Button>
          </div>
        </div>

        <div className="glass-card p-5">
          <Tabs defaultValue="dashboards" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none bg-white/5">
              <TabsTrigger value="dashboards">Tableaux de Bord</TabsTrigger>
              <TabsTrigger value="reports">Rapports Générés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboards" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ChartCard
                  title="Croissance des Dons"
                  subtitle="Revenus mensuels pour l'année en cours"
                  type="area"
                  data={revenueData}
                />
                
                <ChartCard
                  title="Fréquentation des Cultes"
                  subtitle="Nombre de personnes par semaine"
                  type="bar"
                  data={attendanceData}
                />
                
                <ChartCard
                  title="Répartition des Dons"
                  subtitle="Par catégorie, en pourcentage"
                  type="pie"
                  data={donationTypeData}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Rapports récents</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={14} />
                  Filtrer
                </Button>
              </div>
              
              <div className="space-y-4">
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={16} className="text-gray-400" />
                        <h4 className="font-medium">{report.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getReportTypeClass(report.type)}`}>
                          {getReportTypeLabel(report.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                        <span>Créé le: {report.date}</span>
                        <span>Par: {report.author}</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} className="text-gray-400" />
                          {report.views} vues
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Share size={14} />
                        Partager
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <DownloadIcon size={14} />
                        Télécharger
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Reports;
