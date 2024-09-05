import Script from 'next/script';
import React from 'react';

type AdsenseProps = {
  pId: string;
};

const AdSense = ({ pId }: AdsenseProps) => {
  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      async
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  );
}

export default AdSense;
