
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell, Smartphone, Save } from 'lucide-react';

const NotificationsSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default NotificationsSettings;
