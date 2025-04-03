
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import EventCard from '@/components/Events/EventCard';
import EventStats from '@/components/Events/EventStats';
import AddTransactionModal from '@/components/Events/AddTransactionModal';
import { useEventsHandlers } from '@/hooks/useEventsHandlers';

const Events = () => {
  const { 
    events,
    upcomingEvents, 
    pastEvents,
    showTransactionModal,
    selectedEvent,
    openTransactionModal,
    handleAddTransaction,
    handleDeleteTransaction,
    exportEventTransactionsCSV,
    setShowTransactionModal
  } = useEventsHandlers();

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
          <EventStats 
            upcomingEvents={upcomingEvents} 
            pastEvents={pastEvents}
            allEvents={events} 
          />

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onOpenTransactionModal={openTransactionModal}
                    onDeleteTransaction={handleDeleteTransaction}
                    onExportTransactionsCSV={exportEventTransactionsCSV}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onOpenTransactionModal={openTransactionModal}
                    onDeleteTransaction={handleDeleteTransaction}
                    onExportTransactionsCSV={exportEventTransactionsCSV}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      {/* Modal pour ajouter une transaction */}
      <AddTransactionModal 
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        selectedEvent={selectedEvent}
        onAddTransaction={handleAddTransaction}
      />
    </PageLayout>
  );
};

export default Events;
