'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

interface MenuItem {
  label: string;
  href?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'New Game', href: '/newgame' },
  { label: 'Load Game', href: '/loadgame' },
  {
    label: 'Options',
    subItems: [{ label: 'Graphics' }, { label: 'Sound' }],
  },
  { label: 'Exit' },
];

const NavBar = () => {
  return (
    <div>
      <h2>Navigation Ideas</h2>
      <div className={styles.menu}>
        <div className={styles['menu-item']}>New Game</div>
        <div className={styles['menu-item']}>Load Game</div>
        <div className={styles['menu-item']}>
          Options
          <div className={styles.submenu}>
            <div className={styles['menu-item']}>Graphics</div>
            <div className={styles['menu-item']}>Sound</div>
          </div>
        </div>
      </div>
      <div className={styles.menu2}>
        <div className={styles['menu2-item']}>Mission</div>
        <div className={styles['menu2-item']}>Inventory</div>
        <div className={styles['menu2-item']}>Gallery</div>
        <div className={styles['menu2-item']}>Contacts</div>
        <div className={styles['menu2-item']}>Help</div>
      </div>
      <div className={styles.menu3}>
        <div className={styles['menu3-item']}>New Game</div>
        <div className={styles['menu3-item']}>Load Game</div>
        <div className={styles['menu3-item']}>
          Options
          <div className={styles.submenu}>
            <div className={styles['menu3-item']}>Graphics</div>
            <div className={styles['menu3-item']}>Sound</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
