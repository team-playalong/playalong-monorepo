import { configure, addDecorator } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';

addDecorator(withKnobs);
addDecorator(checkA11y);
addDecorator(centered);


function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);