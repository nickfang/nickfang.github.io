'use client';

// https://sonner.emilkowal.ski/toast

import { toast } from 'sonner';
import styles from './page.module.css';
import { useEffect } from 'react';

function MyToast() {
  useEffect(() => {
    toast('Toast on page load.');
  }, []);
  return (
    <div>
      <div>
        <h2>Sonner Toast</h2>
      </div>
      <div className={styles.container}>
        <button
          onClick={() => {
            toast('Default Toast!');
          }}
        >
          Default
        </button>
        <button
          onClick={() => {
            toast('Description Toast!', { description: 'toast description' });
          }}
        >
          Success w/ Description
        </button>
        <button
          onClick={() => {
            toast('Temp Toast!', { duration: 1000, icon: '🔥' });
          }}
        >
          Temp Toast
        </button>
        <button
          onClick={() => {
            toast('Action Toast!', {
              action: {
                label: 'Action',
                onClick: () => alert('Action Toast!'),
              },
            });
          }}
        >
          Action Toast
        </button>
        <button
          onClick={() => {
            toast('Button Toast!', {
              action: <button onClick={() => alert('Button Toast!')}>Click me</button>,
            });
          }}
        >
          Button Toast
        </button>
        <button
          onClick={() => {
            toast('Cancel Toast!', {
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel Toast!'),
              },
            });
          }}
        >
          Cancel Toast
        </button>
        <button
          onClick={() => {
            toast('Callback Toast!', {
              cancel: {
                label: 'Dismiss',
                onClick: () => console.log('Cancel Toast!'),
              },
              onDismiss: () => console.log('Callback Toast!'),
              onAutoClose: () => console.log('Auto close Toast!'),
            });
          }}
        >
          Callback Toast
        </button>
        <button
          onClick={() => {
            toast.dismiss();
          }}
        >
          Dismiss All
        </button>
      </div>
      <div>
        <p>
          Inspired by <a href="https://sonner.emilkowal.ski/toast">Sonner Toast</a>
        </p>
      </div>
    </div>
  );
}

export default MyToast;
