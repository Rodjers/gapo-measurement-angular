'use strict';

angular.module('gapoMeasurementApp')
  .controller('SettingsCtrl', function($scope, $rootScope) {

    $rootScope.showRefresh = false;

    $scope.setEmployee = function(employeeId){
    	localStorage.setItem("employeeId", employeeId);
    }
  });
