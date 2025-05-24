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
      className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,200,255,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {isDarkMode ? (
              <CloudLightning className="h-12 w-12 text-blue-400" />
            ) : (
              <Cloud className="h-12 w-12 text-blue-400" />
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500">
                Cloudy with a Chance of Thunder
              </h1>
              <p className="mt-2 text-gray-400 text-lg font-medium tracking-wide">
                Real-time weather updates from around the globe
              </p>
            </div>
          </motion.div>
          
          <motion.button 
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors backdrop-blur-sm"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-blue-400" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};