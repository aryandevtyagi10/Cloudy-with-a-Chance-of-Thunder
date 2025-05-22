import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { WeatherData, ForecastData, City, WeatherContextType } from '../types/weather';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved city from localStorage or default to Mumbai
  const savedCity = localStorage.getItem('weatherCity') as City | null;
  const [city, setCity] = useState<City>(savedCity || 'Mumbai');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Save city to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weatherCity', city);
  }, [city]);

  const refreshWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
      
      const forecastData = await fetchForecastData(city);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to load weather data. Please try again later.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    refreshWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(refreshWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [refreshWeather]);

  const value = {
    city,
    setCity,
    weather,
    forecast,
    loading,
    error,
    refreshWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};