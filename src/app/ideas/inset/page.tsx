'use client';

import React, { useState } from 'react';
import Dropdown, { Option } from '@/components/inputs/drop-down';

const Inset = () => {
  const [insetClass, setInsetClass] = useState<Option<number> | null>(null);

  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  const onChange = (value: Option<number>) => {
    setInsetClass(value);
  };

  return (
    <div className="parent h-600">
      <div className="flex justify-center align-top">
        <div className="flex-none">
          <Dropdown options={options} onChange={onChange} />
        </div>
        <div className="flex-1">
          <div className={`${insetClass} border border-red-600 w-full h-full`} />
          <div>{JSON.stringify(insetClass)}</div>
        </div>
      </div>
    </div>
  );
};

export default Inset;
