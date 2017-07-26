import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyToggle from './Toggle';

let wrapper;
const props = {
  label: 'Hello From Toggle',
  defaultToggled: true,
};

describe('Toggle Component', () => {
  beforeEach(() => {
    wrapper = shallow(<PlyToggle {...props} />);
  });

  test('should be true', () => {
    // console.log(wrapper.html());
    expect(true).toBe(true);
  });


  // https://github.com/callemall/material-ui/issues/5354
  test.skip('Snapshot testing', () => {

    const tree = renderer.create(<PlyToggle
      {...props}  />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
