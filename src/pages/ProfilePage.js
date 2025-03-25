import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon, 
  ClockIcon, 
  AcademicCapIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  BellIcon,
  MoonIcon,
  SunIcon,
  SpeakerWaveIcon,
  ArrowLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Progress from '../components/Progress';
import { useUserData } from '../contexts/UserDataContext';

const ProfilePage = () => {
  // Get user data from context
  const { userData, resetUserData } = useUserData();
  const { profile, stats, goals, badges } = userData;
  
  // Animation variants
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Handle reset data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all your progress data? This cannot be undone.')) {
      resetUserData();
    }
  };

  return (
    <div className="py-8">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="icon" className="bg-white/80 dark:bg-dark-200/80 shadow-sm backdrop-blur-sm">
              <ArrowLeftIcon className="h-6 w-6 text-ios-gray-900 dark:text-white" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Profile</h1>
        </div>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* User Profile Card */}
        <motion.div variants={item}>
          <Card variant="widgetBlue" className="sm:flex items-center backdrop-blur-sm">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/50 dark:bg-dark-300/50 flex items-center justify-center">
                  <UserCircleIcon className="w-20 h-20 text-ios-gray-400 dark:text-white/70" />
                </div>
                <Badge variant="filled-green" className="absolute bottom-0 right-0">
                  {profile.level}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white mb-1">{profile.name}</h2>
              <p className="text-ios-gray-600 dark:text-white/70 mb-3">{profile.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <div className="flex items-center text-ios-gray-700 dark:text-white/80">
                  <ClockIcon className="h-5 w-5 mr-1 text-ios-gray-500 dark:text-white/60" />
                  <span>Member since {profile.memberSince}</span>
                </div>
                
                <div className="flex items-center text-ios-gray-700 dark:text-white/80">
                  <AcademicCapIcon className="h-5 w-5 mr-1 text-ios-blue dark:text-[#0A84FF]" />
                  <span>{stats.pointsEarned} points</span>
                </div>
                
                <div className="flex items-center text-ios-gray-700 dark:text-white/80">
                  <span className="mr-1">🔥</span>
                  <span>{stats.daysStreak} day streak</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 flex-shrink-0 sm:ml-4 flex justify-center">
              <Button variant="primary" className="bg-[#0A58CA] dark:bg-[#0A84FF] text-white">
                <div className="flex items-center">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Edit
                </div>
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Daily Goal */}
        <motion.div variants={item}>
          <Card variant="widgetOrange" className="backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white">Today's Goal</h2>
              <Badge variant="filled-orange">{goals.current} / {goals.daily} points</Badge>
            </div>
            
            <Progress 
              value={goals.current} 
              total={goals.daily} 
              color="orange"
              height="large"
              className="mb-4"
            />
            
            <p className="text-ios-gray-600 dark:text-white/70">
              {goals.current < goals.daily
                ? `You need ${goals.daily - goals.current} more points to reach your daily goal.`
                : 'You have reached your daily goal! Great job!'
              }
            </p>
          </Card>
        </motion.div>
        
        {/* Badges Section */}
        <motion.div variants={item}>
          <Card variant="widgetGreen" className="backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white">Your Badges</h2>
              <Button variant="outline" className="text-sm flex items-center bg-white/50 dark:bg-dark-300/50 text-ios-gray-700 dark:text-white/80 backdrop-blur-sm">
                See All <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {badges.length > 0 ? (
                badges.map((badge, index) => {
                  const colors = {
                    blue: { bg: 'bg-[#0A84FF]', text: 'text-white' },
                    green: { bg: 'bg-[#34C759]', text: 'text-white' },
                    orange: { bg: 'bg-[#FF9500]', text: 'text-white' },
                    purple: { bg: 'bg-[#AF52DE]', text: 'text-white' }
                  };
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${colors[badge.color].bg}`}>
                        <span className="text-2xl text-white">{badge.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-ios-gray-800 dark:text-white text-center">{badge.name}</span>
                      <span className="text-xs text-ios-gray-500 dark:text-white/60 text-center mt-1">{badge.description}</span>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-ios-gray-600 dark:text-white/70">
                    You haven't earned any badges yet. Complete lessons and challenges to earn badges!
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
        
        {/* Settings Section */}
        <motion.div variants={item}>
          <Card variant="widgetPurple" className="backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white mb-6">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70 mr-3" />
                  <div>
                    <p className="font-medium text-ios-gray-900 dark:text-white">Notifications</p>
                    <p className="text-sm text-ios-gray-600 dark:text-white/70">Receive reminders and updates</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-ios-gray-300 dark:bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF52DE]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center">
                  <MoonIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70 mr-3" />
                  <div>
                    <p className="font-medium text-ios-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-ios-gray-600 dark:text-white/70">Switch between light and dark themes</p>
                  </div>
                </div>
                
                <div className="bg-white/70 dark:bg-dark-400/70 p-1 rounded-lg inline-flex">
                  <button className="p-1.5 rounded bg-white dark:bg-transparent">
                    <SunIcon className="h-5 w-5 text-[#FF9500]" />
                  </button>
                  <button className="p-1.5 rounded dark:bg-dark-300">
                    <MoonIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center">
                  <SpeakerWaveIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70 mr-3" />
                  <div>
                    <p className="font-medium text-ios-gray-900 dark:text-white">Sound Effects</p>
                    <p className="text-sm text-ios-gray-600 dark:text-white/70">Play sounds for correct/incorrect answers</p>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-ios-gray-300 dark:bg-dark-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AF52DE]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center">
                  <ArrowPathIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70 mr-3" />
                  <div>
                    <p className="font-medium text-ios-gray-900 dark:text-white">Reset Progress</p>
                    <p className="text-sm text-ios-gray-600 dark:text-white/70">Clear all learning data</p>
                  </div>
                </div>
                <Button variant="danger" onClick={handleResetData}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Footer with Attribution */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-ios-gray-600 dark:text-white/70 text-sm">
          Website made by Amer El Sayed
        </p>
      </motion.div>
    </div>
  );
};

export default ProfilePage;