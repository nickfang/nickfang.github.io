// components/DraggableButton.jsx
'use client';

import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';

interface DraggableButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
  parentRef: React.RefObject<HTMLDivElement>;
  popoverTarget?: string;
}

const DraggableButton = ({ id, parentRef, children, ...rest }: DraggableButtonProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [parentRect, setParentRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current && parentRef.current) {
      const tempRect = parentRef.current.getBoundingClientRect();
      setParentRect({
        x: tempRect.x,
        y: tempRect.y,
        width: tempRect.width,
        height: tempRect.height,
      });
      setPosition({
        x: tempRect.x,
        y: tempRect.y,
      });
    }
  }, [buttonRef, parentRef]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !parentRef.current || !buttonRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const offsetX = event.clientX - buttonRect.left;
      const offsetY = event.clientY - buttonRect.top;
      console.log(offset);
      const newX = Math.max(
        parentRect.x,
        Math.min(event.clientX - offsetX, parentRect.x + parentRect.width - buttonRect.width)
      );
      const newY = Math.max(
        parentRect.y,
        Math.min(event.clientY - offsetY, parentRect.y + parentRect.height - buttonRect.height)
      );
      console.log(newX, newY);
      setPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const handleOnMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;
    setIsDragging(true);
    setOffset({
      x: event.clientX - buttonRect.left,
      y: event.clientY - buttonRect.top,
    });
  };

  return (
    <button
      id={id}
      ref={buttonRef}
      onMouseDown={handleOnMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        // Other styles (e.g., from Tailwind CSS)
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DraggableButton;
