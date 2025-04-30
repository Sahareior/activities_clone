// app/components/FacebookPixelTracker.jsx
'use client';

import dynamic from 'next/dynamic';

const PixelTracker = dynamic(
  () => import('./PixelTracker'),
  {
    ssr: false,
    loading: () => null
  }
);

export default function FacebookPixelTracker() {
  return <PixelTracker />;
}