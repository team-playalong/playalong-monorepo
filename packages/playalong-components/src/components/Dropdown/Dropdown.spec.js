import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyImage from '../Image';

let wrapper;
const props = {
  src: 'www.image.com',
};

describe('Spinner Component', () => {
  beforeEach(() => {
    wrapper = shallow(<PlyImage {...props} />);
  });

  test('Should have a source', () => {
    expect(wrapper.props()['data-src']).toBe(props.src);
  });
});
