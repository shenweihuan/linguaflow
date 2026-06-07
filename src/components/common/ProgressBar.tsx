import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color?: 'accent' | 'success' | 'japanese' | 'korean';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const colorStyles = {
  accent: 'from-[#FF6B35] to-[#E55525]',
  success: 'from-[#00D9C0] to-[#00B89E]',
  japanese: 'from-[#7C3AED] to-[#5B21B6]',
  korean: 'from-[#F59E0B] to-[#D97706]',
};

const bgColorStyles = {
  accent: 'shadow-[0_0_12px_rgba(255,107,53,0.4)]',
  success: 'shadow-[0_0_12px_rgba(0,217,192,0.4)]',
  japanese: 'shadow-[0_0_12px_rgba(124,58,237,0.4)]',
  korean: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'accent',
  size = 'md',
  showLabel = false,
  animated = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1.5 text-sm">
          <span className="text-gray-400">进度</span>
          <span className="font-semibold text-white">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-white/10 overflow-hidden ${sizeStyles[size]}`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorStyles[color]} ${bgColorStyles[color]}`}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
