import React from 'react';
import RadioButtons from 'component-root/RadioButtons';

/** Radio Buttons Group */
export default function ExampleRadioButtons() {
  const props = {
    inputs: [
      { label: 'l1', value: 'v1' },
      { label: 'l2', value: 'v2' },
    ],
    radioName: 'myRadio',
    onRadioChanged: val => alert(`Selected ${val}`),
  };

  return <RadioButtons {...props} />
}
