import * as angular from 'angular';
import { HomeCtrl, PlyHome } from './home';

angular.module('PlyHome', [])
.controller('HomeCtrl', HomeCtrl)
.directive('plyHome', PlyHome);
