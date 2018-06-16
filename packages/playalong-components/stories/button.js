import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/Button';

function clickHandler() {
    alert('Clicked!');
  }

storiesOf('Button', module)
  .add('with text', () => (
    <Button label="I Am a Button!" />
  ))
  .add('with fancy click', () => (
    <Button 
      label="I Am a Button!" 
      click={clickHandler}
    />
  ));
  