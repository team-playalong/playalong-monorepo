import * as React from 'react';
// import styled from 'styled-components';
import { string, number, arrayOf, oneOfType, shape, func } from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import THEME from '../../utils/theme';

PlyDropdown.propTypes = {
  /** Initial value of the dropdown */
  value: oneOfType([ string, number ]),
  /** Array of all the options to be presented in the dropdown */
  options: arrayOf(shape({
    label: string,
    value: oneOfType([ string, number ]),
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

export default PlyDropdown;
