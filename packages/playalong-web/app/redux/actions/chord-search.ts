import {
  SET_CHORD_SEARCH_RESULTS,
} from '../constants/action-types';

export function setChordSearchResults(results) {
  return {
    type: SET_CHORD_SEARCH_RESULTS,
    payload: results,
  };
}
