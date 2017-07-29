import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyFab from './Fab';

let wrapper;
const props = {

};

describe('Toggle Component', () => {
  beforeEach(() => {
    wrapper = shallow(<PlyFab {...props} />);
  });

  test('should be true', () => {
    expect(true).toBe(true);
  });


  // https://github.com/callemall/material-ui/issues/5354
  test.skip('Snapshot testing', () => {

    const tree = renderer.create(<PlyFab
      {...props}  />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
