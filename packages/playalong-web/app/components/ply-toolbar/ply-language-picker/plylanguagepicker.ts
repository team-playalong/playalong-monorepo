import * as angular from 'angular';
LanguageModalDialogController.$inject = [
  '$mdDialog', '$translate', '$rootScope', 'PlyStorage',
];
export function LanguageModalDialogController($mdDialog, $translate, $rootScope, PlyStorage) {

  this.languages = [
    {
      locale: 'he',
      label: 'עברית',
      flag: 'il',
    },
    {
      locale: 'en',
      label: 'English',
      flag: 'us',
    },
  ];

  this.changeLanguage = function(locale) {
    if (locale) {
      $translate.use(locale);
      PlyStorage.set('locale', locale);
      $rootScope.app = {
        locale,
        dir: locale === 'he' ? 'rtl' : 'ltr',
      };
      $rootScope.$broadcast('ply_dirChanged');
    }
    this.cancel();
  };
  this.hide = function() {
    $mdDialog.hide();
  };
  this.cancel = function() {
    $mdDialog.cancel();
  };
  this.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

PlylanguagepickerCtrl.$inject = [
  '$scope', '$mdDialog', '$mdMedia', '$rootScope',
];
export function PlylanguagepickerCtrl($scope, $mdDialog, $mdMedia, $rootScope) {
  this.getFlagClass = function() {
    let res = 'il';
    if ($rootScope.app && $rootScope.app.locale === 'en') {
      res = 'us';
    }

    return res;
  };

  this.showLanguageModal = function(ev) {
    $mdDialog.show({
      controller: 'LanguageModalDialogController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/components/ply-toolbar/ply-language-picker/language-picker-modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $mdMedia('sm') && this.customFullscreen,
    });

    $scope.$watch(function() {
      return $mdMedia('sm');
    }, function(sm) {
      this.customFullscreen = (sm === true);
    });
    };
}
