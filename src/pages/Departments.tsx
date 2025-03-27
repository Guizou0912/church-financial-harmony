
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Search, 
  Users, 
  Calendar, 
  Activity, 
  DollarSign,
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ChartCard from '@/components/Dashboard/ChartCard';
import { formatMGA } from '@/lib/utils';

const Departments = () => {
  // Données exemple pour les départements
  const departments = [
    { 
      id: 1, 
      name: 'Ministère du Culte', 
      leader: 'Sophie Rakoto', 
      leaderAvatar: null,
      memberCount: 24, 
      nextMeeting: '18 Juillet 2023', 
      budget: 30000000,
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Jeunesse', 
      leader: 'Jean Ravalison', 
      leaderAvatar: null,
      memberCount: 38, 
      nextMeeting: '20 Juillet 2023', 
      budget: 25000000,
      status: 'active' 
    },
    { 
      id: 3, 
      name: 'Missions & Évangélisation', 
      leader: 'François Andriamasy', 
      leaderAvatar: null,
      memberCount: 16, 
      nextMeeting: '25 Juillet 2023', 
      budget: 32000000,
      status: 'active' 
    },
    { 
      id: 4, 
      name: 'Administration', 
      leader: 'Natacha Rasolofo', 
      leaderAvatar: null,
      memberCount: 12, 
      nextMeeting: '19 Juillet 2023', 
      budget: 18000000,
      status: 'active' 
    },
    { 
      id: 5, 
      name: 'Ministère des Femmes', 
      leader: 'Marie Razafindrakoto', 
      leaderAvatar: null,
      memberCount: 45, 
      nextMeeting: '22 Juillet 2023', 
      budget: 22000000,
      status: 'active' 
    },
    { 
      id: 6, 
      name: 'Média & Communication', 
      leader: 'Paul Ranaivo', 
      leaderAvatar: null,
      memberCount: 8, 
      nextMeeting: '21 Juillet 2023', 
      budget: 15000000,
      status: 'inactive' 
    }
  ];

  // Données pour le graphique de performance des départements
  const departmentPerformanceData = [
    { name: 'Culte', value: 30000000 },
    { name: 'Jeunesse', value: 25000000 },
    { name: 'Missions', value: 32000000 },
    { name: 'Admin', value: 18000000 },
    { name: 'Femmes', value: 22000000 },
    { name: 'Média', value: 15000000 },
  ];

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
            <h1 className="text-3xl font-bold gradient-text">Départements</h1>
            <p className="text-gray-400 mt-1">Gérez les différents départements de votre église</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un département..."
                className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
              <PlusCircle size={16} className="mr-1" />
              Nouveau département
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Allocation Budgétaire par Département"
            subtitle="Répartition du budget entre les départements"
            type="bar"
            data={departmentPerformanceData}
          />
          
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold mb-4">Performance des Départements</h3>
            <div className="space-y-4">
              {departments.slice(0, 4).map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-10 rounded-full ${dept.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} mr-3`}></div>
                    <div>
                      <h4 className="font-medium">{dept.name}</h4>
                      <p className="text-xs text-gray-400">Budget: {formatMGA(dept.budget)}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      dept.memberCount > 30 ? 'bg-green-500/20 text-green-400' : 
                      dept.memberCount > 15 ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {dept.memberCount} membres
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-lg font-bold mb-4">Liste des Départements</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5 text-left">
                  <th className="p-3 text-sm font-semibold">Département</th>
                  <th className="p-3 text-sm font-semibold">Responsable</th>
                  <th className="p-3 text-sm font-semibold">Membres</th>
                  <th className="p-3 text-sm font-semibold">Prochaine Réunion</th>
                  <th className="p-3 text-sm font-semibold">Budget</th>
                  <th className="p-3 text-sm font-semibold">Statut</th>
                  <th className="p-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 font-medium">{dept.name}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-church-purple text-white text-xs">
                            {dept.leader.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {dept.leader}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        <span>{dept.memberCount}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{dept.nextMeeting}</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{formatMGA(dept.budget)}</td>
                    <td className="p-3">
                      <Badge className={dept.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'}>
                        {dept.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <ChevronRight size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Departments;
