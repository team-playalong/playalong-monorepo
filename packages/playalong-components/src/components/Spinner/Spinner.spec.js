import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Spinner from './Spinner';

let wrapper;
const props = {
  isActive: false,
};

describe('Spinner Component', () => {
  beforeEach(() => {
    wrapper = shallow(<Spinner {...props} />).find('CircularProgress').first();
  });

  test('Should be hidden if not active', () => {
    expect(wrapper.props().style.display).toBe('none');
  });

  test.skip('Snapshot testing', () => {
    const tree = renderer.create(<Spinner
      isActive={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
