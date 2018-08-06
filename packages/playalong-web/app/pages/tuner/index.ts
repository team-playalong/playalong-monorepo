import './AudioContextMonkeyPatch';

import { TunerCtrl, plyTuner } from './tuner.component';

export default window.angular.module('PlyTuner', [])
.controller('TunerCtrl', TunerCtrl)
.component('plyTuner', plyTuner);
