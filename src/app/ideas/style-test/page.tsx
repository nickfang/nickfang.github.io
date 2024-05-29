// app/page.tsx
'use client';

import React from 'react';

const Home = () => {
  return (
    <main className="bg-bg text-text font-mono">
      <h1 className="text-main font-bold text-2xl">Brutalism with Tailwind</h1>
      <p>This is a paragraph of text.</p>
      <a href="#" className="text-accent underline">
        This is a link
      </a>
    </main>
  );
};

export default Home;
