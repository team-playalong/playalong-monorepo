import {
	CHORD_CLICKED, CLEAR_CHORD_SEARCH,
} from '../constants/action-types';

export function singleChordReducer(state = { currentChordId: null }, action) {
	switch (action.type) {
		case CHORD_CLICKED:
			return Object.assign({ }, state, { 
				currentChordId: action.payload.chordKey, 
			});
		case CLEAR_CHORD_SEARCH:
			return {};
		default:
		return state;
	}
}
