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


      $rootScope.employees = [];

      JiraRest.getMetaMeasurement().then(function(response) {
        $rootScope.employees = angular.copy(response.data.fields.customfield_10308.allowedValues);
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
      if($scope.currentIssue.key){
        Camera.getPicture(null, $scope.currentIssue.key).then(function(imageURI) {
        }, function(err) {
          console.err(err);
        });
      }
      else {
        alert("Lagre måltakningen før du legger til bilde");
      }

      
    };

    $scope.addMeasurement = function(currentIssue) {
      JiraRest.addMeasurement(currentIssue).then(function(response) {

          $scope.currentIssue.id = response.data.id;
          $scope.currentIssue.key = response.data.key;
          JiraRest.startMeasurement($scope.currentIssue.id).then(function(response){

          }, function(response) {
          });
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
