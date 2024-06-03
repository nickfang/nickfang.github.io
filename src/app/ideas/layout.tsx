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
    <div className="m-16 pt-8 pb-8 flex flex-col items-center justify-center bg-gunmetal text-white border border-yinmn-blue">
      <IdeasNavControl />
      <div className="p-16 w-full box-border">{children}</div>
    </div>
  );
};

export default IdeasLayout;
