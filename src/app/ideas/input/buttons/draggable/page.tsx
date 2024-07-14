'use client';

import DraggableButton from '@/components/inputs/DraggableButton';
import styles from './page.module.css';
import { useRef } from 'react';

const Draggablebutton = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  console.log(parentRef.current);
  return (
    <div>
      <h2>Draggable Button</h2>
      <p>Draggable button that is contained within its parent element.</p>
      <div className={styles.container} ref={parentRef}>
        <DraggableButton id="trigger" parentRef={parentRef}>
          Move me!
        </DraggableButton>
        <p></p>
      </div>
    </div>
  );
};

export default Draggablebutton;
