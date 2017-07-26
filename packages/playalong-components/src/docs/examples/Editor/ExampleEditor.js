import React from 'react';
import PlyEditor from 'component-root/Editor';

/** Wysiwyg text editor
  Check out console log for the outcome
*/
export default function ExampleEditor() {
  const props = {
    change: text => console.log(text),
  };
  return <PlyEditor {...props}/>
}
