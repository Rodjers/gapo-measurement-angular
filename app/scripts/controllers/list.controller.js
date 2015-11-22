'use strict';

angular.module('gapoMeasurementApp')
  .controller('ListCtrl', function($scope, $http, JiraRest, $location, $rootScope) {

    $scope.measurements = [];

    $scope.searchInProgress = {
      fields: {
        customfield_10308: {
          id: localStorage.getItem("employeeId")
        },
        status: {
          name: "Måler"
        }
      }
    };
    $scope.searchOpen = {
      fields: {
        customfield_10308: {
          id: localStorage.getItem("employeeId")
        },
        status: {
          name: "Open"
        }
      }
    };

    JiraRest.getMeasurements().then(function(response) {
      $scope.measurements = angular.copy(response.data.issues);
    }, function(response) {

    });

    $scope.chooseMeasurement = function(index){
    	$rootScope.rootMeasurement = angular.copy($scope.measurements[index]);
    	$location.path('/');
    }
  });
