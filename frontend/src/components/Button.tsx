import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  isLoading = false, 
  className = '' 
}: ButtonProps) {
  return (
    <button
      className={`
        w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors
        ${isLoading || disabled ? 'bg-disabled cursor-not-allowed' : 'bg-accent hover:bg-accent/90'}
        ${isLoading || disabled ? 'text-white/50' : 'text-white'}
        flex items-center justify-center gap-2 ${className}
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      )}
      {children}
    </button>
  );
}
