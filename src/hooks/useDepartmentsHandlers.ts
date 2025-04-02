
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface Department {
  id: number;
  name: string;
  leader: string;
  leaderAvatar: string | null;
  memberCount: number;
  budget: number;
  status: 'active' | 'inactive';
  transactions: Transaction[];
  balance: number;
}

export const useDepartmentsHandlers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([
    { 
      id: 1, 
      name: 'Ministère du Culte', 
      leader: 'Sophie Rakoto', 
      leaderAvatar: null,
      memberCount: 24, 
      budget: 30000000,
      status: 'active',
      transactions: [
        { id: 1, description: 'Don pour bibles', amount: 2000000, date: '2023-06-15', type: 'income' },
        { id: 2, description: 'Achat matériel audio', amount: 1500000, date: '2023-06-30', type: 'expense' }
      ],
      balance: 500000
    },
    { 
      id: 2, 
      name: 'Jeunesse', 
      leader: 'Jean Ravalison', 
      leaderAvatar: null,
      memberCount: 38, 
      budget: 25000000,
      status: 'active',
      transactions: [
        { id: 3, description: 'Contribution camp jeunesse', amount: 3000000, date: '2023-07-05', type: 'income' },
        { id: 4, description: 'Matériel sportif', amount: 1200000, date: '2023-07-10', type: 'expense' }
      ],
      balance: 1800000
    },
    { 
      id: 3, 
      name: 'Missions & Évangélisation', 
      leader: 'François Andriamasy', 
      leaderAvatar: null,
      memberCount: 16, 
      budget: 32000000,
      status: 'active',
      transactions: [],
      balance: 0
    },
    { 
      id: 4, 
      name: 'Administration', 
      leader: 'Natacha Rasolofo', 
      leaderAvatar: null,
      memberCount: 12, 
      budget: 18000000,
      status: 'active',
      transactions: [],
      balance: 0
    },
    { 
      id: 5, 
      name: 'Ministère des Femmes', 
      leader: 'Marie Razafindrakoto', 
      leaderAvatar: null,
      memberCount: 45, 
      budget: 22000000,
      status: 'active',
      transactions: [],
      balance: 0
    },
    { 
      id: 6, 
      name: 'Média & Communication', 
      leader: 'Paul Ranaivo', 
      leaderAvatar: null,
      memberCount: 8, 
      budget: 15000000,
      status: 'inactive',
      transactions: [],
      balance: 0
    }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddDepartment = () => {
    setShowAddDepartmentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddDepartmentModal(false);
  };

  const handleSaveDepartment = (newDepartment: Omit<Department, 'id' | 'transactions' | 'balance'>) => {
    const departmentWithId: Department = {
      ...newDepartment,
      id: departments.length + 1,
      transactions: [],
      balance: 0
    };
    
    setDepartments([...departments, departmentWithId]);
    setShowAddDepartmentModal(false);
    
    toast({
      title: "Département ajouté",
      description: `Le département "${newDepartment.name}" a été créé avec succès.`,
    });
  };

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department);
    
    toast({
      title: "Département sélectionné",
      description: `Vous consultez maintenant le département "${department.name}".`,
    });
  };

  const handleToggleStatus = (id: number) => {
    setDepartments(departments.map(dept => {
      if (dept.id === id) {
        const newStatus = dept.status === 'active' ? 'inactive' : 'active';
        
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
  };

  const handleAddTransaction = (departmentId: number, transaction: Omit<Transaction, 'id'>) => {
    setDepartments(departments.map(dept => {
      if (dept.id === departmentId) {
        const newTransaction = {
          ...transaction,
          id: dept.transactions.length + 1
        };
        
        const newBalance = transaction.type === 'income' 
          ? dept.balance + transaction.amount 
          : dept.balance - transaction.amount;
        
        toast({
          title: `Transaction enregistrée`,
          description: `${transaction.type === 'income' ? 'Entrée' : 'Sortie'} de ${transaction.amount.toLocaleString()} Ar ajoutée au département "${dept.name}".`,
        });
        
        return {
          ...dept,
          transactions: [...dept.transactions, newTransaction],
          balance: newBalance
        };
      }
      return dept;
    }));
    
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
