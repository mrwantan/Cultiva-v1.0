
import React from 'react';
import { Contact, InteractionType } from '../types';
import { Calendar, Clock, MessageCircle, Phone, Coffee, ScanFace, Sparkles, History, ArrowRight } from 'lucide-react';
import { isContactWithered } from '../services/storage';

interface ContactDetailsProps {
  contact: Contact;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  const withered = isContactWithered(contact);
  const ideas = contact.aiIdeas;

  // Helper to render idea groups
  const renderIdeaGroup = (title: string, items: string[] | undefined, icon: React.ReactNode, colorClass: string, bgClass: string) => {
    if (!items || items.length === 0) return null;
    return (
      <div className={`p-4 rounded-2xl border ${bgClass} border-stone-100 mb-3 last:mb-0`}>
        <div className={`flex items-center gap-2 mb-3 ${colorClass}`}>
          {icon}
          <h4 className="font-bold text-sm uppercase tracking-wider">{title}</h4>
        </div>
        <ul className="space-y-3">
          {items.map((idea, idx) => (
            <li key={idx} className="flex items-start gap-3 text-stone-700">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colorClass.replace('text-', 'bg-')}`} />
              <span className="text-base font-medium leading-snug">{idea}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getInteractionIcon = (type: InteractionType) => {
    switch (type) {
      case InteractionType.MESSAGE: return <MessageCircle size={20} />;
      case InteractionType.CALL: return <Phone size={20} />;
      case InteractionType.OUTING: return <Coffee size={20} />;
      default: return <MessageCircle size={20} />;
    }
  };

  const getInteractionColor = (type: InteractionType) => {
    switch (type) {
      case InteractionType.MESSAGE: return 'bg-blue-100 text-blue-700';
      case InteractionType.CALL: return 'bg-green-100 text-green-700';
      case InteractionType.OUTING: return 'bg-amber-100 text-amber-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="space-y-6 pb-6">
        {/* Header Info */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
                <h2 className="text-3xl font-bold text-stone-800 leading-tight">{contact.name}</h2>
                <span className="inline-block bg-stone-100 text-stone-600 px-3 py-1 rounded-lg text-base font-medium mt-2">
                    {contact.relation}
                </span>
            </div>
            {/* Icon Status */}
            <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 transition-all shrink-0
                ${withered 
                    ? 'bg-orange-50 border-orange-200 shadow-orange-100 text-orange-600' 
                    : 'bg-rose-50 border-rose-200 shadow-rose-100 text-rose-500'} shadow-md`}>
                <span className="text-3xl" role="img" aria-label="Status">{withered ? '🥀' : '🌹'}</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-stone-500 mb-1">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Meta</span>
                </div>
                <p className="font-bold text-stone-800 text-lg">Cada {contact.frequencyDays} días</p>
            </div>
             <div className={`p-4 rounded-2xl border flex flex-col justify-center ${withered ? 'bg-orange-50 border-orange-100' : 'bg-stone-50 border-stone-100'}`}>
                <div className={`flex items-center gap-2 mb-1 ${withered ? 'text-orange-600' : 'text-stone-500'}`}>
                    <Calendar size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Último</span>
                </div>
                <p className={`font-bold text-lg ${withered ? 'text-orange-800' : 'text-stone-800'}`}>
                    {contact.lastInteractionDate 
                        ? new Date(contact.lastInteractionDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) 
                        : 'Nunca'}
                </p>
            </div>
        </div>

        {/* AI Profile Section */}
        {contact.aiProfile && (
             <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-violet-800 border-b border-violet-200/50 pb-2">
                    <ScanFace size={20} />
                    <h3 className="font-bold text-sm uppercase tracking-wider">Perfil IA</h3>
                </div>
                <p className="text-stone-700 text-base md:text-lg font-medium leading-relaxed">
                    {contact.aiProfile}
                </p>
            </div>
        )}

        {/* AI Suggestions Section */}
        {ideas && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-stone-400 px-1">
               <Sparkles size={18} />
               <h3 className="font-bold text-sm uppercase tracking-wider">Sugerencias de Contacto</h3>
            </div>
            <div className="space-y-3">
              {renderIdeaGroup('Para Escribir', ideas.messages, <MessageCircle size={18}/>, 'text-blue-600', 'bg-blue-50/50')}
              {renderIdeaGroup('Para Hablar', ideas.calls, <Phone size={18}/>, 'text-green-600', 'bg-green-50/50')}
              {renderIdeaGroup('Actividades', ideas.activities, <Coffee size={18}/>, 'text-amber-600', 'bg-amber-50/50')}
            </div>
          </div>
        )}

        {/* Interaction History Carousel */}
        <div>
            <div className="flex items-center gap-2 mb-3 text-stone-400 px-1 mt-6">
               <History size={18} />
               <h3 className="font-bold text-sm uppercase tracking-wider">Historial ({contact.interactions.length})</h3>
            </div>
            
            {contact.interactions.length > 0 ? (
                <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory -mx-1 px-1">
                    {contact.interactions.map((interaction) => (
                        <div 
                            key={interaction.id} 
                            className="snap-center shrink-0 w-[280px] bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-stone-400">
                                    {new Date(interaction.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                                </span>
                                <div className={`p-2 rounded-full ${getInteractionColor(interaction.type)}`}>
                                    {getInteractionIcon(interaction.type)}
                                </div>
                            </div>
                            <div className="flex-grow">
                                <p className="text-stone-800 text-base font-medium leading-snug line-clamp-4">
                                    "{interaction.note}"
                                </p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-stone-100">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                                    {interaction.type}
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* Spacer to allow seeing the last item clearly */}
                    <div className="w-2 shrink-0"></div>
                </div>
            ) : (
                <div className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-100">
                    <p className="text-stone-400 text-base">No hay historial de interacciones aún.</p>
                </div>
            )}
        </div>
    </div>
  );
};
