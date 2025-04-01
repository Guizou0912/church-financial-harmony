
import React, { useState } from 'react';
import { Bell, BellRing, CheckCircle2, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatMGA } from '@/lib/utils';

interface Alert {
  id: string;
  type: string;
  threshold: number;
  enabled: boolean;
  channel: string;
  description: string;
}

interface AlertConfigurationProps {
  onSaveAlerts: (alerts: Alert[]) => void;
  existingAlerts?: Alert[];
}

const defaultAlerts: Alert[] = [
  {
    id: '1',
    type: 'budget_threshold',
    threshold: 80,
    enabled: true,
    channel: 'email',
    description: 'Alerte lorsque le budget atteint 80% de sa limite'
  },
  {
    id: '2',
    type: 'low_balance',
    threshold: 5000000,
    enabled: true,
    channel: 'sms',
    description: 'Alerte lorsque le solde est inférieur à 5 000 000 Ar'
  },
  {
    id: '3',
    type: 'large_transaction',
    threshold: 10000000,
    enabled: false,
    channel: 'both',
    description: 'Alerte lors de transactions supérieures à 10 000 000 Ar'
  }
];

const AlertConfiguration: React.FC<AlertConfigurationProps> = ({ 
  onSaveAlerts,
  existingAlerts = defaultAlerts
}) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(existingAlerts);
  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id'>>({
    type: 'budget_threshold',
    threshold: 0,
    enabled: true,
    channel: 'email',
    description: ''
  });

  const handleSaveAlerts = () => {
    onSaveAlerts(alerts);
    toast({
      title: "Alertes mises à jour",
      description: "Les configuration d'alertes ont été enregistrées avec succès."
    });
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alerte supprimée",
      description: "L'alerte a été supprimée avec succès."
    });
  };

  const handleAddAlert = () => {
    if (newAlert.threshold <= 0) {
      toast({
        title: "Seuil invalide",
        description: "Veuillez entrer un seuil valide.",
        variant: "destructive"
      });
      return;
    }

    if (!newAlert.description.trim()) {
      toast({
        title: "Description manquante",
        description: "Veuillez entrer une description pour l'alerte.",
        variant: "destructive"
      });
      return;
    }

    const newAlertItem: Alert = {
      ...newAlert,
      id: Date.now().toString()
    };

    setAlerts([...alerts, newAlertItem]);
    setNewAlert({
      type: 'budget_threshold',
      threshold: 0,
      enabled: true,
      channel: 'email',
      description: ''
    });

    toast({
      title: "Alerte ajoutée",
      description: "La nouvelle alerte a été configurée avec succès."
    });
  };

  const alertTypes = [
    { value: 'budget_threshold', label: 'Seuil de budget (%)' },
    { value: 'low_balance', label: 'Solde bas (Ar)' },
    { value: 'large_transaction', label: 'Transaction importante (Ar)' },
    { value: 'recurring_payment', label: 'Paiement récurrent' },
    { value: 'overdue_payment', label: 'Paiement en retard' }
  ];

  const channelTypes = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'both', label: 'Email et SMS' },
    { value: 'app', label: 'Notification application' }
  ];

  const getThresholdLabel = (type: string): string => {
    switch (type) {
      case 'budget_threshold':
        return '% du budget';
      case 'low_balance':
      case 'large_transaction':
        return 'Montant (Ar)';
      default:
        return 'Seuil';
    }
  };

  const formatThreshold = (type: string, value: number): string => {
    if (type === 'budget_threshold') {
      return `${value}%`;
    }
    return formatMGA(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellRing className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-bold">Configuration des alertes</h2>
        </div>
        <Button size="sm" onClick={handleSaveAlerts}>
          Enregistrer
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div 
            key={alert.id}
            className={`p-4 border rounded-lg transition-all ${
              alert.enabled 
                ? 'border-white/20 bg-white/5' 
                : 'border-white/10 bg-white/0 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{alertTypes.find(t => t.value === alert.type)?.label}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                    alert.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {alert.enabled ? 'Activée' : 'Désactivée'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{alert.description}</p>
              </div>
              <div className="flex space-x-2">
                <Switch 
                  checked={alert.enabled}
                  onCheckedChange={() => handleToggleAlert(alert.id)}
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <div className="bg-white/10 px-2 py-1 rounded">
                <span className="text-gray-400 mr-1">Seuil:</span>
                {formatThreshold(alert.type, alert.threshold)}
              </div>
              <div className="bg-white/10 px-2 py-1 rounded">
                <span className="text-gray-400 mr-1">Canal:</span>
                {channelTypes.find(c => c.value === alert.channel)?.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4">
        <h3 className="text-lg font-medium mb-3">Ajouter une nouvelle alerte</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="alert-type">Type d'alerte</Label>
            <Select
              value={newAlert.type}
              onValueChange={(value) => setNewAlert({...newAlert, type: value})}
            >
              <SelectTrigger id="alert-type" className="text-base">
                <SelectValue placeholder="Sélectionner un type d'alerte" />
              </SelectTrigger>
              <SelectContent>
                {alertTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="alert-threshold">{getThresholdLabel(newAlert.type)}</Label>
            <Input
              id="alert-threshold"
              type="number"
              value={newAlert.threshold || ''}
              onChange={(e) => setNewAlert({...newAlert, threshold: Number(e.target.value)})}
              placeholder={newAlert.type === 'budget_threshold' ? "Ex: 80 pour 80%" : "Ex: 5000000"}
              className="text-base"
            />
          </div>

          <div>
            <Label htmlFor="alert-channel">Canal de notification</Label>
            <Select
              value={newAlert.channel}
              onValueChange={(value) => setNewAlert({...newAlert, channel: value})}
            >
              <SelectTrigger id="alert-channel" className="text-base">
                <SelectValue placeholder="Sélectionner un canal" />
              </SelectTrigger>
              <SelectContent>
                {channelTypes.map(channel => (
                  <SelectItem key={channel.value} value={channel.value}>{channel.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="alert-description">Description</Label>
            <Input
              id="alert-description"
              value={newAlert.description}
              onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
              placeholder="Ex: Alerte lorsque le budget atteint 80% de sa limite"
              className="text-base"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="alert-enabled"
              checked={newAlert.enabled}
              onCheckedChange={(checked) => setNewAlert({...newAlert, enabled: checked})}
            />
            <Label htmlFor="alert-enabled">Activer cette alerte</Label>
          </div>

          <Button 
            type="button" 
            onClick={handleAddAlert}
            className="w-full mt-2 text-base"
          >
            <Bell className="mr-2 h-4 w-4" />
            Ajouter l'alerte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfiguration;
