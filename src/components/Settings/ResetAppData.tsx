
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const ResetAppData = () => {
  const { toast } = useToast();
  const { userRole, user, signIn } = useAuth();
  const { resetEntireApplication } = useSupabaseData();
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
      const resetSuccess = await resetEntireApplication();
      
      if (!resetSuccess) {
        throw new Error("Échec de la réinitialisation");
      }
      
      setIsAuthDialogOpen(false);
      setIsResetDialogOpen(false);
      setPassword("");
      setEmail("");
      
      toast({
        title: "Réinitialisation réussie",
        description: "Toutes les données de l'application ont été réinitialisées",
      });

      // Signaler au navigateur de recharger toutes les données
      localStorage.setItem('appReset', 'true');
      
      // Rediriger vers la page d'accueil et forcer un rechargement complet
      setTimeout(() => {
        window.location.href = '/';
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 500);
      
    } catch (error: any) {
      toast({
        title: "Erreur lors de la réinitialisation",
        description: error.message || "Veuillez vérifier vos identifiants et réessayer",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
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
            Supprime toutes les transactions et réinitialise tous les compteurs à zéro. Cette action est irréversible.
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
                disabled={isResetting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isResetting}
              >
                {isResetting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Réinitialisation en cours...
                  </>
                ) : "Confirmer la réinitialisation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResetAppData;
