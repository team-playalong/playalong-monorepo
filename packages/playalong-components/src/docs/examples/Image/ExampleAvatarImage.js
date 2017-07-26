import React from 'react';
import PlyImage from 'component-root/Image';

/** Avatar Image */
export default function ExampleAvatarImage() {
  const props = {
    src: 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg',
    type: 'avatar',
    height: '100px',
    width: '100px',
  };
  return <PlyImage {...props} />;
}
