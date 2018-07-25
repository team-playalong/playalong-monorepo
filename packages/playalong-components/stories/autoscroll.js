import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import AutoScroll from '../src/components/AutoScroll';

const styles = { height: 500 }
const props = {
  speed: number('Speed', 5),
  // icon: 'trash',
  // click: action('Clicked!'),
  // tooltip: text('tooltip', 'Hello from tooltip'),
  // size: number('size', 20),
  // flag: text('flag', 'us'),
};

storiesOf('AutoScroll', module)
  .add('Default', () => (
    <div style={styles}>
      <AutoScroll {...props} />
    </div>
  ));
