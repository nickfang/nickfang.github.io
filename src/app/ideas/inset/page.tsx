'use client';

import React, { useState } from 'react';
import Dropdown from '@/components/buttons/drop-down';

const Inset = () => {
	const [insetClass, setInsetClass] = useState('');

	const options = ['Option 1', 'Option 2', 'Option 3'];

	return (
		<div className="parent h-600">
			<div className={`child ${insetClass}`} />
			<Dropdown options={options} />
		</div>
	);
};

export default Inset;
