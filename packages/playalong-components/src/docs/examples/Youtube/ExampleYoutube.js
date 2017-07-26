import React from 'react';
import Youtube from 'component-root/Youtube';

/** Showing Optimized Youtube Content */
export default function ExampleYoutube() {
  const props = {
    videoId: 'Ey_K97x15ek',
    height: 400,
    width: 800,
  };
  return <Youtube {...props} />
}
