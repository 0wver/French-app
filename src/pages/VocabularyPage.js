import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  SpeakerWaveIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const VocabularyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  
  // Vocabulary categories
  const categories = [
    { name: 'All', color: 'blue' },
    { name: 'Basics', color: 'green' },
    { name: 'Food', color: 'orange' },
    { name: 'Travel', color: 'purple' },
    { name: 'People', color: 'pink' },
  ];
  
  // Sample vocabulary data
  const vocabularyItems = [
    { german: 'Hallo', english: 'Hello', category: 'Basics', mastered: true },
    { german: 'Auf Wiedersehen', english: 'Goodbye', category: 'Basics', mastered: true },
    { german: 'Danke', english: 'Thank you', category: 'Basics', mastered: true },
    { german: 'Bitte', english: 'Please', category: 'Basics', mastered: false },
    { german: 'Entschuldigung', english: 'Excuse me', category: 'Basics', mastered: false },
    { german: 'Brot', english: 'Bread', category: 'Food', mastered: true },
    { german: 'Käse', english: 'Cheese', category: 'Food', mastered: false },
    { german: 'Wasser', english: 'Water', category: 'Food', mastered: true },
    { german: 'Wein', english: 'Wine', category: 'Food', mastered: false },
    { german: 'Kuchen', english: 'Cake', category: 'Food', mastered: false },
    { german: 'Zug', english: 'Train', category: 'Travel', mastered: false },
    { german: 'Flugzeug', english: 'Airplane', category: 'Travel', mastered: false },
    { german: 'Hotel', english: 'Hotel', category: 'Travel', mastered: false },
    { german: 'Pass', english: 'Passport', category: 'Travel', mastered: false },
    { german: 'Familie', english: 'Family', category: 'People', mastered: false },
    { german: 'Freund', english: 'Friend', category: 'People', mastered: false },
    { german: 'Kind', english: 'Child', category: 'People', mastered: false },
  ];
  
  // Filter vocabulary items based on category and search term
  const filteredItems = vocabularyItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.german.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.english.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 0 || 
      item.category === categories[selectedCategory].name;
    
    return matchesSearch && matchesCategory;
  });
  
  // Simulated function to play pronunciation
  const playPronunciation = (text) => {
    alert(`Playing pronunciation for: ${text}`);
    // In a real app, this would trigger audio playback
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Get category-specific colors
  const getCategoryColors = (category) => {
    switch(category) {
      case 'Basics':
        return {
          widgetVariant: 'widgetGreen',
          accent: 'bg-[#148F47] dark:bg-[#34C759]',
          badge: 'filled-green'
        };
      case 'Food':
        return {
          widgetVariant: 'widgetOrange',
          accent: 'bg-[#CC5500] dark:bg-[#FF9500]',
          badge: 'filled-orange'
        };
      case 'Travel':
        return {
          widgetVariant: 'widgetPurple',
          accent: 'bg-[#7C3AED] dark:bg-[#AF52DE]',
          badge: 'filled-purple'
        };
      case 'People':
        return {
          widgetVariant: 'widgetPink',
          accent: 'bg-[#E0115F] dark:bg-[#FF2D55]',
          badge: 'filled-pink'
        };
      default:
        return {
          widgetVariant: 'widgetBlue',
          accent: 'bg-[#0A58CA] dark:bg-[#0A84FF]',
          badge: 'filled-blue'
        };
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
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Vocabulary</h1>
        </div>
      </div>
      
      {/* Search Section */}
      <motion.section variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.div variants={item}>
          <Card variant="widgetBlue" className="backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-ios-gray-400 dark:text-white/50" />
              </div>
              <input 
                type="text" 
                placeholder="Search for words in German or English..." 
                className="ios-input pl-10 w-full bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm text-ios-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Card>
        </motion.div>
      </motion.section>
      
      {/* Categories Section */}
      <motion.section variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item}>
          <Tab.Group onChange={(index) => setSelectedCategory(index)}>
            <Card variant="materialDark" className="mb-6 backdrop-blur-ios">
              <Tab.List className="flex space-x-2 rounded-xl bg-white/20 dark:bg-dark-300/30 p-1 overflow-x-auto">
                {categories.map((category, idx) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      `whitespace-nowrap rounded-lg py-2.5 px-4 text-sm font-medium leading-5 transition-all
                      ${
                        selected
                          ? category.color === 'blue' 
                            ? 'bg-[#D1E5FF] dark:bg-[#0A58CA] text-[#0A58CA] dark:text-white shadow-md'
                            : category.color === 'green'
                              ? 'bg-[#D4F7DF] dark:bg-[#148F47] text-[#148F47] dark:text-white shadow-md'
                              : category.color === 'orange'
                                ? 'bg-[#FFE2BD] dark:bg-[#CC5500] text-[#CC5500] dark:text-white shadow-md'
                                : category.color === 'purple'
                                  ? 'bg-[#E7D6FF] dark:bg-[#7C3AED] text-[#7C3AED] dark:text-white shadow-md'
                                  : 'bg-[#FFCFE3] dark:bg-[#E0115F] text-[#E0115F] dark:text-white shadow-md'
                          : 'text-ios-gray-700 dark:text-white/80 hover:text-ios-gray-900 hover:bg-white/[0.2]'
                      }`
                    }
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </Card>
            
            <Tab.Panels>
              {categories.map((category, idx) => (
                <Tab.Panel key={category.name}>
                  <motion.div
                    variants={container}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {filteredItems.map((vocabItem, index) => {
                      const categoryColors = getCategoryColors(vocabItem.category);
                      return (
                      <motion.div key={index} variants={item}>
                        <Card variant={categoryColors.widgetVariant} className="h-full">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <Badge 
                                  variant={categoryColors.badge}
                                  size="sm" 
                                  className="mr-2"
                                >
                                  {vocabItem.category}
                                </Badge>
                                {vocabItem.mastered && (
                                  <Badge variant="filled-blue" size="sm">Mastered</Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-bold text-ios-gray-900 dark:text-white mb-1">{vocabItem.german}</h3>
                              <p className="text-ios-gray-700 dark:text-white/80">{vocabItem.english}</p>
                            </div>
                            
                            <button
                              onClick={() => playPronunciation(vocabItem.german)}
                              className={`p-2 text-white rounded-full transition-colors ${categoryColors.accent}`}
                            >
                              <SpeakerWaveIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </Card>
                      </motion.div>
                    )})}
                  </motion.div>
                  
                  {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-ios-gray-500 dark:text-white/50">No vocabulary items found matching your search.</p>
                    </div>
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default VocabularyPage;