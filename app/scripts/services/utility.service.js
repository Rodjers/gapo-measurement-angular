'use strict';

angular.module('gapoMeasurementApp')
  .service('UtilityService', function() {

  return {
    trimIssue: function(fullIssue) {
      var appIssue = {
        fields: {}
      };
      appIssue.fields.customfield_10011 = angular.copy(fullIssue.fields.customfield_10011);
      appIssue.fields.customfield_10013 = angular.copy(fullIssue.fields.customfield_10013);
      appIssue.fields.customfield_10014 = angular.copy(fullIssue.fields.customfield_10014);
      appIssue.fields.customfield_10015 = angular.copy(fullIssue.fields.customfield_10015);
      appIssue.fields.customfield_10300 = angular.copy(fullIssue.fields.customfield_10300);
      appIssue.fields.customfield_10301 = angular.copy(fullIssue.fields.customfield_10301);
      appIssue.fields.customfield_10302 = angular.copy(fullIssue.fields.customfield_10302);
      appIssue.fields.customfield_10303 = angular.copy(fullIssue.fields.customfield_10303);
      appIssue.fields.customfield_10304 = angular.copy(fullIssue.fields.customfield_10304);
      appIssue.fields.customfield_10305 = angular.copy(fullIssue.fields.customfield_10305);
      appIssue.fields.customfield_10306 = angular.copy(fullIssue.fields.customfield_10306);
      appIssue.fields.customfield_10308 = angular.copy(fullIssue.fields.customfield_10308);
      if(fullIssue.fields.customfield_10401){
        appIssue.fields.customfield_10401 = [{ "value": "Ja", "id": "10301"}];
      }
      else {
        appIssue.fields.customfield_10401 = null;
      }
      if(fullIssue.fields.customfield_10403){
        appIssue.fields.customfield_10403 = [{ "value": "Ja", "id": "10303"}];
      }
      else {
        appIssue.fields.customfield_10403 = null;
      }
      if(fullIssue.fields.customfield_10404){
        appIssue.fields.customfield_10404 = [{ "value": "Ja", "id": "10304"}];
      }
      else {
        appIssue.fields.customfield_10404 = null;
      }
      if(fullIssue.fields.customfield_10406){
        appIssue.fields.customfield_10406 = [{ "value": "Ja", "id": "10306"}];
      }
      else {
        appIssue.fields.customfield_10406 = null;
      }
      appIssue.fields.summary = angular.copy(fullIssue.fields.summary);
      appIssue.fields.project = angular.copy(fullIssue.fields.project);
      appIssue.fields.issuetype = angular.copy(fullIssue.fields.issuetype);
      appIssue.fields.description = angular.copy(fullIssue.fields.description);
      appIssue.id = angular.copy(fullIssue.id);
      appIssue.key = angular.copy(fullIssue.key);

      return appIssue;
    }
  }
});
