'use client';

// https://sonner.emilkowal.ski/toast

import { toast } from 'sonner';
import './page.css';

function MyToast() {
  return (
    <div>
      <h2>Sonner Toast</h2>
      <div className="container">
        <button
          onClick={() => {
            toast('Default Toast!');
          }}
        >
          Default
        </button>
        <button
          onClick={() => {
            toast('Success Toast!', { description: 'success description' });
          }}
        >
          Success w/ Description
        </button>
      </div>
    </div>
  );
}

export default MyToast;
