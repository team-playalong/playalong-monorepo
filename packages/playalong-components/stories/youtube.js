import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import Youtube from '../src/components/Youtube';

const stories = storiesOf('Youtube', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    videoId: text('video id', 'Ey_K97x15ek'),
    height: number('Height', 400),
    width: number('Width', 800),
  };
  
  return (
    <Youtube {...props} />
  );
});