
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface Department {
  id: number;
  name: string;
  leader: string;
  leaderAvatar: string | null;
  memberCount: number;
  nextMeeting: string;
  budget: number;
  status: 'active' | 'inactive';
}

export const useDepartmentsHandlers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([
    { 
      id: 1, 
      name: 'Ministère du Culte', 
      leader: 'Sophie Rakoto', 
      leaderAvatar: null,
      memberCount: 24, 
      nextMeeting: '18 Juillet 2023', 
      budget: 30000000,
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Jeunesse', 
      leader: 'Jean Ravalison', 
      leaderAvatar: null,
      memberCount: 38, 
      nextMeeting: '20 Juillet 2023', 
      budget: 25000000,
      status: 'active' 
    },
    { 
      id: 3, 
      name: 'Missions & Évangélisation', 
      leader: 'François Andriamasy', 
      leaderAvatar: null,
      memberCount: 16, 
      nextMeeting: '25 Juillet 2023', 
      budget: 32000000,
      status: 'active' 
    },
    { 
      id: 4, 
      name: 'Administration', 
      leader: 'Natacha Rasolofo', 
      leaderAvatar: null,
      memberCount: 12, 
      nextMeeting: '19 Juillet 2023', 
      budget: 18000000,
      status: 'active' 
    },
    { 
      id: 5, 
      name: 'Ministère des Femmes', 
      leader: 'Marie Razafindrakoto', 
      leaderAvatar: null,
      memberCount: 45, 
      nextMeeting: '22 Juillet 2023', 
      budget: 22000000,
      status: 'active' 
    },
    { 
      id: 6, 
      name: 'Média & Communication', 
      leader: 'Paul Ranaivo', 
      leaderAvatar: null,
      memberCount: 8, 
      nextMeeting: '21 Juillet 2023', 
      budget: 15000000,
      status: 'inactive' 
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

  const handleSaveDepartment = (newDepartment: Omit<Department, 'id'>) => {
    const departmentWithId: Department = {
      ...newDepartment,
      id: departments.length + 1
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
    departmentPerformanceData,
    handleSearchChange,
    handleAddDepartment,
    handleCloseModal,
    handleSaveDepartment,
    handleDepartmentClick,
    handleToggleStatus
  };
};
