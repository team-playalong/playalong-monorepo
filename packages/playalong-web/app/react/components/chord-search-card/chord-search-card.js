import React from 'react';
import PlyButton from 'playalong-components/lib/components/Button';
import { func } from 'prop-types';
import TextInput from 'playalong-components/lib/components/TextInput';

class PlyChordSearchCard extends React.Component {

  constructor(props) {
    super(props);
		this.state = {
      searchBy: 'artist',
      searchInput: '',
    };
    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.radioButtonChanged = this.radioButtonChanged.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this);
  }

  searchFormSubmitted(e) {
    e.preventDefault();
    this.searchButtonClicked();
  }

  radioButtonChanged(e) {
    this.setState({ searchBy: e.target.value });
  }

  searchInputChanged(searchInput) {
    this.setState({ searchInput });
  }

  radioButtonInputs = [
    {
      label: 'Artist',
      value: 'artist',
    },
    {
      label: 'Title',
      value: 'title',
    },
  ]

  searchButtonClicked() {

    if (typeof this.props.onChordSearchClicked === 'function') {
      this.props.onChordSearchClicked({
        searchBy: this.state.searchBy,
        searchInput: this.state.searchInput,
      });
    }
  }

  styles = {
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexFlow: 'row wrap',
		},
    radioButtons: {
      flex: '1',
      paddingBottom: '10px',
    },
    radioButton: {
      margin: '0 10px',
    },
    searchInput: {
      flex: '4',
      paddingBottom: '10px',
    },
    searchButton: {
      paddingBottom: '10px',
    },
	}

  render() {
		return (
			<div>
				<h2>Find Your Song</h2>
				<form
					name="chordSearchForm"
					style={this.styles.form}
					noValidate
					onSubmit={this.searchFormSubmitted}
				>
					<span style={this.styles.radioButtons}>
						<input
							style={this.styles.radioButton}
							name="searchBy"
							id="artist"
							value="artist"
							type="radio"
							onChange={this.radioButtonChanged}
						/>
						<label htmlFor="artist">Artist</label>

						<input
							style={this.styles.radioButton}
							name="searchBy"
							id="title"
							type="radio"
							value="title"
							onChange={this.radioButtonChanged}
						/>
						<label htmlFor="title">Title</label>

					</span>
					<span style={this.styles.searchInput}>
						<TextInput
							name="searchInput"
							placeholder={'...'}
							onChange={this.searchInputChanged}
						/>
					</span>
					<span style={this.styles.searchButton}>
					<PlyButton
						label='Go'
						click={this.searchButtonClicked}
					/>
					</span>
				</form>
			</div>
    );
  }
}

PlyChordSearchCard.propTypes = {
  onChordSearchClicked: func,
}

export default PlyChordSearchCard;
