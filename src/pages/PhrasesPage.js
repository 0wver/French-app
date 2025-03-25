import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  SpeakerWaveIcon, 
  ClipboardDocumentIcon, 
  CheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const PhrasesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Handle copy to clipboard
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  // Simulated function to play pronunciation
  const playPronunciation = (text) => {
    alert(`Playing pronunciation for: ${text}`);
    // In a real app, this would trigger audio playback
  };
  
  // Phrases categories
  const categories = [
    { id: 'all', name: 'All Phrases', color: 'blue' },
    { id: 'greetings', name: 'Greetings', color: 'green' },
    { id: 'dining', name: 'Dining', color: 'orange' },
    { id: 'travel', name: 'Travel', color: 'purple' },
    { id: 'shopping', name: 'Shopping', color: 'pink' },
    { id: 'emergency', name: 'Emergency', color: 'red' },
  ];
  
  // Sample phrases data
  const phrasesData = [
    {
      category: 'greetings',
      phrases: [
        { german: 'Guten Tag', english: 'Hello / Good day', note: 'Formal greeting used during the day' },
        { german: 'Guten Abend', english: 'Good evening', note: 'Formal greeting used in the evening' },
        { german: 'Hallo', english: 'Hi / Hey', note: 'Informal greeting used with friends and family' },
        { german: 'Wie geht es Ihnen?', english: 'How are you?', note: 'Formal way to ask how someone is doing' },
        { german: 'Wie geht\'s?', english: 'How are you? / How\'s it going?', note: 'Informal way to ask how someone is doing' },
        { german: 'Auf Wiedersehen', english: 'Goodbye', note: 'Formal way to say goodbye' },
        { german: 'Bis bald', english: 'See you soon', note: 'Used when you expect to see the person again soon' },
      ]
    },
    {
      category: 'dining',
      phrases: [
        { german: 'Einen Tisch für zwei, bitte', english: 'A table for two, please', note: 'Used when entering a restaurant' },
        { german: 'Ich möchte bestellen', english: 'I would like to order', note: 'Polite way to start ordering food' },
        { german: 'Die Rechnung, bitte', english: 'The bill, please', note: 'Used when asking for the check' },
        { german: 'Es war köstlich', english: 'It was delicious', note: 'Compliment for the food' },
        { german: 'Ich bin Vegetarier(in)', english: 'I am vegetarian', note: 'Specify dietary restriction' },
      ]
    },
    {
      category: 'travel',
      phrases: [
        { german: 'Wo ist der Bahnhof?', english: 'Where is the train station?', note: 'Asking for directions to the train station' },
        { german: 'Ich hätte gerne eine Fahrkarte nach Berlin', english: 'I would like a ticket to Berlin', note: 'Used when buying a train/bus ticket' },
        { german: 'Wann fährt der Zug ab?', english: 'What time does the train leave?', note: 'Asking about departure time' },
        { german: 'Können Sie mir helfen?', english: 'Can you help me?', note: 'Asking for assistance' },
        { german: 'Ich habe mich verlaufen', english: 'I am lost', note: 'Useful when needing directions' },
      ]
    },
    {
      category: 'shopping',
      phrases: [
        { german: 'Wie viel kostet das?', english: 'How much does it cost?', note: 'Asking for the price' },
        { german: 'Ich würde das gerne anprobieren', english: 'I would like to try this on', note: 'Used when shopping for clothes' },
        { german: 'Haben Sie das in Blau?', english: 'Do you have this in blue?', note: 'Asking for a different color' },
        { german: 'Das ist zu teuer', english: 'It\'s too expensive', note: 'Expressing that something is overpriced' },
        { german: 'Ich nehme es', english: 'I\'ll take it', note: 'Used when deciding to buy something' },
      ]
    },
    {
      category: 'emergency',
      phrases: [
        { german: 'Hilfe!', english: 'Help!', note: 'Used in emergency situations' },
        { german: 'Rufen Sie einen Krankenwagen!', english: 'Call an ambulance!', note: 'Medical emergency' },
        { german: 'Ich brauche einen Arzt', english: 'I need a doctor', note: 'Medical assistance' },
        { german: 'Wo ist das nächste Krankenhaus?', english: 'Where is the nearest hospital?', note: 'Asking for hospital location' },
        { german: 'Ich habe meinen Reisepass verloren', english: 'I lost my passport', note: 'Travel emergency' },
      ]
    },
  ];
  
  // Get filtered phrases based on category and search term
  const getFilteredPhrases = () => {
    let filtered = phrasesData;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(category => category.category === selectedCategory);
    }
    
    // If search term exists, filter phrases within categories
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        phrases: category.phrases.filter(phrase => 
          phrase.german.toLowerCase().includes(searchTerm.toLowerCase()) || 
          phrase.english.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.phrases.length > 0);
    }
    
    return filtered;
  };
  
  const filteredPhrases = getFilteredPhrases();
  
  // Get category-specific colors
  const getCategoryColors = (category) => {
    switch(category) {
      case 'greetings':
        return {
          widgetVariant: 'widgetGreen',
          accent: 'bg-[#148F47] dark:bg-[#34C759]',
          badge: 'filled-green'
        };
      case 'dining':
        return {
          widgetVariant: 'widgetOrange',
          accent: 'bg-[#CC5500] dark:bg-[#FF9500]',
          badge: 'filled-orange'
        };
      case 'travel':
        return {
          widgetVariant: 'widgetPurple',
          accent: 'bg-[#7C3AED] dark:bg-[#AF52DE]',
          badge: 'filled-purple'
        };
      case 'shopping':
        return {
          widgetVariant: 'widgetPink',
          accent: 'bg-[#E0115F] dark:bg-[#FF2D55]',
          badge: 'filled-pink'
        };
      case 'emergency':
        return {
          widgetVariant: 'widgetNeutral',
          accent: 'bg-[#E62020] dark:bg-[#FF3B30]',
          badge: 'filled-red'
        };
      default:
        return {
          widgetVariant: 'widgetBlue',
          accent: 'bg-[#0A58CA] dark:bg-[#0A84FF]',
          badge: 'filled-blue'
        };
    }
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
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Useful Phrases</h1>
        </div>
      </div>
      
      {/* Search Bar */}
      <motion.section variants={container} initial="hidden" animate="show" className="mb-8">
        <motion.div variants={item}>
          <Card variant="widgetBlue" className="backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-ios-gray-400 dark:text-white/50" />
              </div>
              <input 
                type="text" 
                placeholder="Search for phrases in German or English..." 
                className="ios-input pl-10 w-full bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm text-ios-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Card>
        </motion.div>
      </motion.section>
      
      {/* Category Tabs */}
      <motion.section variants={container} initial="hidden" animate="show" className="mb-6">
        <motion.div variants={item} className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm backdrop-blur-sm
                ${selectedCategory === category.id
                  ? category.color === 'blue' 
                    ? 'bg-[#0A58CA] dark:bg-[#0A84FF] text-white'
                    : category.color === 'green'
                      ? 'bg-[#148F47] dark:bg-[#34C759] text-white'
                      : category.color === 'orange'
                        ? 'bg-[#CC5500] dark:bg-[#FF9500] text-white'
                        : category.color === 'purple'
                          ? 'bg-[#7C3AED] dark:bg-[#AF52DE] text-white'
                          : category.color === 'pink'
                            ? 'bg-[#E0115F] dark:bg-[#FF2D55] text-white'
                            : 'bg-[#E62020] dark:bg-[#FF3B30] text-white'
                  : `bg-white/70 dark:bg-dark-200/60 text-ios-gray-700 dark:text-white/80 hover:bg-white dark:hover:bg-dark-200`
                }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
      </motion.section>
      
      {/* Phrases Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {filteredPhrases.map((category) => {
          const categoryColors = getCategoryColors(category.category);
          return (
          <motion.div key={category.category} variants={item}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-ios-gray-900 dark:text-white capitalize">
                {category.category === 'greetings' ? 'Greetings & Introductions' :
                 category.category === 'dining' ? 'Dining & Restaurants' :
                 category.category === 'travel' ? 'Travel & Directions' :
                 category.category === 'shopping' ? 'Shopping & Money' :
                 'Emergency & Help'}
              </h2>
            </div>
            
            <div className="space-y-4">
              {category.phrases.map((phrase, index) => (
                <Card 
                  key={`${category.category}-${index}`}
                  variant={categoryColors.widgetVariant}
                  className="block transition-all hover:shadow-lg"
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-3">
                        <h3 className="text-lg font-bold text-ios-gray-900 dark:text-white sm:mr-4">{phrase.german}</h3>
                        <Badge 
                          variant={categoryColors.badge}
                          size="sm"
                          className="mt-1 sm:mt-0 w-fit"
                        >
                          {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                        </Badge>
                      </div>
                      
                      <p className="text-ios-gray-700 dark:text-white/80 mb-2">{phrase.english}</p>
                      {phrase.note && (
                        <p className="text-xs text-ios-gray-600 dark:text-white/60 italic">{phrase.note}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => playPronunciation(phrase.german)}
                        className={`p-2 text-white rounded-full transition-colors ${categoryColors.accent}`}
                        title="Listen to pronunciation"
                      >
                        <SpeakerWaveIcon className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(phrase.german, `${category.category}-${index}`)}
                        className="p-2 bg-white/50 dark:bg-dark-300/50 text-ios-gray-600 dark:text-white/70 rounded-full transition-colors hover:bg-white/80 dark:hover:bg-dark-300/80"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === `${category.category}-${index}` ? (
                          <CheckIcon className="h-5 w-5 text-ios-green" />
                        ) : (
                          <ClipboardDocumentIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )})}
        
        {filteredPhrases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ios-gray-500 dark:text-white/50">No phrases found matching your search. Try a different keyword or category.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PhrasesPage;