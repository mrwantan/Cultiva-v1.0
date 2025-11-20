import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  textarea?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, textarea, error, className = '', ...props }) => {
  const baseStyles = "w-full px-4 py-2 rounded-lg border border-stone-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors";

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-600 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea 
          className={`${baseStyles} min-h-[100px] ${className}`} 
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} 
        />
      ) : (
        <input 
          className={`${baseStyles} ${className}`} 
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)} 
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};