import About from '@/components/About';
import React from 'react';

// For some reason, the root route / is marked active in the nav when other nav routes are clicked.
// Temporarily using this component to fix the issue of having multiple nav menu items marked as active.
const AboutNav = () => {
  return (
    <About/>
  );
};

export default AboutNav;
