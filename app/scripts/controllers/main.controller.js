'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $http, $base64, Camera, JiraRest) {

    if ($scope.currentIssue == undefined) {
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
          $scope.currentIssue.fields.customfield_10011 = angular.copy(response.data.fields.customfield_10011);
          $scope.currentIssue.fields.customfield_10013 = angular.copy(response.data.fields.customfield_10013);
          $scope.currentIssue.fields.customfield_10014 = angular.copy(response.data.fields.customfield_10011);
          $scope.currentIssue.fields.customfield_10015 = angular.copy(response.data.fields.customfield_10011);
          $scope.currentIssue.fields.customfield_10300 = angular.copy(response.data.fields.customfield_10300);
          $scope.currentIssue.fields.customfield_10301 = angular.copy(response.data.fields.customfield_10301);
          $scope.currentIssue.fields.customfield_10302 = angular.copy(response.data.fields.customfield_10302);
          $scope.currentIssue.fields.customfield_10303 = angular.copy(response.data.fields.customfield_10303);
          $scope.currentIssue.fields.customfield_10304 = angular.copy(response.data.fields.customfield_10304);
          $scope.currentIssue.fields.customfield_10305 = angular.copy(response.data.fields.customfield_10305);
          $scope.currentIssue.fields.customfield_10306 = angular.copy(response.data.fields.customfield_10306);
          $scope.currentIssue.fields.customfield_10308 = angular.copy(response.data.fields.customfield_10308);
          $scope.currentIssue.fields.summary = angular.copy(response.data.fields.summary);
        }, function(response) {
          //Error
        });

        console.log(response.data);
      }, function(response) {
        console.log("Could not get default measurement");
      });
    };

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
      JiraRest.addMeasurement(currentIssue).then(function(data) {
          $scope.currentIssue = {};
        },
        function(data) {
          console.log(data);
          console.log("Fail");
        });
    }
  });
