
// Sample data for finances

// Données exemple pour les graphiques
export const revenueData = [
  { name: 'Jan', value: 12000000 },
  { name: 'Fév', value: 19000000 },
  { name: 'Mar', value: 15000000 },
  { name: 'Avr', value: 22000000 },
  { name: 'Mai', value: 25000000 },
  { name: 'Juin', value: 28000000 },
  { name: 'Juil', value: 30000000 },
];

export const depenseData = [
  { name: 'Jan', value: 9000000 },
  { name: 'Fév', value: 14000000 },
  { name: 'Mar', value: 12000000 },
  { name: 'Avr', value: 18000000 },
  { name: 'Mai', value: 20000000 },
  { name: 'Juin', value: 22000000 },
  { name: 'Juil', value: 26000000 },
];

export const depenseParCategorieData = [
  { name: 'Services', value: 35 },
  { name: 'Personnel', value: 25 },
  { name: 'Sensibilisation', value: 15 },
  { name: 'Événements', value: 15 },
  { name: 'Installations', value: 10 },
];

export const donParSourceData = [
  { name: 'Dons individuels', value: 55 },
  { name: 'Événements', value: 25 },
  { name: 'Subventions', value: 15 },
  { name: 'Autres', value: 5 },
];

// Données des budgets
export const budgetItems = [
  {
    id: '1',
    name: 'Ministère du Culte',
    spent: 25000000,
    total: 30000000,
    color: 'from-church-cyan to-blue-500',
  },
  {
    id: '2',
    name: 'Programmes Jeunesse',
    spent: 18000000,
    total: 25000000,
    color: 'from-church-purple to-church-magenta',
  },
  {
    id: '3',
    name: 'Missions & Sensibilisation',
    spent: 30000000,
    total: 32000000,
    color: 'from-green-500 to-church-cyan',
  },
  {
    id: '4',
    name: 'Administration',
    spent: 15000000,
    total: 18000000,
    color: 'from-church-magenta to-red-500',
  },
];

// Données de transactions
export const transactionsRevenues = [
  { id: 1, date: '15/07/2023', description: 'Don hebdomadaire', montant: 3500000, type: 'don' },
  { id: 2, date: '10/07/2023', description: 'Dîme de Jean Ravalison', montant: 1200000, type: 'dime' },
  { id: 3, date: '05/07/2023', description: 'Contribution événement', montant: 5000000, type: 'contribution' },
  { id: 4, date: '01/07/2023', description: 'Don projet construction', montant: 10000000, type: 'don' },
];

export const transactionsDepenses = [
  { id: 1, date: '14/07/2023', description: 'Facture électricité', montant: 980000, type: 'utilitaire' },
  { id: 2, date: '12/07/2023', description: 'Matériel technique', montant: 3500000, type: 'equipement' },
  { id: 3, date: '08/07/2023', description: 'Salaires personnel', montant: 8000000, type: 'salaire' },
  { id: 4, date: '02/07/2023', description: 'Rénovation salle', montant: 6500000, type: 'maintenance' },
];
