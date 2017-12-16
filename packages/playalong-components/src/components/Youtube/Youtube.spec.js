import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Youtube from './Youtube';

let wrapper;
const props = {
  videoId: '123',
  width: undefined,
  height: undefined,
};

beforeEach(() => {
  wrapper = shallow(<Youtube {...props} />);
});

test.skip('Should have a src', () => {
  expect(wrapper.find('iframe').props().src).toContain(props.videoId);
});

test('Should have default width and height', () => {
  expect(wrapper.find('iframe').props().width).toBe(300);
  expect(wrapper.find('iframe').props().height).toBe(150);
});


test.skip('Snapshot testing', () => {
  const tree = renderer.create(<Youtube
    videoId={'123'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
