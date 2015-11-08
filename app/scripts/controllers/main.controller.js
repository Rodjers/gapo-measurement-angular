'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $http, $base64, Camera, JiraRest, $rootScope, UtilityService) {

    if ($rootScope.rootMeasurement != undefined) {
      $scope.currentIssue = angular.copy($rootScope.rootMeasurement);
    }
    else if ($scope.currentIssue == undefined) {
      init();
    }

    function init() {
      $scope.currentIssue = {
        fields: {}
      }


      $scope.employees = [];

      JiraRest.getMetaMeasurement().then(function(response) {
        $scope.employees = angular.copy(response.data.fields.customfield_10308.allowedValues);
        JiraRest.getDefaultMeasurement().then(function(response) {
          $scope.currentIssue = UtilityService.trimIssue(response.data);
          $scope.currentIssue.id = null;
          $scope.currentIssue.key = null;
        }, function(response) {
          //Error
        });
      }, function(response) {
        console.log("Could not get default measurement");
      });
    };

    $scope.init = function() {
      init();
      }

    $scope.login = function(username, password) {
      JiraRest.login(username, password);
    };

    $scope.getPhoto = function() {
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
      }, function(err) {
        console.err(err);
      });
    };

    $scope.addMeasurement = function(currentIssue) {
      JiraRest.addMeasurement(currentIssue).then(function(response) {

          $scope.currentIssue.id = response.data.id;
          $scope.currentIssue.key = response.data.key;
        },
        function(data) {
          console.log(data);
          console.log("Fail");
        });
    }
    $scope.updateMeasurement = function(issue) {
      JiraRest.updateMeasurement(issue).then(function(response) {
        console.log(response);
      }, function(response){
        console.log(response);
      });
    }
  });
