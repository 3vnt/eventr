angular.module('app.preferenceVote', ['app.factories'])

.controller('PreferenceVoteController', function($window, $scope, $location, socket) {
  // TODO: should come from an ajax call.
  $scope.eventChoices = [];
  $scope.dateChoices = [];

  $scope.responses = {};

  $scope.selectedEvent;
  $scope.selectedDate;

  socket.on('pollResultsPackage', function(package){
    $scope.eventChoices = package.activites;
    $scope.dateChoices = package.locations;
    $scope.event = package.event;
  });


  $scope.selectEvent = function(event) {
    $scope.selectedEvent = event;
  };
  $scope.selectDate = function(date) {
    $scope.selectedDate = date;
  };

  $scope.submitVote = function() {
    var votes = {
      id: $window.localStorage.getItem('eventID'), //problematic
      event: $scope.selectedEvent,
      date: $scope.selectedDate
    };
    socket.emit('votes', votes);
  };

  $scope.fetchChoices = function() {
    var eventID = $window.localStorage.getItem('eventID'); //problematic
    socket.emit('pollResultsData', eventID);
  };
  $scope.fetchChoices();
});
