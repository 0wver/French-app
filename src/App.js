import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import PhrasesPage from './pages/PhrasesPage';
import ProfilePage from './pages/ProfilePage';
import StatsPage from './pages/StatsPage';

// Import components
import ControlCenter from './components/ControlCenter';

// Import context
import { UserDataProvider } from './contexts/UserDataContext';

// Import styles
import './styles/index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has a preference stored
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference if no saved preference, default to dark mode
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // If system doesn't specify, use dark mode as default
      setDarkMode(prefersDark || true);
      localStorage.setItem('theme', 'dark');
    } else {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply the dark mode class to the html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserDataProvider>
      <Router>
        <motion.div 
          className={`min-h-screen transition-colors duration-300 ${darkMode 
            ? 'bg-gradient-to-br from-black to-[#121212]' 
            : 'bg-gradient-to-br from-white to-[#F8F8F8]'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed w-full h-full top-0 left-0 pointer-events-none z-0">
            {/* Decorative elements that mimic iOS backdrop */}
            <div className={`absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${darkMode 
              ? 'bg-ios-blue/15' 
              : 'bg-ios-blue/5'}`} />
            <div className={`absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 transition-colors duration-300 ${darkMode 
              ? 'bg-ios-purple/15' 
              : 'bg-ios-purple/5'}`} />
            
            {/* Additional subtle color accents */}
            <div className={`absolute top-1/4 left-1/3 h-96 w-96 rounded-full blur-3xl ${darkMode ? 'opacity-10 bg-blue-800' : 'opacity-5 bg-blue-300'}`}></div>
            <div className={`absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full blur-3xl ${darkMode ? 'opacity-10 bg-purple-900' : 'opacity-5 bg-purple-300'}`}></div>
          </div>
          
          <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/grammar" element={<GrammarPage />} />
              <Route path="/phrases" element={<PhrasesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </div>
          
          {/* iOS-style Control Center */}
          <ControlCenter darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </motion.div>
      </Router>
    </UserDataProvider>
  );
}

export default App; 