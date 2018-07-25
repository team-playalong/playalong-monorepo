import React from 'react';
import TextInput from 'component-root/TextInput';

class TextInputContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ val: '1234' });
  }

  handleChange(val) {
    this.setState({ val });
  }

  render() {
    return (
      <div>
        <TextInput
          value="1234" name="Hey"
          onChange={this.handleChange}
        />
        <span>{`Value is ${this.state.val}`}</span>
      </div>
    );
  }
}

/** Nice TextInput */
export default function ExampleTextInput() {

  return (<TextInputContainer />);
}
