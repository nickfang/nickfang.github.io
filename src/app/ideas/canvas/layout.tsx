import React, { useRef, useEffect, useState, EventHandler, KeyboardEventHandler, ReactNode } from 'react';

const CanvasLayout = ({ children }) => {
  // const [letter, setLetter] = useState<string>('A');
  // const [canvas, setCanvas] = useState<{ width: number, height: number }>({ width: 900, height: 900 });
  // const containerRef = useRef<HTMLDivElement>(null);
  // const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  // const typeCanvasRef = useRef<HTMLCanvasElement>(null);
  // // const width = 900;
  // // const height = 900;

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!containerRef.current) return;
  //     const { width, height } = containerRef.current.getBoundingClientRect();
  //     const side = Math.min(width, height) * 0.9;
  //     mainCanvasRef.current!.width = side;
  //     mainCanvasRef.current!.height = side;
  //     setCanvas({ width: side, height: side });
  //   }

  //   handleResize();
  // }, [])

  return (
    // <div ref={containerRef}>
    <div>
      {children}
      {/* <h1>Canvas Creations</h1>
      <div className="h-16 my-8 flex justify-center items-center">
        <div className="pr-4">
          Type a letter or number:
        </div>
        <div>
          <canvas ref={typeCanvasRef} width={canvas.width} height={canvas.height} />
        </div>

      </div>
      <canvas className="mx-auto my-8" ref={mainCanvasRef} width={canvas.width} height={canvas.height} /> */}
    </div>
  );
}

export default CanvasLayout
