import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { WeatherData, ForecastData, WeatherContextType } from '../types/weather';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import { useQuery } from 'react-query';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedCity = localStorage.getItem('weatherCity') || 'Mumbai';
  const [city, setCity] = useState<string>(savedCity);

  useEffect(() => {
    localStorage.setItem('weatherCity', city);
  }, [city]);

  const { data: weather, error: weatherError, isLoading: weatherLoading, refetch: refetchWeather } = useQuery(
    ['weather', city],
    () => fetchWeatherData(city),
    { refetchInterval: 30 * 60 * 1000 }
  );

  const { data: forecast, error: forecastError } = useQuery(
    ['forecast', city],
    () => fetchForecastData(city),
    { refetchInterval: 30 * 60 * 1000 }
  );

  const refreshWeather = useCallback(() => {
    refetchWeather();
  }, [refetchWeather]);

  const value = {
    city,
    setCity,
    weather: weather || null,
    forecast: forecast || null,
    loading: weatherLoading,
    error: weatherError ? 'Failed to load weather data' : null,
    refreshWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};