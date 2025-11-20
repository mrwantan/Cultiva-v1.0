
import React, { useState } from 'react';
import { InteractionType } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { MessageCircle, Phone, Coffee } from 'lucide-react';

interface LogInteractionFormProps {
  contactName: string;
  onSubmit: (data: { type: InteractionType; note: string }) => void;
  onCancel: () => void;
}

export const LogInteractionForm: React.FC<LogInteractionFormProps> = ({ contactName, onSubmit, onCancel }) => {
  const [type, setType] = useState<InteractionType>(InteractionType.MESSAGE);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, note });
  };

  const typeOptions = [
    { val: InteractionType.MESSAGE, icon: <MessageCircle size={18} />, label: 'Mensaje' },
    { val: InteractionType.CALL, icon: <Phone size={18} />, label: 'Llamada' },
    { val: InteractionType.OUTING, icon: <Coffee size={18} />, label: 'Salida' },
  ];

  const getPlaceholder = (t: InteractionType) => {
    switch (t) {
      case InteractionType.MESSAGE:
        return "¿Qué le escribiste? ¿Te respondió algo interesante? ¿Quedaron en algo?";
      case InteractionType.CALL:
        return "¿De qué hablaron? ¿Cómo se escuchaba? ¿Alguna novedad importante que recordar?";
      case InteractionType.OUTING:
        return "¿Dónde fueron? ¿Qué hicieron? ¿Qué fue lo más memorable del encuentro?";
      default:
        return "¿Qué tal estuvo la interacción?";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-stone-600 text-sm">
        Registrando interacción con <span className="font-bold text-stone-800">{contactName}</span>.
        <br />
        <span className="text-xs text-stone-400">Fecha y hora actual se guardarán automáticamente.</span>
      </p>

      <div>
        <label className="block text-sm font-semibold text-stone-600 mb-2">Tipo de interacción</label>
        <div className="grid grid-cols-3 gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setType(opt.val)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                type === opt.val 
                  ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' 
                  : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
              }`}
            >
              {opt.icon}
              <span className="text-xs mt-1 font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Input 
        label="Nota Clave (Opcional)" 
        placeholder={getPlaceholder(type)} 
        textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          Registrar
        </Button>
      </div>
    </form>
  );
};
