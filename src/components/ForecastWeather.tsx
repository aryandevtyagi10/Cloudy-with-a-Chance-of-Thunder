import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Calendar } from 'lucide-react';

export const ForecastWeather: React.FC = () => {
  const { forecast, loading } = useWeather();

  if (loading || !forecast) {
    return null;
  }

  // Group forecast by day
  const dailyForecasts = forecast.list.reduce<Record<string, typeof forecast.list[0][]>>((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get forecast summary for each day
  const dailySummaries = Object.entries(dailyForecasts).map(([date, items]) => {
    // Get min and max temperatures
    const temps = items.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get most common weather condition
    const weatherFrequency = items.reduce<Record<string, number>>((acc, item) => {
      const weather = item.weather[0].main;
      acc[weather] = (acc[weather] || 0) + 1;
      return acc;
    }, {});

    const mostCommonWeather = Object.entries(weatherFrequency).sort((a, b) => b[1] - a[1])[0][0];
    const weatherIcon = items.find(item => item.weather[0].main === mostCommonWeather)?.weather[0].icon || '';
    
    // Check if any forecast has rain
    const hasRain = items.some(item => item.rain && item.rain['3h'] && item.rain['3h'] > 0);
    
    return {
      date,
      minTemp,
      maxTemp,
      mostCommonWeather,
      weatherIcon,
      hasRain
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-teal-900 dark:text-teal-100 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-teal-700 dark:text-teal-500" />
        <h3 className="text-lg font-semibold">5-Day Forecast</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {dailySummaries.slice(0, 5).map((day) => (
          <div 
            key={day.date} 
            className={`p-3 rounded-md text-center border ${day.hasRain ? 'border-cyan-300 dark:border-cyan-700' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <p className="font-medium">{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weatherIcon}.png`}
              alt={day.mostCommonWeather}
              className="w-10 h-10 mx-auto"
            />
            <div className="flex justify-center gap-2 text-sm">
              <span className="font-semibold">{Math.round(day.maxTemp)}°</span>
              <span className="text-gray-500 dark:text-gray-400">{Math.round(day.minTemp)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};