import React from 'react';
import { storiesOf } from '@storybook/react';
import AutoScroll from '../src/components/AutoScroll';

const styles = { height: 500 }


storiesOf('AutoScroll', module)
  .add('Default', () => (
    <div style={styles}><AutoScroll /></div>
  ));
  