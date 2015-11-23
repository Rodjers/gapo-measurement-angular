'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $mdDialog, $http, $base64, Camera, JiraRest, $rootScope, UtilityService, $mdToast, $document) {

    if ($rootScope.rootMeasurement != undefined) {
      $scope.currentIssue = angular.copy($rootScope.rootMeasurement);
      setEmployee($scope.currentIssue)
    } else if ($scope.currentIssue == undefined) {
      init();
    };

    $scope.filter = {
      savingMeasurement: false
    };

    function setEmployee(issue) {
      issue.fields.customfield_10308.id = localStorage.getItem("employeeId");
    };

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
    };

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
              }, $scope.currentIssue.key).then(function(imageURI) {
                $mdDialog.hide();
                $scope.showToast("Bilde lagt til");
              }, function(err) {
                console.err(err);
                $mdDialog.hide();
                $scope.showToast("Noe gikk galt under lagring av bilde");
              });
            } else {
              alert("Lagre måltakningen før du legger til bilde");
            }
          };
        }]
      });
    };

    $scope.showToast = function(message) {
      $mdToast.show(
        $mdToast.simple()
        .content(message)
        .parent($document[0].querySelector('#saveButton'))
        .position("bottom right")
        .hideDelay(3000)
      );
    };

    $scope.showCustomToast = function(message) {
    $mdToast.show({
      controller: 'ToastCtrl',
      template: '<md-toast>' +
      '<span flex>' + message + '</span>' +
      '</md-toast>',
      parent : $document[0].querySelector('#toastBase'),
      hideDelay: 2000,
      position: "top right"
    });
  };

    $scope.addMeasurement = function(currentIssue) {

      JiraRest.addMeasurement(currentIssue).then(function(response) {
          $scope.filter.savingMeasurement = true;
          $scope.currentIssue.id = response.data.id;
          $scope.currentIssue.key = response.data.key;
          JiraRest.startMeasurement($scope.currentIssue.id).then(function(response) {

          }, function(response) {
            $scope.filter.savingMeasurement = false;
            $scope.showToast("Måltakning lagret");
          });
        },
        function(data) {
          $scope.filter.savingMeasurement = false;
          $scope.showToast("Noe gikk galt under lagring av mål");
          console.log(data);
        });
    };

    $scope.updateMeasurement = function(issue) {
      $scope.filter.savingMeasurement = true;
      JiraRest.updateMeasurement(issue).then(function(response) {
        $scope.filter.savingMeasurement = false;
        $scope.showCustomToast("Måltakning lagret");
      }, function(response) {
        console.log(response);
        $scope.filter.savingMeasurement = false;
        $scope.showToast("Noe gikk galt under lagring av mål");
      })
    };
  });
