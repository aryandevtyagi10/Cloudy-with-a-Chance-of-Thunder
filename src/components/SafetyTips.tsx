import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SafetyTips: React.FC = () => {
  const safetyTips = [
    'Avoid unnecessary travel during heavy rainfall',
    'Do not touch electric poles or wires in flooded areas',
    'Stay updated through official government sources',
    'Keep emergency supplies ready (torch, batteries, first aid kit)',
    'Move valuables to higher locations if flooding is expected',
    'Clean roof gutters and storm drains before monsoon season'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-teal-900 dark:text-teal-100 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        <h3 className="text-lg font-semibold">Monsoon Safety Tips</h3>
      </div>
      
      <ul className="list-disc pl-6 space-y-1">
        {safetyTips.map((tip, index) => (
          <li key={index} className="text-sm md:text-base">{tip}</li>
        ))}
      </ul>
    </div>
  );
};