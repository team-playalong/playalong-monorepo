import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButtons from '../src/components/RadioButtons';

const stories = storiesOf('Radio Buttons', module);
// Knobs for React props
stories.add('default', () => {
  
  const props = {
    inputs: [
      { label: 'l1', value: 'v1' },
      { label: 'l2', value: 'v2' },
    ],
    radioName: 'myRadio',
    onRadioChanged: val => action(`Selected ${val}`)(),
  };

  return <RadioButtons {...props} />
});
