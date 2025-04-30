'use client';

import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

const PixelTracker = () => {
  useEffect(() => {
    const PIXEL_ID = '2128380290964389';
    ReactPixel.init(PIXEL_ID, {}, { autoConfig: true, debug: false });
    ReactPixel.pageView();
  }, []);

  return null;
};

export default PixelTracker;
