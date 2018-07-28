import React from 'react';
import { string, func } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

const styles = {
  cursor: 'pointer',
  padding: '5px',
  verticalAlign: 'middle',
  fontSize: 'initial',
};

function BtnIcon(props) {
  if (props.size) {
    styles.fontSize = props.size + 'px';
  }

  return (
    <span>
      <FontAwesome
        name={props.icon}
        onClick={props.click}
        style={styles}
        data-tip={props.tooltip}
      />
      <ReactTooltip place='top' type='dark' effect='float' />
    </span>

  );
}
BtnIcon.propTypes = {
	size: string,
	icon: string.isRequired,
	click: func,
	tooltip: string,
};

export const props = ['icon', 'click', 'tooltip', 'size'];
export default BtnIcon;
