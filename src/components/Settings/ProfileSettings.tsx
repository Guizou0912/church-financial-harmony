
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Informations du Profil</h2>
        <p className="text-sm text-gray-400">Mettez à jour les informations de votre profil et de l'église</p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28">
            <AvatarFallback className="bg-church-purple text-white text-2xl">
              AR
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Changer l'image
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prénom</label>
              <input
                type="text"
                defaultValue="Andry"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom</label>
              <input
                type="text"
                defaultValue="Ravalomanda"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse Email</label>
            <input
              type="email"
              defaultValue="andry.r@gmail.com"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Rôle</label>
            <select
              defaultValue="admin"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
            >
              <option value="admin">Administrateur</option>
              <option value="manager">Gestionnaire</option>
              <option value="viewer">Observateur</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nom de l'Église</label>
            <input
              type="text"
              defaultValue="Église Évangélique d'Antananarivo"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">À propos</label>
            <Textarea 
              defaultValue="Administrateur principal de l'application financière, responsable de la supervision des finances de l'église depuis 2020."
              className="min-h-[100px] bg-white/5 border border-white/10"
            />
          </div>

          <div className="pt-4">
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
              <Save className="h-4 w-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
