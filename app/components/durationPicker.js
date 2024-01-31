import React, { useState } from 'react';

const DurationPicker = () => {
  const [duration, setDuration] = useState('');

  // Generate durations dynamically
  const generateOptions = () => {
    const options = [];
    // Adding options from 1 minute to 60 minutes in steps of 5 minutes
    for (let minutes = 1; minutes <= 60; minutes += (minutes === 1 ? 4 : 5)) {
      options.push({
        label: `${minutes} minute${minutes > 1 ? 's' : ''}`,
        value: minutes * 60 * 1000, // Convert minutes to milliseconds
      });
    }
    // Adding options from 1 hour 15 minutes to 2 hours in steps of 15 minutes
    for (let minutes = 75; minutes <= 120; minutes += 15) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      options.push({
        label: `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes > 0 ? `${remainingMinutes} minutes` : ''}`,
        value: minutes * 60 * 1000, // Convert minutes to milliseconds
      });
    }
    return options;
  };

  const options = generateOptions();

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <div className="flex flex-col max-w-xs mx-auto">
      <select
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={duration}
        onChange={handleChange}
      >
        <option value="">Select Duration</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {duration && (
        <p className="text-sm text-gray-600 mt-2">
          Selected duration: {duration < 3600000 ? `${duration / 1000 / 60} minutes` : `${Math.floor(duration / 1000 / 60 / 60)} hours and ${((duration / 1000 / 60) % 60)} minutes`}
        </p>
      )}
    </div>
  );
};

export default DurationPicker;
