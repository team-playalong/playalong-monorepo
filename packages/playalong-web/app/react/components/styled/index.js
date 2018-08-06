import 'ngreact';
import { react2angular } from 'react2angular';

import PlyTitle, { props as PlyTitleProps } from './Title';

export default window.angular.module('PlyStyled', [
  'react',
])
.component('plyTitle', react2angular(PlyTitle, PlyTitleProps));
