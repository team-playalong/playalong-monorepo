import React from 'react';
import PlyDropdown from 'component-root/Dropdown';

/** Avatar Image */
export default function ExampleDropdown() {
  const props = {
    value: 1,
    options: [
      { label: 'Superman', value: 1 },
      { label: 'Batman', value: 2 },
      { label: 'Wonderwoman', value: 3 },
    ],
    change: (e, key, value) => alert(`You chose value ${value}`),
  };
  return <PlyDropdown {...props} />;
}
