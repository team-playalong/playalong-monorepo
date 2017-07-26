import React from 'react';
import Title from 'component-root/Title';

/** Unified title */
export default function ExampleTitle() {
  const props = {
    text: 'I am a nice title'
  };

  return <Title {...props} />
}
