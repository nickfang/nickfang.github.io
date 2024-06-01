'use client';

import React, { useState } from 'react';
import Dropdown from '@/components/buttons/drop-down';

const Inset = () => {
  const [insetClass, setInsetClass] = useState('');

  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  return (
    <div className="parent h-600">
      <div className={`child ${insetClass}`} />
      <Dropdown options={options} />
    </div>
  );
};

export default Inset;
