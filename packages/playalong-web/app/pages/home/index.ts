import { HomeCtrl, PlyHome } from './home';

export default window.angular.module('PlyHome', [])
.controller('HomeCtrl', HomeCtrl)
.directive('plyHome', PlyHome);
