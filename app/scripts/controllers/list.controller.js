'use strict';

angular.module('gapoMeasurementApp')
  .controller('ListCtrl', function($scope, $http, JiraRest) {

    $scope.measurements = [];

    JiraRest.getMeasurements().then(function(response) {
      $scope.measurements = angular.copy(response.data.issues);
    }, function(response) {

    });
  });
