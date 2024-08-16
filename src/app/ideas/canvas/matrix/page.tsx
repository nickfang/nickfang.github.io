'use client';

import React, { useRef, useEffect, useState, useCallback } from "react";

const Canvas = (props: any) => {
  const { draw, fps = 30, establishContext, establishCanvasWidth, width = "100%", height = "100%", ...rest } = props;
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const resizeCanvas = useCallback((context: CanvasRenderingContext2D) => {
  const canvas = context.canvas;
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      if (establishCanvasWidth) {
          establishCanvasWidth(canvas.width);
      }
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  }, []);
  useEffect(() => {
      //i.e. value other than null or undefined
      if (canvasRef) {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          setContext(ctx);
          resizeCanvas(ctx);
          if (establishContext) {
              establishContext(ctx);
          }
      }
  }, []);

  useEffect(() => {
      let animationFrameId: number;

      // Check if null context has been replaced on component mount
      if (context) {
          //Our draw came here
          const render = () => {
              draw();
              animationFrameId = window.requestAnimationFrame(render);
          };
          render();
      }
      return () => {
          window.cancelAnimationFrame(animationFrameId);
      };
  }, [draw, context, resizeCanvas]);
  return <canvas ref={canvasRef} {...rest} style={{ backgroundColor: "#000", width, height }} />;
};

// export default Canvas;

const MatrixBG = () => {
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);
    const [canvasWidth, setCanvasWidth] = useState<number | null>(null);

    const establishContext = (context: CanvasRenderingContext2D) => {
        setCtx(context);
    };

    const establishCanvasWidth = (width: number) => {
        setCanvasWidth(width);
    };

    // Setting up the letters
    // Move the array outside draw so it is not needlessly recalculated on each call to draw
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ";
    const letters = chars.split("");

    // Font-size remains constant, so similarly move outside draw
    const fontSize = 10;
    // Setting up the columns
    const columns = canvasWidth ? canvasWidth / fontSize : 10;
    // Setting up the drops
    const drops: Array<number> = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    const convertMousePosToRowsAndCols = (x: number, y: number): { row: number, col: number} => {

      if (!ctx) return { row: -1, col: -1 };
        // get col position
        const col = Math.floor(x / fontSize);

        // get row pos
        const row = Math.min(Math.ceil(y / fontSize), Math.floor(ctx.canvas.height));

        return { row, col };
    };

    // Disturbance Effect Handlers
    let disturbanceRow = -1;
    let disturbanceCol = -1;
    let timeout: any;

    const disturbanceEffect = (e: any) => {
      if (!e.target) return;
        clearTimeout(timeout);
        const bounds = e.target.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const { row, col } = convertMousePosToRowsAndCols(x, y);
        disturbanceRow = row;
        disturbanceCol = col;
        timeout = setTimeout(() => {
            disturbanceRow = -1;
            disturbanceCol = -1;
        }, 50);
    };

    const isDisturbanceAffectedPosition = (dropIndex: number) => {
        return drops[dropIndex] * fontSize > disturbanceRow && dropIndex === disturbanceCol;
    };

    const draw = () => {
        if (ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, .1)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = "#0f0";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                drops[i]++;
                if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                if (isDisturbanceAffectedPosition(i)) {
                    const h = Math.max(i - 1, 0);
                    const j = Math.min(i + 1, Math.floor(columns));
                    drops[h] = disturbanceRow;
                    drops[i] = disturbanceRow;
                    drops[j] = disturbanceRow;
                }
            }
        }
    };

    return (
        <Canvas
            draw={draw}
            onMouseMove={disturbanceEffect}
            establishContext={establishContext}
            establishCanvasWidth={establishCanvasWidth}
        />
    );
};

export default MatrixBG;