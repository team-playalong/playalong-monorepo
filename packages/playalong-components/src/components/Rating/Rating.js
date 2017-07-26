import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.css';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import COLORS from '../../utils/colors';

const RatingComp = styled.ul`
  margin: 0;
  padding: 0;
  display: inline-block;
  li {
    padding: 1px;
    color: #ddd;
    font-size: 20px;
    list-style-type: none;
    display: inline-block;
    cursor: pointer;
    &.filled {
      color: ${COLORS.STARS};
    }
    &.non-clickable {
      cursor: default;
    }
  }
`;

const Rating = ({ max = 5, readonly = false, value = null, click = null }) => {
  const classNames = `rating ${readonly ? 'readonly' : ''}`;

  function renderRatingOptions(props) {
    const options = [];
    let classes;
    for (let i = 0; i < max; i++) {
      classes = `
        star
        ${value > i ? 'filled' : ''}
        ${readonly ? 'non-clickable' : ''}
      `;
      options.push((
        <li
          className={classes}
          key={i}
          onClick={() => ratingOptionClicked(i + 1)}
        >
          <FontAwesome
            name='star'
          />
        </li>
      ));
    }
    return options;
  }

  function ratingOptionClicked(val) {
    if (!readonly && typeof click === 'function') {
      click(val);
    }
  }

  return (
    <RatingComp className={classNames}>
      {renderRatingOptions(props)}
    </RatingComp>
  );
};
Rating.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  value: PropTypes.number,
  click: PropTypes.func,
};
export const props = ['readonly', 'max', 'value', 'click'];

export default Rating;
