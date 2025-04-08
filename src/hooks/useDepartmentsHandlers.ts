
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseData, Department as SupabaseDepartment, Transaction as SupabaseTransaction } from './useSupabaseData';

export interface Transaction {
  id: number | string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface Department {
  id: number | string;
  name: string;
  leader: string;
  leaderAvatar: string | null;
  memberCount: number;
  budget: number;
  status: 'active' | 'inactive';
  transactions: Transaction[];
  balance: number;
}

// Fonction pour convertir une entrée Supabase en format UI
const mapDepartmentToUi = (department: SupabaseDepartment, transactions: SupabaseTransaction[] = []): Department => {
  // Convertir les transactions associées à ce département
  const departmentTransactions = transactions
    .filter(t => t.department === department.name)
    .map(t => ({
      id: t.id,
      description: t.description,
      amount: Number(t.amount),
      date: new Date(t.transaction_date).toISOString().split('T')[0],
      type: t.transaction_type as 'income' | 'expense'
    }));
  
  return {
    id: department.id,
    name: department.name,
    leader: department.leader || '',
    leaderAvatar: department.leader_avatar || null,
    memberCount: Number(department.member_count) || 0,
    budget: Number(department.budget) || 0,
    status: department.status as 'active' | 'inactive',
    transactions: departmentTransactions,
    balance: Number(department.balance) || 0
  };
};

export const useDepartmentsHandlers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  
  const {
    fetchDepartments,
    addDepartment,
    updateDepartment,
    fetchTransactions,
    addTransaction
  } = useSupabaseData();

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Charger tous les départements
        const departmentsData = await fetchDepartments();
        
        // Charger toutes les transactions
        const transactionsData = await fetchTransactions();
        
        // Mapper les données pour l'UI
        const departmentsForUi = departmentsData.map(dept => 
          mapDepartmentToUi(dept, transactionsData)
        );
        
        setDepartments(departmentsForUi);
      } catch (error) {
        console.error("Erreur lors du chargement des départements:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les départements",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddDepartment = () => {
    setShowAddDepartmentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddDepartmentModal(false);
  };

  const handleSaveDepartment = async (newDepartment: Omit<Department, 'id' | 'transactions' | 'balance'>) => {
    // Conversion au format Supabase
    const departmentData = {
      name: newDepartment.name,
      leader: newDepartment.leader,
      leader_avatar: newDepartment.leaderAvatar || null,
      member_count: newDepartment.memberCount,
      budget: newDepartment.budget,
      status: newDepartment.status,
      balance: 0
    };
    
    const result = await addDepartment(departmentData);
    
    if (result) {
      // Ajouter le nouveau département à la liste
      const departmentWithUiFormat = mapDepartmentToUi(result);
      setDepartments(prev => [...prev, departmentWithUiFormat]);
      setShowAddDepartmentModal(false);
      
      toast({
        title: "Département ajouté",
        description: `Le département "${newDepartment.name}" a été créé avec succès.`,
      });
    }
  };

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department);
    
    toast({
      title: "Département sélectionné",
      description: `Vous consultez maintenant le département "${department.name}".`,
    });
  };

  const handleToggleStatus = async (id: string | number) => {
    const department = departments.find(dept => dept.id === id);
    if (!department) return;
    
    const newStatus = department.status === 'active' ? 'inactive' : 'active';
    
    // Mise à jour dans Supabase
    const result = await updateDepartment(id.toString(), {
      status: newStatus
    });
    
    if (result) {
      // Mise à jour locale
      setDepartments(departments.map(dept => {
        if (dept.id === id) {
          toast({
            title: `Statut mis à jour`,
            description: `Le département "${dept.name}" est maintenant ${newStatus === 'active' ? 'actif' : 'inactif'}.`,
          });
          
          return {
            ...dept,
            status: newStatus
          };
        }
        return dept;
      }));
      
      // Mettre à jour le département sélectionné si nécessaire
      if (selectedDepartment?.id === id) {
        setSelectedDepartment({
          ...selectedDepartment,
          status: newStatus
        });
      }
    }
  };

  const handleAddTransaction = async (departmentId: number | string, transaction: Omit<Transaction, 'id'>) => {
    const department = departments.find(dept => dept.id === departmentId);
    if (!department) return;
    
    // Conversion au format Supabase
    const transactionData = {
      description: transaction.description,
      amount: transaction.amount,
      transaction_date: transaction.date,
      transaction_type: transaction.type,
      department: department.name
    };
    
    const result = await addTransaction(transactionData);
    
    if (result) {
      // Calculer le nouveau solde
      const newBalance = transaction.type === 'income' 
        ? Number(department.balance) + Number(transaction.amount) 
        : Number(department.balance) - Number(transaction.amount);
      
      // Mettre à jour le département dans Supabase
      await updateDepartment(departmentId.toString(), {
        balance: newBalance
      });
      
      // Mettre à jour l'état local
      const uiTransaction = {
        id: result.id,
        description: result.description,
        amount: Number(result.amount),
        date: new Date(result.transaction_date).toISOString().split('T')[0],
        type: result.transaction_type as 'income' | 'expense'
      };
      
      setDepartments(departments.map(dept => {
        if (dept.id === departmentId) {
          toast({
            title: `Transaction enregistrée`,
            description: `${transaction.type === 'income' ? 'Entrée' : 'Sortie'} de ${transaction.amount.toLocaleString()} Ar ajoutée au département "${dept.name}".`,
          });
          
          return {
            ...dept,
            transactions: [...dept.transactions, uiTransaction],
            balance: newBalance
          };
        }
        return dept;
      }));
      
      // Mettre à jour le département sélectionné si nécessaire
      if (selectedDepartment?.id === departmentId) {
        setSelectedDepartment({
          ...selectedDepartment,
          transactions: [...selectedDepartment.transactions, uiTransaction],
          balance: newBalance
        });
      }
    }
    
    setShowTransactionModal(false);
  };

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.leader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Données pour le graphique de performance des départements
  const departmentPerformanceData = departments.map(dept => ({
    name: dept.name.split(' ')[0],  // Prendre juste le premier mot pour le graphique
    value: dept.budget
  }));

  return {
    departments: filteredDepartments,
    searchQuery,
    selectedDepartment,
    showAddDepartmentModal,
    showTransactionModal,
    departmentPerformanceData,
    loading,
    handleSearchChange,
    handleAddDepartment,
    handleCloseModal,
    handleSaveDepartment,
    handleDepartmentClick,
    handleToggleStatus,
    handleAddTransaction,
    setShowTransactionModal,
    setSelectedDepartment
  };
};
