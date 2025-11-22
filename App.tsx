import React, { useState } from 'react';
import { SetupView } from './components/SetupView';
import { CountdownDisplay } from './components/CountdownDisplay';
import { AppState, CountdownTarget } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { getGradientForTheme, getAmbientColor } from './utils';

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [target, setTarget] = useState<CountdownTarget | null>(null);
  const { theme, classes } = useTheme();

  const handleStart = (title: string, targetDate: Date) => {
    setTarget({
      id: Date.now().toString(),
      title,
      targetDate
    });
    setAppState(AppState.RUNNING);
  };

  const handleReset = () => {
    setAppState(AppState.SETUP);
    setTarget(null);
  };

  // Use utilities to map theme into UI classes (keeps AppContent focused on layout)
  const getGradient = () => getGradientForTheme(theme);
  const getAmbient = (pos: 'left' | 'right') => getAmbientColor(theme, pos);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-gray-100 overflow-x-hidden grid-bg flex flex-col relative transition-colors duration-500">
      
      {/* Ambient Background Elements */}
      <div className={`fixed top-0 left-0 w-full h-1 bg-gradient-to-r ${getGradient()} z-50 transition-colors duration-500`}></div>
      <div className={`fixed bottom-10 left-10 w-64 h-64 ${getAmbient('left')} rounded-full blur-3xl pointer-events-none transition-colors duration-500`}></div>
      <div className={`fixed top-10 right-10 w-96 h-96 ${getAmbient('right')} rounded-full blur-3xl pointer-events-none transition-colors duration-500`}></div>

      <header className="p-6 flex justify-between items-center relative z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${classes.bg} animate-pulse transition-colors duration-300`}></div>
          <span className="font-bold tracking-widest text-sm text-zinc-500">T-MINUS // SYSTEM</span>
        </div>
        <div className="font-mono text-xs text-zinc-700">V.2.5.0-RC</div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {appState === AppState.SETUP && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SetupView onStart={handleStart} />
            </motion.div>
          )}

          {appState === AppState.RUNNING && target && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CountdownDisplay target={target} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-6 text-center text-zinc-800 font-mono text-xs relative z-10">
        NO FATE BUT WHAT WE MAKE
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
