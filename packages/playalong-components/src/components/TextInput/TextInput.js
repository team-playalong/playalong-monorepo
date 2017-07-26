import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';

import { generateUuid } from '../../utils/uuid';
import { invokeIfFunction } from '../../utils/common';

function setErrorText({value, required}) {
  return required && !value ?
    'This field is required' :
    null;
}

function TextInput({
  placeholder = '',
  name = 'textInput',
  id = generateUuid(),
  label = '',
  value = '',
  required = false,
  onChange = null,
}) {

  const handleChange = (e, newValue) => {
    invokeIfFunction(onChange, e.target.value);
  };

  return (
    <MuiThemeProvider muiTheme={THEME}>
      <div className='ply-text-input'>
        <label htmlFor={id}>{label}</label>&nbsp;&nbsp;
        <TextField
          id={id}
          name={name}
          defaultValue={value}
          hintText={placeholder}
          errorText={setErrorText({required, value})}
          onChange={handleChange}
        />
      </div>
    </MuiThemeProvider>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

export const props = ['label', 'placeholder', 'onChange'];
export default TextInput;
