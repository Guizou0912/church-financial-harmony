
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartCard from '@/components/Dashboard/ChartCard';
import TransactionTable from './TransactionTable';

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
  return (
    <div className="glass-card p-5">
      <Tabs 
        defaultValue="revenus" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="revenus">Revenus</TabsTrigger>
          <TabsTrigger value="depenses">Dépenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenus" className="mt-6">
          <div className="mb-6">
            <ChartCard
              title="Évolution des Revenus"
              subtitle="Revenus mensuels pour l'année en cours"
              type="area"
              data={revenueData}
              onClick={() => handleChartClick('Évolution des Revenus')}
            />
          </div>
          
          <TransactionTable 
            transactions={transactionsRevenues}
            onTransactionClick={handleTransactionClick}
            type="revenu"
          />
        </TabsContent>
        
        <TabsContent value="depenses" className="mt-6">
          <div className="mb-6">
            <ChartCard
              title="Évolution des Dépenses"
              subtitle="Dépenses mensuelles pour l'année en cours"
              type="area"
              data={depenseData}
              onClick={() => handleChartClick('Évolution des Dépenses')}
            />
          </div>
          
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
