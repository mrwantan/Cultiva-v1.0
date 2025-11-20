import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-3 rounded-xl font-medium transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md shadow-green-200",
    secondary: "bg-stone-200 text-stone-800 hover:bg-stone-300 focus:ring-stone-400",
    outline: "border-2 border-green-600 text-green-700 hover:bg-green-50 focus:ring-green-500",
    danger: "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};