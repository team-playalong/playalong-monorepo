import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RadioButtons from 'playalong-components/lib/components/RadioButtons';
import PlyButton from 'playalong-components/lib/components/Button';
import { func } from 'prop-types';
import TextInput from 'playalong-components/lib/components/TextInput';
import THEME from '../../helpers/theme';

class PlyChordSearchCard extends React.Component {

  constructor(props) {
    super(props);

    this.searchInputChanged = this.searchInputChanged.bind(this);
    this.radioButtonChanged = this.radioButtonChanged.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.searchFormSubmitted = this.searchFormSubmitted.bind(this);
  }

  componentWillMount() {
    this.setState({
      searchBy: 'artist',
      searchInput: '',
    });
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
      flex: '1',
      paddingBottom: '10px',
    },
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={THEME}>
          <Card>
            <CardHeader
              title="Find Your Song"
            />
            <CardText>
              <form
                name="chordSearchForm"
                style={this.styles.form}
                noValidate
                onSubmit={this.searchFormSubmitted}>

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
            </CardText>
          </Card>

      </MuiThemeProvider>

    );
  }
}

PlyChordSearchCard.propTypes = {
  onChordSearchClicked: func,
}

export default PlyChordSearchCard;
