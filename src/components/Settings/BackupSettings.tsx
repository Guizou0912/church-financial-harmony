
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Check, Download } from 'lucide-react';

const BackupSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default BackupSettings;
