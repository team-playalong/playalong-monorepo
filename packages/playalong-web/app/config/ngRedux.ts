import { chordSearchReducer } from '../redux/reducers/chord-search';
import { singleChordReducer } from '../redux/reducers/single-chord';

const __REDUX_DEVTOOLS_EXTENSION_ = window.__REDUX_DEVTOOLS_EXTENSION__ ?
	[window.__REDUX_DEVTOOLS_EXTENSION__()] : null;


ngReduxConfig.$inject = ['$ngReduxProvider'];
function ngReduxConfig($ngReduxProvider) {
	$ngReduxProvider.createStoreWith({
		chordSearch: chordSearchReducer,
		singleChord: singleChordReducer,

	},
	[],
	__REDUX_DEVTOOLS_EXTENSION_);
}

export default ngReduxConfig;
