'use client';

import React, { useRef, useEffect } from 'react';

const CanvasSquares = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.reset()
    context.fillStyle = "white"
    context.fillRect(0,0,canvas.width,canvas.height);

    context.lineWidth = 4;

    context.beginPath()
    context.rect(100,100,400,400)
    // context.stroke()

    context.beginPath()
    context.arc(300,300,100,0,Math.PI*2)
    // context.stroke()

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const width = 60;
        const height = 60;
        const gap = 20;
        let x = 100 + (width + gap) * i;
        let y = 100 + (height + gap) * j;
        context.beginPath()
        context.rect(x, y, width, height)
        context.stroke()
        if (Math.random() > 0.5) {
          context.beginPath()
          context.rect(x + 8, y + 8, width - 16, height - 16)
          context.stroke()
        }
      }
    }
  });
  return (
    <div>
      <h1>Canvas Squares</h1>
      <canvas
        ref={canvasRef}
        width="600"
        height="600"
      ></canvas>
    </div>
  );
}

export default CanvasSquares;