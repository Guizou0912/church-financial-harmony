import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Edit, 
  Users, 
  Clock,
  ChevronLeft,
  BarChart3,
  Building2,
  PlusCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Trash2,
  Download
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Department, Transaction } from '@/hooks/useDepartmentsHandlers';
import { Badge } from "@/components/ui/badge";
import { formatMGA } from "@/lib/utils";
import TransactionModal from './TransactionModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DepartmentDetailsProps {
  department: Department;
  onBack: () => void;
  onAddTransaction: (departmentId: number | string, transaction: Omit<Transaction, 'id'>) => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onBack, onAddTransaction }) => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddTransaction = () => {
    setShowTransactionModal(true);
  };

  const handleSaveTransaction = (transaction: Omit<Transaction, 'id'>) => {
    onAddTransaction(department.id, transaction);
    setShowTransactionModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <div className="flex gap-2">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAddTransaction}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Transaction
            </Button>
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                  <BarChart3 className="h-4 w-4" />
                  <span>Solde actuel</span>
                </div>
                <div className={`text-2xl font-bold ${department.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatMGA(department.balance)}
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Transactions</span>
                </div>
                <div className="text-2xl font-bold">{department.transactions.length}</div>
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
                {department.transactions.slice(-3).map(transaction => (
                  <div key={transaction.id} className="bg-white/5 p-3 rounded-lg flex items-start gap-3">
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-gray-400 text-sm">{formatDate(transaction.date)}</div>
                    </div>
                    <div className={`ml-auto font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatMGA(transaction.amount)}
                    </div>
                  </div>
                ))}
                {department.transactions.length === 0 && (
                  <div className="bg-white/5 p-3 rounded-lg text-center text-gray-400">
                    Aucune transaction enregistrée
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Historique des transactions</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-right p-3">Montant</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.transactions.map(transaction => (
                      <tr key={transaction.id} className="border-b border-white/5">
                        <td className="p-3">{transaction.description}</td>
                        <td className="p-3">{formatDate(transaction.date)}</td>
                        <td className="p-3">
                          <Badge className={transaction.type === 'income' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'}>
                            {transaction.type === 'income' ? 'Entrée' : 'Sortie'}
                          </Badge>
                        </td>
                        <td className={`p-3 text-right font-medium ${
                          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'} {formatMGA(transaction.amount)}
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {department.transactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-400">
                          Aucune transaction enregistrée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-white/5 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-gray-400">Total entrées:</span>
                  <span className="ml-2 text-green-400 font-medium">
                    {formatMGA(
                      department.transactions
                        .filter(t => t.type === 'income')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Total sorties:</span>
                  <span className="ml-2 text-red-400 font-medium">
                    {formatMGA(
                      department.transactions
                        .filter(t => t.type === 'expense')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Solde:</span>
                  <span className={`ml-2 font-medium ${department.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatMGA(department.balance)}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TransactionModal 
        open={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSave={handleSaveTransaction}
        departmentId={department.id as number}
      />
    </motion.div>
  );
};

export default DepartmentDetails;
