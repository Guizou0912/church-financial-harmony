
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Search,
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { formatMGA } from '@/lib/utils';

// Types pour les événements
interface EventType {
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
}

const Events = () => {
  // Données exemple pour les événements
  const events: EventType[] = [
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
      status: 'upcoming'
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
      status: 'upcoming'
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
      status: 'upcoming'
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
      status: 'completed'
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
      status: 'upcoming'
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
      status: 'completed'
    }
  ];

  // Fonction pour obtenir la couleur en fonction du type d'événement
  const getEventTypeColor = (type: EventType['type']) => {
    switch (type) {
      case 'culte': return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30';
      case 'jeunesse': return 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30';
      case 'mission': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
      case 'formation': return 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30';
      case 'special': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
    }
  };

  // Fonction pour obtenir la couleur en fonction du statut de l'événement
  const getEventStatusColor = (status: EventType['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30';
      case 'ongoing': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
    }
  };

  // Fonction pour obtenir le libellé du statut en français
  const getEventStatusLabel = (status: EventType['status']) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  // Fonction pour obtenir le libellé du type en français
  const getEventTypeLabel = (type: EventType['type']) => {
    switch (type) {
      case 'culte': return 'Culte';
      case 'jeunesse': return 'Jeunesse';
      case 'mission': return 'Mission';
      case 'formation': return 'Formation';
      case 'special': return 'Événement Spécial';
      default: return type;
    }
  };

  // Filtrer les événements à venir et passés
  const upcomingEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  const pastEvents = events.filter(e => e.status === 'completed' || e.status === 'cancelled');

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Événements</h1>
            <p className="text-gray-400 mt-1">Planifiez et gérez les événements de votre église</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-church-cyan"
              />
            </div>
            <Button className="bg-gradient-to-r from-church-cyan to-church-purple">
              <PlusCircle size={16} className="mr-1" />
              Nouvel événement
            </Button>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[
              { label: 'Événements à venir', count: upcomingEvents.length, icon: <Calendar className="h-5 w-5" />, color: 'from-church-cyan to-blue-500' },
              { label: 'Événements passés', count: pastEvents.length, icon: <Clock className="h-5 w-5" />, color: 'from-church-purple to-church-magenta' },
              { label: 'Participants totaux', count: events.reduce((sum, e) => sum + e.attendees, 0), icon: <Users className="h-5 w-5" />, color: 'from-green-500 to-church-cyan' },
              { label: 'Budget alloué', count: formatMGA(events.reduce((sum, e) => sum + (e.cost || 0), 0)), icon: <MapPin className="h-5 w-5" />, color: 'from-church-magenta to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/5 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-xl font-bold mt-1">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={getEventTypeColor(event.type)}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                        <Badge className={getEventStatusColor(event.status)}>
                          {getEventStatusLabel(event.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-gray-400" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} className="text-gray-400" />
                          {event.attendees} participants
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      {event.cost && (
                        <span className="text-sm font-medium">{formatMGA(event.cost)}</span>
                      )}
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={getEventTypeColor(event.type)}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                        <Badge className={getEventStatusColor(event.status)}>
                          {getEventStatusLabel(event.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-300">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-gray-400" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} className="text-gray-400" />
                          {event.attendees} participants
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      {event.cost && (
                        <span className="text-sm font-medium">{formatMGA(event.cost)}</span>
                      )}
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Events;
