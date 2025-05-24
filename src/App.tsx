import React from 'react';
import { Header } from './components/Header';
import { WeatherDashboard } from './components/WeatherDashboard';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';
import { RainAnimation } from './components/RainAnimation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WeatherProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <RainAnimation />
            <Header />
            <WeatherDashboard />
          </div>
        </WeatherProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;