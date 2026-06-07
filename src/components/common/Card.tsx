import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glass = false,
  padding = 'lg',
}) => {
  const Component = hoverable ? motion.div : 'div';
  const motionProps = hoverable
    ? {
        whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' },
        transition: { duration: 0.25, ease: 'easeOut' },
      }
    : {};

  return (
    <Component
      className={`
        rounded-2xl bg-[rgba(255,255,255,0.06)]
        border border-white/10
        transition-all duration-300 ease-out
        ${glass ? 'glass-card backdrop-blur-xl' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Card;
