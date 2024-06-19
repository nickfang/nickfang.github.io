import React from 'react';
import { GlobeIcon } from '@/components/display/Icons';

const AnimatedIcon = () => {
  return (
    <GlobeIcon className="transition-transform duration-300 ease-in-out hover:scale-0 hover:scale-100" />
  );
};

export default AnimatedIcon;
