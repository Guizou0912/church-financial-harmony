
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save, 
  User, 
  Users, 
  Bell, 
  Lock,
  Globe,
  Database,
  FileText,
  Mail,
  Smartphone,
  Check,
  Download
} from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Settings = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Paramètres</h1>
          <p className="text-gray-400 mt-1">Gérez les paramètres de votre application</p>
        </div>

        <div className="glass-card">
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
                <TabsContent value="profile" className="space-y-6">
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
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
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
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
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
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Préférences de Notification</h2>
                    <p className="text-sm text-gray-400">Gérez la façon dont vous recevez les notifications</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    {[
                      { title: 'Nouvelles transactions', description: 'Recevez une notification lorsqu\'une nouvelle transaction est enregistrée', email: true, push: true, sms: false },
                      { title: 'Rapports hebdomadaires', description: 'Recevoir le résumé hebdomadaire des activités financières', email: true, push: false, sms: false },
                      { title: 'Rappels d\'événements', description: 'Recevoir des rappels pour les événements à venir', email: true, push: true, sms: true },
                      { title: 'Alertes budgétaires', description: 'Être notifié lorsqu\'un budget atteint 80% de son allocation', email: true, push: true, sms: false },
                      { title: 'Activité de connexion', description: 'Être notifié lorsqu\'une nouvelle connexion est détectée', email: true, push: false, sms: false },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/10">
                        <div className="mb-4 sm:mb-0">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <Mail className="h-5 w-5 mb-1 text-gray-400" />
                            <Switch checked={item.email} />
                          </div>
                          <div className="flex flex-col items-center">
                            <Bell className="h-5 w-5 mb-1 text-gray-400" />
                            <Switch checked={item.push} />
                          </div>
                          <div className="flex flex-col items-center">
                            <Smartphone className="h-5 w-5 mb-1 text-gray-400" />
                            <Switch checked={item.sms} />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button className="bg-gradient-to-r from-church-cyan to-church-purple mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer les préférences
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="general" className="space-y-6">
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
                </TabsContent>

                <TabsContent value="backup" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Sauvegarde & Export</h2>
                    <p className="text-sm text-gray-400">Gérez les sauvegardes et exportez les données</p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-lg font-medium">Sauvegarde automatique</h3>
                      <p className="text-sm text-gray-400 mt-1 mb-4">Configurez la fréquence des sauvegardes automatiques</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium">Activer les sauvegardes automatiques</p>
                        <Switch />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Fréquence</p>
                          <select
                            defaultValue="weekly"
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
                          >
                            <option value="daily">Quotidienne</option>
                            <option value="weekly">Hebdomadaire</option>
                            <option value="monthly">Mensuelle</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Conserver</p>
                          <select
                            defaultValue="5"
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-church-cyan"
                          >
                            <option value="3">Les 3 dernières</option>
                            <option value="5">Les 5 dernières</option>
                            <option value="10">Les 10 dernières</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-lg font-medium">Sauvegarde manuelle</h3>
                      <p className="text-sm text-gray-400 mt-1 mb-4">Créez une sauvegarde complète des données</p>
                      
                      <Button className="w-full bg-gradient-to-r from-church-cyan to-church-purple">
                        <Database className="h-4 w-4 mr-2" />
                        Créer une sauvegarde maintenant
                      </Button>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-lg font-medium">Exporter les données</h3>
                      <p className="text-sm text-gray-400 mt-1 mb-4">Exportez des données spécifiques dans différents formats</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Exporter les finances (CSV)
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Exporter les membres (CSV)
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Exporter les événements (CSV)
                        </Button>
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Exporter les rapports (PDF)
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Sauvegardes récentes</h3>
                      
                      <div className="space-y-2">
                        {[
                          { date: '12 Juillet 2023 - 08:30', size: '24.5 MB', status: 'success' },
                          { date: '05 Juillet 2023 - 08:30', size: '24.2 MB', status: 'success' },
                          { date: '28 Juin 2023 - 08:30', size: '23.8 MB', status: 'success' },
                        ].map((backup, index) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10">
                            <div>
                              <p className="font-medium text-sm">{backup.date}</p>
                              <p className="text-xs text-gray-400">{backup.size}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {backup.status === 'success' && (
                                <Badge className="bg-green-500/20 text-green-400">
                                  <Check className="h-3 w-3 mr-1" />
                                  Réussie
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Settings;
