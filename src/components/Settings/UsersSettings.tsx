
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  active: boolean;
}

const UsersSettings = () => {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Récupérer les utilisateurs de Supabase
      const { data: userRolesData, error: userRolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (userRolesError) throw userRolesError;

      // Pour chaque utilisateur, récupérer les informations d'authentification
      const usersWithData = await Promise.all(userRolesData.map(async (userRole) => {
        try {
          const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(
            userRole.user_id
          );
          
          if (authError) throw authError;
          
          // Déterminer si l'utilisateur est actif
          const isActive = user?.email_confirmed_at !== null;
          
          // Créer notre objet utilisateur avec toutes les informations nécessaires
          return {
            id: user?.id || userRole.user_id,
            name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'Utilisateur',
            email: user?.email || 'Email non disponible',
            role: userRole.role,
            active: isActive
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Retourner un objet utilisateur minimal en cas d'erreur
          return {
            id: userRole.user_id,
            name: 'Utilisateur inconnu',
            email: 'Email non disponible',
            role: userRole.role,
            active: false
          };
        }
      }));

      // Si certains utilisateurs ne sont pas récupérables, on les filtre
      const validUsers = usersWithData.filter(user => user.email !== 'Email non disponible');
      
      // Ajouter les utilisateurs de démonstration si nécessaires
      const demoUsers: User[] = [
        { id: '1-demo', name: 'Admin Demo', email: 'admin@demo.com', role: 'admin', active: true },
        { id: '2-demo', name: 'Manager Demo', email: 'manager@demo.com', role: 'manager', active: true },
        { id: '3-demo', name: 'Viewer Demo', email: 'viewer@demo.com', role: 'viewer', active: true },
        { id: '4-demo', name: 'Natacha Rasolofo', email: 'natacha@example.com', role: 'viewer', active: false },
      ];
      
      // Vérifier si les emails des démos existent déjà dans les utilisateurs récupérés
      const demoEmails = new Set(demoUsers.map(user => user.email));
      const existingEmails = new Set(validUsers.map(user => user.email));
      
      // Ajouter seulement les démos qui n'existent pas déjà
      const newDemoUsers = demoUsers.filter(demo => !existingEmails.has(demo.email));
      
      setUsers([...validUsers, ...newDemoUsers]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive"
      });
      
      // En cas d'erreur, utiliser au moins les utilisateurs de démonstration
      setUsers([
        { id: '1-demo', name: 'Admin Demo', email: 'admin@demo.com', role: 'admin', active: true },
        { id: '2-demo', name: 'Manager Demo', email: 'manager@demo.com', role: 'manager', active: true },
        { id: '3-demo', name: 'Viewer Demo', email: 'viewer@demo.com', role: 'viewer', active: true },
        { id: '4-demo', name: 'Natacha Rasolofo', email: 'natacha@example.com', role: 'viewer', active: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Fonctionnalité de démonstration",
      description: "L'ajout d'utilisateurs n'est pas disponible dans cette version de démonstration.",
    });
  };

  const handleAction = (action: string, user: User) => {
    toast({
      title: "Fonctionnalité de démonstration",
      description: `L'action "${action}" sur l'utilisateur ${user.email} n'est pas disponible dans cette version de démonstration.`,
    });
  };

  const filteredUsers = searchQuery
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const canManageUsers = hasPermission('admin');

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          className="bg-gradient-to-r from-church-cyan to-church-purple"
          onClick={handleAddUser}
          disabled={!canManageUsers}
        >
          Ajouter un utilisateur
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 hover:bg-white/5">
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-church-purple text-white text-xs">
                          {user.name.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                      user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-gray-500/20 text-gray-400'}>
                      {user.role === 'admin' ? 'Administrateur' : 
                      user.role === 'manager' ? 'Gestionnaire' : 'Observateur'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {user.active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {canManageUsers && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAction('Modifier', user)}
                        >
                          Modifier
                        </Button>
                      )}
                      {!user.active && canManageUsers && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAction('Activer', user)}
                        >
                          Activer
                        </Button>
                      )}
                      {user.active && canManageUsers && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAction('Désactiver', user)}
                        >
                          Désactiver
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-400">Aucun utilisateur trouvé</p>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        <p>Utilisateurs de démonstration disponibles:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>admin@demo.com - mot de passe: password123 (Administrateur)</li>
          <li>manager@demo.com - mot de passe: password123 (Gestionnaire)</li>
          <li>viewer@demo.com - mot de passe: password123 (Observateur)</li>
        </ul>
      </div>
    </div>
  );
};

export default UsersSettings;
