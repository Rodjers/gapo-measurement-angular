'use strict';

angular.module	('gapoMeasurementApp', [
  'ngRoute',
  'ui.bootstrap',
  'base64',
  'ngMessages'
])
  .config(function ($routeProvider, $sceDelegateProvider) {
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
  });