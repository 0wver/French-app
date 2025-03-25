import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  CheckBadgeIcon, 
  AcademicCapIcon, 
  FireIcon,
  SparklesIcon, 
  BoltIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Card from '../components/Card';
import Progress from '../components/Progress';
import NavigationWidgets from '../components/NavigationWidgets';
import DynamicStatsWidget from '../components/DynamicStatsWidget';
import QuoteDisplay from '../components/QuoteDisplay';
import { useUserData } from '../contexts/UserDataContext';

const HomePage = () => {
  const { userData, checkAndUpdateStreak, updateTodayActivity } = useUserData();
  
  // Extract values from userData
  const daysStreak = userData.stats.daysStreak;
  const { daily: dailyGoal, current: goalProgress } = userData.goals;
  
  // Check streak on initial load
  useEffect(() => {
    // In a real app, we would check if the user has already logged in today
    // For now, we'll just update the streak when they visit the home page
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      checkAndUpdateStreak();
      // Record today's visit
      localStorage.setItem('lastVisit', today);
      // Add some points for visiting
      updateTodayActivity(5);
    }
  }, [checkAndUpdateStreak, updateTodayActivity]);
  
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <div className="py-8">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-ios-blue dark:text-white">Learn German</h1>
        </div>
        {/* Dark mode toggle could be moved here later */}
      </div>

      {/* Hero Section */}
      <motion.section
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card variant="materialThickDark" className="relative z-10 bg-white/60 dark:bg-black/50">
          <div className="flex flex-col items-center">
            {/* Motivational Quote */}
            <QuoteDisplay className="mb-8" />

            {/* Dynamic Stats Widget */}
            <DynamicStatsWidget className="w-full max-w-2xl mx-auto mb-4" />
          </div>
        </Card>
      </motion.section>
      
      {/* Navigation Widgets Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white mb-6">Navigation</h2>
        <NavigationWidgets />
      </section>
      
      {/* Daily Progress Section */}
      <motion.section 
        className="mb-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white">Today's Progress</h2>
          <Link to="/stats" className="text-ios-blue dark:text-[#3B82F6] text-sm flex items-center group">
            See all stats <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div variants={item}>
            <Card variant="materialDark" bgTint="bg-[#ADD8E6]/5" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-blue/10 dark:bg-ios-blue/20 p-3 rounded-full mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-[#0A84FF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#424242] dark:text-white mb-2">Points Earned</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-blue dark:text-[#0A84FF]">{goalProgress}</span>
                  <span className="text-ios-gray-500 dark:text-[#E0E0E0] ml-1 font-normal">/ {dailyGoal}</span>
                </div>
                <Progress value={goalProgress} total={dailyGoal} className="w-full mt-4" />
                <p className="text-xs text-ios-gray-600 dark:text-[#D4D4D8] mt-2 font-normal">Keep it up! You're doing great!</p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="materialDark" bgTint="bg-[#FFE0B2]/5" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-orange/10 dark:bg-ios-orange/20 p-3 rounded-full mb-4">
                  <FireIcon className="h-8 w-8 text-[#FF9500]" />
                </div>
                <h3 className="text-lg font-semibold text-[#424242] dark:text-white mb-2">Day Streak</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-orange">{daysStreak}</span>
                  <span className="text-ios-gray-500 dark:text-[#E0E0E0] ml-1 font-normal">days</span>
                </div>
                <p className="text-ios-gray-600 dark:text-[#D4D4D8] mt-4 font-normal">Keep it up! You're on fire!</p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="materialDark" bgTint="bg-[#C8E6C9]/5" className="h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ios-green/10 dark:bg-ios-green/20 p-3 rounded-full mb-4">
                  <CheckBadgeIcon className="h-8 w-8 text-[#34C759]" />
                </div>
                <h3 className="text-lg font-semibold text-[#424242] dark:text-white mb-2">Next Milestone</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-ios-green">10</span>
                  <span className="text-ios-gray-500 dark:text-[#E0E0E0] ml-1 font-normal">days away</span>
                </div>
                <p className="text-ios-gray-600 dark:text-[#D4D4D8] mt-4 font-normal">Unlock the "German Enthusiast" badge!</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Sections - iOS Widget Style */}
      <motion.section variants={container} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white">Continue Learning</h2>
          <Link to="/courses" className="text-ios-blue dark:text-[#3B82F6] text-sm flex items-center group">
            See all courses <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.courses.beginner.slice(0, 3).map((lesson, index) => (
            <motion.div key={lesson.id} variants={item}>
              <Link to={`/lesson/${lesson.id}`}>
                <Card variant="materialDark" className="h-full cursor-pointer relative overflow-hidden" hover>
                  <div className="absolute -z-10 top-0 right-0 h-32 w-32 bg-ios-purple/10 rounded-full blur-xl"></div>
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center mb-4">
                      <div className={`bg-ios-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'}/10 dark:bg-ios-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'}/20 p-3 rounded-xl mr-3`}>
                        {index === 0 ? (
                          <SparklesIcon className="h-6 w-6 text-[#AF52DE]" />
                        ) : index === 1 ? (
                          <BoltIcon className="h-6 w-6 text-[#0A84FF]" />
                        ) : (
                          <FireIcon className="h-6 w-6 text-[#34C759]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-ios-gray-900 dark:text-white">{lesson.title}</h3>
                        <p className="text-ios-gray-600 dark:text-[#D4D4D8] text-sm font-normal">{lesson.description}</p>
                      </div>
                    </div>
                    <Progress value={lesson.progress} total={100} label={`${lesson.progress}% Complete`} className="mt-auto" />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-ios-gray-500 dark:text-[#D4D4D8] font-light">{lesson.duration} minutes left</span>
                      <Button variant="pill" className="ml-2" showIcon>
                        {lesson.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;