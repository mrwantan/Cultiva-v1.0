
import React, { useEffect, useState } from 'react';
import { loadData, saveData, generateId } from './services/storage';
import { AppData, UserProfile, Contact, Interaction, InteractionType } from './types';
import { Onboarding } from './components/Onboarding';
import { ContactCard } from './components/ContactCard';
import { ContactDetails } from './components/ContactDetails';
import { Modal } from './components/Modal';
import { AddContactForm } from './components/AddContactForm';
import { LogInteractionForm } from './components/LogInteractionForm';
import { Plus, Sprout } from 'lucide-react';
import { generateContactInsights } from './services/ai';

function App() {
  const [data, setData] = useState<AppData>({ user: null, contacts: [] });
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [interactionContactId, setInteractionContactId] = useState<string | null>(null);
  const [viewingContactId, setViewingContactId] = useState<string | null>(null);

  // Load data on mount (RNF-U01)
  useEffect(() => {
    const storedData = loadData();
    setData(storedData);
    setLoading(false);
  }, []);

  // Persist data whenever it changes (RNF-P01)
  useEffect(() => {
    if (!loading) {
      saveData(data);
    }
  }, [data, loading]);

  const handleOnboardingComplete = (user: UserProfile) => {
    setData(prev => ({ ...prev, user }));
  };

  const handleAddContact = (newContactData: { name: string; relation: string; frequencyDays: number; keyInfo: string }) => {
    const newContact: Contact = {
      id: generateId(),
      ...newContactData,
      interactions: [],
      lastInteractionDate: new Date().toISOString(), // Start fresh
    };

    setData(prev => ({
      ...prev,
      contacts: [newContact, ...prev.contacts]
    }));
    setIsAddModalOpen(false);
  };

  const handleLogInteraction = (interactionData: { type: InteractionType; note: string }) => {
    if (!interactionContactId) return;

    const now = new Date().toISOString(); // US-004.2 Automatic timestamp

    const newInteraction: Interaction = {
      id: generateId(),
      date: now,
      type: interactionData.type,
      note: interactionData.note
    };

    // 1. Optimistic Update: Add interaction immediately
    const contactToUpdate = data.contacts.find(c => c.id === interactionContactId);
    if (!contactToUpdate) return;

    const updatedContact: Contact = {
      ...contactToUpdate,
      interactions: [newInteraction, ...contactToUpdate.interactions],
      lastInteractionDate: now,
    };

    setData(prev => ({
      ...prev,
      contacts: prev.contacts.map(c => c.id === interactionContactId ? updatedContact : c)
    }));
    
    setInteractionContactId(null);

    // 2. Background Update: Generate AI Insights (Profile + Ideas)
    // We use the updatedContact which has the new interaction history
    generateContactInsights(updatedContact).then(insights => {
      if (insights.profile || insights.ideas) {
        setData(prev => ({
          ...prev,
          contacts: prev.contacts.map(c => 
            c.id === updatedContact.id 
              ? { 
                  ...c, 
                  aiProfile: insights.profile || c.aiProfile, 
                  aiIdeas: insights.ideas || c.aiIdeas 
                } 
              : c
          )
        }));
      }
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-green-600">Cargando jardín...</div>;

  // Scenario: User needs onboarding (US-001)
  if (!data.user || !data.user.isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const viewingContact = viewingContactId ? data.contacts.find(c => c.id === viewingContactId) : null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-10 shadow-sm border-b border-stone-100 px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-green-600 bg-green-100 p-2 rounded-lg">
            <Sprout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800 leading-none">Cultiva</h1>
            <p className="text-xs text-stone-500">Hola, {data.user.name}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 active:scale-95 transition-all"
          aria-label="Añadir contacto"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4">
        {data.contacts.length === 0 ? (
          // Empty State (US-001.3 CTA)
          <div className="flex flex-col items-center justify-center mt-20 text-center p-6">
            <div className="bg-stone-100 p-6 rounded-full mb-4 text-stone-400">
              <Sprout size={48} />
            </div>
            <h2 className="text-lg font-bold text-stone-700 mb-2">Tu jardín está vacío</h2>
            <p className="text-stone-500 mb-6 max-w-xs">Comienza a cultivar tus relaciones añadiendo a tu primer amigo o familiar.</p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-green-200 shadow-lg hover:shadow-xl hover:bg-green-700 transition-all"
            >
              Añadir primer contacto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.contacts.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onLogInteraction={setInteractionContactId}
                onViewDetails={setViewingContactId}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Nuevo Brote"
      >
        <AddContactForm 
          onSubmit={handleAddContact} 
          onCancel={() => setIsAddModalOpen(false)} 
        />
      </Modal>

      <Modal
        isOpen={!!interactionContactId}
        onClose={() => setInteractionContactId(null)}
        title="Regar Relación"
      >
        {interactionContactId && (
          <LogInteractionForm 
            contactName={data.contacts.find(c => c.id === interactionContactId)?.name || 'Contacto'}
            onSubmit={handleLogInteraction}
            onCancel={() => setInteractionContactId(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!viewingContactId}
        onClose={() => setViewingContactId(null)}
        title="Detalles"
      >
        {viewingContact && (
            <ContactDetails contact={viewingContact} />
        )}
      </Modal>
    </div>
  );
}

export default App;
