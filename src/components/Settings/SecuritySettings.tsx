
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Sécurité</h2>
        <p className="text-sm text-gray-400">Gérez les paramètres de sécurité de votre compte</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Changer le mot de passe</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mot de passe actuel</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nouveau mot de passe</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple mt-2">
              Mettre à jour le mot de passe
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Activer l'authentification à deux facteurs</p>
              <p className="text-sm text-gray-400">Sécurisez davantage votre compte avec une deuxième étape de vérification</p>
            </div>
            <Switch />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sessions actives</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Session actuelle</p>
                  <p className="text-sm text-gray-400">Antananarivo, Madagascar · Chrome · Mac OS</p>
                  <p className="text-xs text-green-400 mt-1">Connecté maintenant</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Actif</Badge>
              </div>
            </div>
            <Button variant="outline" className="text-red-400">
              Déconnecter toutes les autres sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
