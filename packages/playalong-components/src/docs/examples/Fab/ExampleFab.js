import React from 'react';
import PlyFab from 'component-root/Fab';

/** Floating Action Button Component */
export default function ExampleToggle() {
  const props = {
    fabItems: [
      {
        icon: 'trash',
        label: 'Throw to Trash',
        callback: () => alert('Clicked Trash'),
      },
      {
        icon: 'pencil',
        label: 'Edit',
        callback: () => alert('Clicked the Pencil'),
      },
    ],
  };

  return (
    <PlyFab {...props} />
  );
}
