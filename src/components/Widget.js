import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const Widget = ({ 
  children, 
  title,
  size = 'medium', // small, medium, large
  color = 'blue',
  icon: Icon,
  className = '',
  onClick,
  elevated = true,
  ...props 
}) => {
  // Map color to background and text colors with proper iOS styling
  const colorMap = {
    blue: {
      bg: 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/20',
      text: 'text-[#007AFF] dark:text-[#0A84FF]',
      iconBg: 'bg-[#007AFF]/15 dark:bg-[#0A84FF]/25',
      glow: 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/15',
    },
    purple: {
      bg: 'bg-ios-purple/10 dark:bg-ios-purple/20',
      text: 'text-ios-purple dark:text-ios-purple',
      iconBg: 'bg-ios-purple/15 dark:bg-ios-purple/25',
      glow: 'bg-ios-purple/10 dark:bg-ios-purple/15',
    },
    green: {
      bg: 'bg-ios-green/10 dark:bg-ios-green/20',
      text: 'text-ios-green dark:text-ios-green',
      iconBg: 'bg-ios-green/15 dark:bg-ios-green/25',
      glow: 'bg-ios-green/10 dark:bg-ios-green/15',
    },
    red: {
      bg: 'bg-ios-red/10 dark:bg-ios-red/20',
      text: 'text-ios-red dark:text-ios-red',
      iconBg: 'bg-ios-red/15 dark:bg-ios-red/25',
      glow: 'bg-ios-red/10 dark:bg-ios-red/15',
    },
    orange: {
      bg: 'bg-ios-orange/10 dark:bg-ios-orange/20',
      text: 'text-ios-orange dark:text-ios-orange',
      iconBg: 'bg-ios-orange/15 dark:bg-ios-orange/25',
      glow: 'bg-ios-orange/10 dark:bg-ios-orange/15',
    },
    yellow: {
      bg: 'bg-ios-yellow/10 dark:bg-ios-yellow/20',
      text: 'text-ios-yellow dark:text-ios-yellow',
      iconBg: 'bg-ios-yellow/15 dark:bg-ios-yellow/25',
      glow: 'bg-ios-yellow/10 dark:bg-ios-yellow/15',
    },
    pink: {
      bg: 'bg-ios-pink/10 dark:bg-ios-pink/20',
      text: 'text-ios-pink dark:text-ios-pink',
      iconBg: 'bg-ios-pink/15 dark:bg-ios-pink/25',
      glow: 'bg-ios-pink/10 dark:bg-ios-pink/15',
    },
  };

  // Size classes for the widget with iOS appropriate sizing
  const sizeClasses = {
    small: 'h-28 w-full',
    medium: 'h-40 w-full',
    large: 'h-56 w-full',
  };

  // Handle click if provided
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <motion.div 
      className={`relative overflow-hidden ${sizeClasses[size]} ${className}`}
      whileHover={onClick ? { y: -4, transition: { duration: 0.2 } } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={handleClick}
      {...props}
    >
      {/* iOS-style background glow effect */}
      <div className={`absolute -z-10 top-0 right-0 h-40 w-40 ${colorMap[color].glow} rounded-full blur-3xl opacity-70`}></div>
      <div className={`absolute -z-10 bottom-0 left-5 h-24 w-24 ${colorMap[color].glow} rounded-full blur-2xl opacity-60`}></div>
      
      <Card 
        variant="widget" 
        className="h-full w-full"
        hover={!!onClick}
        elevated={elevated}
      >
        <div className="flex h-full flex-col p-1">
          {/* Header with icon and title - iOS style */}
          {(Icon || title) && (
            <div className="flex items-center mb-3">
              {Icon && (
                <div className={`${colorMap[color].iconBg} p-2 rounded-lg mr-3`}>
                  <Icon className={`h-5 w-5 ${colorMap[color].text}`} />
                </div>
              )}
              {title && (
                <h3 className="text-base font-semibold text-ios-gray-900 dark:text-white">{title}</h3>
              )}
            </div>
          )}
          
          {/* Widget content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Widget; 