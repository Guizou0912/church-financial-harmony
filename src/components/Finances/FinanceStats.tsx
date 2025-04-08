
import React from 'react';
import { DollarSign, ShoppingCart, BarChart3, TrendingUp } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import { formatMGA } from '@/lib/utils';

interface FinanceStatsProps {
  onStatCardClick: (type: string) => void;
  revenuTotal?: number;
  depenseTotal?: number;
  soldeActuel?: number;
  croissance?: number;
}

const FinanceStats: React.FC<FinanceStatsProps> = ({ 
  onStatCardClick,
  revenuTotal = 0,
  depenseTotal = 0,
  soldeActuel = 0,
  croissance = 0
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Revenus Totaux"
        value={formatMGA(revenuTotal)}
        icon={<DollarSign className="h-5 w-5" />}
        trend={0}
        className="border-l-4 border-l-green-500"
        onClick={() => onStatCardClick('revenus')}
        description="Consultation des revenus totaux et des sources de financement"
      />
      <StatCard
        title="Dépenses Totales"
        value={formatMGA(depenseTotal)}
        icon={<ShoppingCart className="h-5 w-5" />}
        trend={0}
        className="border-l-4 border-l-red-500"
        onClick={() => onStatCardClick('depenses')}
        description="Analyse détaillée des dépenses par catégorie"
      />
      <StatCard
        title="Solde Actuel"
        value={formatMGA(soldeActuel)}
        icon={<BarChart3 className="h-5 w-5" />}
        trend={0}
        className="border-l-4 border-l-church-cyan"
        onClick={() => onStatCardClick('solde')}
        description="Visualisation du solde disponible et des prévisions"
      />
      <StatCard
        title="Croissance Annuelle"
        value={`${croissance}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        trend={0}
        className="border-l-4 border-l-church-purple"
        onClick={() => onStatCardClick('croissance')}
        description="Analyse de la croissance financière sur plusieurs périodes"
      />
    </div>
  );
};

export default FinanceStats;
