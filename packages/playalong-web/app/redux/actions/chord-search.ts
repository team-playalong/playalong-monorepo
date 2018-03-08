import {
  SET_CHORD_SEARCH_RESULTS,
  CHORD_CLICKED,
  CLEAR_CHORD_SEARCH,
} from '../constants/action-types';

export function setChordSearchResults(results) {
  return {
    type: SET_CHORD_SEARCH_RESULTS,
    payload: results,
  };
}

export function chordClicked({ chordKey }) {
  return {
    type: CHORD_CLICKED,
    payload: {
      chordKey, 
    },
  };
}

export function clearChordSearch() {
  return {
    type: CLEAR_CHORD_SEARCH,
    payload: {},
  };
}
