import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}
/**
 * Decorative text component that renders layered animated copies
 * of the provided text to give a glitch/chromatic aberration effect.
 */
export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-rose-500 opacity-0 group-hover:opacity-70"
        animate={{ 
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          repeatType: "mirror",
          repeatDelay: 0.5
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70"
        animate={{ 
          x: [2, -2, 1, 0],
          y: [-1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.3,
          repeatType: "mirror",
          repeatDelay: 0.2
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};
