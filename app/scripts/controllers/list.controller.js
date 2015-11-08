'use strict';

angular.module('gapoMeasurementApp')
  .controller('ListCtrl', function($scope, $http, JiraRest, $location, $rootScope) {

    $scope.measurements = [];

    JiraRest.getMeasurements().then(function(response) {
      $scope.measurements = angular.copy(response.data.issues);
    }, function(response) {

    });

    $scope.chooseMeasurement = function(index){
    	$rootScope.rootMeasurement = angular.copy($scope.measurements[index]);
    	$location.path('/');
    }
  });
