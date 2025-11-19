import React, { useEffect, useState, useCallback } from 'react';
import { RollingDigit } from './RollingDigit';
import { CountdownTarget, TimeLeft } from '../types';
import { CyberButton } from './ui/CyberButton';
import { GlitchText } from './ui/GlitchText';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CountdownDisplayProps {
  target: CountdownTarget;
  onReset: () => void;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ target, onReset }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false });
  const [tick, setTick] = useState(0);

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
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      setTick(t => t + 1);
      if (tl.isComplete) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Helper to split number into digits
  const getDigits = (num: number, minLength: number = 2) => {
    const str = num.toString().padStart(minLength, '0');
    return str.split('').map(Number);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto px-4 relative z-10">
      
      {/* Header Info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col md:flex-row justify-between items-end border-b-4 border-zinc-800 pb-4 mb-12"
      >
        <div>
          <div className="text-lime-400 text-xs font-bold tracking-[0.3em] mb-1">CURRENT_OBJECTIVE</div>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full justify-items-center mb-16">
        {/* Days */}
        <div className="flex gap-2">
          {getDigits(timeLeft.days, 3).map((d, i) => (
            <RollingDigit key={`d-${i}`} value={d} label={i === 1 ? "DAYS" : ""} />
          ))}
        </div>

        {/* Hours */}
        <div className="flex gap-2 relative">
          {/* Separator for desktop */}
          <span className="hidden md:block absolute -left-8 top-8 text-4xl text-zinc-800 font-[Russo_One]">:</span>
          {getDigits(timeLeft.hours).map((d, i) => (
            <RollingDigit key={`h-${i}`} value={d} label={i === 0 ? "HOURS" : ""} />
          ))}
        </div>

        {/* Minutes */}
        <div className="flex gap-2 relative">
           <span className="hidden md:block absolute -left-8 top-8 text-4xl text-zinc-800 font-[Russo_One]">:</span>
          {getDigits(timeLeft.minutes).map((d, i) => (
            <RollingDigit key={`m-${i}`} value={d} label={i === 0 ? "MINS" : ""} />
          ))}
        </div>

        {/* Seconds */}
        <div className="flex gap-2 relative">
           <span className="hidden md:block absolute -left-8 top-8 text-4xl text-zinc-800 font-[Russo_One]">:</span>
          {getDigits(timeLeft.seconds).map((d, i) => (
            <RollingDigit key={`s-${i}`} value={d} label={i === 0 ? "SECS" : ""} />
          ))}
        </div>
      </div>

      {/* Status Bar / Footer */}
      <div className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 hard-shadow-sm">
        <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-zinc-400">
          <div className="flex items-center gap-2 px-3 py-1 bg-black border border-zinc-800">
             <AlertTriangle size={14} className={timeLeft.isComplete ? "text-rose-500" : "text-yellow-500"} />
             <span>STATUS: {timeLeft.isComplete ? "MISSION_COMPLETE" : "COUNTDOWN_ACTIVE"}</span>
          </div>
          <div className="hidden md:block">
             SYNC_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <div className="border-4 border-rose-500 bg-black p-12 max-w-2xl w-full mx-4 text-center hard-shadow relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <GlitchText text="TIME_EXPIRED" as="h1" className="text-6xl md:text-8xl font-[Russo_One] text-rose-500 mb-6 block" />
             <p className="text-white font-mono text-xl mb-8 uppercase tracking-widest">Protocol {target.title} has concluded.</p>
             <CyberButton onClick={onReset} variant="danger">Acknowledge</CyberButton>
          </div>
        </motion.div>
      )}
    </div>
  );
};
