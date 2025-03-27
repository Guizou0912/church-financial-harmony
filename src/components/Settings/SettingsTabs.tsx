
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Bell, Lock, Globe, Database } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import UsersSettings from './UsersSettings';
import SecuritySettings from './SecuritySettings';
import NotificationsSettings from './NotificationsSettings';
import GeneralSettings from './GeneralSettings';
import BackupSettings from './BackupSettings';

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <div className="flex border-b border-white/10">
        <div className="p-4">
          <TabsList className="grid grid-flow-row auto-rows-max space-y-1 h-auto bg-transparent p-0">
            <TabsTrigger value="profile" className="justify-start px-4 py-2">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="users" className="justify-start px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
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
            <TabsTrigger value="backup" className="justify-start px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              Sauvegarde & Export
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 p-6">
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="users">
            <UsersSettings />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsSettings />
          </TabsContent>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="backup">
            <BackupSettings />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
