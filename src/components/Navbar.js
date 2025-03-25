import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleBottomCenterTextIcon, 
  PencilIcon, 
  DocumentTextIcon, 
  UserIcon, 
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Courses', path: '/courses', icon: BookOpenIcon },
    { name: 'Vocabulary', path: '/vocabulary', icon: ChatBubbleBottomCenterTextIcon },
    { name: 'Grammar', path: '/grammar', icon: PencilIcon },
    { name: 'Phrases', path: '/phrases', icon: DocumentTextIcon },
    { name: 'Stats', path: '/stats', icon: ChartBarIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-200/80 backdrop-blur-ios border-b border-[#E0E0E0]/50 dark:border-[#E0E0E0]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-ios-blue dark:text-[#0A84FF]">Learn German</h1>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors
                    ${isActive 
                      ? 'text-ios-blue border-b-2 border-ios-blue dark:text-white dark:border-[#0A84FF]' 
                      : 'text-ios-gray-700 hover:text-ios-gray-900 dark:text-white dark:hover:text-white'}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Theme toggle for desktop */}
            <button 
              onClick={toggleDarkMode}
              className="inline-flex items-center px-1 pt-1 text-sm font-semibold transition-colors text-ios-gray-700 hover:text-ios-gray-900 dark:text-white dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Theme toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center p-2 rounded-md text-ios-gray-700 hover:text-ios-blue dark:text-white dark:hover:text-[#0A84FF] focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-ios-gray-700 hover:text-ios-blue dark:text-white dark:hover:text-[#0A84FF] focus:outline-none"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="ios-material-dark md:hidden absolute w-full z-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-base font-medium 
                      ${isActive 
                        ? 'text-ios-blue bg-white/50 dark:text-white dark:bg-dark-300/50' 
                        : 'text-ios-gray-700 hover:text-ios-gray-900 hover:bg-white/30 dark:text-white dark:hover:text-white dark:hover:bg-dark-300/30'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;