import * as React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TextSlider from './TextSlider';

describe('TextSlider', () => {

  let wrapper;
  const props = {
    min: 12,
    max: 20,
    size: 18,
    id: 'mySlider',
  };

  beforeEach(() => {
    wrapper = shallow(<TextSlider {...props} />);
  });

  test('Snapshot testing', () => {
    const tree = renderer.create(<TextSlider {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
