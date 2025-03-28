
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinanceHeaderProps {
  onFilterClick: () => void;
  onExportClick: () => void;
  onAddTransactionClick: () => void;
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({ 
  onFilterClick, 
  onExportClick, 
  onAddTransactionClick 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Gestion Financière</h1>
        <p className="text-gray-400 mt-1">Suivez, analysez et gérez les finances de votre église</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onFilterClick}
        >
          <Filter size={16} />
          Filtrer
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onExportClick}
        >
          <Download size={16} />
          Exporter
        </Button>
        <Button 
          className="bg-gradient-to-r from-church-cyan to-church-purple flex items-center gap-2"
          onClick={onAddTransactionClick}
        >
          <PlusCircle size={16} />
          Nouvelle transaction
        </Button>
      </div>
    </div>
  );
};

export default FinanceHeader;
