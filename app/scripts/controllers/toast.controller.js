'use strict';

angular.module('gapoMeasurementApp')
  .controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});