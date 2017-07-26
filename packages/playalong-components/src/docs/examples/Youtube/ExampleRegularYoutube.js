import React from 'react';

/** Non Optimized Content */
export default function ExampleRegularYoutube() {
  const src = 'https://www.youtube.com/embed/eP4eqhWc7sI';
  return <iframe
    title="playalong youtube"
    src={src}
    height="400"
    width="800"
    frameBorder='0'
    allowFullScreen
  >
  </iframe>
}
