import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { Sprout, Heart, Clock, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleStep1Next = () => {
    if (!name.trim() || !age.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleFinish = () => {
    onComplete({
      name,
      age,
      isOnboardingComplete: true
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
        
        {/* Step 1: User Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6 text-green-600">
              <Sprout size={64} />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2 text-stone-800">Bienvenido a Cultiva</h1>
            <p className="text-stone-500 text-center mb-8">Tu jardín personal de relaciones.</p>
            
            <Input 
              label="¿Cómo te llamas?" 
              placeholder="Tu nombre" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <Input 
              label="¿Cuántos años tienes?" 
              type="number" 
              placeholder="Tu edad" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              error={error}
            />
            
            <Button fullWidth onClick={handleStep1Next} className="mt-4">
              Comenzar
            </Button>
          </div>
        )}

        {/* Step 2: Explanation */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-center">¿Cómo funciona?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-700 rounded-full">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Añade a tus seres queridos</h3>
                  <p className="text-sm text-stone-500">Registra amigos y familiares importantes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-700 rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Define una frecuencia</h3>
                  <p className="text-sm text-stone-500">Elige cada cuánto quieres contactarlos.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                  <Sprout size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">¡Mantenlo floreciendo!</h3>
                  <p className="text-sm text-stone-500">Si no contactas a tiempo, la flor se marchitará.</p>
                </div>
              </div>
            </div>

            <Button fullWidth onClick={handleFinish} className="mt-8 flex items-center justify-center gap-2">
              ¡A cultivar! <ArrowRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};