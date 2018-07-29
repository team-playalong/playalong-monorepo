import React from 'react';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import { chordClicked } from '../../../redux/actions/chord-search';

import THEME from '../../helpers/theme';
import ChordResult from '../chord-result/chord-result';

function PlyChordResultList({ chords = [], onChordClicked }) {
	const ChordResultListComp = styled.div`
		hr {
			border-top: 1px solid #eee;
			height: 0;
		}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onChordClicked: chord => {
      dispatch(chordClicked(chord));
    }
  }
}

PlyChordResultList.propTypes = {
	chords: array,
	onChordClicked: func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlyChordResultList);
