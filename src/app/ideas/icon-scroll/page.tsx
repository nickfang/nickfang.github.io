'use client'; // Optional for client-side interactions

import AnimatedIcon from '@/components/display/AnimatedIcon';
import Head from 'next/head';

export default function IconScroll() {
  // a {
  //   animation: scale, scale;
  //   animation-direction: normal, reverse;
  //   animation-timeline: view(inline);
  //   animation-range: entry, exit;
  // }
  // @​keyframes scale { 0% { scale: 0; } }
  return (
    <main>
      <Head>
        <title>icon-scroll</title>
      </Head>
      <h1>icon-scroll</h1>
      <AnimatedIcon />
      {/* Your idea code here */}
    </main>
  );
}
