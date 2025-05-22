import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const RainAnimation: React.FC = () => {
  const { rainIntensity } = useTheme();

  if (rainIntensity === 'none') {
    return null;
  }

  const intensity = rainIntensity === 'heavy' ? 
    'opacity-70 animate-[rain_0.3s_linear_infinite]' : 
    'opacity-40 animate-[rain_0.5s_linear_infinite]';

  const dropSize = rainIntensity === 'heavy' ? 
    'repeating-linear-gradient(to bottom, rgba(147, 197, 253, 0.3), rgba(147, 197, 253, 0.3) 3px, transparent 3px, transparent 8px)' : 
    'repeating-linear-gradient(to bottom, rgba(147, 197, 253, 0.2), rgba(147, 197, 253, 0.2) 2px, transparent 2px, transparent 10px)';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 h-full w-full pointer-events-none z-0 ${intensity}`}
      style={{ 
        background: dropSize,
        backdropFilter: 'blur(1px)'
      }}
    />
  );
};