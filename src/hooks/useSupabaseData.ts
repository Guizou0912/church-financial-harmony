
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  transaction_date: string;
  transaction_type: 'income' | 'expense';
  category?: string;
  department?: string;
  user_id: string;
}

interface Budget {
  id: string;
  name: string;
  total: number;
  spent: number;
  color: string;
  user_id: string;
}

interface Department {
  id: string;
  name: string;
  leader: string;
  leader_avatar?: string;
  member_count: number;
  budget: number;
  status: 'active' | 'inactive';
  balance: number;
  user_id: string;
}

export const useSupabaseData = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  // Transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (error) throw error;
      return data as Transaction[] || [];
    } catch (error: any) {
      toast({
        title: "Erreur lors du chargement des transactions",
        description: error.message,
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user?.id }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Transaction ajoutée",
        description: "La transaction a été enregistrée avec succès."
      });
      
      return data[0] as Transaction;
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'ajout de la transaction",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Budgets
  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budgets')
        .select('*');

      if (error) throw error;
      return data as Budget[] || [];
    } catch (error: any) {
      toast({
        title: "Erreur lors du chargement des budgets",
        description: error.message,
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budgets')
        .insert([{ ...budget, user_id: user?.id }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Budget ajouté",
        description: "Le budget a été enregistré avec succès."
      });
      
      return data[0] as Budget;
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'ajout du budget",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('departments')
        .select('*');

      if (error) throw error;
      return data as Department[] || [];
    } catch (error: any) {
      toast({
        title: "Erreur lors du chargement des départements",
        description: error.message,
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async (department: Omit<Department, 'id' | 'user_id'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('departments')
        .insert([{ ...department, user_id: user?.id }])
        .select();

      if (error) throw error;
      
      toast({
        title: "Département ajouté",
        description: "Le département a été enregistré avec succès."
      });
      
      return data[0] as Department;
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'ajout du département",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update functions
  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budgets')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      toast({
        title: "Budget mis à jour",
        description: "Le budget a été mis à jour avec succès."
      });
      
      return data[0] as Budget;
    } catch (error: any) {
      toast({
        title: "Erreur lors de la mise à jour du budget",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDepartment = async (id: string, updates: Partial<Department>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('departments')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      toast({
        title: "Département mis à jour",
        description: "Le département a été mis à jour avec succès."
      });
      
      return data[0] as Department;
    } catch (error: any) {
      toast({
        title: "Erreur lors de la mise à jour du département",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Nouvelle fonction pour effacer toutes les transactions
  const deleteAllTransactions = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('transactions')
        .delete()
        .not('id', 'is', null);  // Supprime toutes les transactions

      if (error) throw error;
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erreur lors de la suppression des transactions",
        description: error.message,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchTransactions,
    addTransaction,
    fetchBudgets,
    addBudget,
    updateBudget,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteAllTransactions
  };
};

export type { Transaction, Budget, Department };
