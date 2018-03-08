import { chordSearchReducer } from '../redux/reducers/chord-search';
import { singleChordReducer } from '../redux/reducers/single-chord';

ngReduxConfig.$inject = ['$ngReduxProvider'];
function ngReduxConfig($ngReduxProvider) {
	$ngReduxProvider.createStoreWith({
		chordSearch: chordSearchReducer,
		singleChord: singleChordReducer,

	}, 
	[], 
	[window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]);
}

export default ngReduxConfig;
