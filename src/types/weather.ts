export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
  rain?: {
    "3h"?: number;
  };
}

export type City = 'Mumbai' | 'Delhi' | 'Kolkata' | 'Chennai' | 'Bangalore' | 'Hyderabad';

export interface WeatherContextType {
  city: City;
  setCity: (city: City) => void;
  weather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
}