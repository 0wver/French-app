import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Badge from './Badge';
import Progress from './Progress';
import Card from './Card';

const LessonCard = ({
  id,
  title,
  description,
  duration,
  progress = 0,
  category,
  locked = false,
  completed = false,
  to,
  ...props
}) => {
  const categoryColors = {
    grammar: 'blue',
    vocabulary: 'green',
    phrases: 'purple',
    culture: 'pink',
    practice: 'orange',
  };
  
  const categoryColor = categoryColors[category] || 'default';
  
  // Define background gradients based on category and ID to ensure each card has a different color
  const categoryGradients = {
    grammar: 'bg-gradient-to-br from-[#D1E5FF] to-[#E8F4FF] dark:from-[#0A58CA]/90 dark:to-[#094CB2]/90',
    vocabulary: 'bg-gradient-to-br from-[#D4F7DF] to-[#E8FFF0] dark:from-[#148F47]/90 dark:to-[#107A3C]/90',
    phrases: 'bg-gradient-to-br from-[#E7D6FF] to-[#F4EAFF] dark:from-[#7C3AED]/90 dark:to-[#6D32D1]/90',
    culture: 'bg-gradient-to-br from-[#FFCFE3] to-[#FFE8F0] dark:from-[#E0115F]/90 dark:to-[#C00F51]/90',
    practice: 'bg-gradient-to-br from-[#FFE2BD] to-[#FFF0E0] dark:from-[#CC5500]/90 dark:to-[#B34B00]/90',
  };
  
  // Additional gradients for more variety based on ID
  const idBasedGradients = {
    1: 'bg-gradient-to-br from-[#FFD1D1] to-[#FFE8E8] dark:from-[#CA0A0A]/90 dark:to-[#B20909]/90',
    2: 'bg-gradient-to-br from-[#D1FFD1] to-[#E8FFE8] dark:from-[#0ACA0A]/90 dark:to-[#09B209]/90',
    3: 'bg-gradient-to-br from-[#D1D1FF] to-[#E8E8FF] dark:from-[#0A0ACA]/90 dark:to-[#0909B2]/90',
    4: 'bg-gradient-to-br from-[#FFD1FF] to-[#FFE8FF] dark:from-[#CA0ACA]/90 dark:to-[#B209B2]/90',
    5: 'bg-gradient-to-br from-[#FFFFD1] to-[#FFFFE8] dark:from-[#CACA0A]/90 dark:to-[#B2B209]/90',
    23: 'bg-gradient-to-br from-[#D1FFFF] to-[#E8FFFF] dark:from-[#0ACACA]/90 dark:to-[#09B2B2]/90',
    24: 'bg-gradient-to-br from-[#FFD1E3] to-[#FFE8F0] dark:from-[#CA0A5F]/90 dark:to-[#B20951]/90',
    25: 'bg-gradient-to-br from-[#D1FFE3] to-[#E8FFF0] dark:from-[#0ACA5F]/90 dark:to-[#09B251]/90',
    26: 'bg-gradient-to-br from-[#E3D1FF] to-[#F0E8FF] dark:from-[#5F0ACA]/90 dark:to-[#5109B2]/90',
    101: 'bg-gradient-to-br from-[#FFE3D1] to-[#FFF0E8] dark:from-[#CA5F0A]/90 dark:to-[#B25109]/90',
    102: 'bg-gradient-to-br from-[#E3FFD1] to-[#F0FFE8] dark:from-[#5FCA0A]/90 dark:to-[#51B209]/90',
    103: 'bg-gradient-to-br from-[#D1E3FF] to-[#E8F0FF] dark:from-[#0A5FCA]/90 dark:to-[#0951B2]/90',
    104: 'bg-gradient-to-br from-[#FFD1D1] to-[#FFE8E8] dark:from-[#CA0A0A]/80 dark:to-[#B20909]/80',
    105: 'bg-gradient-to-br from-[#D1FFD1] to-[#E8FFE8] dark:from-[#0ACA0A]/80 dark:to-[#09B209]/80',
    201: 'bg-gradient-to-br from-[#D1D1FF] to-[#E8E8FF] dark:from-[#0A0ACA]/80 dark:to-[#0909B2]/80',
    202: 'bg-gradient-to-br from-[#FFD1FF] to-[#FFE8FF] dark:from-[#CA0ACA]/80 dark:to-[#B209B2]/80',
    203: 'bg-gradient-to-br from-[#FFFFD1] to-[#FFFFE8] dark:from-[#CACA0A]/80 dark:to-[#B2B209]/80',
    204: 'bg-gradient-to-br from-[#D1FFFF] to-[#E8FFFF] dark:from-[#0ACACA]/80 dark:to-[#09B2B2]/80',
    205: 'bg-gradient-to-br from-[#FFD1E3] to-[#FFE8F0] dark:from-[#CA0A5F]/80 dark:to-[#B20951]/80',
  };
  
  // Use ID-based gradient if available, otherwise fall back to category-based gradient
  const bgGradient = idBasedGradients[id] || categoryGradients[category] || 'bg-white dark:bg-dark-200';
  
  // Use the provided 'to' prop if available, otherwise build the URL from the id
  const linkPath = to || (locked ? '#' : `/lesson/${id}`);
  
  return (
    <Link to={linkPath} className="block">
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        className={locked ? 'opacity-70' : ''}
        {...props}
      >
        <Card 
          variant={locked ? "materialDark" : "default"} 
          className={`mb-4 overflow-hidden ${!locked ? bgGradient : ''}`} 
          hover={!locked}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Badge variant={locked ? categoryColor : `filled-${categoryColor}`} className="mr-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
                {completed && (
                  <CheckCircleIcon className="h-5 w-5 text-ios-green" />
                )}
                {locked && (
                  <LockClosedIcon className="h-5 w-5 text-ios-gray-400 dark:text-ios-gray-500" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-ios-gray-900 dark:text-white mb-1">{title}</h3>
              <p className="text-sm text-ios-gray-700 dark:text-[#D4D4D8] mb-3">{description}</p>
              
              {!completed && !locked && progress > 0 && (
                <Progress value={progress} total={100} height="small" />
              )}
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-ios-gray-500 dark:text-[#D4D4D8]">{duration} min</span>
                
                {!locked && (
                  <div className="flex items-center text-xs font-medium text-ios-blue dark:text-[#0A84FF] group">
                    {completed ? 'Review Again' : 'Continue'}
                    <ArrowRightIcon className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>
            </div>
            
            {!locked && (
              <button className={`text-white rounded-full py-1.5 px-3.5 text-xs font-medium shadow-md hover:brightness-105 transition-all ml-2 mt-1 ${
                category === 'grammar' ? 'bg-[#0A58CA] dark:bg-[#0A84FF]' :
                category === 'vocabulary' ? 'bg-[#148F47] dark:bg-[#34C759]' :
                category === 'phrases' ? 'bg-[#7C3AED] dark:bg-[#AF52DE]' :
                category === 'culture' ? 'bg-[#E0115F] dark:bg-[#FF2D55]' :
                'bg-[#CC5500] dark:bg-[#FF9500]'
              }`}>
                Continue
              </button>
            )}
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default LessonCard;