import React from 'react';
import { City } from '../types/weather';
import { useWeather } from '../context/WeatherContext';
import { MapPin } from 'lucide-react';

const CITIES: City[] = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad'];

export const CitySelector: React.FC = () => {
  const { city, setCity, loading } = useWeather();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value as City);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-2 w-full">
        <MapPin className="h-5 w-5 text-teal-700 dark:text-teal-500" />
        <label htmlFor="city" className="font-semibold text-teal-800 dark:text-teal-300">
          Select City:
        </label>
      </div>
      <select
        id="city"
        value={city}
        onChange={handleCityChange}
        disabled={loading}
        className="p-2 border border-teal-600 dark:border-teal-500 rounded-md bg-white dark:bg-gray-800 text-teal-900 dark:text-teal-100 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {CITIES.map((cityOption) => (
          <option key={cityOption} value={cityOption}>
            {cityOption}
          </option>
        ))}
      </select>
    </div>
  );
};