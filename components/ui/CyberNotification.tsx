import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CyberNotificationProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

/**
 * A cyberpunk-themed notification toast that appears at the bottom of the screen.
 * Replaces standard browser alerts with a styled, animated component.
 */
export const CyberNotification: React.FC<CyberNotificationProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose
}) => {
  const { classes } = useTheme();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className={`fixed bottom-8 left-1/2 z-50 flex items-center gap-4 p-4 border-l-4 bg-zinc-900 hard-shadow min-w-[320px] max-w-md
            ${type === 'success' ? classes.border : 'border-rose-500'}
          `}
        >
          <div className={type === 'success' ? classes.text : 'text-rose-500'}>
            {type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
          </div>
          
          <div className="flex-1">
            <h4 className={`font-bold text-sm tracking-wider uppercase ${type === 'success' ? classes.text : 'text-rose-500'}`}>
              {type === 'success' ? 'Operation Successful' : 'System Error'}
            </h4>
            <p className="text-zinc-300 text-xs font-mono mt-1">{message}</p>
          </div>

          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Progress bar */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className={`absolute bottom-0 left-0 h-1 ${type === 'success' ? classes.bg : 'bg-rose-500'}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
