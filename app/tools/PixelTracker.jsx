'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const PixelTracker = () => {
  useEffect(() => {
    // Check for window object to ensure client-side execution
    if (typeof window === 'undefined') return;

    const initializePixel = async () => {
      try {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        const pixelId = '2128380290964389';

        // Advanced configuration with necessary options
        const options = {
          autoConfig: true,    // Automatically configure the pixel
          debug: true,         // Enable debug mode
          injectScript: true,  // Ensure script injection
          advancedMatching: true // Enable automatic advanced matching
        };

        ReactPixel.init(pixelId, {}, options);
        ReactPixel.pageView();

        // Add Facebook script manually for better control
        if (!document.querySelector('#facebook-pixel-script')) {
          const script = document.createElement('script');
          script.id = 'facebook-pixel-script';
          script.async = true;
          script.src = 'https://connect.facebook.net/en_US/fbevents.js';
          document.head.appendChild(script);
        }

        // Test custom event
        setTimeout(() => {
          ReactPixel.track('Purchase', {
            value: 1.00,
            currency: 'USD'
          });
        }, 3000); // Test after 3 seconds

        console.log('Facebook Pixel initialized successfully');
      } catch (error) {
        console.error('Facebook Pixel initialization error:', error);
      }
    };

    initializePixel();
  }, []);

  return null;
};

// Wrap in dynamic import to ensure client-side only execution
export default dynamic(() => Promise.resolve(PixelTracker), {
  ssr: false,
  loading: () => null
});