import React from 'react';
import { storiesOf } from '@storybook/react';
import PlyEditor from '../src/components/Editor';

const props = {
  change: text => console.log(text),
};


storiesOf('Editor', module)
  .add('Default', () => (
    <PlyEditor {...props}/>
  ));
