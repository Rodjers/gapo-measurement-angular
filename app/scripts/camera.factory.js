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
      }, {
        encodingType: Camera.EncodingType.PNG,
        destinationType: Camera.DestinationType.DATA_URL
      });

      return q.promise;
    }
  }
}]);