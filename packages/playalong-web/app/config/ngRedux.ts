import { chordSearchReducer } from '../redux/reducers/chord-search';

ngReduxConfig.$inject = ['$ngReduxProvider'];
function ngReduxConfig($ngReduxProvider) {
	$ngReduxProvider.createStoreWith({
		chordSearch: chordSearchReducer,

	}, [], [window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]);
}

export default ngReduxConfig;
