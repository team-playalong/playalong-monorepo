import React from 'react';

/** Regular Image - Notice load time */
export default function ExampleRegularImage() {
  const props = {
    src: 'https://farm5.staticflickr.com/4094/4859138371_9713d4396e_b.jpg',
    type: 'avatar',
    height: '100px',
    width: '100px',
  };
  return <img src={props.src} alt="" />;
}
