'use strict';

angular.module	('gapoMeasurementApp', [
  'ngRoute',
  'ui.bootstrap',
  'base64',
  'ngMessages',
  'ngMaterial',
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
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default');

  });