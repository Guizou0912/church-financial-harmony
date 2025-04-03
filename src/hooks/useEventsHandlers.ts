
import { useState } from 'react';
import { EventType, EventTransaction } from '@/types/EventTypes';
import { useToast } from "@/hooks/use-toast";

// Données exemple pour les événements
const initialEvents: EventType[] = [
  {
    id: 1,
    title: 'Culte du Dimanche',
    description: 'Culte hebdomadaire avec prédication sur "La Foi Vivante"',
    date: '16/07/2023',
    time: '09:00 - 11:30',
    location: 'Salle Principale',
    attendees: 230,
    organizer: 'Ministère du Culte',
    type: 'culte',
    status: 'upcoming',
    transactions: [
      { id: 1, description: "Offrandes", amount: 1500000, type: 'income', date: '16/07/2023' },
      { id: 2, description: "Dépenses matériel audio", amount: 300000, type: 'expense', date: '16/07/2023' }
    ]
  },
  {
    id: 2,
    title: 'Retraite des Jeunes',
    description: 'Week-end de retraite spirituelle pour les jeunes',
    date: '22/07/2023 - 24/07/2023',
    time: 'Journée entière',
    location: 'Centre de Retraite Ambohidratrimo',
    attendees: 85,
    cost: 4500000,
    organizer: 'Département Jeunesse',
    type: 'jeunesse',
    status: 'upcoming',
    transactions: [
      { id: 1, description: "Inscriptions", amount: 3000000, type: 'income', date: '20/07/2023' },
      { id: 2, description: "Location site", amount: 1500000, type: 'expense', date: '19/07/2023' },
      { id: 3, description: "Restauration", amount: 1200000, type: 'expense', date: '19/07/2023' }
    ]
  },
  {
    id: 3,
    title: 'Formation des Leaders',
    description: 'Formation pour les nouveaux responsables d\'équipe',
    date: '19/07/2023',
    time: '14:00 - 17:00',
    location: 'Salle de Conférence',
    attendees: 32,
    organizer: 'Administration',
    type: 'formation',
    status: 'upcoming',
    transactions: []
  },
  {
    id: 4,
    title: 'Mission d\'Évangélisation',
    description: 'Sortie d\'évangélisation dans le quartier d\'Analakely',
    date: '15/07/2023',
    time: '08:00 - 12:00',
    location: 'Quartier Analakely',
    attendees: 45,
    cost: 1200000,
    organizer: 'Missions & Évangélisation',
    type: 'mission',
    status: 'completed',
    transactions: [
      { id: 1, description: "Dons pour la mission", amount: 1500000, type: 'income', date: '10/07/2023' },
      { id: 2, description: "Imprimés et tracts", amount: 450000, type: 'expense', date: '12/07/2023' },
      { id: 3, description: "Transport", amount: 350000, type: 'expense', date: '15/07/2023' }
    ]
  },
  {
    id: 5,
    title: 'Concert de Louange',
    description: 'Concert avec la participation de plusieurs groupes de louange',
    date: '29/07/2023',
    time: '18:00 - 21:00',
    location: 'Esplanade de l\'Église',
    attendees: 0,
    cost: 3500000,
    organizer: 'Ministère du Culte',
    type: 'special',
    status: 'upcoming',
    transactions: [
      { id: 1, description: "Sponsors", amount: 2000000, type: 'income', date: '05/07/2023' }
    ]
  },
  {
    id: 6,
    title: 'Réunion de Prière',
    description: 'Réunion hebdomadaire de prière et intercession',
    date: '12/07/2023',
    time: '18:30 - 20:00',
    location: 'Salle de Prière',
    attendees: 65,
    organizer: 'Ministère du Culte',
    type: 'culte',
    status: 'completed',
    transactions: [
      { id: 1, description: "Offrandes", amount: 800000, type: 'income', date: '12/07/2023' }
    ]
  }
];

export const useEventsHandlers = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les événements à venir et passés
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  const pastEvents = filteredEvents.filter(e => e.status === 'completed' || e.status === 'cancelled');

  // Ouvrir le modal pour ajouter une transaction
  const openTransactionModal = (event: EventType) => {
    setSelectedEvent(event);
    setShowTransactionModal(true);
  };

  // Ouvrir le modal pour ajouter un nouvel événement
  const openEventModal = () => {
    setShowEventModal(true);
  };

  // Gérer l'ajout d'un nouvel événement
  const handleAddEvent = (eventData: Omit<EventType, 'id' | 'transactions'>) => {
    const newEvent: EventType = {
      ...eventData,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      transactions: []
    };
    
    setEvents([...events, newEvent]);
    setShowEventModal(false);
    
    toast({
      title: "Événement créé",
      description: `L'événement "${newEvent.title}" a été créé avec succès`,
    });
  };

  // Gérer l'ajout d'une transaction
  const handleAddTransaction = (transaction: Omit<EventTransaction, 'id'>) => {
    if (!selectedEvent) return;
    
    if (!transaction.description || transaction.amount <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir correctement tous les champs",
        variant: "destructive"
      });
      return;
    }

    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        const nextId = event.transactions.length > 0 
          ? Math.max(...event.transactions.map(t => t.id)) + 1 
          : 1;
          
        const newEvent = {
          ...event,
          transactions: [
            ...event.transactions,
            { ...transaction, id: nextId }
          ]
        };
        setSelectedEvent(newEvent);
        return newEvent;
      }
      return event;
    });

    setEvents(updatedEvents);
    
    toast({
      title: "Transaction ajoutée",
      description: `La transaction a été ajoutée avec succès à l'événement "${selectedEvent.title}"`,
    });

    setShowTransactionModal(false);
  };

  // Gérer la suppression d'une transaction
  const handleDeleteTransaction = (eventId: number, transactionId: number) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        const newEvent = {
          ...event,
          transactions: event.transactions.filter(t => t.id !== transactionId)
        };
        
        if (selectedEvent?.id === eventId) {
          setSelectedEvent(newEvent);
        }
        
        return newEvent;
      }
      return event;
    });

    setEvents(updatedEvents);
    
    toast({
      title: "Transaction supprimée",
      description: "La transaction a été supprimée avec succès",
    });
  };

  // Fonction pour exporter les transactions en CSV
  const exportEventTransactionsCSV = (event: EventType) => {
    if (event.transactions.length === 0) {
      toast({
        title: "Aucune transaction",
        description: "Cet événement n'a pas de transactions à exporter",
        variant: "destructive"
      });
      return;
    }

    const headers = ["ID", "Description", "Montant", "Type", "Date"];
    const csvData = [
      headers.join(','),
      ...event.transactions.map(t => 
        [
          t.id,
          `"${t.description}"`,
          t.amount,
          t.type === 'income' ? 'Revenu' : 'Dépense',
          t.date
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_${event.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Exportation réussie",
      description: "Les transactions ont été exportées au format CSV"
    });
  };

  return {
    events,
    upcomingEvents,
    pastEvents,
    showTransactionModal,
    selectedEvent,
    openTransactionModal,
    handleAddTransaction,
    handleDeleteTransaction,
    exportEventTransactionsCSV,
    setShowTransactionModal,
    openEventModal,
    showEventModal,
    setShowEventModal,
    handleAddEvent,
    searchQuery,
    setSearchQuery
  };
};
