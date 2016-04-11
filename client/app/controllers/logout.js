angular.module('app.logout', ['app.factories'])

.controller('LogoutController', function($scope, socket, $location) {

  $scope.logoutUser = function() {
    socket.emit('logout');
    $location.path('/login');
  };

});
