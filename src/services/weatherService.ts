import { WeatherData, ForecastData, City } from '../types/weather';

const API_KEY = '9bc27434016332eba64dd9b3afa6a626';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch weather data');
  }
  
  return await response.json();
};

export const fetchForecastData = async (city: City): Promise<ForecastData> => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch forecast data');
  }
  
  return await response.json();
};