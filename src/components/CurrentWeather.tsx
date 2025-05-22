import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Droplets, Thermometer, Wind, RefreshCw, CloudLightning } from 'lucide-react';
import { motion } from 'framer-motion';

export const CurrentWeather: React.FC = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center p-8"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
        <span className="ml-3 text-indigo-700 dark:text-indigo-400">Loading weather data...</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-red-50 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow-lg"
      >
        <p>{error}</p>
        <motion.button 
          onClick={refreshWeather}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-800/50 rounded-lg hover:bg-red-200 dark:hover:bg-red-700/50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </motion.button>
      </motion.div>
    );
  }

  if (!weather) {
    return null;
  }

  const rainData = weather.rain 
    ? `${(weather.rain["1h"] || weather.rain["3h"] || 0).toFixed(1)} mm` 
    : "No rain";

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl p-6 text-indigo-950 dark:text-indigo-100 transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <img
              src={iconUrl}
              alt={weather.weather[0].description}
              className="w-20 h-20"
            />
            {weather.weather[0].main.toLowerCase().includes('thunder') && (
              <CloudLightning className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse" />
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {weather.name}
            </h3>
            <p className="capitalize text-lg text-indigo-600 dark:text-indigo-400">
              {weather.weather[0].description}
            </p>
          </div>
        </motion.div>
        
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>

      <motion.div 
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl flex items-center backdrop-blur-sm"
        >
          <Thermometer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div className="ml-3">
            <p className="text-sm text-blue-600 dark:text-blue-400">Feels Like</p>
            <p className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl flex items-center backdrop-blur-sm"
        >
          <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div className="ml-3">
            <p className="text-sm text-blue-600 dark:text-blue-400">Rainfall</p>
            <p className="font-semibold text-lg">{rainData}</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl flex items-center backdrop-blur-sm"
        >
          <Wind className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div className="ml-3">
            <p className="text-sm text-blue-600 dark:text-blue-400">Wind Speed</p>
            <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="mt-4 flex justify-end">
        <motion.button 
          onClick={refreshWeather}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4" /> 
          Refresh
        </motion.button>
      </div>
    </motion.div>
  );
};