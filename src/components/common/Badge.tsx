import React from 'react';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'purple' | 'yellow';
}

const variantStyles = {
  default: 'bg-white/10 text-gray-200 border-white/15',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  purple: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
};

const Badge: React.FC<BadgeProps> = ({ text, variant = 'default' }) => {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border backdrop-blur-sm transition-colors duration-200
        ${variantStyles[variant]}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;
