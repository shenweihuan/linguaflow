import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeStyles = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

const textSizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizeStyles[size]} rounded-full
          border-t-transparent
          border-[#FF6B35]
          animate-spin
        `}
        style={{
          borderTopColor: 'transparent',
          borderImageSource: `linear-gradient(135deg, #FF6B35, #7C3AED)`,
        }}
      />
      {text && (
        <p className={`text-gray-400 font-medium ${textSizeStyles[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
