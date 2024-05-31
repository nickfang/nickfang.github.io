'use client';

import React, { useState } from 'react';

const Inset = () => {
	const [insetClass, setInsetClass] = useState('');

	return (
		<div className="parent">
			<div className={`child ${insetClass}`} />
		</div>
	);
};

export default Inset;
