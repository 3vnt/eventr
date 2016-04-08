angular.module('app.preferenceVote', ['app.factories'])

.controller('PreferenceVoteController', function($scope, QuestionsFactory) {
  $scope.eventChoices = ['bowling', 'dinner', 'drinks']; // should come from an ajax call.
  $scope.dateChoices = ['Monday', 'Tuesday', 'Wednesday'];
  
  $scope.responses = {};
  
  $scope.selectedEvent;
  $scope.selectedDate;
});