'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $http, $base64, Camera, JiraRest, $rootScope, UtilityService) {

    if ($rootScope.rootMeasurement != undefined) {
      $scope.currentIssue = angular.copy($rootScope.rootMeasurement);
      setEmployee(issue)
    }
    else if ($scope.currentIssue == undefined) {
      init();
    }

    function setEmployee(issue) {
      issue.fields.customfield_10308.id = localStorage.getItem("employeeId");
    }

    function init() {
      var employeeId = localStorage.getItem("employeeId");
      $scope.currentIssue = {
        fields: {
          customfield_10308: {
            id: employeeId
          },
          project: {
            id: "10100"
          },
          issuetype: {
            id: "10200"
          }
        }
      }
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
