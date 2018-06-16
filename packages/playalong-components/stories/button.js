import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/Button';



const stories = storiesOf('Button', module);

stories.add('with text', () => {
  const props = {
    label: text('Button Text', 'I am a button!'),
    click: action('clicked'),
  };

  return (
    <Button 
    label={props.label}
    click={props.click} 
  />
  );
});