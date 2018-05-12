import React from 'react';
import { shallow } from 'enzyme';

import FavoriteBtn from './FavoriteBtn';

let wrapper;
const props = {
  isFavorite: true,
};

beforeEach(() => {
  wrapper = shallow(<FavoriteBtn {...props} />);
});

// TODO - stablize
test('should have the correct icon based on isFavorite', () => {
  const icon = wrapper.children().first();
  expect(icon.props().icon).toBe('heart');
});
