import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from '../src/components/TextInput';

class TextInputContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      val: '1234',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    action(`Text input changed to ${val}`)();
    this.setState({ val });
  }

  render() {
    return (
      <div>
        <TextInput
          value="1234" name="Hey"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const stories = storiesOf('Text Input', module);
// Knobs for React props
stories.add('default', () => {
  
  return (
    <TextInputContainer />
  );
});