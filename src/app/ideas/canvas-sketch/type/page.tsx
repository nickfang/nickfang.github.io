'use client';

import React, { useRef, useEffect, useState, EventHandler, KeyboardEventHandler } from 'react';

const getGlyph = (v: number): string => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '*';
  if (v < 250) return '*';
  return '#';
};

const CanvasType = () => {
  const [letter, setLetter] = useState<string>('A');
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const typeCanvasRef = useRef<HTMLCanvasElement>(null);
  const width = 900;
  const height = 900;

  useEffect(() => {
    const handleKeyUp = (e: any) => {
      if (!e.key) return;
      if (!e.key.match(/^[a-zA-Z0-9]$/)) return;
      setLetter(e.key);
    }

    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [])

  useEffect(() => {
    let text = 'A';
    let fontSize = 1200;
    let fontFamily = 'serif';

    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;
    const mainContext = mainCanvas.getContext('2d');
    if (!mainContext) return;
    const typeCanvas = typeCanvasRef.current;let manager;
    if (!typeCanvas) return;
    const typeContext = typeCanvas.getContext('2d');
    if (!typeContext) return;


    const cell = 20;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;

    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(letter);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();

    typeContext.fillText(letter, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    mainContext.fillStyle = 'black';
    mainContext.fillRect(0, 0, width, height);
    mainContext.textBaseline = 'middle';
    mainContext.textAlign = 'center';

    // draw reference image
    // mainContext.drawImage(typeCanvas, 0, 0);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];
      const fillStyle = `rgb(${r}, ${g}, ${b})`;
      const glyph = getGlyph(r);

      mainContext.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.05) mainContext.font = `${cell * 6}px ${fontFamily}`;
      mainContext.fillStyle = 'white';

      mainContext.save();
      mainContext.translate(x, y);
      // square
      // mainContext.fillRect(0, 0, cell, cell);

      // circle
      // mainContext.translate(cell * 0.5, cell * 0.5);
      // mainContext.beginPath();
      // mainContext.arc(0, 0, cell * 0.5, 0, Math.PI * 2);

      mainContext.fillText(glyph, 0, 0);

      mainContext.restore();
    }

  })

  return (
    <div>
      <h1>Canvas: Random Typography</h1>
      <canvas ref={typeCanvasRef} width={width} height={height}></canvas>
      <canvas ref={mainCanvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default CanvasType
