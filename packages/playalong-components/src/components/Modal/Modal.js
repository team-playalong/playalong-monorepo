import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';
import PlyButton from '../Button';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class PlyModal extends React.Component {
  componentDidMount() {
    this.setState({
      isOpen: true,
    });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  defaultProps = {
    title: 'Dialog Title',
  };

  render() {
    const { title } = Object.assign({}, this.defaultProps, this.props);

    const actions = [
      <PlyButton
          key="plyButton"
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
        />,
      ];
    return (
      <MuiThemeProvider muiTheme={THEME}>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.isOpen}
          onRequestClose={this.handleClose}
        >
        </Dialog>
      </MuiThemeProvider>
    );
  }
}
PlyModal.propTypes = {

};

export const props = [];
export default PlyModal;
