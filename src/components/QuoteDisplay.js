import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const germanQuotes = [
  "Die Grenzen deiner Sprache sind die Grenzen deiner Welt.",
  "Eine andere Sprache zu lernen ist wie eine andere Person zu werden.",
  "Die Sprache ist die Landkarte der Kultur.",
  "Mit Sprachen ist man überall zu Hause.",
  "Das Lernen ist kein Sprint, sondern ein Marathon.",
  "Irren ist menschlich, Beharren göttlich, Deutsch zu lernen ist intelligent!",
  "Wagen ist halb gewonnen.",
  "Deutsch ist eine Sprache, die die Stille verschönert.",
  "Jede Sprache öffnet ein Fenster zur Welt.",
  "Die Kenntnis von Sprachen ist das Tor zur Weisheit.",
  "Nichts ist bereichernder, als eine Kultur durch ihre Sprache zu verstehen.",
  "Motivation bringt dich in Gang. Gewohnheit hält dich in Bewegung.",
  "Das Geheimnis des Erfolgs ist, anzufangen, bevor man bereit ist.",
  "Deutsch ist nicht nur eine Kommunikationssprache, sondern auch eine Kultursprache.",
  "Eine Sprache zu lernen heißt, sein Herz für eine andere Welt zu öffnen.",
  "Die Reise von tausend Meilen beginnt mit dem ersten Schritt.",
  "Ein neues Wort ist wie ein aufgehender Stern.",
  "Grammatik ist die Logik der Sprache.",
  "Übe Deutsch mit Leidenschaft, lerne mit Freude.",
  "Sprich Deutsch, erlebe die Welt."
];

const QuoteDisplay = ({ className = '' }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [randomId, setRandomId] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setRandomId(Math.random());
  }, []);

  useEffect(() => {
    const getRandomQuoteIndex = () => {
      const newIndex = Math.floor(Math.random() * germanQuotes.length);
      return newIndex === currentQuoteIndex 
        ? (newIndex + 1) % germanQuotes.length 
        : newIndex;
    };
    
    const newIndex = getRandomQuoteIndex();
    setCurrentQuoteIndex(newIndex);
    setDisplayedText('');
    setIsTyping(true);
  }, [location.pathname, randomId]);

  useEffect(() => {
    if (!isTyping) return;
    
    const currentQuote = germanQuotes[currentQuoteIndex];
    
    if (displayedText.length < currentQuote.length) {
      const typingSpeed = 30;
      const timeout = setTimeout(() => {
        setDisplayedText(currentQuote.slice(0, displayedText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, currentQuoteIndex, isTyping]);

  return (
    <motion.h1 
      className={`text-3xl md:text-4xl font-extrabold text-center text-ios-gray-900 dark:text-white ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      "{displayedText}
      {isTyping && (
        <span className="inline-block w-1 h-8 ml-1 bg-ios-blue dark:bg-white/70 animate-blink"></span>
      )}
      "
    </motion.h1>
  );
};

export default QuoteDisplay;