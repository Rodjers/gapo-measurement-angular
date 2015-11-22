'use strict';

angular.module('gapoMeasurementApp').factory('Camera', ['$q', 'JiraRest', function($q, JiraRest) {

  return {
    getPicture: function(options, key) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        JiraRest.uploadImage(result, key);
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);