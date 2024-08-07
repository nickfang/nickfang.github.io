'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

interface DropDownProps<T extends string | number> {
  options: Option<T>[];
  onChange?: (value: Option<T>) => void;
}

const Dropdown = <T extends string | number>(props: DropDownProps<T>) => {
  const { options, onChange } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option<T>) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded inline-flex items-center"
      >
        {selectedOption?.label || 'Select an Option'}
        <svg
          className={`fill-current h-4 w-4 ml-2 transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-5-5h10z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute mt-2 z-10 w-48 rounded-md bg-bg opacity-95 shadow-lg ring-1 ring-black ring-opacity-5"
          ref={menuRef}
          style={{ top: dropdownRef.current?.clientHeight || 0, left: 0 }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options?.map((option) => (
              <a
                key={option.value}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </a>
            )) || null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
