import React from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'

import THEME from '../../helpers/theme';
import ChordResult from '../chord-result/chord-result';

function PlyChordResultList({ chords = [], onChordClick }) {
  const ChordResultListComp = styled.div`

  `;

  function renderChordResult(chord, i) {
    return (
      <ChordResult
        key={chord.chordKey + i}
        chord={chord}
        click={onChordClick}
      />
    );
  }

  return (
    <MuiThemeProvider muiTheme={THEME}>
      <ChordResultListComp>
        { (chords || []).map(renderChordResult) }
      </ChordResultListComp>
    </MuiThemeProvider>
  );
}

// Retrieve data from store as props
const mapStateToProps = state => {
  return {
    chords: state.chordSearch.results,
  };
};

PlyChordResultList.propTypes = {
  chords: array,
  onChordClick: func,
};

export default connect(mapStateToProps)(PlyChordResultList);
