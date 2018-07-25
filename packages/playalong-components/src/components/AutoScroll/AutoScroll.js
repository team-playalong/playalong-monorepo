import * as React from 'react';
import 'font-awesome/css/font-awesome.css';
import Gauge from 'react-svg-gauge';
import Icon from '../Icon';
import jQuery from 'jquery';
import 'jquery-ui/ui/widgets/draggable.js';

const defaults = {
  min: 0,
  max: 5,
  label: 'Auto Scroll',
  width: 150,
  height: 125,
  color: '#388e3c',
};

class AutoScroll extends React.Component {
  config = {
    bottomSpeed: 1,
    topSpeed: 2,
    baseInterval: 80,
    maxSpeed: 5,
    minSpeed: 0,
  };
  styles = {
    widget: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      speed: 0,
    };
    this.updateSpeed = this.updateSpeed.bind(this);
  }

  updateSpeed(num) {
    if ((num > 0 && this.state.speed < defaults.max) ||
        (num < 0 && this.state.speed > defaults.min)) {
      this.setState({
        speed: this.state.speed + num,
      });
      this.updateInterval();
    }

  }

  updateInterval = function() {
    const normalizedSpeed = this.normalizeSpeed();
    if (this.plyInterval) {
      clearInterval(this.plyInterval);
    }
    const newInterval = this.config.baseInterval * (1 / normalizedSpeed);
    this.plyInterval = setInterval(() => {
      if (this.state.speed > 0) {
        window.scrollBy(0, 1);
      }
      else {
        clearInterval(this.plyInterval);
      }
    }, newInterval, 0/*infinite*/);
  };

  normalizeSpeed = function() {
    const base = this.config.bottomSpeed;
    const offset = (this.state.speed - base) / (this.config.maxSpeed - this.config.minSpeed);
    return base + offset;
  };

  static getDerivedStateFromProps(props, state) {
    return {
      speed: state.speed || props.speed || 0,
    };
  }

  componentDidMount() {
    jQuery('.ply-autoscroll-widget').draggable();
  }

  render() {
    const newProps = Object.assign({}, defaults, this.props);
    return (
      <div>
        <div
          className='well ply-autoscroll-widget'
          style={this.styles.widget}
        >
          <Icon icon='minus' click={() => this.updateSpeed(-1)} />
          <Gauge
            value={this.state.speed}
            max={newProps.max}
            width={newProps.width}
            height={newProps.height}
            label={newProps.label}
          />
          <Icon icon='plus' click={() => this.updateSpeed(1)} />
        </div>
      </div>
    );
  }

}

AutoScroll.propTypes = {
}
export default AutoScroll;
