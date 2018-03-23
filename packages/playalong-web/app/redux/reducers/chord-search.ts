import {
	SEARCH_CHORDS,
	SET_CHORD_SEARCH_RESULTS,
	CLEAR_CHORD_SEARCH,
} from '../constants/action-types';

export function chordSearchReducer(state = { results: null }, action) {
	switch (action.type) {
		case SEARCH_CHORDS:
			return Object.assign({}, state, action.payload);
		case SET_CHORD_SEARCH_RESULTS:
			return Object.assign({ }, state, { results: action.payload });
		case CLEAR_CHORD_SEARCH:
			return {};
		default:
			return state;
	}
}
