import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';
import Dropdown from '@/components/inputs/DropDown';

export const metadata: Metadata = {
  title: 'Ideas: Nicholas Fang - Dev',
  description: 'Ideas playground.',
};

const options = [
  { label: 'New Game', value: '/newgame' },
  { label: 'Load Game', value: '/loadgame' },
  { label: 'Options', value: '/options' },
  { label: 'Exit', value: '/exit' },
];

const IdeasNavControl = () => {
  return (
    <>
      <h1 className="mb-4 p-4">Ideas Playground</h1>
      {/* <Dropdown options={options} /> */}
    </>
  );
};

const IdeasLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('IdeasLayout Render');
  return (
    <div className="sm:w=full sm:m-0 lg:my-12 p-0 lg:px-16 lg:py-4 flex flex-col items-center justify-center bg-gunmetal text-white border border-yinmn-blue">
      <IdeasNavControl />
      <div className="h-0 w-full mb-4 border border-yinmn-blue border-b-0"></div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default IdeasLayout;
