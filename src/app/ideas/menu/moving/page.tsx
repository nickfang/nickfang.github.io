'use client';

import DraggableButton from '@/components/inputs/DraggableButton';
import styles from './page.module.css';
import { useRef } from 'react';

const MovingMenu = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  console.log(parentRef.current);
  return (
    <div>
      <h2>Moving Menu</h2>
      <div className={styles.container} ref={parentRef}>
        <DraggableButton id="trigger" parentRef={parentRef} popovertarget="menu" className="">
          Move me!
        </DraggableButton>
        <div popover="auto" id="menu" data-anchor="trigger" />
        <p></p>
      </div>
    </div>
  );
};

export default MovingMenu;
