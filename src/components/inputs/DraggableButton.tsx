// components/DraggableButton.jsx
'use client';

import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';

interface DraggableButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
  parentRef: React.RefObject<HTMLDivElement>;
  popovertarget?: string;
}

const DraggableButton = ({ id, parentRef, children, ...rest }: DraggableButtonProps) => {
  // these should be unchanged after the first render
  const [rects, setRects] = useState({
    parentX: 0,
    parentY: 0,
    parentWidth: 0,
    parentHeight: 0,
    buttonWidth: 0,
    buttonHeight: 0,
  });
  // calculate the offset of the mouse click relative to the button's top-left corner
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current && parentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      setRects({
        parentX: parentRect.x,
        parentY: parentRect.y,
        parentWidth: parentRect.width,
        parentHeight: parentRect.height,
        buttonWidth: buttonRect.width,
        buttonHeight: buttonRect.height,
      });
      setPosition({
        x: parentRect.x,
        y: parentRect.y,
      });
    }
  }, [buttonRef, parentRef]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !parentRef.current || !buttonRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const newX = Math.max(
        rects.parentX,
        Math.min(event.clientX - offset.x, rects.parentX + rects.parentWidth - rects.buttonWidth)
      );
      const newY = Math.max(
        rects.parentY,
        Math.min(event.clientY - offset.y, rects.parentY + rects.parentHeight - rects.buttonHeight)
      );
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
