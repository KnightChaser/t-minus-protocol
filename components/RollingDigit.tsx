import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface RollingDigitProps {
  /** Digit to display (0-9) */
  value: number;
  /** Visual size variant for the digit container */
  size?: 'sm' | 'lg';
}

/**
 * Animated vertical rolling digit. The component renders digits 0-9
 * in a stacked column and animates translation to show the current value.
 * Implements infinite scrolling by tracking a continuous virtual value.
 */
export const RollingDigit: React.FC<RollingDigitProps> = ({ value, size = 'lg' }) => {
  const { classes } = useTheme();
  const height = size === 'lg' ? 120 : 60; // Pixel height of one digit container
  const fontSize = size === 'lg' ? 'text-8xl' : 'text-5xl';

  // Track a continuous virtual value to allow infinite scrolling
  // e.g. ... -> 1 -> 0 -> -1 (shows 9) -> -2 (shows 8) ...
  const [visualValue, setVisualValue] = useState(value);

  useEffect(() => {
    setVisualValue(prev => {
      const currentMod = ((prev % 10) + 10) % 10;
      let diff = value - currentMod;
      
      // Find shortest path (wrap around)
      if (diff > 5) diff -= 10;
      if (diff < -5) diff += 10;
      
      return prev + diff;
    });
  }, [value]);

  // Render a window of digits around the current visual value
  // This ensures that as we scroll, the necessary digits are always present
  const indices = [-2, -1, 0, 1, 2].map(offset => Math.round(visualValue) + offset);
  
  return (
    <div className="relative overflow-hidden border-4 border-zinc-800 bg-zinc-900 rounded-sm hard-shadow-sm"
          style={{ height: `${height}px`, width: size === 'lg' ? '90px' : '50px' }}>
      
      {/* Overlay Gradients/Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

      <motion.div
        className="absolute left-0 right-0 top-0"
        initial={false}
        animate={{ y: visualValue * -height }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
      >
        {indices.map((index) => {
          // Map virtual index to digit 0-9
          const digit = ((index % 10) + 10) % 10;
          return (
            <div
              key={index}
              style={{ 
                height: `${height}px`,
                top: `${index * height}px`,
                textShadow: `0 0 10px ${classes.glowColor}`
              }}
              className={`absolute left-0 right-0 flex items-center justify-center font-['Intel_One_Mono'] font-bold ${fontSize} leading-none ${classes.text} w-full pb-3 transition-colors duration-300`}
            >
              {digit}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};