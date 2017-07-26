import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import RadioButtons from './RadioButtons';

let wrapper;
const props = {
  inputs: [
    { label: 'l1', value: 'v1' },
    { label: 'l2', value: 'v2' },
  ],
  radioName: 'myRadio',
};

beforeEach(() => {
  wrapper = shallow(<RadioButtons {...props} />);
});

test('Snapshot testing', () => {
  const tree = renderer.create(<RadioButtons
    inputs={[
      { label: 'l1', value: 'v1' },
      { label: 'l2', value: 'v2' },
    ]}
    radioName='myRadio' />).toJSON();

  expect(tree).toMatchSnapshot();
});
