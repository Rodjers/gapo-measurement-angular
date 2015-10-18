'use strict';

angular.module('gapoDummyBackendApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Register',
      'link': '/'
    },
    {
      'title': 'List',
      'link': '/list'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });