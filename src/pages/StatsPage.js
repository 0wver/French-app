import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useUserData } from '../contexts/UserDataContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
);

const StatsPage = () => {
  const { userData, resetUserData } = useUserData();
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Common chart options for iOS theme
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: isDarkMode ? '#fff' : '#000',
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(50, 50, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkMode ? '#ffffff80' : '#000000',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDarkMode ? '#ffffff80' : '#000000',
        }
      },
    },
  };
  
  // Learning activity data (last 7 days)
  const activityLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData = {
    labels: activityLabels,
    datasets: [
      {
        fill: true,
        data: userData.activity,
        borderColor: '#0A84FF',
        backgroundColor: 'rgba(10, 132, 255, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
        pointBorderColor: '#0A84FF',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };
  
  // Vocabulary progress by category
  const vocabLabels = Object.keys(userData.vocabularyProgress);
  const vocabData = {
    labels: vocabLabels,
    datasets: [
      {
        data: Object.values(userData.vocabularyProgress),
        backgroundColor: [
          'rgba(0, 122, 255, 0.8)',   // iOS Blue
          'rgba(52, 199, 89, 0.8)',    // iOS Green
          'rgba(255, 149, 0, 0.8)',    // iOS Orange
          'rgba(175, 82, 222, 0.8)',   // iOS Purple
          'rgba(255, 45, 85, 0.8)',    // iOS Pink
          'rgba(88, 86, 214, 0.8)',    // iOS Indigo
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // Learning time distribution
  const timeDistribution = {
    labels: Object.keys(userData.timeDistribution),
    datasets: [
      {
        data: Object.values(userData.timeDistribution),
        backgroundColor: [
          'rgba(0, 122, 255, 0.8)',   // iOS Blue
          'rgba(52, 199, 89, 0.8)',    // iOS Green
          'rgba(175, 82, 222, 0.8)',   // iOS Purple
          'rgba(255, 149, 0, 0.8)',    // iOS Orange
        ],
        borderWidth: 0,
      },
    ],
  };
  
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
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Statistics</h1>
        </div>
        <div className="flex space-x-2">
          <Badge variant="filled-blue">Last 7 Days</Badge>
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div variants={item}>
            <Card variant="widgetBlue" className="h-full backdrop-blur-sm">
              <h3 className="text-sm font-medium text-ios-gray-500 dark:text-white/70 mb-2">Total Time Spent</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-ios-gray-900 dark:text-white">{(userData.stats.totalTime / 60).toFixed(1)}</span>
                <span className="text-ios-gray-600 dark:text-white/80 ml-1">hours</span>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetGreen" className="h-full backdrop-blur-sm">
              <h3 className="text-sm font-medium text-ios-gray-500 dark:text-white/70 mb-2">Words Learned</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-ios-gray-900 dark:text-white">{userData.stats.wordsLearned}</span>
                {userData.stats.wordsLearned > 0 && (
                  <span className="text-ios-green dark:text-[#34C759] ml-2 text-sm font-medium">+{userData.stats.wordsLearned}</span>
                )}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetOrange" className="h-full backdrop-blur-sm">
              <h3 className="text-sm font-medium text-ios-gray-500 dark:text-white/70 mb-2">Lessons Completed</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-ios-gray-900 dark:text-white">{userData.stats.lessonsCompleted}</span>
                {userData.stats.lessonsCompleted > 0 && (
                  <span className="text-ios-green dark:text-[#34C759] ml-2 text-sm font-medium">+{userData.stats.lessonsCompleted}</span>
                )}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetPurple" className="h-full backdrop-blur-sm">
              <h3 className="text-sm font-medium text-ios-gray-500 dark:text-white/70 mb-2">Accuracy</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-ios-gray-900 dark:text-white">{userData.stats.accuracy}%</span>
                {userData.stats.accuracy > 0 && (
                  <span className="text-ios-green dark:text-[#34C759] ml-2 text-sm font-medium">+{userData.stats.accuracy}%</span>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Activity Chart */}
        <motion.div variants={item}>
          <Card variant="widgetBlue" className="backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white mb-6">Learning Activity</h2>
            <div className="h-72">
              <Line options={chartOptions} data={activityData} />
            </div>
          </Card>
        </motion.div>
        
        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <Card variant="widgetGreen" className="backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white mb-6">Vocabulary Progress</h2>
              <div className="h-72">
                <Bar 
                  options={{
                    ...chartOptions,
                    indexAxis: 'y',
                    scales: {
                      ...chartOptions.scales,
                      x: {
                        ...chartOptions.scales.x,
                        max: 100,
                      }
                    }
                  }} 
                  data={vocabData}
                />
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card variant="widgetPurple" className="backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-ios-gray-900 dark:text-white mb-6">Time Distribution</h2>
              <div className="h-72 flex items-center justify-center">
                <div className="w-56 h-56">
                  <Doughnut 
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: {
                            color: isDarkMode ? '#fff' : '#000',
                            padding: 16,
                            usePointStyle: true,
                            font: {
                              size: 12,
                            },
                          }
                        }
                      },
                      cutout: '70%',
                    }} 
                    data={timeDistribution}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Navigation button */}
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="outline" className="mt-8">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsPage;