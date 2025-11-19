import React from 'react';
import { motion } from 'framer-motion';

interface RollingDigitProps {
  value: number;
  label?: string;
  size?: 'sm' | 'lg';
}

export const RollingDigit: React.FC<RollingDigitProps> = ({ value, label, size = 'lg' }) => {
  // Array of digits 0-9
  const digits = Array.from({ length: 10 }, (_, i) => i);
  
  const height = size === 'lg' ? 120 : 60; // Pixel height of one digit container
  const fontSize = size === 'lg' ? 'text-8xl' : 'text-5xl';
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden border-4 border-zinc-800 bg-zinc-900 rounded-sm hard-shadow-sm"
           style={{ height: `${height}px`, width: size === 'lg' ? '90px' : '50px' }}>
        
        {/* Overlay Gradients/Scanlines */}
        <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center"
          initial={false}
          animate={{ y: value * -height }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
        >
          {digits.map((digit) => (
            <div
              key={digit}
              style={{ height: `${height}px` }}
              className={`flex items-center justify-center font-[Russo_One] ${fontSize} text-lime-400 neon-glow w-full`}
            >
              {digit}
            </div>
          ))}
        </motion.div>
      </div>
      {label && (
        <span className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase mt-1">
          {label}
        </span>
      )}
    </div>
  );
};
