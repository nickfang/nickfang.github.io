import React, { useState, ChangeEvent, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function TextField({ label, type = 'text', value, onChange, error, ...props }: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-gray-200 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${isFocused ? 'border-blue-500' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
        `}
        {...props} // Pass down any additional props
      />

      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}

export default TextField;
