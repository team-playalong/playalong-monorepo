// Third Parties
import * as angular from 'angular';
import  'angular-material';
import '@uirouter/angularjs';
import 'angularfire';
import 'angular-translate';
import './utils/angular-polyfills';
import 'textangular';
import 'textangular/dist/textAngular-sanitize';
import 'angular-translate-interpolation-messageformat';
import 'angular-translate-loader-static-files';
import 'angular-material-icons';
import 'angular-ui-bootstrap';
import 'angular-local-storage';
import 'ng-redux';

// Modules
import PlyToolbar from './components/ply-toolbar';
import PlyUtils from './services/ply-utils';
import PlySidebar from  './components/ply-sidebar/ply-sidebar.component';
import  PlyHome from './pages/home';
import  PlyChord from './pages/chord';
import  PlyWeeklyChart from './pages/ply-weekly-chart';
import  PlyBuilder from './pages/builder';
import PlyFavorites from './pages/favorites';
import PlyTuner from './pages/tuner';
import  PlyAdmin from './pages/admin';

// React
import  PlyReact from './react/ply-react.module';

// CSS
import 'angular-material/angular-material.css';
import 'angular-material-icons/angular-material-icons.css';
import 'font-awesome/css/font-awesome.css';
import 'textangular/dist/textAngular.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../assets/styles/main.scss';

// Config
import RouteConfig from './config/config.route';
import configThemes from './config/config.themes';
import { wysiwygConfig, translateConfig, sceConfig, runConfig } from './config/config.run';
import configNgRedux from './config/ngRedux';
import './config/sentry.config';

// Controllers
import main from './main';

// Components
import ChordResult from './components/chord-result/chord-result.component';

// Directives
import compile from './directives/compile';

// Services
import PlyFirebase from './services/PlyFirebase.service';
import loginSrv from './services/login.service';
import chords from './services/chords.service';
import PlyNotifier from './services/ply-notifier.service';

import user from './services/user.service';

angular.module('playalongWebApp', [
  'ngMaterial',
  'ui.router',
  'firebase',
  'pascalprecht.translate',
  'textAngular',
  PlyToolbar.name,
  PlyUtils.name,
  PlySidebar.name,
  PlyHome.name,
  PlyChord.name,
  PlyBuilder.name,
  PlyWeeklyChart.name,
  PlyFavorites.name,
  PlyTuner.name,
  PlyAdmin.name,

  PlyReact.name,

  'ngMdIcons',
  'ui.bootstrap',
  'ngAnimate',
  'LocalStorageModule',
  'ngRedux',
])
.component('chordResult', ChordResult)
.directive('compile', compile)
.controller('MainCtrl', main)
.service('PlyFirebase', PlyFirebase)
.service('user', user)
.service('login', loginSrv)
.service('chords', chords)
.service('PlyNotifier', PlyNotifier)
.config(RouteConfig)
.config(configThemes)
.config(wysiwygConfig)
.config(translateConfig)
.config(sceConfig)
.config(configNgRedux)
.run(runConfig);
