import { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

export interface CitySearchResult {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

export const searchCities = async (query: string): Promise<CitySearchResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const url = `${GEO_BASE_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('city not found')) {
      return null;
    }
    throw error;
  }
};

export const fetchForecastData = async (city: string): Promise<ForecastData | null> => {
  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('city not found')) {
      return null;
    }
    throw error;
  }
};