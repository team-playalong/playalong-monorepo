import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Title from '../src/components/Title';

const stories = storiesOf('Title', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    text: text('Title Text', 'I am a nice title'),
  };
  
  return (
    <Title {...props} />
  );
});