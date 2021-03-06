import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlyDropdown from '../src/components/Dropdown';

const props = {
  value: 1,
  options: [
    { label: 'Superman', value: 1 },
    { label: 'Batman', value: 2 },
    { label: 'Wonderwoman', value: 3 },
  ],
  change: (e, key, value) => action(`You chose value ${value}`)(),
};

storiesOf('Dropdown', module)
.add('Default', () => (
  <PlyDropdown {...props} />
));
