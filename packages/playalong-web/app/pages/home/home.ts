import Spinner from '../../services/spinner.service';
import ChordSearchModel from './chord-search.model';
import { setChordSearchResults, clearChordSearch } from '../../redux/actions/chord-search';

enum SearchByOptions {
  ARTIST = 'artist',
  TITLE = 'title',
}

function PlyHome() {
  return {
    templateUrl: './app/pages/home/home.template.html',
    controller: 'HomeCtrl',
    controllerAs: 'home',
  };
}

class HomeCtrl {
  public searchByOptions;
  public searchConfig;
  public searchResults;
  public resultMessage;
  public plyOnChange;
  public Spinner;
  public ChordSearchModel;
  public store;
  public setChordSearchResults;
  public goToChordPage;

  constructor(
    private $rootScope, private chords, public $translate,
    public $q, private $ngRedux,
  ) {
    this.Spinner = new Spinner();
    this.ChordSearchModel = ChordSearchModel;
    // map state / dispath to this
		$ngRedux.connect(null, { setChordSearchResults })(this);
		this.$ngRedux = $ngRedux;
    this.store = $ngRedux;
    this.goToChordPage = $rootScope.goToChordPage;
  }

  $onInit() {
    this.$rootScope.currPage = 'home.PAGE_TITLE';

    // Workaround due to translations
    setTimeout(() => {
      const elem = document.querySelector('md-select-value > span');
      if (!!elem) {
        elem.textContent = 'Song Name';
      }

    }, 200);

    this.$rootScope.$on('$stateChangeSuccess',

      (event, toState, toParams, fromState, fromParams) => {
        if (toState.title) {
          this.$rootScope.currPage = toState.title;
        }
    });

    this.$ngRedux.dispatch(clearChordSearch());

    this.chords.getNewestChords(50)
    .then(this.setChordSearchResults);
  }

  texts = {
    title: 'Find Your Song',
  };

  formatResultMessage = () => {
    return new Promise((resolve, reject) => {
      const searchResults = this.$ngRedux.getState().chordSearch.results;
      let toTranslate;
      let manyResults;
      if (!searchResults || !searchResults.length) {
        toTranslate = 'home.EMPTY_RESULT_MESSAGE';
      }
      else if (searchResults && searchResults.length === 1) {
        toTranslate = 'home.SINGLE_RESULT_MESSAGE';
      }
      else if (searchResults && searchResults.length > 1) {
        manyResults = true;
        toTranslate = 'home.MANY_RESULT_MESSAGE';
      }
      this.$translate([toTranslate])
      .then(translations => {
        let res = translations[toTranslate];
        if (manyResults && res.indexOf('{numResults}') !== -1) {
          res = res.replace('{numResults}', searchResults.length);
        }
        resolve(res);
      });
    });
  }

  handleChordResults = results => {
    if (results && results.length) {
      this.searchResults = results;
    }
    this.chordsFinallyHandler();
  }

  chordsFinallyHandler = () => {
    this.formatResultMessage()
    .then(message => {
      this.resultMessage = message;

      this.Spinner.stop();
    });
  }

  uppercaseFirstLetter = str => str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  searchChords = ({
    searchBy = SearchByOptions.ARTIST,
    searchInput = '',
    numAttempts = 1,
  }) => {
    if (numAttempts > 2) { return; }
    this.Spinner.start();
    this.searchResults = [];
    this.chords.searchChordsBy(searchBy, searchInput)
      .then(this.setChordSearchResults)
      .then(this.chordsFinallyHandler)
      .catch(error => {
        // Try searching with an upper case for the first letter of each word
        if (numAttempts < 2) {
          const searchInputFormatted = (this.uppercaseFirstLetter(searchInput));
          this.searchChords({ searchBy, searchInput: searchInputFormatted, numAttempts: numAttempts + 1 });
        }
        else {
          this.searchResults = [];
          console.warn(error);
          this.chordsFinallyHandler();
        }

      });
  }
}
HomeCtrl.$inject = [
  '$rootScope', 'chords', '$translate', '$q', '$ngRedux',
];

export { PlyHome, HomeCtrl };
