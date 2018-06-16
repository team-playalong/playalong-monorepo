import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import TextSlider from '../src/components/TextSlider';

const stories = storiesOf('Text Slider', module);

stories.addDecorator(withKnobs);

// Knobs for React props
stories.add('default', () => {
  const props = {
    size: number('size', 14),
    onSliderChanged: action('onSliderChanged'),
    min: number('min', 12),
    max: number('min', 24),
    tooltip: text('tooltip','Slide me please...'),
  };
  
  return (
    <TextSlider {...props} />
  );
});