'use strict';

angular.module('gapoMeasurementApp')
  .controller('ListCtrl', function($scope, $http, JiraRest, $location, $rootScope, $filter) {

    $scope.filter = {
      fetchingList: true
    };

    $rootScope.showRefresh = true;

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


    $scope.loadMeasurements = function() {
      $scope.filter.fetchingList = true;
    JiraRest.getMeasurements().then(function(response) {
      $scope.filter.fetchingList = false;
      $scope.futureMeasurements = angular.copy($filter('filter')(response.data.issues, $scope.searchOpen));
      $scope.currentMeasurements = angular.copy($filter('filter')(response.data.issues, $scope.searchInProgress));
    }, function(response) {
      $scope.filter.fetchingList = false;

    });
    }

    $scope.loadMeasurements();

    $rootScope.reloadMeasurements = function() {
      $scope.loadMeasurements();
    };
    $scope.chooseFutureMeasurement = function(index){
    	$rootScope.rootMeasurement = angular.copy($scope.futureMeasurements[index]);
    	$location.path('/');
    };

    $scope.chooseCurrentMeasurement = function(index){
      $rootScope.rootMeasurement = angular.copy($scope.currentMeasurements[index]);
      $location.path('/');
    }
  });
