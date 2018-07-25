import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Rating from '../src/components/Rating';

const stories = storiesOf('Rating', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    readonly: boolean('Read only', false),
    value: number('Value', 2),
    click: value => action(`You chose value ${value}`)(),
  };
  
  return (
    <Rating {...props} />
  );
});