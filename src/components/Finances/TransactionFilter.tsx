
import React, { useState } from 'react';
import { Filter, CalendarRange, Calendar as CalendarIcon, X } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface TransactionFilterProps {
  onApplyFilter: (filters: TransactionFilters) => void;
}

export interface TransactionFilters {
  dateRange: DateRange | undefined;
  minAmount: number | null;
  maxAmount: number | null;
  type: string | null;
  categories: string[];
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ onApplyFilter }) => {
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange: undefined,
    minAmount: null,
    maxAmount: null,
    type: null,
    categories: []
  });

  // Using proper DateRange type from react-day-picker
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleReset = () => {
    setFilters({
      dateRange: undefined,
      minAmount: null,
      maxAmount: null,
      type: null,
      categories: []
    });
    setDate(undefined);
  };

  const handleApply = () => {
    // Update the date range from the calendar
    const updatedFilters = {
      ...filters,
      dateRange: date
    };
    onApplyFilter(updatedFilters);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      type: event.target.value === 'all' ? null : event.target.value
    });
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists 
          ? prev.categories.filter(c => c !== category) 
          : [...prev.categories, category]
      };
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'minAmount' | 'maxAmount') => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const revenueCategories = ['don', 'dime', 'contribution', 'autre'];
  const expenseCategories = ['utilitaire', 'equipement', 'salaire', 'maintenance', 'autre'];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-base font-medium">
          <Filter className="h-5 w-5" />
          Filtres avancés
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Filtres de transactions</SheetTitle>
          <SheetDescription>
            Affinez votre recherche avec des filtres personnalisés
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Période</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(date.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>Sélectionnez une période</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Type de transaction</Label>
            <select 
              className="w-full p-3 rounded-md border bg-white/5 text-base"
              value={filters.type || 'all'}
              onChange={handleTypeChange}
            >
              <option value="all">Tous</option>
              <option value="revenu">Revenus</option>
              <option value="depense">Dépenses</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Montant (Ar)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-amount" className="text-sm">Minimum</Label>
                <Input 
                  id="min-amount"
                  type="number" 
                  placeholder="0" 
                  className="text-base"
                  value={filters.minAmount !== null ? filters.minAmount : ''}
                  onChange={(e) => handleAmountChange(e, 'minAmount')}
                />
              </div>
              <div>
                <Label htmlFor="max-amount" className="text-sm">Maximum</Label>
                <Input 
                  id="max-amount"
                  type="number" 
                  placeholder="Sans limite" 
                  className="text-base"
                  value={filters.maxAmount !== null ? filters.maxAmount : ''}
                  onChange={(e) => handleAmountChange(e, 'maxAmount')}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Catégories</Label>
            <div className="grid grid-cols-2 gap-2">
              {(filters.type === 'revenu' || filters.type === null ? revenueCategories : []).map(category => (
                <Button
                  key={category}
                  type="button"
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="justify-start font-normal capitalize"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Button>
              ))}
              {(filters.type === 'depense' || filters.type === null ? expenseCategories : []).map(category => (
                <Button
                  key={category}
                  type="button"
                  variant={filters.categories.includes(category) ? "default" : "outline"}
                  className="justify-start font-normal capitalize"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <SheetFooter className="mt-6 flex flex-col sm:flex-row gap-2">
          <SheetClose asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full text-base"
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button 
              type="button" 
              className="w-full text-base"
              onClick={handleApply}
            >
              Appliquer les filtres
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionFilter;
