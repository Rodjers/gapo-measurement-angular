'use strict';

angular.module('gapoMeasurementApp')
  .controller('SettingsCtrl', function($scope, $rootScope) {


    $scope.setEmployee = function(employeeId){
    	localStorage.setItem("employeeId", employeeId);
    }
  });
