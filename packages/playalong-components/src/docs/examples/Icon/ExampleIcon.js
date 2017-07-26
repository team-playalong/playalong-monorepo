import React from 'react';
import PlyIcon from 'component-root/Icon';

/** Nice Icon Man! */
export default function ExampleIcon() {
  const props = {
    // icon: 'trash',
    click: () => alert('Clicked!'),
    tooltip: 'Hello from Tooltip',
    size: 20,
    flag: 'us',
  };

  return <PlyIcon {...props} />
}
