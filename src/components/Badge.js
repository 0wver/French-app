import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  pill = true,
  className = '',
  ...props
}) => {
  // Base classes with rounded iOS style
  const baseClasses = 'inline-flex items-center justify-center font-medium';
  
  // Shape based on pill prop
  const shapeClasses = pill ? 'rounded-full' : 'rounded-md';
  
  // iOS style variant classes with direct color codes for light/dark mode
  const variantClasses = {
    default: 'bg-ios-gray-200 text-ios-gray-800 dark:bg-dark-300 dark:text-white',
    blue: 'bg-[#0A84FF]/20 text-[#0055CC] dark:bg-[#0A84FF]/30 dark:text-[#5BBAFF]',
    green: 'bg-[#34C759]/20 text-[#1E8F3C] dark:bg-[#34C759]/30 dark:text-[#68E68F]',
    red: 'bg-[#FF3B30]/20 text-[#D10000] dark:bg-[#FF3B30]/30 dark:text-[#FF6B61]',
    yellow: 'bg-[#FFCC00]/20 text-[#B38F00] dark:bg-[#FFCC00]/30 dark:text-[#FFE066]',
    orange: 'bg-[#FF9500]/20 text-[#CC6A00] dark:bg-[#FF9500]/30 dark:text-[#FFBF66]',
    purple: 'bg-[#AF52DE]/20 text-[#86209E] dark:bg-[#AF52DE]/30 dark:text-[#D199FF]',
    pink: 'bg-[#FF2D55]/20 text-[#D10033] dark:bg-[#FF2D55]/30 dark:text-[#FF7799]',
    
    // Filled variants
    'filled-blue': 'bg-[#0A58CA] text-white dark:bg-[#0A84FF] dark:text-white',
    'filled-green': 'bg-[#148F47] text-white dark:bg-[#34C759] dark:text-white',
    'filled-red': 'bg-[#E62020] text-white dark:bg-[#FF3B30] dark:text-white',
    'filled-yellow': 'bg-[#D9AE00] text-white dark:bg-[#FFCC00] dark:text-black',
    'filled-orange': 'bg-[#CC5500] text-white dark:bg-[#FF9500] dark:text-white',
    'filled-purple': 'bg-[#7C3AED] text-white dark:bg-[#AF52DE] dark:text-white',
    'filled-pink': 'bg-[#E0115F] text-white dark:bg-[#FF2D55] dark:text-white',
  };
  
  // Size classes for iOS appropriate sizing
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  return (
    <span
      className={`${baseClasses} ${shapeClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 