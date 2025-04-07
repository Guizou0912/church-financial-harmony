
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Bell, Lock, Globe, Database, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSettings from './ProfileSettings';
import UsersSettings from './UsersSettings';
import SecuritySettings from './SecuritySettings';
import NotificationsSettings from './NotificationsSettings';
import GeneralSettings from './GeneralSettings';
import BackupSettings from './BackupSettings';
import RoleManagement from './RoleManagement';

const SettingsTabs = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  return (
    <Tabs defaultValue="profile" className="w-full">
      <div className="flex border-b border-white/10">
        <div className="p-4">
          <TabsList className="grid grid-flow-row auto-rows-max space-y-1 h-auto bg-transparent p-0">
            <TabsTrigger value="profile" className="justify-start px-4 py-2">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="users" className="justify-start px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Utilisateurs
              </TabsTrigger>
            )}
            {isAdmin && (
              <TabsTrigger value="roles" className="justify-start px-4 py-2">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Rôles
              </TabsTrigger>
            )}
            <TabsTrigger value="security" className="justify-start px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start px-4 py-2">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="general" className="justify-start px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Général
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="backup" className="justify-start px-4 py-2">
                <Database className="h-4 w-4 mr-2" />
                Sauvegarde & Export
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="flex-1 p-6">
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="users">
              <UsersSettings />
            </TabsContent>
          )}
          {isAdmin && (
            <TabsContent value="roles">
              <RoleManagement />
            </TabsContent>
          )}
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsSettings />
          </TabsContent>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="backup">
              <BackupSettings />
            </TabsContent>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
