import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import { chordClicked } from '../../../redux/actions/chord-search';

import THEME from '../../helpers/theme';
import ChordResult from '../chord-result/chord-result';

function PlyChordResultList({ chords = [], onChordClicked }) {
  const ChordResultListComp = styled.div`
  
  `;
  
  function renderChordResult(chord, i) {
    return (
      <ChordResult
      key={chord.chordKey + i}
      chord={chord}
      click={onChordClicked}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChordClicked: chord => {     
      dispatch(chordClicked(chord));
    }
  }
}

PlyChordResultList.propTypes = {
  chords: array,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlyChordResultList);
