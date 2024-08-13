'use client';

import React, { useRef, useEffect, useState } from 'react';
import { random, math } from '../utils';

const CanvasCircles = () => {
  const [canvas, setCanvas] = useState<{ width: number, height: number }>({ width: 600, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const side = Math.min(width, height) * 0.9;
      canvasRef.current!.width = side;
      canvasRef.current!.height = side;
      setCanvas({ width: side, height: side });
    }
    handleResize();
  }, [])
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.reset()
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.strokeStyle = 'white';

    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.5;

    const w = canvas.width * 0.01;
    const h = canvas.height * 0.1;
    let x, y;

    const num = 36;
    const radius = canvas.width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(w * -0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(2, 15);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      );
      context.stroke();
      context.restore();
    }

  });
  return (
    <div ref={containerRef}>
      <h1>Canvas Circles</h1>
      <canvas
        className="mx-auto my-8"
        ref={canvasRef}
        width={canvas.width}
        height={canvas.height}
      ></canvas>
    </div>
  );
}

export default CanvasCircles;