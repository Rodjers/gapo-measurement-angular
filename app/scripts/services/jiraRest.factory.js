'use strict';

angular.module('gapoMeasurementApp')
  .service('JiraRest', function($http, $base64, $rootScope, UtilityService) {

  $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode('gapoapp' + ':' + '35dc4587ccb7ca37fff3366f6608be74');

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
      }).then(function(data) {
        $http.defaults.headers.common.Authorization = 'Basic ' +
          $base64.encode(username + ':' + password);
        $rootScope.isLoggedIn = true;
        return true;
      }, function(data, headers, error) {
        $rootScope.isLoggedIn = false;
        return false;
      });
    },
    addMeasurement: function(issue) {
      var newIssue = UtilityService.trimIssue(issue);
      return $http.post(restUrl + '/issue', newIssue);
    },
    getDefaultMeasurement: function() {
      return $http.get(restUrl + '/issue/GM-1');
    },
    getMetaMeasurement: function() {
      return $http.get(restUrl + '/issue/GM-1/editmeta');
    },
    getMeasurements: function() {
      return $http.get(restUrl + '/search?jql=issuetype=Garasjeport+and+status=Open+or+status=\"Måler\"');
    },
    updateMeasurement: function(issue) {
      var updateIssue = UtilityService.trimIssue(issue);
      return $http.put(restUrl + '/issue/' + issue.key, updateIssue);
    },
    startMeasurement: function(key) {
      var startIssue = {
        "transition": {
          "id": "201"
        }
      }
      return $http.post(restUrl + '/issue/' + key + '/transitions?expand=transitions.fields', startIssue);
    },
    uploadImage: function(image, key) {

      var byteCharacters = atob(image);


      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      };
      var byteArray = new Uint8Array(byteNumbers);

      var imageToPost = new Blob([byteArray], {
        type: "image/png"
      });

      var formData = new FormData();
      formData.append('file', imageToPost);

      return $http.post(restUrl + '/issue/' + key + '/attachments', formData, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'X-Atlassian-Token': 'no-check'
        }
      });
    }
  }
});
