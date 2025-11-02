'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Supademo: any;
  }
}

export default function SupademoInitializer() {
  useEffect(() => {
    // Load Supademo script
    const script = document.createElement('script');
    script.src = 'https://script.supademo.com/script.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize Supademo after script loads
      if (window.Supademo) {
        window.Supademo("UPGRADE_TO_SCALE_OR_ABOVE", {
          variables: {
            email: "", // optional user email
            name: ""   // optional user name
            // add your custom variables here
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
