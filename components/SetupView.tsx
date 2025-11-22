import React, { useState } from 'react';
import { CyberButton } from './ui/CyberButton';
import { GlitchText } from './ui/GlitchText';
import { Calendar, Clock, Terminal, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeColor } from '../types';

interface SetupViewProps {
  onStart: (title: string, date: Date) => void;
}
/**
 * Setup view rendered when creating a new countdown target.
 * Collects title, date and time and then invokes `onStart` with a Date.
 */
export const SetupView: React.FC<SetupViewProps> = ({ onStart }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const { theme, setTheme, classes } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    const target = new Date(`${date}T${time}`);
    const finalTitle = title || "PROTOCOL: UNKNOWN";
    onStart(finalTitle, target);
  };

  const themes: { id: ThemeColor; color: string; label: string }[] = [
    { id: 'lime', color: 'bg-lime-400', label: 'NEON_LIME' },
    { id: 'cyan', color: 'bg-cyan-400', label: 'CYBER_CYAN' },
    { id: 'amber', color: 'bg-amber-400', label: 'SOLAR_AMBER' },
    { id: 'fuchsia', color: 'bg-fuchsia-400', label: 'VOID_PURPLE' },
    { id: 'rose', color: 'bg-rose-500', label: 'RED_ALERT' },
  ];

  // Get today's date string for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 relative z-10">
      <div className="bg-zinc-900 border-4 border-zinc-800 p-8 hard-shadow relative overflow-hidden transition-colors duration-300">
        {/* Decorative Corner Marks */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 ${classes.decoration}`}></div>
        <div className={`absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 ${classes.decoration}`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 ${classes.decoration}`}></div>
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 ${classes.decoration}`}></div>

        <div className="mb-8 text-center border-b-2 border-zinc-800 pb-6">
          <GlitchText text="INITIALIZE_SEQUENCE" as="h1" className="text-4xl md:text-5xl font-[Russo_One] text-white tracking-tight" />
          <p className="text-zinc-500 mt-2 font-mono text-sm tracking-widest">SYSTEM_READY // WAITING_FOR_INPUT</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-2">
             <label className={`${classes.text} font-bold uppercase tracking-wider flex items-center gap-2`}>
              <Palette size={18} /> SYSTEM VISUALS
            </label>
            <div className="flex flex-wrap gap-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`
                    group relative px-4 py-2 border-2 border-zinc-700 bg-black flex items-center gap-2 transition-all
                    ${theme === t.id ? `border-${t.id === 'rose' ? 'rose-500' : t.id + '-400'} ring-1 ring-${t.id === 'rose' ? 'rose-500' : t.id + '-400'}` : 'hover:border-zinc-500'}
                  `}
                >
                  <div className={`w-3 h-3 ${t.color} ${theme === t.id ? 'animate-pulse' : ''}`}></div>
                  <span className={`text-xs font-mono ${theme === t.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className={`${classes.text} font-bold uppercase tracking-wider flex items-center gap-2`}>
              <Terminal size={18} /> Mission Protocol
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ENTER NAME..."
                className={`flex-1 bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:${classes.border} focus:outline-none transition-colors`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`${classes.text} font-bold uppercase tracking-wider flex items-center gap-2`}>
                <Calendar size={18} /> Target Date
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:${classes.border} focus:outline-none transition-colors [color-scheme:dark]`}
              />
            </div>

            <div className="space-y-2">
              <label className={`${classes.text} font-bold uppercase tracking-wider flex items-center gap-2`}>
                <Clock size={18} /> T-Minus Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className={`w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:${classes.border} focus:outline-none transition-colors [color-scheme:dark]`}
              />
            </div>
          </div>

          <div className="pt-4">
            <CyberButton type="submit" className="w-full py-5 text-xl">
              ENGAGE TIMER
            </CyberButton>
          </div>
        </form>
      </div>
    </div>
  );
};
