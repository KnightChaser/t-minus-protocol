import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeColor } from '../types';

interface ThemeClasses {
  text: string;
  textDim: string;
  bg: string;
  bgHover: string;
  border: string;
  borderDim: string;
  decoration: string; // for corner marks etc
  glow: string; // CSS class for text-shadow or box-shadow reference if needed
  glowColor: string; // Specific RGBA/Hex color for text-shadow styles
}

const themeConfig: Record<ThemeColor, ThemeClasses> = {
  lime: {
    text: 'text-lime-400',
    textDim: 'text-lime-600',
    bg: 'bg-lime-400',
    bgHover: 'hover:bg-lime-300',
    border: 'border-lime-400',
    borderDim: 'border-lime-800',
    decoration: 'border-lime-400',
    glow: 'shadow-lime-400',
    glowColor: 'rgba(132, 204, 22, 0.5)', // lime-500
  },
  cyan: {
    text: 'text-cyan-400',
    textDim: 'text-cyan-600',
    bg: 'bg-cyan-400',
    bgHover: 'hover:bg-cyan-300',
    border: 'border-cyan-400',
    borderDim: 'border-cyan-800',
    decoration: 'border-cyan-400',
    glow: 'shadow-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.6)', // cyan-500
  },
  amber: {
    text: 'text-amber-400',
    textDim: 'text-amber-600',
    bg: 'bg-amber-400',
    bgHover: 'hover:bg-amber-300',
    border: 'border-amber-400',
    borderDim: 'border-amber-800',
    decoration: 'border-amber-400',
    glow: 'shadow-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.6)', // amber-500
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    textDim: 'text-fuchsia-600',
    bg: 'bg-fuchsia-400',
    bgHover: 'hover:bg-fuchsia-300',
    border: 'border-fuchsia-400',
    borderDim: 'border-fuchsia-800',
    decoration: 'border-fuchsia-400',
    glow: 'shadow-fuchsia-400',
    glowColor: 'rgba(217, 70, 239, 0.6)', // fuchsia-500
  },
  rose: {
    text: 'text-rose-500',
    textDim: 'text-rose-700',
    bg: 'bg-rose-500',
    bgHover: 'hover:bg-rose-400',
    border: 'border-rose-500',
    borderDim: 'border-rose-800',
    decoration: 'border-rose-500',
    glow: 'shadow-rose-500',
    glowColor: 'rgba(244, 63, 94, 0.6)', // rose-500
  }
};

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  classes: ThemeClasses;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColor>('lime');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, classes: themeConfig[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};