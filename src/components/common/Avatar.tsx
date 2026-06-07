import React from 'react';

interface AvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  status?: 'online' | 'offline' | 'away';
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const statusColors = {
  online: 'bg-emerald-500 ring-2 ring-[#0A1628]',
  offline: 'bg-gray-500 ring-2 ring-[#0A1628]',
  away: 'bg-amber-500 ring-2 ring-[#0A1628]',
};

const statusPosition = {
  sm: 'bottom-0 right-0 w-2 h-2',
  md: 'bottom-0.5 right-0.5 w-2.5 h-2.5',
  lg: 'bottom-0.5 right-0.5 w-3 h-3',
  xl: 'bottom-1 right-1 w-4 h-4',
};

const Avatar: React.FC<AvatarProps> = ({ src, size = 'md', name, status }) => {
  const initials = name?.charAt(0).toUpperCase() || '?';

  return (
    <div className={`relative inline-flex flex-shrink-0 ${sizeStyles[size]}`}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizeStyles[size]} rounded-full object-cover ring-2 ring-white/20`}
        />
      ) : (
        <div
          className={`
            ${sizeStyles[size]} rounded-full
            bg-gradient-to-br from-[#FF6B35]/80 to-[#7C3AED]/80
            flex items-center justify-center font-bold text-white
            ring-2 ring-white/20
          `}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={`absolute ${statusPosition[size]} rounded-full ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

export default Avatar;
