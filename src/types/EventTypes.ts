
// Types pour les transactions financières d'événements
export interface EventTransaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

// Types pour les événements
export interface EventType {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  cost?: number;
  organizer: string;
  type: 'culte' | 'jeunesse' | 'mission' | 'formation' | 'special';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  transactions: EventTransaction[];
}

// Helpers pour les événements
export const getEventTypeColor = (type: EventType['type']) => {
  switch (type) {
    case 'culte': return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30';
    case 'jeunesse': return 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30';
    case 'mission': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
    case 'formation': return 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30';
    case 'special': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
  }
};

export const getEventStatusColor = (status: EventType['status']) => {
  switch (status) {
    case 'upcoming': return 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30';
    case 'ongoing': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
    case 'completed': return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
    case 'cancelled': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
  }
};

export const getEventTypeLabel = (type: EventType['type']) => {
  switch (type) {
    case 'culte': return 'Culte';
    case 'jeunesse': return 'Jeunesse';
    case 'mission': return 'Mission';
    case 'formation': return 'Formation';
    case 'special': return 'Événement Spécial';
    default: return type;
  }
};

export const getEventStatusLabel = (status: EventType['status']) => {
  switch (status) {
    case 'upcoming': return 'À venir';
    case 'ongoing': return 'En cours';
    case 'completed': return 'Terminé';
    case 'cancelled': return 'Annulé';
    default: return status;
  }
};

// Calculs financiers
export const calculateEventBalance = (transactions: EventTransaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return { income, expenses, balance: income - expenses };
};
