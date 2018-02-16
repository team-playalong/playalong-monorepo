import * as React from 'react';
import { shallow } from 'enzyme';

import BtnIcon from './BtnIcon';

let wrapper;
const props = {
  icon: 'test.svg',
  click: jest.fn(),
  tooltip: 'Hello There',
};

beforeEach(() => {
  wrapper = shallow(<BtnIcon {...props} />).childAt(0);
});

test.skip('Should always be true', () => {
  expect(true).toBe(true);
});

test.skip('BtnIcon should have an icon property', () => {
  expect(wrapper.props().name).toBe(props.icon);
});

test.skip('BtnIcon should respond to click events', () => {
  const ev = {};
  wrapper.simulate('click', ev);
  expect(props.click.mock.calls[0][0]).toBe(ev);
});

test.skip('BtnIcon have a tooltip', () => {
  expect(wrapper.props()['data-tip']).toBe(props.tooltip);
});
