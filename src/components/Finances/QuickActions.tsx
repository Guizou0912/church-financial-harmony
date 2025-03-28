
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, CalendarRange, Bell } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import {
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';

interface QuickActionsProps {
  onActionClick: (actionType: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = (actionType: string) => {
    onActionClick(actionType);
    setActiveSheet(actionType);
  };

  const handleClose = () => {
    setActiveSheet(null);
    setIsSuccess(false);
  };

  const handleComplete = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setActiveSheet(null);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-5 mt-6">
      <h3 className="text-lg font-bold mb-4">Actions Rapides</h3>
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => handleAction('payments')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Approuver les paiements
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => handleAction('report')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Générer un rapport
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => handleAction('budget')}
        >
          <CalendarRange className="h-4 w-4 mr-2" />
          Planifier le budget
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => handleAction('alerts')}
        >
          <Bell className="h-4 w-4 mr-2" />
          Configurer les alertes
        </Button>
      </div>

      {/* Payments Sheet */}
      <Sheet open={activeSheet === 'payments'} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Approbation des paiements</SheetTitle>
            <SheetDescription>
              Gérez les paiements en attente d'approbation
            </SheetDescription>
          </SheetHeader>
          
          {isSuccess ? (
            <Alert className="mt-4 bg-green-500/20 border-green-500">
              <AlertTitle>Succès!</AlertTitle>
              <AlertDescription>
                Les paiements ont été approuvés avec succès.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="py-4">
              <div className="space-y-4">
                <div className="p-3 border border-white/10 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Facture #1234</p>
                      <p className="text-sm text-gray-400">Électricité - Avril 2023</p>
                    </div>
                    <p className="text-red-400 font-medium">320,000 Ar</p>
                  </div>
                </div>
                
                <div className="p-3 border border-white/10 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Facture #1235</p>
                      <p className="text-sm text-gray-400">Eau - Avril 2023</p>
                    </div>
                    <p className="text-red-400 font-medium">150,000 Ar</p>
                  </div>
                </div>
                
                <div className="p-3 border border-white/10 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Facture #1236</p>
                      <p className="text-sm text-gray-400">Matériel - Avril 2023</p>
                    </div>
                    <p className="text-red-400 font-medium">500,000 Ar</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            {!isSuccess && (
              <Button onClick={handleComplete} className="w-full">
                Approuver tous les paiements
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Report Sheet */}
      <Sheet open={activeSheet === 'report'} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Générer un rapport</SheetTitle>
            <SheetDescription>
              Créez un rapport financier personnalisé
            </SheetDescription>
          </SheetHeader>
          
          {isSuccess ? (
            <Alert className="mt-4 bg-green-500/20 border-green-500">
              <AlertTitle>Rapport généré!</AlertTitle>
              <AlertDescription>
                Votre rapport financier a été généré et envoyé par email.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type de rapport</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-md">
                  <option>Rapport mensuel</option>
                  <option>Rapport trimestriel</option>
                  <option>Rapport annuel</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Période</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-md">
                  <option>Avril 2023</option>
                  <option>Mars 2023</option>
                  <option>Février 2023</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-md">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            {!isSuccess && (
              <Button onClick={handleComplete} className="w-full">
                Générer le rapport
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Budget Sheet */}
      <Sheet open={activeSheet === 'budget'} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Planification budgétaire</SheetTitle>
            <SheetDescription>
              Planifiez votre budget pour les périodes à venir
            </SheetDescription>
          </SheetHeader>
          
          {isSuccess ? (
            <Alert className="mt-4 bg-green-500/20 border-green-500">
              <AlertTitle>Budget planifié!</AlertTitle>
              <AlertDescription>
                Le budget a été mis à jour avec succès.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Période</label>
                <select className="w-full p-2 bg-white/5 border border-white/10 rounded-md">
                  <option>Mai 2023</option>
                  <option>Juin 2023</option>
                  <option>T3 2023</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dépenses utilitaires</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                    defaultValue="500000" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Équipements</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                    defaultValue="1000000" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salaires</label>
                  <input 
                    type="number" 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md"
                    defaultValue="1500000" 
                  />
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            {!isSuccess && (
              <Button onClick={handleComplete} className="w-full">
                Enregistrer le budget
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Alerts Sheet */}
      <Sheet open={activeSheet === 'alerts'} onOpenChange={handleClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configuration des alertes</SheetTitle>
            <SheetDescription>
              Configurez des alertes financières personnalisées
            </SheetDescription>
          </SheetHeader>
          
          {isSuccess ? (
            <Alert className="mt-4 bg-green-500/20 border-green-500">
              <AlertTitle>Alertes configurées!</AlertTitle>
              <AlertDescription>
                Vos alertes financières ont été configurées avec succès.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between p-3 border border-white/10 rounded-md">
                <div>
                  <p className="font-medium">Alerte de dépassement de budget</p>
                  <p className="text-sm text-gray-400">Recevoir une notification quand un budget est dépassé</p>
                </div>
                <div className="flex items-center h-4">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-white/10 rounded-md">
                <div>
                  <p className="font-medium">Alerte de faible solde</p>
                  <p className="text-sm text-gray-400">Recevoir une notification quand le solde est faible</p>
                </div>
                <div className="flex items-center h-4">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-white/10 rounded-md">
                <div>
                  <p className="font-medium">Alerte de grande transaction</p>
                  <p className="text-sm text-gray-400">Recevoir une notification pour les transactions importantes</p>
                </div>
                <div className="flex items-center h-4">
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-white/10 rounded-md">
                <div>
                  <p className="font-medium">Rapport financier hebdomadaire</p>
                  <p className="text-sm text-gray-400">Recevoir un rapport hebdomadaire par email</p>
                </div>
                <div className="flex items-center h-4">
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            {!isSuccess && (
              <Button onClick={handleComplete} className="w-full">
                Enregistrer les alertes
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default QuickActions;
