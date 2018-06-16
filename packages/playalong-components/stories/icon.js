import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import PlyIcon from '../src/components/Icon';

const stories = storiesOf('Icon', module);

// Knobs for React props
stories.add('default', () => {
  const props = {
    icon: 'trash',
    click: action('Clicked!'),
    tooltip: text('tooltip', 'Hello from tooltip'),
    size: number('size', 20),
    flag: text('flag', 'us'),
  };
  
  return (
    <PlyIcon {...props} />
  );
});
