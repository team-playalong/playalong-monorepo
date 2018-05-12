import React from 'react';
import { oneOfType, string, number, func } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import 'flag-icon-css/css/flag-icon.min.css';

PlyIcon.propTypes = {
  icon: string.isRequired,
  click: func,
  tooltip: string,
  size: oneOfType([string, number]),
}

const styles = {
  cursor: 'pointer',
  padding: '5px',
  verticalAlign: 'middle',
  fontSize: 'initial',
};

function PlyIcon({ size, icon, flag, click, tooltip }) {
  if (size) {
    styles.fontSize = size + 'px';
  }

  return (
    <span
      onClick={click}
      style={styles}
      data-tip={tooltip}
    >
      { !flag && <FontAwesome name={icon} /> }
      {
        flag && <span className={`flag-icon flag-icon-${flag}`}></span>
      }

      <ReactTooltip place='top' type='dark' effect='float' />
    </span>
  );
}

export const props = ['icon', 'click', 'tooltip', 'size', 'flag'];
export default PlyIcon;
