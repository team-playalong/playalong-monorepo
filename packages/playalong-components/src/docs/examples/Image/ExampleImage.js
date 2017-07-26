import React from 'react';
import PlyImage from 'component-root/Image';

/** Optimed Image Loading */
export default function ExampleImage() {
  const props = {
    src: 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg'
  };
  return <PlyImage {...props} />;
}
