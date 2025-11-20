
import React, { useState } from 'react';
import { Contact } from '../types';
import { isContactWithered } from '../services/storage';
import { Flower2, AlertCircle, Calendar, Droplets, Sparkles, MessageCircle, Phone, Coffee, ChevronDown, ChevronUp } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onLogInteraction: (contactId: string) => void;
  onViewDetails: (contactId: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onLogInteraction, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);
  const withered = isContactWithered(contact);

  // Styles based on status
  const containerClass = withered 
    ? "bg-orange-50 border-orange-200 shadow-orange-100 hover:shadow-orange-200 ring-1 ring-orange-100" 
    : "bg-white border-stone-100 shadow-stone-200 hover:shadow-stone-300 hover:border-rose-100";
  
  const textClass = withered ? "text-orange-900" : "text-stone-800";
  const iconColorClass = withered ? "text-orange-600" : "text-rose-500";

  const getLastInteractionText = () => {
    if (!contact.lastInteractionDate) return 'Sin interacciones';
    const date = new Date(contact.lastInteractionDate);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const getPreviewIdeas = () => {
    const ideas = contact.aiIdeas;
    if (!ideas) return [];
    // Handle potential legacy structure or empty objects
    if (Array.isArray(ideas)) return []; 

    const preview = [];
    // Prioritize one of each type for diversity in the preview
    if (ideas.messages?.[0]) preview.push({ type: 'msg', icon: <MessageCircle size={16} />, text: ideas.messages[0] });
    if (ideas.calls?.[0]) preview.push({ type: 'call', icon: <Phone size={16} />, text: ideas.calls[0] });
    if (ideas.activities?.[0]) preview.push({ type: 'act', icon: <Coffee size={16} />, text: ideas.activities[0] });
    
    return preview;
  };

  const previewIdeas = getPreviewIdeas();
  const hasIdeas = previewIdeas.length > 0;

  return (
    <div 
      onClick={() => onViewDetails(contact.id)}
      className={`relative group rounded-2xl p-4 md:p-5 border-2 shadow-sm transition-all duration-300 cursor-pointer ${containerClass} hover:scale-[1.02] flex flex-col h-full`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="min-w-0 pr-2">
          <h3 className={`text-xl font-bold truncate ${textClass}`}>{contact.name}</h3>
          <p className={`text-base font-medium truncate ${withered ? 'text-orange-700/70' : 'text-stone-500'}`}>
            {contact.relation}
          </p>
        </div>
        <div className={`${iconColorClass} transition-colors shrink-0`}>
          {withered ? (
            <div className="animate-pulse">
                <AlertCircle size={28} className="md:w-8 md:h-8" />
            </div>
          ) : (
            <Flower2 size={28} className="md:w-8 md:h-8" />
          )}
        </div>
      </div>

      {/* Middle Content - Ideas displayed summarized */}
      <div className="flex-grow">
        {hasIdeas ? (
          <div className={`border rounded-xl p-3 mb-3 transition-colors ${withered ? 'bg-white/60 border-orange-100' : 'bg-violet-50/50 border-violet-100 group-hover:bg-violet-50'}`}>
            <div className="flex gap-2 items-center mb-2">
              <Sparkles size={16} className={withered ? 'text-orange-400' : 'text-violet-600'} />
              <p className={`text-xs font-bold uppercase tracking-wide ${withered ? 'text-orange-800' : 'text-violet-700'}`}>
                 Sugerencias
              </p>
            </div>
            <div className="space-y-2.5">
              {previewIdeas.map((item, idx) => (
                 // Logic: Mobile toggles visibility > 0. Desktop shows all.
                 <div 
                    key={idx} 
                    className={`flex gap-3 items-start ${idx > 0 && !expanded ? 'hidden md:flex' : 'flex'}`}
                 >
                    <div className="mt-0.5 text-stone-400 shrink-0 opacity-80">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base text-stone-700 font-medium leading-snug">
                      {item.text}
                    </span>
                 </div>
              ))}
              
              {/* Mobile "more" toggle button */}
              {previewIdeas.length > 1 && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                    }}
                    className="md:hidden w-full flex items-center justify-center gap-1 text-sm font-bold text-stone-500 py-1 hover:text-stone-800 transition-colors bg-black/5 rounded-lg mt-1"
                >
                    {expanded ? (
                        <>Ver menos <ChevronUp size={14}/></>
                    ) : (
                        <>Ver {previewIdeas.length - 1} más <ChevronDown size={14}/></>
                    )}
                </button>
              )}
            </div>
          </div>
        ) : contact.keyInfo ? (
          <div className={`border rounded-lg p-3 mb-3 ${withered ? 'bg-white/60 border-orange-100' : 'bg-stone-50 border-stone-100'}`}>
             <p className="text-xs text-stone-500 uppercase font-bold mb-1">Intereses</p>
             <p className="text-sm text-stone-700 italic line-clamp-3 leading-relaxed">
              "{contact.keyInfo}"
            </p>
          </div>
        ) : (
           <div className="h-4"></div> 
        )}
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between mt-2 pt-3 border-t ${withered ? 'border-orange-200' : 'border-black/5'}`}>
        <div className={`text-sm flex items-center gap-1.5 ${withered ? 'text-orange-800 font-medium' : 'text-stone-400'}`}>
            <Calendar size={16} />
            <span>{getLastInteractionText()}</span>
        </div>
        
        <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onLogInteraction(contact.id);
            }}
            className={`flex items-center gap-2 border px-4 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all z-10
              ${withered 
                ? 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600 shadow-orange-200' 
                : 'bg-white text-green-700 border-stone-200 hover:bg-green-50 active:bg-green-100'
              }`}
        >
            <Droplets size={16} className={withered ? 'text-white' : 'text-blue-500'}/>
            Regar
        </button>
      </div>
    </div>
  );
};
