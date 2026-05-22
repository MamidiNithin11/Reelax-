import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  id
}: ButtonProps) {
  const baseStyle = "font-sans inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-xl focus:outline-hidden focus:ring-4 cursor-pointer select-none";
  
  const variants = {
    primary: "bg-[#1D72F2] hover:bg-[#155fc9] text-white shadow-sm shadow-[#1D72F2]/10 focus:ring-[#1D72F2]/20 active:scale-[0.98]",
    secondary: "bg-[#F1F5F9] hover:bg-[#E2E8F0] text-slate-700 focus:ring-[#64748B]/10 active:scale-[0.98]",
    outline: "bg-white border border-[#CBD5E1] hover:bg-slate-50 text-slate-700 hover:text-slate-900 active:scale-[0.98]",
    ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-100",
    gradient: "bg-radial from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold tracking-wide shadow-sm active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base"
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon className={`w-4 h-4 ${variant === 'gradient' ? 'fill-white' : ''}`} />}
      {children && <span>{children}</span>}
    </button>
  );
}
