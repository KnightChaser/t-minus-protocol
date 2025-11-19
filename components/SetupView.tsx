import React, { useState } from 'react';
import { CyberButton } from './ui/CyberButton';
import { GlitchText } from './ui/GlitchText';
import { generateMissionName } from '../services/geminiService';
import { Calendar, Clock, Zap, Terminal } from 'lucide-react';

interface SetupViewProps {
  onStart: (title: string, date: Date) => void;
}

export const SetupView: React.FC<SetupViewProps> = ({ onStart }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateName = async () => {
    setIsGenerating(true);
    const context = title || "Doomsday Event";
    const name = await generateMissionName(context);
    setTitle(name);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    const target = new Date(`${date}T${time}`);
    const finalTitle = title || "PROTOCOL: UNKNOWN";
    onStart(finalTitle, target);
  };

  // Get today's date string for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 relative z-10">
      <div className="bg-zinc-900 border-4 border-zinc-800 p-8 hard-shadow relative overflow-hidden">
        {/* Decorative Corner Marks */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-lime-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-lime-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-lime-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-lime-400"></div>

        <div className="mb-8 text-center border-b-2 border-zinc-800 pb-6">
          <GlitchText text="INITIALIZE_SEQUENCE" as="h1" className="text-4xl md:text-5xl font-[Russo_One] text-white tracking-tight" />
          <p className="text-zinc-500 mt-2 font-mono text-sm tracking-widest">SYSTEM_READY // WAITING_FOR_INPUT</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-2">
            <label className="text-lime-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Terminal size={18} /> Mission Protocol
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ENTER NAME OR GENERATE..."
                className="flex-1 bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:border-lime-400 focus:outline-none transition-colors"
              />
              <CyberButton 
                type="button" 
                variant="secondary" 
                onClick={handleGenerateName}
                isLoading={isGenerating}
                className="shrink-0"
              >
                <Zap size={20} />
              </CyberButton>
            </div>
            <p className="text-xs text-zinc-600">USE AI ASSIST FOR CRYPTIC PROTOCOL NAMES</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-lime-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar size={18} /> Target Date
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:border-lime-400 focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lime-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Clock size={18} /> T-Minus Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono focus:border-lime-400 focus:outline-none transition-colors [color-scheme:dark]"
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
