'use strict';

angular.module	('gapoMeasurementApp', [
  'ngRoute',
  'base64',
  'ngMessages',
  'ngMaterial',
  'uiGmapgoogle-maps',
  'ngMdIcons',
  'md.data.table'
])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '700'
    });

  });
