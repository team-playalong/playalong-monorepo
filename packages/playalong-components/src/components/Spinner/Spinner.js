import * as React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';

Spinner.propTypes = {
  isActive: PropTypes.bool,
}

// http://www.material-ui.com/#/components/circular-progress
function Spinner({isActive = false}) {
  const styles = {
    display: isActive ? 'block' : 'none',
    zIndex: '1000',
    position: 'absolute',
    top: '50%',
    left: '50%',
  };
  return (
    <MuiThemeProvider muiTheme={THEME}>
      <CircularProgress size={60} thickness={5} style={styles}/>
    </MuiThemeProvider>
  );
}

export const props = ['isActive'];
export default Spinner;
