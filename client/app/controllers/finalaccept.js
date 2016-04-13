angular.module('app.finalAccept', ['app.factories'])

.controller('FinalAcceptController', function($scope, $location, socket) {
  $scope.confirmed = false;

  $scope.confirmParticipant = function() {
    //someone should check this socket code. I just copied it from elsewhere
    socket.emit('confirmedParticipant', $scope.confirmed);
    $location.path('/confirmedlobby');
  }
});