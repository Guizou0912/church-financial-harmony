
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, CreditCard, Calculator, BellRing } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import FinancialReportGenerator, { ReportOptions } from './FinancialReportGenerator';
import BudgetPlanner from './BudgetPlanner';
import AlertConfiguration from './AlertConfiguration';

interface QuickActionsProps {
  onActionClick: (actionType: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const { toast } = useToast();
  const [paymentApproved, setPaymentApproved] = useState(false);

  const handleGenerateReport = (options: ReportOptions) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport "${options.title}" a été généré avec succès au format ${options.format.toUpperCase()}.`,
    });
  };

  const handleSaveBudget = (items: any[]) => {
    toast({
      title: "Budget mis à jour",
      description: "Les modifications du budget ont été enregistrées avec succès.",
    });
  };

  const handleSaveAlerts = (alerts: any[]) => {
    toast({
      title: "Alertes mises à jour",
      description: "Les configurations d'alertes ont été enregistrées avec succès.",
    });
  };

  const handlePaymentApprove = () => {
    setPaymentApproved(true);
    toast({
      title: "Paiement approuvé",
      description: "Le paiement a été approuvé avec succès.",
    });
    setTimeout(() => setPaymentApproved(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-5 mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Approbation des paiements */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full"
              onClick={() => onActionClick('payments')}
            >
              <CreditCard className="h-6 w-6 text-blue-400" />
              <span className="text-sm">Approbation des paiements</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Approbation des paiements</SheetTitle>
              <SheetDescription>
                Approuvez ou rejetez les paiements en attente
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="space-y-4">
                {paymentApproved ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-2">
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-medium">Paiement approuvé !</h3>
                    <p className="text-gray-400 mt-2">Tous les paiements ont été traités</p>
                  </div>
                ) : (
                  <>
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Facture EDF</h3>
                          <p className="text-sm text-gray-400">Échéance: 25/07/2023</p>
                          <p className="text-sm mt-1">Montant: 980 000 Ar</p>
                        </div>
                        <Button size="sm" onClick={handlePaymentApprove}>
                          Approuver
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Achat matériel sonorisation</h3>
                          <p className="text-sm text-gray-400">Échéance: 30/07/2023</p>
                          <p className="text-sm mt-1">Montant: 3 500 000 Ar</p>
                        </div>
                        <Button size="sm" onClick={handlePaymentApprove}>
                          Approuver
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 text-right">
              <SheetClose asChild>
                <Button variant="outline">Fermer</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        {/* Génération de rapport */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full"
              onClick={() => onActionClick('report')}
            >
              <FileText className="h-6 w-6 text-yellow-400" />
              <span className="text-sm">Génération de rapport</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Générer un rapport financier</SheetTitle>
              <SheetDescription>
                Créez un rapport financier personnalisé
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <FinancialReportGenerator onGenerateReport={handleGenerateReport} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Planification budgétaire */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full"
              onClick={() => onActionClick('budget')}
            >
              <Calculator className="h-6 w-6 text-green-400" />
              <span className="text-sm">Planification budgétaire</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Planification budgétaire</SheetTitle>
              <SheetDescription>
                Gérez et planifiez vos budgets
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <BudgetPlanner onSaveBudget={handleSaveBudget} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Notifications financières */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full"
              onClick={() => onActionClick('alerts')}
            >
              <BellRing className="h-6 w-6 text-red-400" />
              <span className="text-sm">Notifications financières</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Notifications financières</SheetTitle>
              <SheetDescription>
                Configurez les alertes et notifications financières
              </SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <AlertConfiguration onSaveAlerts={handleSaveAlerts} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
};

export default QuickActions;
