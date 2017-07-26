import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Title from './Title';

let wrapper;
const props = {
  text: 'Hello!',
};

beforeEach(() => {
  wrapper = shallow(<Title {...props} />);
});

test('Title should render text', () => {
  expect(wrapper.html()).toContain(props.text);
});

test('Snapshot testing', () => {
  const tree = renderer.create(<Title {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
