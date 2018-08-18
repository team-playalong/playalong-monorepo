import Spinner from './services/spinner.service';
import { Paths } from './config/config.constants';

function MainCtrl($scope, $timeout, $mdSidenav, $mdUtil, $state, login, $rootScope, $ngRedux) {
  $scope.Math = Math;
  $scope.Spinner = new Spinner();
  $scope.initCtrl = function() {
    $rootScope.paths = Paths;
    $scope.user = login.getUser();
    $rootScope.toggleSidebar = $scope.buildToggler('left');
    $scope.mainCtrlConfig = {
      alertTimeout: 3000,
    };

    $ngRedux.subscribe($rootScope.goToChordPage);
  };

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  $scope.buildToggler = navId => {
    const debounceFn = $mdUtil.debounce(function() {
      $mdSidenav(navId)
        .toggle()
        .then(function () {
          $('.ply-main-container').toggleClass('sidebar-open');
        });
    }, 0);
    return debounceFn;
  };

  $rootScope.goToChordPage = () => {
    const state = $ngRedux.getState();
    const currentChordId = (state.singleChord || {}).currentChordId || null;

    if (currentChordId) {
      $state.go('chord', { chordKey: currentChordId });
    }

  };

  $rootScope.$on('plyUserLoggedIn', (scope, data) => {
    if (window.ga && data && data.uid) {
      window.ga('set', 'userId', `data.uid_${data.firstName}_${data.lastName}`); // Set the user ID using signed-in user_id.
    }
  });

  $scope.initCtrl();
}
MainCtrl.$inject = [
    '$scope', '$timeout', '$mdSidenav', '$mdUtil',
    '$state', 'login', '$rootScope', '$ngRedux',
  ];

export default MainCtrl;
