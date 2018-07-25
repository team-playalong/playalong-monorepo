import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PlyToggle from '../src/components/Toggle';

class ToggleContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle = val => {
    action(`Toggle changed to ${val}`)();
    this.setState({
      toggled: val,
    });
  };

  render() {
    return <PlyToggle
      label="Yo!"
      toggled={this.state.toggled}
      onToggle={this.onToggle}
    />
  }
}

const stories = storiesOf('Toggle', module);
// Knobs for React props
stories.add('default', () => {
  
  return (
    <ToggleContainer />
  );
});
