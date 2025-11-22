import React, { useEffect, useState, useCallback } from 'react';
import { RollingDigit } from './RollingDigit';
import { CountdownTarget, TimeLeft } from '../types';
import { CyberButton } from './ui/CyberButton';
import { GlitchText } from './ui/GlitchText';
import { AlertTriangle, RefreshCw, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface CountdownDisplayProps {
  target: CountdownTarget;
  onReset: () => void;
}

const TimeUnitGroup = ({ value, label, minDigits = 2 }: { value: number, label: string, minDigits?: number }) => {
  // Helper to split number into digits
  const getDigits = (num: number, minLength: number) => {
    const str = num.toString().padStart(minLength, '0');
    return str.split('').map(Number);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        {getDigits(value, minDigits).map((d, i) => (
          <RollingDigit key={`${label}-${i}`} value={d} />
        ))}
      </div>
      <span className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase mt-6">
        {label}
      </span>
    </div>
  );
};

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ target, onReset }) => {
  const { classes } = useTheme();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false });
  const [heartbeats, setHeartbeats] = useState<number>(0);

  const calculateTimeLeft = useCallback(() => {
    const difference = +target.targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isComplete: false
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }, [target.targetDate]);

  useEffect(() => {
    const update = () => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);

      // Heartbeat calculation: 80 BPM
      const now = new Date().getTime();
      const tgt = target.targetDate.getTime();
      const diff = Math.max(0, tgt - now);
      // 80 beats per minute = 80/60 beats per second
      const beats = Math.floor((diff / 1000) * (80 / 60));
      setHeartbeats(beats);

      if (tl.isComplete) clearInterval(timer);
    };

    update();
    const timer = setInterval(update, 100); // Update frequently for heartbeat precision

    return () => clearInterval(timer);
  }, [calculateTimeLeft, target.targetDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-7xl mx-auto px-4 relative z-10">
      
      {/* Header Info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col md:flex-row justify-between items-end border-b-4 border-zinc-800 pb-4 mb-16"
      >
        <div>
          <div className={`${classes.text} text-xs font-bold tracking-[0.3em] mb-1 transition-colors duration-300`}>CURRENT_OBJECTIVE</div>
          <GlitchText text={target.title} as="h2" className="text-3xl md:text-5xl font-[Russo_One] text-white uppercase" />
        </div>
        <div className="text-right mt-4 md:mt-0">
           <div className="text-rose-500 text-xs font-bold tracking-[0.3em] mb-1 flex items-center justify-end gap-2">
             <span className="animate-pulse w-2 h-2 bg-rose-500 rounded-full"></span> LIVE
           </div>
           <div className="font-mono text-zinc-500 text-sm">
             TARGET: {target.targetDate.toLocaleString()}
           </div>
        </div>
      </motion.div>

      {/* Main Countdown */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-20 w-full flex-wrap">
        <TimeUnitGroup value={timeLeft.days} label="DAYS" minDigits={3} />
        <TimeUnitGroup value={timeLeft.hours} label="HOURS" />
        <TimeUnitGroup value={timeLeft.minutes} label="MINUTES" />
        <TimeUnitGroup value={timeLeft.seconds} label="SECONDS" />
      </div>

      {/* Status Bar / Footer */}
      <div className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 hard-shadow-sm">
        <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-zinc-400">
          <div className="flex items-center gap-2 px-3 py-1 bg-black border border-zinc-800">
             <AlertTriangle size={14} className={timeLeft.isComplete ? "text-rose-500" : "text-yellow-500"} />
             <span>STATUS: {timeLeft.isComplete ? "MISSION_COMPLETE" : "COUNTDOWN_ACTIVE"}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-zinc-500">
             <HeartPulse size={14} className="text-rose-600 animate-pulse" />
             <span>ONLY <span className="text-rose-500 font-bold">{heartbeats.toLocaleString()}</span> HEARTBEATS LEFT</span>
          </div>
        </div>

        <CyberButton onClick={onReset} variant="secondary" className="py-2 px-4 text-sm border-2">
          <span className="flex items-center gap-2">
            <RefreshCw size={14} /> ABORT / RESET
          </span>
        </CyberButton>
      </div>

      {/* Complete Overlay */}
      {timeLeft.isComplete && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <div className="border-4 border-rose-500 bg-black p-8 md:p-12 max-w-2xl w-full text-center hard-shadow relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
             
             <div className="relative z-10 mb-8">
               <GlitchText 
                  text="TIME_EXPIRED" 
                  as="h1" 
                  className="text-5xl md:text-7xl font-[Russo_One] text-rose-500 block break-all leading-none" 
               />
             </div>

             <p className="text-white font-mono text-lg md:text-xl mb-8 uppercase tracking-widest relative z-10">
               {target.title.toUpperCase().match(/^(PROTOCOL|OPERATION)/) 
                  ? target.title 
                  : `PROTOCOL: ${target.title}`} 
               {' '}HAS CONCLUDED.
             </p>
             
             <div className="relative z-10">
                <CyberButton onClick={onReset} variant="danger">Acknowledge</CyberButton>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
