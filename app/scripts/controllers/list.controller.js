'use strict';

angular.module('gapoMeasurementApp')
  .controller('ListCtrl', function ($scope, $http) {

    $scope.measurements = [];

    $scope.getMeasurements = function() {
      $http.get('https://gapo-dummy-backend.herokuapp.com/api/measurements').success(function(data){
        $scope.measurements = data;
      })
    }

    $scope.getMeasurements();
    });
