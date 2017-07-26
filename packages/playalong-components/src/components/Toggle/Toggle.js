import * as React from 'react';
import PropTypes from 'prop-types';

import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';

// http://www.material-ui.com/#/components/toggle
class PlyToggle extends React.Component {

  constructor(props) {
    super(props);

    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleToggleChange(e, val) {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(val);
    }
  }

  render() {
    const {
      label = '', toggled = false
    } = this.props;

    return (
      <MuiThemeProvider muiTheme={THEME}>
        <Toggle
          label={label}
          toggled={toggled}
          onToggle={this.handleToggleChange}
        />
      </MuiThemeProvider>
    );
  }
}
PlyToggle.propTypes = {
  toggled: PropTypes.bool,
  onToggle: PropTypes.func,
  label: PropTypes.string,
}

export default PlyToggle;
