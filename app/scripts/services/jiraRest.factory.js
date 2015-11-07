'use strict';

angular.module('gapoMeasurementApp')
  .service('JiraRest', function($http, $base64, $rootScope) {

  $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode('oddgeir' + ':' + 'lyse1234');

  var restUrl = 'http://intra.gapo.no/rest/api/2';

  return {
    login: function(username, password) {

      $http.get(restUrl + '/user', {
        params: {
          'username': username
        },
        headers: {
          'Authorization': 'Basic ' + $base64.encode(username + ':' + password)
        }
      }).then(function(data){
        $http.defaults.headers.common.Authorization = 'Basic ' + 
      $base64.encode(username + ':' + password);
        $rootScope.isLoggedIn = true;
        return true;
      }, function(data, headers, error){
        $rootScope.isLoggedIn = false;
        return false;
      });
    },
    addMeasurement: function(newIssue) {
      return $http.post(restUrl + '/issue', newIssue);
    },
    getDefaultMeasurement: function() {
      return $http.get(restUrl + '/issue/GM-1');
    },
    getMetaMeasurement: function() {
      return $http.get(restUrl + '/issue/GM-1/editmeta');
    }
  }
});