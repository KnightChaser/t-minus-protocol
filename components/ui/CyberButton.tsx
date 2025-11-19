import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading,
  ...props 
}) => {
  let bgClass = 'bg-lime-400 text-black hover:bg-lime-300';
  let borderClass = 'border-lime-600';
  
  if (variant === 'secondary') {
    bgClass = 'bg-zinc-800 text-lime-400 hover:bg-zinc-700';
    borderClass = 'border-zinc-600';
  } else if (variant === 'danger') {
    bgClass = 'bg-rose-600 text-white hover:bg-rose-500';
    borderClass = 'border-rose-800';
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: -2, y: -2 }}
      whileTap={{ scale: 0.98, x: 0, y: 0 }}
      className={`
        relative px-6 py-3 font-bold text-lg tracking-wider uppercase
        border-2 border-black transition-colors
        hard-shadow
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgClass}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"/>
          PROCESSING...
        </span>
      ) : children}
    </motion.button>
  );
};