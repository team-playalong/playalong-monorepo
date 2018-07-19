import React from 'react';
import PlyToggle from 'component-root/Toggle';

class ToggleContainer extends React.Component {
  toggled;

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this.setState({ toggled: false });
  }

  onToggle = val => {
    alert(`Changed to ${val}`);
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

/** Toggle Switch */
export default function ExampleToggle() {
  return <ToggleContainer />
}
