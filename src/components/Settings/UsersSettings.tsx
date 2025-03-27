
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UsersSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Gestion des Utilisateurs</h2>
        <p className="text-sm text-gray-400">Gérez les utilisateurs et leurs autorisations</p>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan w-64"
        />
        <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5 text-left">
              <th className="p-3 text-sm font-semibold">Utilisateur</th>
              <th className="p-3 text-sm font-semibold">Email</th>
              <th className="p-3 text-sm font-semibold">Rôle</th>
              <th className="p-3 text-sm font-semibold">Statut</th>
              <th className="p-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Andry Ravalomanda', email: 'andry.r@gmail.com', role: 'admin', active: true },
              { name: 'Sophie Rakoto', email: 'sophie@example.com', role: 'manager', active: true },
              { name: 'Jean Ravalison', email: 'jean@example.com', role: 'manager', active: true },
              { name: 'Natacha Rasolofo', email: 'natacha@example.com', role: 'viewer', active: false },
            ].map((user, index) => (
              <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-church-purple text-white text-xs">
                        {user.name.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <Badge className={user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                    user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-gray-500/20 text-gray-400'}>
                    {user.role === 'admin' ? 'Administrateur' : 
                     user.role === 'manager' ? 'Gestionnaire' : 'Observateur'}
                  </Badge>
                </td>
                <td className="p-3">
                  <Badge className={user.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                    {user.active ? 'Actif' : 'Inactif'}
                  </Badge>
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">Modifier</Button>
                    {!user.active && <Button variant="ghost" size="sm">Activer</Button>}
                    {user.active && <Button variant="ghost" size="sm">Désactiver</Button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSettings;
