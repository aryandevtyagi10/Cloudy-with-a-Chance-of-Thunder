import React from 'react';
import { Header } from './components/Header';
import { WeatherDashboard } from './components/WeatherDashboard';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';
import { RainAnimation } from './components/RainAnimation';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 text-indigo-950 dark:text-indigo-100 transition-colors duration-300">
          <RainAnimation />
          <Header />
          <WeatherDashboard />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;