import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import AutoScroll from '../src/components/AutoScroll';

const styles = { height: 500 }
const props = {
  speed: number('Speed', 5),
};

storiesOf('AutoScroll', module)
  .add('Default', () => (
    <div style={styles}>
      <AutoScroll {...props} />
    </div>
  ));
