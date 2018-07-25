import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Spinner from '../src/components/Spinner';

const stories = storiesOf('Spinner', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    isActive: boolean('Is Active?', true),
  };
  
  return (
    <Spinner {...props} />
  );
});