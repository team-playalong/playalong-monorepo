import React from 'react';
import Button from 'component-root/Button';

function clickHandler() {
  alert('Clicked!');
}

/** Custom message */
export default function ExamplePlyButton() {
  return <Button
          label="I Am a Button!"
          click={clickHandler}
        />
}
