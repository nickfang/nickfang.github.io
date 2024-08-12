'use client';

import React, { useRef, useEffect, useState } from 'react';

const CanvasConnected = () => {
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

  });
  return (
    <div ref={containerRef}>
      <h1>Canvas Connected</h1>
      <canvas
        className="mx-auto my-8"
        ref={canvasRef}
        width={canvas.width}
        height={canvas.height}
      ></canvas>
    </div>
  );
}

export default CanvasConnected;