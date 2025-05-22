import React, { createContext, useState, useContext, useEffect } from 'react';
import { useWeather } from './WeatherContext';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  rainIntensity: 'none' | 'light' | 'heavy';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user prefers dark mode or has a saved preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  const initialDarkMode = savedMode ? savedMode === 'true' : prefersDark;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const [rainIntensity, setRainIntensity] = useState<'none' | 'light' | 'heavy'>('none');
  
  const { weather } = useWeather || { weather: null };

  // Update rainIntensity based on weather conditions
  useEffect(() => {
    if (!weather) {
      setRainIntensity('none');
      return;
    }

    const rainAmount = weather.rain?.['1h'] || weather.rain?.['3h'] || 0;
    const isRainy = weather.weather[0].main.toLowerCase().includes('rain');
    
    if (isRainy) {
      if (rainAmount > 2.5) {
        setRainIntensity('heavy');
      } else {
        setRainIntensity('light');
      }
    } else {
      setRainIntensity('none');
    }
  }, [weather]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    
    // Update document class for dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, rainIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
};