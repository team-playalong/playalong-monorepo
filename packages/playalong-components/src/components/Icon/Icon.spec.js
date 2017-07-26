import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyIcon from './Icon';

describe('PlyIcon Component', () => {
  let wrapper;
  const props = {
    icon: 'test.svg',
    click: jest.fn(),
    tooltip: 'Hello There',
  };



  beforeEach(() => {
    wrapper = shallow(<PlyIcon {...props} />);
  });

  test('Should always be true', () => {
    expect(true).toBe(true);
  });

  test('BtnIcon should have an icon property', () => {
    expect(wrapper.childAt(0).props().name).toBe(props.icon);
  });

  test('BtnIcon should respond to click events', () => {
    const ev = {};
    wrapper.simulate('click', ev);
    expect(props.click.mock.calls[0][0]).toBe(ev);
  });

  test('BtnIcon have a tooltip', () => {
    expect(wrapper.find('[data-tip]').props()['data-tip']).toBe(props.tooltip);
  });

  test('Icon should support flags', () => {
    props.flag = 'il';
    wrapper = shallow(<PlyIcon {...props} />).childAt(0);

    expect(wrapper.hasClass('flag-icon-il')).toBe(true);
  });

  test('Snapshot testing', () => {
    const tree = renderer.create(<PlyIcon {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
