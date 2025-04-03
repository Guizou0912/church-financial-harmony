
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'viewer' | 'manager' | 'admin';

interface User {
  id: string;
  email: string;
  role: AppRole;
}

const roleDescriptions = {
  viewer: "Peut uniquement visualiser les informations essentielles sur le tableau de bord.",
  manager: "Peut gérer les transactions et accéder aux rapports financiers.",
  admin: "Accès complet à toutes les fonctionnalités, y compris la gestion des utilisateurs."
};

const RoleManagement = () => {
  const { userRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch users with their roles
        const { data: userData, error: userError } = await supabase
          .from('user_roles')
          .select(`
            user_id,
            role
          `);

        if (userError) {
          throw userError;
        }

        // For each user, fetch their email
        const usersWithEmail = await Promise.all(
          userData.map(async (user) => {
            const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(
              user.user_id
            );
            
            if (authError) {
              console.error('Error fetching user email:', authError);
              return {
                id: user.user_id,
                email: 'Email non disponible',
                role: user.role as AppRole
              };
            }

            return {
              id: user.user_id,
              email: authUser?.user?.email || 'Email non disponible',
              role: user.role as AppRole
            };
          })
        );

        setUsers(usersWithEmail);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les utilisateurs.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Rôle mis à jour",
        description: "Le rôle de l'utilisateur a été mis à jour avec succès."
      });
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le rôle.",
        variant: "destructive"
      });
    }
  };

  if (userRole !== 'admin') {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold">Accès Restreint</h3>
        <p className="text-gray-400 mt-2">
          Seuls les administrateurs peuvent gérer les rôles des utilisateurs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Gestion des Rôles</h2>
        <p className="text-sm text-gray-400">Gérez les rôles et permissions des utilisateurs</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5 text-left">
                <th className="p-3 text-sm font-semibold">Utilisateur</th>
                <th className="p-3 text-sm font-semibold">Rôle</th>
                <th className="p-3 text-sm font-semibold">Description</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 
                      user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'manager' ? 'Gestionnaire' : 'Observateur'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-400">
                    {roleDescriptions[user.role]}
                  </td>
                  <td className="p-3">
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value: string) => handleRoleChange(user.id, value as AppRole)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Observateur</SelectItem>
                        <SelectItem value="manager">Gestionnaire</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
