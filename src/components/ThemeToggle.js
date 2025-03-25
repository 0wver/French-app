import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  const [showControls, setShowControls] = useState(false);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="relative">
      {/* Main Control Panel Toggle Button */}
      <motion.button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-ios-blue/90 text-white backdrop-blur-ios
                   shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-white/10
                   dark:bg-[#0A84FF]/90 dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        whileTap={{ scale: 0.95 }}
        onClick={toggleControls}
        aria-label="Toggle Control Panel"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
      </motion.button>

      {/* Control Panel Popup - iOS Control Center Style */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-full mb-3 right-0 
                     bg-white/60 dark:bg-dark-300/60 
                     backdrop-blur-ios-strong dark:backdrop-blur-ios-strong
                     rounded-xl p-4
                     shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.2)]
                     border border-white/20 dark:border-white/5"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-64 space-y-4">
              <div className="flex flex-col">
                <h3 className="text-sm font-medium mb-2 text-ios-gray-800 dark:text-white">Display</h3>
                
                <div className="flex space-x-3 mb-4">
                  {/* Dark Mode Toggle - iOS Style */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={toggleDarkMode}
                    className={`flex flex-col items-center justify-center rounded-xl p-2 flex-1 
                               ${darkMode ? 
                               'bg-[#0A84FF] text-white' : 
                               'bg-ios-gray-200/90 dark:bg-dark-200/80 text-ios-gray-800 dark:text-white'} 
                               border ${darkMode ? 
                               'border-white/10' : 
                               'border-white/20 dark:border-white/5'}`}
                    aria-label="Toggle Dark Mode"
                  >
                    {darkMode ? (
                      <MoonIcon className="h-5 w-5 mb-1" />
                    ) : (
                      <SunIcon className="h-5 w-5 mb-1" />
                    )}
                    <span className="text-xs font-medium mt-1">{darkMode ? 'Dark' : 'Light'}</span>
                  </motion.button>
                </div>
                
                {/* Brightness Slider - iOS Style */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-ios-gray-800 dark:text-white mb-2">
                    <SunIcon className="h-3 w-3" />
                    <SunIcon className="h-4 w-4" />
                  </div>
                  <div className="h-1.5 rounded-full bg-ios-gray-300/50 dark:bg-dark-400/80 relative">
                    <div className="absolute inset-y-0 left-0 bg-ios-blue dark:bg-[#0A84FF] rounded-full w-7/10"></div>
                    <div className="absolute top-1/2 left-7/10 w-4 h-4 -translate-x-1/2 -translate-y-1/2 
                                  bg-white dark:bg-white rounded-full 
                                  shadow-[0_1px_4px_rgba(0,0,0,0.1)] border border-ios-gray-100/50"></div>
                  </div>
                </div>
              </div>
              
              {/* Quick Controls - iOS Style */}
              <div className="grid grid-cols-4 gap-3">
                {['Wi-Fi', 'Bluetooth', 'Airplane', 'Focus'].map((label, index) => (
                  <motion.div 
                    key={label}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer
                              ${index === 0 ? 
                              'bg-[#0A84FF] text-white' : 
                              'bg-ios-gray-200/90 dark:bg-dark-200/80 text-ios-gray-800 dark:text-white'}
                              border ${index === 0 ? 
                              'border-white/10' : 
                              'border-white/20 dark:border-white/5'}`}
                  >
                    <span className="block h-4 w-4 rounded-full bg-current mb-1"></span>
                    <span className="text-[10px] font-medium">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle; 