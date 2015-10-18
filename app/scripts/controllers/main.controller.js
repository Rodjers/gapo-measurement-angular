'use strict';

angular.module('gapoDummyBackendApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.newMeasurement = {};

    $scope.addMeasurement = function(newCustomer) {
      $http.post('https://gapo-dummy-backend.herokuapp.com/api/measurements', $scope.newMeasurement).success(function(data){
        $scope.newMeasurement = {};
      });
    }
  });
