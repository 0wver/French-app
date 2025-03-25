import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const NavigationWidgets = () => {
  // Define navigation items with their paths, icons, colors, and labels
  const navItems = [
    { 
      name: 'Courses', 
      path: '/courses', 
      icon: AcademicCapIcon, 
      color: 'blue', 
      bg: 'bg-[#D1E3FA]',
      darkBg: 'dark:bg-[#194E8C]'
    },
    { 
      name: 'Vocabulary', 
      path: '/vocabulary', 
      icon: ChatBubbleBottomCenterTextIcon, 
      color: 'yellow',
      bg: 'bg-[#FFF4D1]',
      darkBg: 'dark:bg-[#8C6D00]'
    },
    { 
      name: 'Grammar', 
      path: '/grammar', 
      icon: PencilIcon, 
      color: 'green',
      bg: 'bg-[#D1F5D6]', 
      darkBg: 'dark:bg-[#205A3A]'
    },
    { 
      name: 'Phrases', 
      path: '/phrases', 
      icon: DocumentTextIcon, 
      color: 'orange',
      bg: 'bg-[#FFE8CC]',
      darkBg: 'dark:bg-[#8C4600]'
    },
    { 
      name: 'Stats', 
      path: '/stats', 
      icon: ChartBarIcon, 
      color: 'teal',
      bg: 'bg-[#C5F1EF]',
      darkBg: 'dark:bg-[#00696B]'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: UserIcon, 
      color: 'purple',
      bg: 'bg-[#E8D9FF]',
      darkBg: 'dark:bg-[#5B2E91]'
    }
  ];

  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3, 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      } 
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {navItems.map((navItem) => (
        <motion.div key={navItem.name} variants={item}>
          <Link to={navItem.path}>
            <div 
              className={`${navItem.bg} ${navItem.darkBg} rounded-2xl p-4 flex flex-col items-center justify-center h-[120px] 
                         transition-all duration-200 shadow-md hover:shadow-lg hover:translate-y-[-2px]
                         border border-white/20 dark:border-white/5`}
            >
              <div className="bg-white/70 dark:bg-white/20 p-3 rounded-full mb-3">
                <navItem.icon className={`h-7 w-7 text-[#007AFF] dark:text-white`} />
              </div>
              <span className="text-ios-gray-900 dark:text-white font-semibold">{navItem.name}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NavigationWidgets; 