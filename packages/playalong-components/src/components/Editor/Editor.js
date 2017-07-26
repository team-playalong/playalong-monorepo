import * as React from 'react';
import PropTypes from 'prop-types';

import {Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';


class PlyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    if (typeof this.props.change === 'function') {
      this.props.change(stateToHTML(editorState.getCurrentContent()));
    }

    this.setState({editorState});
  }

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}
PlyEditor.propTypes = {
  change: PropTypes.func,
}

export default PlyEditor;
