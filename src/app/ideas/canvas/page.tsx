import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CanvasCreations = () => {
  const canvases = [
    { name: 'Squares', path: '/ideas/canvas/squares', filename: '/images/canvas-squares.png' },
    { name: 'Circles', path: '/ideas/canvas/circles', filename: '/images/canvas-circles.png' },
    // need to make animation work for these.  removing while I'm implementing.
    // { name: 'Line', path: '/ideas/canvas/lines', filename: '/images/canvas-lines.png' },
    { name: 'Connected', path: '/ideas/canvas/connected', filename: '/images/canvas-connected.png' },
    { name: 'Typography', path: '/ideas/canvas/typography', filename: '/images/canvas-typography.png' },
  ]
  return (
    <div className="m-8">
      <h1 className="m-8">Canvas Creations</h1>
      <p className="px-8">This is a collection of canvas experiments that I am playing with. Each page contains a unique canvas element. I hope you enjoy exploring these creations!</p>
      <div className="flex flex-wrap justify-center align-middle">
        {canvases.map((canvas, index) => (
          <div key={index} className="my-8 mx-4">
            <Link href={canvas.path}><Image src={canvas.filename} alt={canvas.name} width={200} height={200} /></Link>
          </div>
        ))}

      </div>
    </div>
  );
}

export default CanvasCreations;