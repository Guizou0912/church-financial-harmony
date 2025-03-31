
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartCard from '@/components/Dashboard/ChartCard';
import TransactionTable from './TransactionTable';
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Download, Filter } from 'lucide-react';
import { formatMGA } from '@/lib/utils';
import TransactionFilter, { TransactionFilters } from './TransactionFilter';

interface TransactionTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  revenueData: { name: string; value: number }[];
  depenseData: { name: string; value: number }[];
  transactionsRevenues: any[];
  transactionsDepenses: any[];
  handleTransactionClick: (transaction: any, type: 'revenu' | 'depense') => void;
  handleChartClick: (chartType: string) => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({
  activeTab,
  setActiveTab,
  revenueData,
  depenseData,
  transactionsRevenues,
  transactionsDepenses,
  handleTransactionClick,
  handleChartClick
}) => {
  const [appliedFilters, setAppliedFilters] = useState<TransactionFilters | null>(null);

  const totalRevenues = revenueData.reduce((sum, item) => sum + item.value, 0);
  const totalDepenses = depenseData.reduce((sum, item) => sum + item.value, 0);
  
  const handleApplyFilter = (filters: TransactionFilters) => {
    setAppliedFilters(filters);
    // In a real app, we would filter the transactions here
  };

  const handleExportTransactions = (type: 'revenus' | 'depenses') => {
    // In a real app, this would trigger a download
    alert(`Exportation des ${type} en cours...`);
  };

  const clearFilters = () => {
    setAppliedFilters(null);
  };

  return (
    <div className="glass-card p-5">
      <Tabs 
        defaultValue="revenus" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="revenus" className="text-base py-3">Revenus</TabsTrigger>
          <TabsTrigger value="depenses" className="text-base py-3">Dépenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenus" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold">Total des revenus: {formatMGA(totalRevenues)}</h2>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => handleExportTransactions('revenus')}
              >
                <Download className="h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <ChartCard
              title="Évolution des Revenus"
              subtitle="Revenus mensuels pour l'année en cours"
              type="area"
              data={revenueData}
              onClick={() => handleChartClick('Évolution des Revenus')}
            />
          </div>
          
          {appliedFilters && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Filtres appliqués</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {appliedFilters.dateRange.from && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Du: {appliedFilters.dateRange.from.toLocaleDateString()}
                    {appliedFilters.dateRange.to && ` au ${appliedFilters.dateRange.to.toLocaleDateString()}`}
                  </div>
                )}
                {appliedFilters.minAmount !== null && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Min: {formatMGA(appliedFilters.minAmount)}
                  </div>
                )}
                {appliedFilters.maxAmount !== null && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Max: {formatMGA(appliedFilters.maxAmount)}
                  </div>
                )}
                {appliedFilters.categories.map(cat => (
                  <div key={cat} className="bg-white/10 text-xs px-2 py-1 rounded-full capitalize">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <TransactionTable 
            transactions={transactionsRevenues}
            onTransactionClick={handleTransactionClick}
            type="revenu"
          />
        </TabsContent>
        
        <TabsContent value="depenses" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold">Total des dépenses: {formatMGA(totalDepenses)}</h2>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => handleExportTransactions('depenses')}
              >
                <Download className="h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <ChartCard
              title="Évolution des Dépenses"
              subtitle="Dépenses mensuelles pour l'année en cours"
              type="area"
              data={depenseData}
              onClick={() => handleChartClick('Évolution des Dépenses')}
            />
          </div>
          
          {appliedFilters && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Filtres appliqués</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {appliedFilters.dateRange.from && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Du: {appliedFilters.dateRange.from.toLocaleDateString()}
                    {appliedFilters.dateRange.to && ` au ${appliedFilters.dateRange.to.toLocaleDateString()}`}
                  </div>
                )}
                {appliedFilters.minAmount !== null && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Min: {formatMGA(appliedFilters.minAmount)}
                  </div>
                )}
                {appliedFilters.maxAmount !== null && (
                  <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    Max: {formatMGA(appliedFilters.maxAmount)}
                  </div>
                )}
                {appliedFilters.categories.map(cat => (
                  <div key={cat} className="bg-white/10 text-xs px-2 py-1 rounded-full capitalize">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <TransactionTable 
            transactions={transactionsDepenses}
            onTransactionClick={handleTransactionClick}
            type="depense"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionTabs;
