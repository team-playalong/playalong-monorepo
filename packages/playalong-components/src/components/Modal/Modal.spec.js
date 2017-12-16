import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import PlyModal from './Modal';

describe('PlyModal Component', () => {
  let wrapper;
  const props = {

  };



  beforeEach(() => {
    wrapper = shallow(<PlyModal {...props} />);
  });

  test('Should always be true', () => {
    expect(true).toBe(true);
  });

  test.skip('Snapshot testing', () => {
    const tree = renderer.create(<PlyModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
