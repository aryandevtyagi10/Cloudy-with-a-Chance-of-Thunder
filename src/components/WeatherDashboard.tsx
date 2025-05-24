import React from 'react';
import { CitySelector } from './CitySelector';
import { CurrentWeather } from './CurrentWeather';
import { ForecastWeather } from './ForecastWeather';
import { SafetyTips } from './SafetyTips';
import { EmergencyContacts } from './EmergencyContacts';
import { WeatherAdvisory } from './WeatherAdvisory';
import { useWeather } from '../context/WeatherContext';

export const WeatherDashboard: React.FC = () => {
  const { weather } = useWeather();

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <CitySelector />
      
      <CurrentWeather />
      
      {weather && <WeatherAdvisory condition={weather.weather[0].main} />}
      
      <ForecastWeather />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SafetyTips />
        <EmergencyContacts />
      </div>
    </main>
  );
};