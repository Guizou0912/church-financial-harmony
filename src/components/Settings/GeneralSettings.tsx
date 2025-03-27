
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save } from 'lucide-react';

const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Paramètres Généraux</h2>
        <p className="text-sm text-gray-400">Gérez les paramètres généraux de l'application</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Devise par défaut</p>
            <p className="text-sm text-gray-400">Devise utilisée pour tous les rapports financiers</p>
          </div>
          <select
            defaultValue="MGA"
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
          >
            <option value="MGA">Ariary Malgache (MGA)</option>
            <option value="USD">Dollar Américain (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Langue</p>
            <p className="text-sm text-gray-400">Langue de l'interface utilisateur</p>
          </div>
          <select
            defaultValue="fr"
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="mg">Malgache</option>
          </select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Format de date</p>
            <p className="text-sm text-gray-400">Format d'affichage des dates</p>
          </div>
          <select
            defaultValue="dd/mm/yyyy"
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
          >
            <option value="dd/mm/yyyy">JJ/MM/AAAA</option>
            <option value="mm/dd/yyyy">MM/JJ/AAAA</option>
            <option value="yyyy-mm-dd">AAAA-MM-JJ</option>
          </select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Premier jour de la semaine</p>
            <p className="text-sm text-gray-400">Jour utilisé comme début de semaine dans les calendriers</p>
          </div>
          <select
            defaultValue="sunday"
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
          >
            <option value="sunday">Dimanche</option>
            <option value="monday">Lundi</option>
          </select>
        </div>

        <Button className="bg-gradient-to-r from-church-cyan to-church-purple mt-4">
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les paramètres
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
