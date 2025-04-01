
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Edit, 
  Users, 
  Clock,
  ChevronLeft,
  BarChart3,
  Building2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Department } from '@/hooks/useDepartmentsHandlers';
import { Badge } from "@/components/ui/badge";
import { formatMGA } from "@/lib/utils";

interface DepartmentDetailsProps {
  department: Department;
  onBack: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold">Détails du département</h2>
      </div>
      
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-church-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{department.name}</h1>
              <Badge className={department.status === 'active' 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'}>
                {department.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span>Membres</span>
            </div>
            <div className="text-2xl font-bold">{department.memberCount}</div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <DollarSign className="h-4 w-4" />
              <span>Budget</span>
            </div>
            <div className="text-2xl font-bold">{formatMGA(department.budget)}</div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Prochaine réunion</span>
            </div>
            <div className="text-2xl font-bold">{department.nextMeeting}</div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <BarChart3 className="h-4 w-4" />
              <span>Performance</span>
            </div>
            <div className="text-2xl font-bold">92%</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Responsable</h3>
          <div className="bg-white/5 p-4 rounded-lg flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-church-purple text-white">
                {department.leader.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-lg">{department.leader}</div>
              <div className="text-gray-400">Responsable depuis 2 ans</div>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              Contacter
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Activités récentes</h3>
          <div className="space-y-3">
            <div className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium">Réunion de planification</div>
                <div className="text-gray-400 text-sm">Il y a 3 jours</div>
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium">Budget ajusté</div>
                <div className="text-gray-400 text-sm">Il y a 1 semaine</div>
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium">2 nouveaux membres ajoutés</div>
                <div className="text-gray-400 text-sm">Il y a 2 semaines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentDetails;
