import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import Card from './Card';

const ControlPanel = ({ 
  onThemeChange, 
  darkMode = false, 
  className = '' 
}) => {
  // State for text size
  const [textSize, setTextSize] = useState('medium'); // 'small', 'medium', 'large'
  
  // State for sound
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Handle theme toggle
  const handleThemeToggle = (theme) => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };
  
  // Handle text size change
  const handleTextSizeChange = (size) => {
    setTextSize(size);
    
    // Apply text size to the document root for global styling
    const root = document.documentElement;
    
    switch (size) {
      case 'small':
        root.style.fontSize = '0.875rem'; // 14px
        break;
      case 'medium':
        root.style.fontSize = '1rem'; // 16px (default)
        break;
      case 'large':
        root.style.fontSize = '1.125rem'; // 18px
        break;
      default:
        root.style.fontSize = '1rem';
    }
  };
  
  // Handle sound toggle
  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    
    // Implementation would control audio elements in the app
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.muted = soundEnabled;
    });
  };

  return (
    <Card 
      variant="materialDark" 
      className={`w-full ${darkMode ? 'bg-black/95 dark:bg-black/95' : 'bg-white/95'} ${className}`}
    >
      <div className="space-y-6">
        {/* Display Section */}
        <div>
          <h3 className={`text-xs font-semibold uppercase ${darkMode ? 'text-ios-gray-300' : 'text-ios-gray-500'} mb-3`}>
            Display
          </h3>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-white' : 'text-ios-gray-800'}`}>Dark/Light Mode</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleThemeToggle(true)}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  darkMode 
                    ? 'bg-ios-blue text-white' 
                    : 'bg-[#EEEEEE] text-ios-gray-600'
                }`}
              >
                <MoonIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleThemeToggle(false)}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  !darkMode 
                    ? 'bg-ios-blue text-white' 
                    : 'bg-[#333333] text-gray-400'
                }`}
              >
                <SunIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Text Size Section */}
        <div>
          <h3 className={`text-xs font-semibold uppercase ${darkMode ? 'text-ios-gray-300' : 'text-ios-gray-500'} mb-3`}>
            Text Size
          </h3>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-white' : 'text-ios-gray-800'}`}>Adjust Size</span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleTextSizeChange('small')}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  textSize === 'small' 
                    ? 'bg-ios-blue text-white' 
                    : darkMode ? 'bg-[#333333] text-gray-400' : 'bg-[#EEEEEE] text-ios-gray-600'
                }`}
              >
                A-
              </button>
              
              <button
                onClick={() => handleTextSizeChange('medium')}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  textSize === 'medium' 
                    ? 'bg-ios-blue text-white' 
                    : darkMode ? 'bg-[#333333] text-gray-400' : 'bg-[#EEEEEE] text-ios-gray-600'
                }`}
              >
                A
              </button>
              
              <button
                onClick={() => handleTextSizeChange('large')}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  textSize === 'large' 
                    ? 'bg-ios-blue text-white' 
                    : darkMode ? 'bg-[#333333] text-gray-400' : 'bg-[#EEEEEE] text-ios-gray-600'
                }`}
              >
                A+
              </button>
            </div>
          </div>
        </div>
        
        {/* Sound Section */}
        <div>
          <h3 className={`text-xs font-semibold uppercase ${darkMode ? 'text-ios-gray-300' : 'text-ios-gray-500'} mb-3`}>
            Sound
          </h3>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-white' : 'text-ios-gray-800'}`}>Website Sound</span>
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                soundEnabled 
                  ? 'bg-ios-green text-white' 
                  : darkMode ? 'bg-[#333333] text-gray-400' : 'bg-[#EEEEEE] text-ios-gray-600'
              }`}
            >
              {soundEnabled ? (
                <SpeakerWaveIcon className="h-5 w-5" />
              ) : (
                <SpeakerXMarkIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel; 