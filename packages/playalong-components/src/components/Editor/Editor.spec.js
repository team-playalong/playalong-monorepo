import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Editor from './Editor';

describe('Text Input', () => {

  let wrapper;
  const props = {
    label: 'My Text Input',
    value: 'My Val',
  };

  beforeEach(() => {
    wrapper = shallow(<Editor {...props} />);
  });

  test('Snapshot testing', () => {
    const tree = renderer.create(<Editor {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
