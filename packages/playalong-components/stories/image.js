import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Image from '../src/components/Image';

const stories = storiesOf('Image', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    src: text('Image Source', 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg'),
  };
  
  return (
    <Image {...props} />
  );
});

stories.add('Avatar Image', () => {
  const props = {
    src: text('Image Source', 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg'),
    type: 'avatar',
    height: '100px',
    width: '100px',
  };
  return <Image {...props} />;
});

stories.add('Regular Image', () => {
  const src = 'https://farm5.staticflickr.com/4078/5441060528_31db7838ba_b.jpg';
  return <img src={src} alt="" />;
});
