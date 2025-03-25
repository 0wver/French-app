import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import {
  ClockIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useUserData } from '../contexts/UserDataContext';

const DynamicStatsWidget = ({ className = '' }) => {
  const { userData } = useUserData();
  
  // Get actual values from userData
  const totalHours = (userData.stats.totalTime / 60).toFixed(1);
  const wordsLearned = userData.stats.wordsLearned;
  const lessonsCompleted = userData.stats.lessonsCompleted;
  const accuracy = userData.stats.accuracy;
  
  // Array of stats to cycle through
  const stats = [
    {
      id: 'time',
      label: 'Total Time Spent',
      value: totalHours,
      unit: 'hours',
      icon: ClockIcon,
      bgColor: 'bg-[#FF8500]', // Darker vibrant orange
      darkBgColor: 'dark:bg-[#E07000]'
    },
    {
      id: 'words',
      label: 'Words Learned',
      value: wordsLearned.toString(),
      unit: 'words',
      icon: DocumentTextIcon,
      bgColor: 'bg-[#0070E0]', // Darker vibrant blue
      darkBgColor: 'dark:bg-[#0060CC]'
    },
    {
      id: 'lessons',
      label: 'Lessons Completed',
      value: lessonsCompleted.toString(),
      unit: 'lessons',
      icon: AcademicCapIcon,
      bgColor: 'bg-[#00B331]', // Darker vibrant green
      darkBgColor: 'dark:bg-[#00A029]'
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: accuracy.toString(),
      unit: '%',
      icon: CheckBadgeIcon,
      bgColor: 'bg-[#9F3ED5]', // Darker vibrant purple
      darkBgColor: 'dark:bg-[#8A34B8]'
    }
  ];

  // Current stat index
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Cycle to the next stat on click
  const cycleStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
  };

  // Get the current stat to display
  const currentStat = stats[currentStatIndex];
  
  // Get the icon component
  const IconComponent = currentStat.icon;

  return (
    <motion.div 
      className={`relative w-full h-64 cursor-pointer ${className}`}
      onClick={cycleStat}
      key={currentStat.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="widget"
        bgTint={`${currentStat.bgColor} ${currentStat.darkBgColor}`}
        elevated={true}
        className="h-full flex flex-col items-center justify-center"
      >
        <div className="absolute -z-10 top-0 right-0 h-48 w-48 bg-white/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -z-10 bottom-0 left-5 h-36 w-36 bg-white/10 rounded-full blur-2xl opacity-60"></div>
        
        <div className="bg-white/20 dark:bg-white/20 p-4 rounded-full mb-6">
          <IconComponent className="h-12 w-12 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {currentStat.label}
        </h3>
        
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-white">{currentStat.value}</span>
          <span className="text-white/90 ml-2 text-xl">{currentStat.unit}</span>
        </div>
        
        <div className="mt-6 flex justify-center">
          {stats.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentStatIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default DynamicStatsWidget; 