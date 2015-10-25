'use strict';

angular.module('gapoDummyBackendApp')
  .controller('MainCtrl', function ($scope, $http, $base64, Camera) {


  	$http.defaults.headers.common.Authorization = 'Basic ' + 
      $base64.encode('oddgeir' + ':' + 'lyse1234');

      $scope.newIssue = {
  		fields: {
  			issuetype: {
  				id: 10200
  			},
  			project: {
  				id: 10100
  			},
  			customfield_10308: {}
  		}
  	}

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };

    $scope.newMeasurement = {};

    $scope.addMeasurement = function(newCustomer) {
      $http.post('http://109.247.68.94:8080/rest/api/2/issue', $scope.newIssue).success(function(data){
        $scope.newIssue = {};
      });
    }
  });

