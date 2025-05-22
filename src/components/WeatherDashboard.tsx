import React from 'react';
import { CitySelector } from './CitySelector';
import { CurrentWeather } from './CurrentWeather';
import { ForecastWeather } from './ForecastWeather';
import { SafetyTips } from './SafetyTips';
import { EmergencyContacts } from './EmergencyContacts';

export const WeatherDashboard: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <CitySelector />
      
      <CurrentWeather />
      
      <ForecastWeather />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SafetyTips />
        <EmergencyContacts />
      </div>
    </main>
  );
};