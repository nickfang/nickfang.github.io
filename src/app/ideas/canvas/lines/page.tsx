'use client';

import React, { useRef, useEffect, useState } from 'react';
import { random, math } from '../utils';
import { request } from 'http';

const CanvasLines = () => {
  const [canvas, setCanvas] = useState<{ width: number, height: number }>({ width: 600, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = {
    cols: 10,
    rows: 10,
    scaleMin: 1,
    scaleMax: 30,
    freq: 0.001,
    amp: 0.2,
    animate: true,
    frame: 0,
    lineCap: 'butt' as CanvasLineCap,
  };

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const side = width // Math.min(width, height) * 0.9;
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

    let animationFrameId: number;

    context.reset()
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.strokeStyle = 'white';


    const draw = () => {
      const cols = params.cols;
      const rows = params.rows;
      const numCells = cols * rows;
      const gridw = canvas.width * 0.8;
      const gridh = canvas.height * 0.8;
      const cellw = gridw / cols;
      const cellh = gridh / rows;
      const margx = (canvas.width - gridw) * 0.5;
      const margy = (canvas.height - gridh) * 0.5;
      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellw;
        const y = row * cellh;
        const w = cellw * 0.8;
        const h = cellh * 0.8;
        const f = params.frame;

        // const n = random.noise2D(x + frame * 10, y, params.freq);
        const n = random.noise3D(x, y, f * 10, params.freq);

        const angle = n * Math.PI * params.amp;
        const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

        context.save();
        context.translate(x, y);
        context.translate(margx, margy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);

        context.lineWidth = scale * 0.2;
        context.lineCap = params.lineCap;

        context.beginPath();
        context.moveTo(w * -0.5, 0);
        context.lineTo(w * 0.5, 0);
        context.stroke();
        context.restore();
      }
      animationFrameId = requestAnimationFrame(draw)
    }
    animationFrameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId);
  });
  return (
    <div ref={containerRef}>
      <h1>Canvas Lines</h1>
      <canvas
        className="mx-auto my-8"
        ref={canvasRef}
        width={canvas.width}
        height={canvas.height}
      ></canvas>
    </div>
  );
}

export default CanvasLines;