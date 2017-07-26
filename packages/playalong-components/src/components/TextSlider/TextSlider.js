import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../../utils/colors';



class TextSlider extends React.Component {
  defaultProps = {
    min: 12,
    max: 24,
    size: 14,
    tooltip: 'Change Font Size',
  };

  constructor(props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      size: this.props.size || this.defaultProps.size,
    });
  }

  handleSliderChange(e) {
    this.setState({
      size: e.target.value,
    });
    if (this.props.elementClass) {
      const elements = document.querySelectorAll(`.${this.props.elementClass}`);
      for (let i = 0; i < elements.length; i++) {
        (elements[i]).style.fontSize = `${e.target.value}px`;
      }
    }

    if (typeof this.props.onSliderChanged === 'function') {
      this.props.onSliderChanged(e.target.value);
    }
  }

  render() {
    this.props = Object.assign({}, this.defaultProps, this.props);

    const TextSliderComp = styled.span`
      line-height: 100%;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;

      .small-letter, .big-letter {
        font-weight: bold;
      }

      .small-letter {
        font-size: ${this.props.min}px;
      }

      .big-letter {
        font-size: ${this.props.max}px;
      }

      .input-wrapper {
        width: 100%;
        input {
          width: 100%;
          -webkit-appearance: none;
          display: inline;
        }
      }


      .slider:focus {
        outline: none;
      }

      .slider::-webkit-slider-thumb {
        border: none;
        cursor: pointer;
        -webkit-appearance: none;
        background-color: ${COLORS.PRIMARY};
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-top: -6px;
      }

      .slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background: ${COLORS.GREY_LIGHT};
        border: 0;
      }
    `;

    return (
      <TextSliderComp
        data-tip={this.props.tooltip}
      >
        <span className='small-letter'>A</span>
        <span className="input-wrapper">
          <input
            type='range'
            min={this.props.min}
            max={this.props.max}
            className='slider'
            value={this.state.size}
            onChange={this.handleSliderChange}
          />
        </span>
        <span className='big-letter'>A</span>
      </TextSliderComp>
    );
  }
}
TextSlider.propTypes = {
  elementClass: PropTypes.string,
  size: PropTypes.number,
  onSliderChanged: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  tooltip: PropTypes.string,
};

export const props = ['size', 'elementClass'];
export default TextSlider;
