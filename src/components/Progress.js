import React from 'react';
import { motion } from 'framer-motion';

const Progress = ({ 
  value = 0, 
  total = 100, 
  label, 
  showPercentage = true,
  color = 'blue',
  height = 'default',
  rounded = true,
  className = '', 
  ...props 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / total) * 100));
  
  // Height classes based on iOS style
  const heightClasses = {
    small: 'h-1.5',
    default: 'h-2',
    large: 'h-3',
  };
  
  // Color classes with dark mode variants - using vibrant iOS system colors
  const colorClasses = {
    blue: 'bg-[#007AFF] dark:bg-[#0A84FF]',
    green: 'bg-[#34C759] dark:bg-[#34C759]',
    red: 'bg-[#FF3B30] dark:bg-[#FF3B30]',
    yellow: 'bg-[#FFCC00] dark:bg-[#FFCC00]',
    orange: 'bg-[#FF9500] dark:bg-[#FF9500]',
    purple: 'bg-[#AF52DE] dark:bg-[#AF52DE]',
    pink: 'bg-[#FF2D55] dark:bg-[#FF2D55]',
  };
  
  // Background classes - near black in dark mode for better contrast
  const bgClass = 'bg-ios-gray-200/70 dark:bg-dark-400/80';
  
  // Rounded corners for iOS style
  const roundedClass = rounded ? 'rounded-full' : '';

  return (
    <div className={`w-full ${className}`} {...props}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-semibold text-ios-gray-700 dark:text-white">{label}</span>
          {showPercentage && (
            <span className="text-sm font-normal text-ios-gray-900 dark:text-[#E0E0E0]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`relative w-full overflow-hidden ${heightClasses[height]} ${roundedClass} ${bgClass}`}>
        <motion.div
          className={`absolute left-0 top-0 bottom-0 ${roundedClass} ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.1
          }}
        />
      </div>
    </div>
  );
};

export default Progress; 