'use client';

import React, { useRef, useEffect, useState } from 'react';
import { random, math } from '../utils';
class Vector {
  x: number;
  y: number
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getDistance(v: Vector) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
class Agent {
  pos: Vector;
  vel: Vector;
  radius: number;
  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  bounce(width: number, height: number) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth - 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.restore();
  }
}

const CanvasConnected = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [canvas, setCanvas] = useState<{ width: number, height: number }>({ width: 900, height: 900 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  for (let i = 0; i < 10; i++) {
    const x = random.range(0, canvas.width);
    const y = random.range(0, canvas.height);

    agents.push(new Agent(x, y));
  }
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const side = width // Math.min(width, height) * 0.9;
      canvasRef.current!.width = side;
      canvasRef.current!.height = side;
      setCanvas({ width: side, height: side });
      const newAgents = [];
      for (let i = 0; i < 200; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);

        newAgents.push(new Agent(x, y));
      }
      setAgents(newAgents);
    }
    handleResize();
  }, [])
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let animationFrameId: number;

    const draw = () => {
      context.reset()
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'white';
      context.strokeStyle = 'white';
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dist = agent.pos.getDistance(other.pos);

          if (dist < 100) {
            context.save();
            context.lineWidth = math.mapRange(dist, 0, 25, 12, 1);
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
            context.restore();
          }
        }
      }
      agents.forEach((agent) => {
        agent.update();
        agent.draw(context);
        agent.bounce(canvas.width, canvas.height);
      });
      animationFrameId = requestAnimationFrame(draw);
    }
    animationFrameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId);
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