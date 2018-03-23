import Toast from '../../services/ply-utils/toast';
import Spinner from '../../services/spinner.service';

const PlyFavorites = {

  controller: 'FavoritesCtrl',
  controllerAs: 'fav',
  template: `
    <div id="favorites"
         translate-namespace="favorites">
      <md-card layout-align="center" class="ply-search-results">
        <md-card-content>

          <div ng-if="fav.login.isLoggedIn() && !!fav.favorites">
            <h3 translate=".TITLE"></h3>
            <md-list>
              <md-list-item class="md-2-line clickable"  ng-repeat="favorite in fav.favorites track by $index" >
                <div  class="md-list-item-text"
                      ng-click="goToChordPage(favorite.chordKey)">
                  <ng-md-icon class="pull-right" ng-click="fav.removeFavorite($event, favorite)" icon="delete" size="30"></ng-md-icon>
                  <h3 ng-bind="favorite.artist"></h3>
                  <p ng-bind="favorite.title"></p>
                </div>
                <md-divider ></md-divider>
              </md-list-item>
            </md-list>
          </div>
          <div class="ply-overlay ply-relative" ng-if="!fav.login.isLoggedIn()">
            <div class="jumbotron ply-transparent text-center ply-white">
              <h1 translate=".LOGIN_TITLE"></h1>
            </div>
          </div>
          <div ng-if="fav.login.isLoggedIn() && !fav.favorites">
            <div class="jumbotron ply-transparent text-center">
              <h2 translate=".NO_FAVORITES"></h2>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  `,
};

FavoritesCtrl.$inject = [
	'login', 'user', '$rootScope', '$scope',
];
function FavoritesCtrl(login, user, $rootScope, $scope) {
  if (!!window.mixpanel) {
    window.mixpanel.track('ply_page_view_favorites');
  }

  this.removeFavorite = ($event, favorite) => {
    $event.preventDefault();
    $event.stopPropagation();
    const params = {
      isAddFlag: false,
      chordObj: {
        chordKey: favorite.chordKey,
        artist: favorite.artist,
        title: favorite.title,
      },
      userKey: login.getUser().userKey,
    };
    user.addRemoveFavorites(params)
    .then(() => {
      Toast.showToastByTranslation('favorites.REMOVED_MESSAGE');
      this.init();
    });
  };

	$rootScope.currPage = 'favorites.PAGE_TITLE';
  this.Spinner = new Spinner();
	this.init = () => {
    this.favorites = null;
		this.userModel = login.getUser();
		if (this.userModel && this.userModel.userKey) {
			this.Spinner.start();
			user.getFavorites(this.userModel.userKey)
  		.then(function(data) {
  			if (data) {
  				this.favorites = data;
  			}
        this.Spinner.stop();
  		})
      .catch(this.Spinner.stop);
		}

	};
  this.login = login;
  if (login.isLoggedIn()) {
  	this.init();
  }
  else {
  	$scope.$on('plyUserLoggedIn', this.init);
  }
}

export { FavoritesCtrl, PlyFavorites };
