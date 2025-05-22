import React from 'react';
import { Cloud, CloudLightning, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 text-white shadow-lg"
    >
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {isDarkMode ? (
              <CloudLightning className="h-10 w-10 text-yellow-300" />
            ) : (
              <Cloud className="h-10 w-10 text-blue-200" />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                Cloudy with a Chance of Thunder
              </h1>
              <p className="mt-2 text-blue-200 dark:text-blue-300 text-lg">
                Real-time monsoon updates for Indian cities
              </p>
            </div>
          </motion.div>
          
          <motion.button 
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-indigo-500/30 hover:bg-indigo-500/50 transition-colors backdrop-blur-sm"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
              <Moon className="h-6 w-6 text-blue-200" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};