'use client'; // Add this directive since we're using browser APIs

import Script from 'next/script'

const FacebookPixel = () => {
  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Facebook Pixel loaded successfully');
          fbq('init', '2128380290964389');
          fbq('track', 'PageView');
        }}
        src="https://connect.facebook.net/en_US/fbevents.js"
      />
      <Script
        id="fb-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._fbq = window._fbq || [];
            window._fbq.push(['track', 'PageView', {}]);
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=2128380290964389&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  )
}

export default FacebookPixel