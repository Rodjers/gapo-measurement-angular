'use strict';

angular.module	('gapoDummyBackendApp', [
  'ngRoute',
  'ui.bootstrap',
  'base64'
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
      $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://localhost:8000']);
  });