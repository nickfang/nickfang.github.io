import React, { useState } from 'react';
import { DateTime } from 'luxon';

interface DateInputProps {
  label?: string;
  value?: DateTime; // Luxon DateTime for internal value
  onChange: (date: DateTime) => void;
  className?: string;
  error?: string;
}

function DateInput({ label, value, onChange, className, error }: DateInputProps) {
  // Input value is a string, but converted to DateTime for internal handling
  const [inputValue, setInputValue] = useState<string>(value?.toISODate() ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    if (inputValue === newInputValue) return;
    const parsedDate = DateTime.fromISO(newInputValue);

    setInputValue(newInputValue);

    if (parsedDate.isValid) {
      onChange(parsedDate); // Valid date, pass DateTime to parent
    } else {
      onChange(DateTime.now()); // Invalid date, notify parent
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor="date-input" className="block text-gray-200 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id="date-input"
        type="date"
        value={inputValue}
        onChange={handleChange}
        className={`w-full py-2 px-3 border rounded text-gray-700 focus:outline-none focus:shadow-outline ${className} ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}

export default DateInput;
