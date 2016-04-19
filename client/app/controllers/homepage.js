angular.module('app.homepage', ['app.factories'])

.controller('NotificationController', function($window, $scope, $location, socket, AuthFactory) {
  $scope.loggedIn = AuthFactory.isAuth;

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

  $scope.clickEvent = function(event) {
    //store event id into window
    //broadcast for redirect to new page
    //
  };

  //Retrieves event on load
  $scope.getEvents = function(user) {
    console.log('hello');
    socket.emit('testing');
  };
  $scope.getEvents();

  //this gets updated everytime a new event is loaded
  socket.on('eventUpdate', function(data){
    console.log('updated:', data);
  });

});
