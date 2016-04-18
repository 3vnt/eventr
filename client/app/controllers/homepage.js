angular.module('app.homepage', ['app.factories'])

.controller('NotificationController', function($scope, socket, $location) {

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


  $scope.getEvents = function(user) {
    console.log('hello');
    socket.emit('testing');
  };
  $scope.getEvents();


  socket.on('eventUpdate', function(data){
    console.log('updated:', data);
  });

});
