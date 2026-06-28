import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  dark = false,
  hoverEffect = true,
  onClick
}) => {
  const baseClass = dark ? 'glass-panel-dark text-ivory-50' : 'glass-panel text-navy-900';
  const hoverClass = hoverEffect 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold-500/50 cursor-pointer' 
    : '';

  return (
    <div 
      className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden ${baseClass} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {/* Subtle top reflection shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
