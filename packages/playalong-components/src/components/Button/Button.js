import React from 'react';
// Needed for onTouchTap
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { generateUuid } from '../../utils/uuid';
import THEME from '../../utils/theme';

PlyButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  id: PropTypes.string,
}

function getButtonByType({type, label, click, id}) {
  switch (type) {
    case 'raised':
    default:
      return <RaisedButton id={id} primary={true} onClick={click} label={label} />;
  }
}

function PlyButton({type = 'raised', label, click, id = generateUuid()}) {

  return (
    <MuiThemeProvider muiTheme={THEME}>
      <span>{getButtonByType({type, label, click, id})}</span>
    </MuiThemeProvider>
  );
}

export const props = ['label', 'click', 'id'];
export default PlyButton;
