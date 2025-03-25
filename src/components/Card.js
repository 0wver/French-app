import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true,
  elevated = true,
  bgTint = '',
  className = '', 
  ...props 
}) => {
  // Base classes with corner radius matching iOS design
  const baseClasses = 'transition-all duration-200';
  
  // Apply background tint if provided
  const bgTintClass = bgTint ? bgTint : '';
  
  // Different card variants following iOS design principles
  const variantClasses = {
    // Default card with subtle background
    default: `rounded-2xl bg-white border border-white/30
              dark:bg-dark-200 dark:border-white/5
              ${elevated ? 'shadow-[0_4px_14px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.15)]' : ''}`,
              
    // Sheet presentation style card - more pronounced rounded corners
    sheet: `rounded-3xl bg-white border border-white/20
           dark:bg-dark-200 dark:border-white/5
           ${elevated ? 'shadow-[0_8px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.25)]' : ''}`,
           
    // Flat background card with minimal styling
    flat: `rounded-xl bg-ios-gray-100 border border-ios-gray-200
          dark:bg-dark-300 dark:border-dark-400
          ${elevated ? 'shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.1)]' : ''}`,
          
    // Widget style card with frosted glass effect
    widget: `rounded-2xl ${bgTintClass || 'bg-white'} border border-white/30
            dark:${bgTintClass ? bgTintClass.replace('bg-', 'dark:bg-') : 'bg-dark-200'} dark:border-white/5
            ${elevated ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.2)]' : ''}`,
    
    // Menu/control center style card 
    control: `rounded-xl bg-white border border-white/20
             dark:bg-dark-300 dark:border-white/5
             ${elevated ? 'shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.2)]' : ''}`,
             
    // System Material Dark (iOS 16+ style)
    materialDark: `rounded-2xl ios-material-dark`,
    
    // System Material Thick Dark (iOS 16+ style)
    materialThickDark: `rounded-2xl ios-material-thick-dark`,
    
    // Solid color widget styles - iOS 14+ style with more vibrant colors
    widgetBlue: `rounded-2xl bg-[#D1E5FF] dark:bg-[#0A58CA] border border-white/20 dark:border-white/10
                ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`,
                
    widgetOrange: `rounded-2xl bg-[#FFE2BD] dark:bg-[#CC5500] border border-white/20 dark:border-white/10
                  ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`,
                  
    widgetGreen: `rounded-2xl bg-[#D4F7DF] dark:bg-[#148F47] border border-white/20 dark:border-white/10
                 ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`,
                 
    widgetPurple: `rounded-2xl bg-[#E7D6FF] dark:bg-[#7C3AED] border border-white/20 dark:border-white/10
                  ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`,
                  
    widgetPink: `rounded-2xl bg-[#FFCFE3] dark:bg-[#E0115F] border border-white/20 dark:border-white/10
                ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`,
                  
    widgetNeutral: `rounded-2xl bg-[#EFF1F5] dark:bg-[#4B4D52] border border-white/20 dark:border-white/10
                   ${elevated ? 'shadow-[0_4px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : ''}`
  };
  
  // iOS-style hover effect - subtle shadow transition
  const hoverClasses = hover && elevated ? 
    'hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:translate-y-[-2px]' : '';
  
  // Padding varies by card type
  const paddingClasses = variant === 'sheet' ? 'p-6' : 'p-4';
  
  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${paddingClasses} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
