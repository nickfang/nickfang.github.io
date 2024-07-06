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
  console.log("IdeasLayout Render")
  return (
    <div className="sm:w=full sm:m-0 lg:m-12 p-0 lg:p-16 flex flex-col items-center justify-center bg-gunmetal text-white border border-yinmn-blue">
      <IdeasNavControl />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default IdeasLayout;
