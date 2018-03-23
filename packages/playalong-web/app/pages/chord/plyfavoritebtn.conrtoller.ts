import Toast from '../../services/ply-utils/toast';

PlyfavoritebtnCtrl.$inject = ['$scope', 'user', 'login'];
function PlyfavoritebtnCtrl($scope, user, login) {
  function resetValues() {
    this.favorites = undefined;
  }

  this.toggleFavorites = function() {

    if (!login.isLoggedIn()) {
      resetValues();
      return;
    }
    const params = {
      isAddFlag: !this.isFavorite,
      chordObj: {
        chordKey: this.chord.chordKey,
        artist: this.chord.artist,
        title: this.chord.title,
      },
      userKey: login.getUser().userKey,
    };
    user.addRemoveFavorites(params)
    .then(function() {
      let message;
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        message = 'favorites.ADDED_MESSAGE';
      }
      else {
        message = 'favorites.REMOVED_MESSAGE';
      }
      Toast.showToastByTranslation(message);
    });

  };

  function checkIsFavorite() {
    user.isChordFavorite(login.getUser().userKey, this.chord.$id || this.chord.chordKey)
    .then(function(isFavorite) {
      this.isFavorite = !!isFavorite;
    });
  }
  function checkForChord() {
    if (!this.chord) {
      $scope.$watch(() => this.chord, function(newValue) {
      if (!!newValue) {
        newValue.chordKey = newValue.chordKey || newValue.$id;
        this.chord = newValue;
        checkIsFavorite();
      }
    });
    }
    else {
      if (this.isFavorite === undefined) {
        checkIsFavorite();
      }
    }
  }

  if (!login.isLoggedIn()) {
    $scope.$on('plyUserLoggedIn', checkForChord);
  }
  else {
    checkForChord();
  }

  $scope.$on('plyUserLoggedOut', resetValues);
  resetValues();
}

export default PlyfavoritebtnCtrl;
