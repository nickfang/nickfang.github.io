'use client';

import React, { useRef, useEffect, useState } from 'react';

const CanvasSquares = () => {
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
    context.lineWidth = 3;
    const w = canvas.width * 0.1;
    const h = canvas.height * 0.1;
    const gap = canvas.width * 0.03;
    const ix = canvas.width * 0.17;
    const iy = canvas.height * 0.17;

    const off = canvas.width * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        if (Math.random() > 0.5) {
          context.save();
          context.lineWidth = 8;
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
          context.restore();
        }
      }
    }
    // context.fillStyle = "white"
    // context.fillRect(0,0,canvas.width,canvas.height);

    // context.lineWidth = 4;

    // context.beginPath()
    // context.rect(100,100,400,400)
    // // context.stroke()

    // context.beginPath()
    // context.arc(300,300,100,0,Math.PI*2)
    // // context.stroke()

    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 5; j++) {
    //     const width = 60;
    //     const height = 60;
    //     const gap = 20;
    //     let x = 100 + (width + gap) * i;
    //     let y = 100 + (height + gap) * j;
    //     context.beginPath()
    //     context.rect(x, y, width, height)
    //     context.stroke()
    //     if (Math.random() > 0.5) {
    //       context.beginPath()
    //       context.rect(x + 8, y + 8, width - 16, height - 16)
    //       context.stroke()
    //     }
    //   }
    // }
  });
  return (
    <div ref={containerRef}>
      <h1>Canvas Squares</h1>
      <canvas
        className="mx-auto my-8"
        ref={canvasRef}
        width={canvas.width}
        height={canvas.height}
      ></canvas>
    </div>
  );
}

export default CanvasSquares;