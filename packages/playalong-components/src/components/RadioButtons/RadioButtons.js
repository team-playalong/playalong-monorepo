import * as React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import THEME from '../../utils/theme';

function RadioButtons(props) {

  let currId;
  const handleChange = (e, val) => {
    props.onRadioChanged(val);
  };
  const allRadioButtons = props.inputs.map(input => {
    currId = input.value + Date.now();
    return (
        <RadioButton
          value={input.value}
          label={input.label}
          key={currId}
        />
    );
  });

  return (
    <MuiThemeProvider muiTheme={THEME}>
      <div className='ply-radio-buttons'>
        {!!props.legend && <label>{props.legend}</label>}
        <RadioButtonGroup
          onChange={handleChange}
          name={props.radioName || 'radio'}>
          {allRadioButtons}
        </RadioButtonGroup>
      </div>
    </MuiThemeProvider>
  );
};

const inputProp = shape({
  value: string,
  label: string,
});
RadioButtons.propTypes = {
  legend: string,
  inputs: arrayOf(inputProp),
  onRadioChanged: func,
  radioName: string,
};
export const props = ['inputs', 'onRadioChanged'];
export default RadioButtons;
