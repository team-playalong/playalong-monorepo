import * as angular from 'angular';

import PlyStorage from './plyStorage.service';

export default angular.module('PlyUtils', [])
.service('PlyStorage', PlyStorage);
