import * as React from 'react';
// import styled from 'styled-components';
import { string, number, arrayOf, oneOfType, shape, func } from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import THEME from '../../utils/theme';
import '../../utils/tap-events';

PlyDropdown.propTypes = {
  /** Initial value of the dropdown */
  value: oneOfType([ string, number]),
  /** Array of all the options to be presented in the dropdown */
  options: arrayOf(shape({
    label: string,
    value: oneOfType([ string, number]),
  })),
  change: func,
};

function renderOption({ label = '', value = null }, i) {
  return (
    <MenuItem
      key={i}
      value={value}
      primaryText={label}
    />
  );
}

function PlyDropdown({
  value,
  options = [],
  change = function() {},
}) {

  return (
    <MuiThemeProvider muiTheme={THEME}>
      <DropDownMenu
        value={value}
        onChange={change}
      >
        { options.map(renderOption) }
      </DropDownMenu>
    </MuiThemeProvider>

  );
}

// <MenuItem value={1} primaryText="Never" />
// <MenuItem value={2} primaryText="Every Night" />
// <MenuItem value={3} primaryText="Weeknights" />
// <MenuItem value={4} primaryText="Weekends" />
// <MenuItem value={5} primaryText="Weekly" />
export default PlyDropdown;
