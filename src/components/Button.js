import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Button = ({ 
  children, 
  variant = 'filled', 
  size = 'md', 
  className = '', 
  disabled = false,
  showIcon = false,
  onClick, 
  ...props 
}) => {
  // Base classes for all buttons with common properties
  const baseClasses = 'flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none';
  
  // Variant classes based on iOS system style buttons
  const variantClasses = {
    // Filled button (primary action)
    filled: `rounded-full bg-[#007AFF] text-white 
            active:bg-[#0060CC] active:shadow-none
            dark:bg-[#0A84FF] dark:text-white dark:active:opacity-90 hover:brightness-105
            ${disabled ? 'opacity-50 bg-ios-gray-400 dark:bg-ios-gray-600' : ''}`,
            
    // Outline/Text button (secondary action)
    outline: `rounded-full bg-transparent border border-ios-blue text-ios-blue 
             active:bg-ios-blue/10 
             dark:text-[#0A84FF] dark:border-[#0A84FF] dark:active:bg-[#0A84FF]/10
             ${disabled ? 'opacity-50 border-ios-gray-400 text-ios-gray-500 dark:border-ios-gray-600 dark:text-ios-gray-400' : ''}`,
             
    // Text-only button (tertiary action)
    text: `bg-transparent text-ios-blue 
          active:bg-ios-blue/5 
          dark:text-[#0A84FF] dark:active:bg-[#0A84FF]/5
          ${disabled ? 'opacity-50 text-ios-gray-500 dark:text-ios-gray-400' : ''}`,
          
    // Destructive action button
    destructive: `rounded-full bg-ios-red text-white 
                 active:bg-opacity-90 
                 dark:bg-ios-red dark:text-white dark:active:opacity-90
                 ${disabled ? 'opacity-50 bg-ios-gray-400 dark:bg-ios-gray-600' : ''}`,
                 
    // Secondary filled button with gray background
    secondary: `rounded-full bg-ios-gray-200 text-ios-gray-800 
               active:bg-ios-gray-300 
               dark:bg-dark-300 dark:text-white dark:active:bg-dark-400
               ${disabled ? 'opacity-50 bg-ios-gray-100 dark:bg-dark-200' : ''}`,
    
    // Ghost button style (transparent with border)
    ghost: `rounded-full bg-transparent border border-[#D4D4D8] text-[#D4D4D8]
           hover:text-white hover:border-white active:bg-white/5
           dark:border-[#D4D4D8] dark:text-[#D4D4D8] dark:active:bg-white/5
           ${disabled ? 'opacity-50 border-ios-gray-600 text-ios-gray-600 dark:border-ios-gray-700 dark:text-ios-gray-700' : ''}`,
    
    // Pill-shaped small button
    pill: `rounded-full bg-[#007AFF] text-white text-xs font-medium
          py-1.5 px-3 active:bg-[#0060CC] active:shadow-none
          dark:bg-[#0A84FF] dark:text-white dark:active:opacity-90 hover:brightness-105
          ${disabled ? 'opacity-50 bg-ios-gray-400 dark:bg-ios-gray-600' : ''}`,
          
    // Circular icon button
    icon: `rounded-full w-10 h-10 flex items-center justify-center 
          shadow-[0_1px_2px_rgba(0,0,0,0.08)] 
          hover:brightness-105 active:shadow-none
          ${disabled ? 'opacity-50 bg-ios-gray-400 dark:bg-ios-gray-600' : ''}`
  };
  
  // Size classes matching iOS sizing conventions
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg'
  };
  
  // Shadow class - very subtle for filled buttons, none for outline/text/ghost
  const shadowClass = variant === 'filled' || variant === 'destructive' || variant === 'secondary' || variant === 'pill'
    ? 'shadow-[0_1px_2px_rgba(0,0,0,0.08)]' 
    : '';
  
  // Don't apply size classes to pill variant
  const sizeClass = variant === 'pill' ? '' : sizeClasses[size];
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClass} ${shadowClass} ${className}`}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      {showIcon && (
        <ArrowRightIcon className="ml-1.5 h-4 w-4" />
      )}
    </motion.button>
  );
};

export default Button; 