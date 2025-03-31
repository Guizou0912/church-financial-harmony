
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  FileText, 
  Wallet, 
  Bell,
  BadgeCheck,
  FileBarChart,
  Calculator,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BudgetPlanner from './BudgetPlanner';
import FinancialReportGenerator from './FinancialReportGenerator';

interface QuickActionsProps {
  onActionClick: (actionType: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const { toast } = useToast();

  const handleApprovePayment = (id: string) => {
    toast({
      title: "Paiement approuvé",
      description: `Le paiement #${id} a été approuvé avec succès.`
    });
  };

  const handleRejectPayment = (id: string) => {
    toast({
      title: "Paiement rejeté",
      description: `Le paiement #${id} a été rejeté.`
    });
  };

  const handleToggleAlert = (alert: string, enabled: boolean) => {
    toast({
      title: enabled ? "Alerte activée" : "Alerte désactivée",
      description: `L'alerte "${alert}" a été ${enabled ? 'activée' : 'désactivée'}.`
    });
  };

  const handleGenerateReport = (options: any) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport "${options.title}" a été généré au format ${options.format.toUpperCase()}.`
    });
  };

  const handleSaveBudget = (items: any[]) => {
    toast({
      title: "Budget mis à jour",
      description: `Le budget a été mis à jour avec succès avec ${items.length} éléments.`
    });
  };

  const pendingPayments = [
    { id: "PAY-2023-07-15", description: "Facture d'électricité", amount: 980000, date: "15/07/2023" },
    { id: "PAY-2023-07-14", description: "Salaires du personnel", amount: 8000000, date: "14/07/2023" },
    { id: "PAY-2023-07-10", description: "Matériel technique", amount: 3500000, date: "10/07/2023" }
  ];

  const alertSettings = [
    { id: "alert1", name: "Dépassement de budget", description: "Notification lorsqu'un poste budgétaire dépasse 90%", enabled: true },
    { id: "alert2", name: "Grands dons", description: "Notification pour les dons dépassant 1 000 000 Ar", enabled: true },
    { id: "alert3", name: "Grandes dépenses", description: "Notification pour les dépenses dépassant 5 000 000 Ar", enabled: false },
    { id: "alert4", name: "Rappel de rapports mensuels", description: "Rappel pour générer les rapports mensuels", enabled: true }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card mt-6"
    >
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Payments Approval */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-lg text-center cursor-pointer transition-colors"
                  onClick={() => onActionClick('payments')}
                >
                  <BadgeCheck className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-medium text-base">Paiements</h3>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xl">Approbation des paiements</SheetTitle>
                  <SheetDescription>
                    Examiner et approuver les paiements en attente
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {pendingPayments.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-400">Aucun paiement en attente</p>
                    </div>
                  ) : (
                    pendingPayments.map(payment => (
                      <div 
                        key={payment.id} 
                        className="bg-white/5 p-4 rounded-lg border border-white/10"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{payment.description}</h4>
                            <p className="text-sm text-gray-400">{payment.id}</p>
                            <p className="text-sm text-gray-400">Date: {payment.date}</p>
                          </div>
                          <p className="text-red-400 font-semibold">
                            {new Intl.NumberFormat('fr-MG', {
                              style: 'currency',
                              currency: 'MGA',
                              minimumFractionDigits: 0
                            }).format(payment.amount)}
                          </p>
                        </div>
                        <div className="flex justify-end space-x-2 mt-3">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectPayment(payment.id)}
                          >
                            Rejeter
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApprovePayment(payment.id)}
                          >
                            Approuver
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full text-base">Fermer</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Financial Reports */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-lg text-center cursor-pointer transition-colors"
                  onClick={() => onActionClick('report')}
                >
                  <FileBarChart className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-medium text-base">Rapports</h3>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xl">Générer un rapport financier</SheetTitle>
                  <SheetDescription>
                    Créez des rapports financiers personnalisés
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6">
                  <FinancialReportGenerator onGenerateReport={handleGenerateReport} />
                </div>
                
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full text-base">Fermer</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Budget Planning */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-lg text-center cursor-pointer transition-colors"
                  onClick={() => onActionClick('budget')}
                >
                  <Calculator className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-medium text-base">Budget</h3>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xl">Planification budgétaire</SheetTitle>
                  <SheetDescription>
                    Créez et gérez vos budgets pour l'année
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6">
                  <BudgetPlanner onSaveBudget={handleSaveBudget} />
                </div>
                
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full text-base">Fermer</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Alerts Configuration */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 p-4 rounded-lg text-center cursor-pointer transition-colors"
                  onClick={() => onActionClick('alerts')}
                >
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-medium text-base">Alertes</h3>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-xl">Configuration des alertes</SheetTitle>
                  <SheetDescription>
                    Gérez les notifications et alertes financières
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {alertSettings.map(alert => (
                    <div 
                      key={alert.id}
                      className="flex items-center justify-between p-3 border border-white/10 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{alert.name}</h4>
                        <p className="text-sm text-gray-400">{alert.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={alert.enabled}
                          onChange={() => handleToggleAlert(alert.name, !alert.enabled)}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full text-base">Enregistrer</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
