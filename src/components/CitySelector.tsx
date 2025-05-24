import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { MapPin, Search, AlertCircle, ChevronRight } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { motion, AnimatePresence } from 'framer-motion';
import { searchCities, CitySearchResult } from '../services/weatherService';
import { useQuery } from 'react-query';

export const CitySelector: React.FC = () => {
  const { city, setCity, loading, error } = useWeather();
  const [searchTerm, setSearchTerm] = useState(city);
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { data: suggestions = [] } = useQuery<CitySearchResult[]>(
    ['citySuggestions', debouncedSearch],
    () => searchCities(debouncedSearch),
    {
      enabled: Boolean(debouncedSearch && debouncedSearch !== city),
      staleTime: 60000,
    }
  );

  const handleCitySelect = (cityName: string) => {
    setSearchTerm(cityName);
    setCity(cityName);
    setIsSearchFocused(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6"
    >
      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <MapPin className="h-5 w-5 text-teal-400" />
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            disabled={loading}
            placeholder="Search any city..."
            className="w-full pl-10 pr-4 py-2 bg-black/30 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      
      <AnimatePresence>
        {isSearchFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion.name}-${suggestion.state}-${index}`}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => handleCitySelect(suggestion.name)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{suggestion.name}</p>
                  <p className="text-sm text-gray-400">
                    {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </motion.button>
            ))}
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 p-3 bg-red-500/90 backdrop-blur-sm text-white rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">City not found. Please try another location.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};