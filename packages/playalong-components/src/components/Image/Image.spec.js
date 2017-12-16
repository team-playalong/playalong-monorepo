import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyImage from './Image';

let wrapper;
const props = {
  src: 'www.image.com',
};

describe('Spinner Component', () => {
  beforeEach(() => {
    wrapper = shallow(<PlyImage {...props} />);
  });

  test.skip('Should have a source', () => {
    expect(wrapper.props().src).toBe(props.src);
  });

  test.skip('Snapshot testing', () => {
    const tree = renderer.create(<PlyImage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
