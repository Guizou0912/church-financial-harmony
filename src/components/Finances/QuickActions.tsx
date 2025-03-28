
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, CalendarRange, Bell } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (actionType: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <div className="glass-card p-5 mt-6">
      <h3 className="text-lg font-bold mb-4">Actions Rapides</h3>
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => onActionClick('payments')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Approuver les paiements
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => onActionClick('report')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Générer un rapport
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => onActionClick('budget')}
        >
          <CalendarRange className="h-4 w-4 mr-2" />
          Planifier le budget
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start hover:bg-white/10"
          onClick={() => onActionClick('alerts')}
        >
          <Bell className="h-4 w-4 mr-2" />
          Configurer les alertes
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
