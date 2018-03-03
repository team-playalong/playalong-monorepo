import { chordSearchReducer } from '../redux/reducers/chord-search';

ngReduxConfig.$inject = ['$ngReduxProvider'];
function ngReduxConfig($ngReduxProvider) {
	$ngReduxProvider.createStoreWith({
		chordSearch: chordSearchReducer,
	});
}

export default ngReduxConfig;
