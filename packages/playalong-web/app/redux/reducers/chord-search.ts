import { SEARCH_CHORDS } from '../constants/action-types';

export function chordSearchReducer(state = {}, action) {
	switch (action.type) {
		case SEARCH_CHORDS:
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}
