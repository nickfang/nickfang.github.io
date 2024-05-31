import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Ideas: Nicholas Fang - Dev',
	description: 'Ideas playground.',
};

const IdeasNavControl = () => {
	return <h1>Ideas Nav Control</h1>;
};

const IdeasLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<IdeasNavControl />
			<div className="p-[60px] border border-solid ">{children}</div>
		</>
	);
};

export default IdeasLayout;
