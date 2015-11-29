'use strict';

angular.module('gapoMeasurementApp')
  .controller('MainCtrl', function($scope, $mdDialog, $http, $base64, Camera, JiraRest, $rootScope, UtilityService, $mdToast, $document) {

    if ($rootScope.rootMeasurement != undefined) {
      $scope.currentIssue = angular.copy($rootScope.rootMeasurement);
      if ($rootScope.rootMeasurement.fields.customfield_10401){
        $scope.currentIssue.fields.customfield_10401 = true;
      }
      else {
         $scope.currentIssue.fields.customfield_10401 = false;       
      }
      if ($rootScope.rootMeasurement.fields.customfield_10403){
        $scope.currentIssue.fields.customfield_10403 = true;
      }
      else {
         $scope.currentIssue.fields.customfield_10403 = false;       
      }
      if ($rootScope.rootMeasurement.fields.customfield_10404){
        $scope.currentIssue.fields.customfield_10404 = true;
      }
      else {
         $scope.currentIssue.fields.customfield_10404 = false;       
      }
      if ($rootScope.rootMeasurement.fields.customfield_10406){
        $scope.currentIssue.fields.customfield_10406 = true;
      }
      else {
         $scope.currentIssue.fields.customfield_10406 = false;       
      }
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

    $scope.switchValue = function(value) {
      if (value) {
        return "Ja";
      }
      else {
        return "Nei";
      }
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
                $scope.showCustomToast("Bilde lagt til");
              }, function(err) {
                console.err(err);
                $mdDialog.hide();
                $scope.showCustomToast("Noe gikk galt under lagring av bilde");
              });
            } else {
              alert("Lagre måltakningen før du legger til bilde");
            }
          };
        }]
      });
    };

    $scope.showCustomToast = function(message) {
    $mdToast.show({
      controller: 'ToastCtrl',
      template: '<md-toast>' +
      '<span flex>' + message + '</span>' +
      '</md-toast>',
      parent : $document[0].querySelector('#toastBase'),
      hideDelay: 2000,
      position: "bottom right"
    });
  };

    $scope.addMeasurement = function(currentIssue) {

      JiraRest.addMeasurement(currentIssue).then(function(response) {
          $scope.filter.savingMeasurement = true;
          $scope.currentIssue.id = response.data.id;
          $scope.currentIssue.key = response.data.key;
          JiraRest.startMeasurement($scope.currentIssue.id).then(function(response) {
            $scope.filter.savingMeasurement = false;
            $scope.showCustomToast("Måltakning lagret");
          }, function(error) {
          $scope.filter.savingMeasurement = false;
          $scope.showCustomToast("Noe gikk galt under lagring av mål");            
          });
        },
        function(error) {
          $scope.filter.savingMeasurement = false;
          $scope.showCustomToast("Noe gikk galt under lagring av mål");
          console.log(error);
        });
    };

    $scope.updateMeasurement = function(issue) {
      $scope.filter.savingMeasurement = true;
      JiraRest.updateMeasurement(issue).then(function(response) {
        if(issue.fields.status.name == "Open"){
          JiraRest.startMeasurement(issue.id).then(function(response) {
            $scope.filter.savingMeasurement = false;
            $scope.showCustomToast("Måltakning lagret");
          }, function(error) {
            console.log(error);
            $scope.filter.savingMeasurement = false;
            $scope.showCustomToast("Noe gikk galt under lagring av mål"); 
          });
        }
        else {
          $scope.filter.savingMeasurement = false;
          $scope.showCustomToast("Måltakning lagret");          
        }
      }, function(error) {
        console.log(error);
        $scope.filter.savingMeasurement = false;
        $scope.showCustomToast("Noe gikk galt under lagring av mål");
      })
    };
  });
