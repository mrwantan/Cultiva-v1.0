import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

interface AddContactFormProps {
  onSubmit: (data: {
    name: string;
    relation: string;
    frequencyDays: number;
    keyInfo: string;
  }) => void;
  onCancel: () => void;
}

const RELATION_TYPES = ['Familia', 'Amigo', 'Pareja', 'Trabajo', 'Conocido'];

export const AddContactForm: React.FC<AddContactFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [frequency, setFrequency] = useState(7); // US-003.2 Default 7
  const [keyInfo, setKeyInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relation.trim()) {
      setError('Nombre y relación son obligatorios');
      return;
    }
    onSubmit({ name, relation, frequencyDays: frequency, keyInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label="Nombre" 
        placeholder="Ej. Mamá, Juan, etc." 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <div>
        <label className="block text-sm font-semibold text-stone-600 mb-2">
          Tipo de Relación
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {RELATION_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setRelation(type)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                relation === type
                  ? 'bg-green-100 border-green-500 text-green-800 font-medium shadow-sm'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <Input 
          label="Especificar Relación" 
          placeholder="O escribe una personalizada..." 
          value={relation} 
          onChange={(e) => setRelation(e.target.value)} 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-600 mb-1">
          Frecuencia de Contacto (US-003)
        </label>
        <select 
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg border border-stone-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        >
          <option value={7}>Cada 7 días (Semanal)</option>
          <option value={14}>Cada 14 días (Quincenal)</option>
          <option value={30}>Cada 30 días (Mensual)</option>
          <option value={60}>Cada 60 días (Bimestral)</option>
          <option value={90}>Cada 90 días (Trimestral)</option>
        </select>
      </div>

      <Input 
        label="Información Clave (Intereses, temas)" 
        placeholder="Ej. Le gusta el jazz, preguntar por su perro" 
        textarea
        value={keyInfo} 
        onChange={(e) => setKeyInfo(e.target.value)} 
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          Guardar
        </Button>
      </div>
    </form>
  );
};