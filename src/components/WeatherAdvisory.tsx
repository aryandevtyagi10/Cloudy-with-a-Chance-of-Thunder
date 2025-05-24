import React from 'react';
import { CloudRainWind, Umbrella } from 'lucide-react';
import { motion } from 'framer-motion';
import { WeatherAdvisory as WeatherAdvisoryType } from '../types/weather';
import { useWeather } from '../context/WeatherContext';

const getWeatherJoke = (condition: string, city: string): string => {
  const jokes = {
    Rain: [
      `What do you call two days of rain in ${city}? A weekend!`,
      `Why did the ${city} rain cloud feel lonely? Because it was mist understood!`,
      `What's a rain cloud's favorite drink in ${city}? Thunder tea!`
    ],
    Thunderstorm: [
      `Why are ${city} thunderstorms so dramatic? They're always stealing the thunder!`,
      `What did the lightning bolt say to ${city}? You're electrifying!`,
      `How does thunder stay fit in ${city}? By doing cloud-burpees!`
    ],
    Clear: [
      `Why did the sun avoid ${city}? It didn't want to get a city-tan!`,
      `What's the sun's favorite street in ${city}? The bright side!`,
      `How does the sun greet ${city}? With a warm welcome!`
    ],
    Clouds: [
      `Why did the cloud become a fashion designer in ${city}? It had a silver lining!`,
      `What do clouds wear in ${city}? Thunderwear!`,
      `How do clouds greet each other in ${city}? With a mist-ical hello!`
    ]
  };

  const defaultJokes = [
    `Why did the weatherman move to ${city}? For a change in weather!`,
    `What's the weather's favorite game in ${city}? Hide and heat!`,
    `How does ${city} measure rainfall? In laugh-imeters!`
  ];

  const relevantJokes = jokes[condition] || defaultJokes;
  return relevantJokes[Math.floor(Math.random() * relevantJokes.length)];
};

const weatherAdvisories: Record<string, Omit<WeatherAdvisoryType, 'joke'>> = {
  Rain: {
    condition: 'Rain',
    advice: 'Carry an umbrella and wear water-resistant footwear.'
  },
  Thunderstorm: {
    condition: 'Thunderstorm',
    advice: 'Stay indoors and avoid open areas. Unplug electronic devices.'
  },
  Clear: {
    condition: 'Clear',
    advice: 'Perfect weather! But keep an umbrella handy - weather is as unpredictable as a cricket match!'
  },
  Clouds: {
    condition: 'Cloudy',
    advice: 'Moderate weather, but keep an eye on those clouds - they might be planning a surprise shower!'
  }
};

export const WeatherAdvisory: React.FC<{ condition: string }> = ({ condition }) => {
  const { city } = useWeather();
  const baseAdvisory = weatherAdvisories[condition] || {
    condition: 'General',
    advice: 'Stay prepared for weather changes.'
  };

  const advisory = {
    ...baseAdvisory,
    joke: getWeatherJoke(condition, city)
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-4">
        {condition.toLowerCase().includes('rain') ? (
          <CloudRainWind className="h-6 w-6 text-blue-400" />
        ) : (
          <Umbrella className="h-6 w-6 text-teal-400" />
        )}
        <h3 className="text-xl font-semibold">Weather Advisory</h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-300">{advisory.advice}</p>
        <p className="text-sm text-teal-400 italic">{advisory.joke}</p>
      </div>
    </motion.div>
  );
};