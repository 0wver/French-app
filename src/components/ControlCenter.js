import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import ControlPanel from './ControlPanel';

// Main ControlCenter Component
const ControlCenter = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleControl = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Control Center Toggle Button */}
      <motion.button
        onClick={toggleControl}
        className="ios-toggle active !bg-ios-blue/95 text-white shadow-ios-strong dark:shadow-ios-dark-strong"
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Control Center"
      >
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6" />
        ) : (
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        )}
      </motion.button>

      {/* Control Center Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute bottom-full mb-3 right-0 ios-control-bg rounded-2xl p-4 shadow-ios-strong border ${darkMode ? 'border-white/5 dark:border-white/5 bg-black/90 dark:bg-black/90' : 'border-black/5 bg-white/90'}`}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-72">
              {/* Integrated Control Panel */}
              <ControlPanel 
                darkMode={darkMode} 
                onThemeChange={toggleDarkMode}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlCenter; 