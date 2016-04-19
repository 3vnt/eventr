angular.module('app.homepage', ['app.factories'])

.controller('NotificationController', function($window, $scope, socket, $location) {

  $scope.events = [{event_name: "some event", response_deadline: "some time"}];

  $scope.pickEventAndTime = function(responses, users) {
    var timeToPick = false;

    if ($scope.responses.length === $scope.users.length) {
      timeToPick = true;
    }
  };

  $scope.needToVote = function(user) {
    var voted = false;
    if ($scope.user.vote) {
      voted = true;
    }
  };

  $scope.clickEvent = function(eventID, userID) {
    $window.localStorage.setItem('eventID', eventID);
    $location.path('/preferencevote');
  };

  //Retrieves event on load
  $scope.getEvents = function(user) {
    console.log('firing from client');
    socket.emit('retrieveNotifications');
  };

  $scope.getEvents();

  //this gets updated everytime a new event is loaded
  socket.on('eventUpdate', function(data){
    console.log('received stuff');
    $scope.events =  data;
  });

});
