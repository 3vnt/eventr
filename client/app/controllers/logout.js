angular.module('app.auth', ['app.factories'])

.controller('AuthController', function($scope, $location, socket) {

  $scope.logoutUser = function() {
    socket.emit('logout');
    $location.path('/login');
  };

});
