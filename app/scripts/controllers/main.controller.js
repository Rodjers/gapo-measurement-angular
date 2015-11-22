'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $mdDialog, $http, $base64, Camera, JiraRest, $rootScope, UtilityService) {

    if ($rootScope.rootMeasurement != undefined) {
      $scope.currentIssue = angular.copy($rootScope.rootMeasurement);
      setEmployee($scope.currentIssue)
    } else if ($scope.currentIssue == undefined) {
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

    $scope.chooseSource = function($event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: 'views/chooseSource.html',
        controller: ['$scope', '$mdDialog', 'Camera', function ChooseSourceController($scope, $mdDialog, Camera) {
          $scope.getPhoto = function(source) {
           if ($scope.currentIssue.key) {
              Camera.getPicture({
                encodingType: 1,
                destinationType: 0,
                sourceType: source
              }, $scope.currentIssue.key).then(function(imageURI) {$mdDialog.hide();}, function(err) {
                console.err(err);
                $mdDialog.hide();
              });
            } else {
              alert("Lagre måltakningen før du legger til bilde");
            }
          };
        }]
      });
    };

    $scope.addMeasurement = function(currentIssue) {
      JiraRest.addMeasurement(currentIssue).then(function(response) {

          $scope.currentIssue.id = response.data.id;
          $scope.currentIssue.key = response.data.key;
          JiraRest.startMeasurement($scope.currentIssue.id).then(function(response) {

          }, function(response) {});
        },
        function(data) {
          console.log(data);
          console.log("Fail");
        });
    }
    $scope.updateMeasurement = function(issue) {
      JiraRest.updateMeasurement(issue).then(function(response) {
        console.log(response);
      }, function(response) {
        console.log(response);
      });
    }
  });
