import { chordComponent, ChordCtrl } from './chord';
import plyFavoriteBtn from './plyfavoritebtn';
import PlyfavoritebtnCtrl from './plyfavoritebtn.conrtoller';

export default window.angular.module('PlyChord', [
])
	.controller('ChordCtrl', ChordCtrl)
	.controller('PlyfavoritebtnCtrl', PlyfavoritebtnCtrl)
	.component('plyFavoriteBtn', plyFavoriteBtn)
	.component('plyChord', chordComponent);
