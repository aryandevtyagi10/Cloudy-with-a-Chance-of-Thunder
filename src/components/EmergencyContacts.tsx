import React from 'react';
import { Phone, AlertCircle } from 'lucide-react';

export const EmergencyContacts: React.FC = () => {
  const emergencyContacts = [
    { name: 'National Disaster Helpline', number: '108' },
    { name: 'National Emergency Number', number: '112' },
    { name: 'Police', number: '100' },
    { name: 'Ambulance', number: '102' },
    { name: 'Fire', number: '101' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-teal-900 dark:text-teal-100 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
        <h3 className="text-lg font-semibold">Emergency Contacts</h3>
      </div>
      
      <div className="space-y-2">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="flex items-center">
            <Phone className="h-4 w-4 text-teal-700 dark:text-teal-500 mr-2" />
            <span className="font-medium">{contact.name}:</span>
            <span className="ml-2">{contact.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};