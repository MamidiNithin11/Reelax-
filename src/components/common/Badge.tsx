import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber' | 'slate' | 'rose';
  className?: string;
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const styles = {
    blue: 'bg-blue-50 text-[#1D72F2] border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    amber: 'bg-amber-50 text-amber-800 border-amber-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-100',
    rose: 'bg-rose-50 text-rose-800 border-rose-100',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
