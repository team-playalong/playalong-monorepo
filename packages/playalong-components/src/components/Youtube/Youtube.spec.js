import * as React from 'react';
import { shallow } from 'enzyme';
import Youtube from './Youtube';

let wrapper;
const props = {
  videoId: '123',
  width: undefined,
  height: undefined,
};

describe('Youtube component', () => {
  beforeEach(() => {
    wrapper = shallow(<Youtube {...props} />);
  });
  
  test('Should have a src', () => {
    expect(wrapper.find('iframe').props()['data-src']).toContain(props.videoId);
  });
  
  test('Should have default width and height', () => {
    expect(wrapper.find('iframe').props().width).toBe(300);
    expect(wrapper.find('iframe').props().height).toBe(150);
  });
  
});
