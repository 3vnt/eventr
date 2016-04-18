angular.module('app.preferenceVote', ['app.factories'])

.controller('PreferenceVoteController', function($scope, $location, socket) {
  // TODO: should come from an ajax call.
  $scope.eventChoices = ['bowling', 'dinner', 'drinks']; 
  $scope.dateChoices = ['Monday', 'Tuesday', 'Wednesday'];
  
  $scope.responses = {};
  
  $scope.selectedEvent;
  $scope.selectedDate;

  $scope.sendData = function() {

  };

  $scope.fetchData = function() {

  };
});