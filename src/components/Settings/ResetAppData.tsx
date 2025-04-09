
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Trash2, AlertTriangle } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

const ResetAppData = () => {
  const { toast } = useToast();
  const { userRole, user, signIn } = useAuth();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const isAdmin = userRole === 'admin';

  const handleResetConfirm = async () => {
    if (!isAdmin) {
      toast({
        title: "Permission refusée",
        description: "Seuls les administrateurs peuvent réinitialiser l'application",
        variant: "destructive"
      });
      return;
    }

    setIsAuthDialogOpen(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsResetting(true);
      
      // Vérifier les identifiants de l'administrateur
      await signIn(email, password);
      
      // Si nous arrivons ici, l'authentification a réussi
      await resetAppData();
      
      setIsAuthDialogOpen(false);
      setIsResetDialogOpen(false);
      setPassword("");
      setEmail("");
      
      toast({
        title: "Réinitialisation réussie",
        description: "Toutes les données de l'application ont été réinitialisées",
      });

      // Forcer un rechargement complet de l'application pour mettre à jour toutes les données
      // Cette méthode est plus radicale pour s'assurer que tout est réinitialisé
      localStorage.setItem('appReset', 'true');
      setTimeout(() => {
        window.location.href = '/';  // Redirection complète vers la page d'accueil
        setTimeout(() => {
          window.location.reload(true);  // Force le rechargement sans utiliser le cache
        }, 100);
      }, 500);
    } catch (error: any) {
      toast({
        title: "Erreur d'authentification",
        description: "Veuillez vérifier vos identifiants et réessayer",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
    }
  };

  const resetAppData = async () => {
    try {
      // Supprimer toutes les transactions
      await supabase
        .from('transactions')
        .delete()
        .eq('user_id', user?.id);
      
      // Réinitialiser tous les budgets (on ne les supprime pas pour conserver la structure)
      const { data: budgets } = await supabase
        .from('budgets')
        .select('id');
      
      for (const budget of budgets || []) {
        await supabase
          .from('budgets')
          .update({ spent: 0 })
          .eq('id', budget.id);
      }
      
      // Réinitialiser les départements
      const { data: departments } = await supabase
        .from('departments')
        .select('id');
      
      for (const department of departments || []) {
        await supabase
          .from('departments')
          .update({ balance: 0 })
          .eq('id', department.id);
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  };

  if (!isAdmin) {
    return null; // Ne pas afficher le composant pour les non-administrateurs
  }

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-red-500/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            Réinitialiser les données
          </h3>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            Supprime toutes les transactions et réinitialise les compteurs à zéro. Cette action est irréversible.
          </p>
        </div>
      </div>

      <Button 
        variant="destructive" 
        onClick={() => setIsResetDialogOpen(true)}
        className="w-full"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Réinitialiser toutes les données
      </Button>

      {/* Dialogue de confirmation de réinitialisation */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Réinitialiser les données de l'application?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action va supprimer toutes les transactions et remettre à zéro les compteurs. Elle ne peut pas être annulée.
              Toutes les fonctionnalités de l'application resteront opérationnelles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetConfirm} className="bg-red-500 hover:bg-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Réinitialiser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue d'authentification */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmez votre identité</DialogTitle>
            <DialogDescription>
              Pour des raisons de sécurité, veuillez saisir à nouveau vos identifiants administrateur.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAuthSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAuthDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isResetting}
              >
                {isResetting ? "Réinitialisation..." : "Confirmer la réinitialisation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetAppData;
