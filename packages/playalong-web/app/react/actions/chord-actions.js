import {
  SEARCH_CHORDS,
} from '../constants/ActionTypes';

export function chordSearchClicked({ searchBy, searchInput }) {
  return {
    type: SEARCH_CHORDS,
    payload: { searchBy, searchInput },
  };
}
