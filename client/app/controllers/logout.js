angular.module('app.logout', ['app.factories'])

.controller('LogoutController', function($scope, $location, socket) {

  $scope.logoutUser = function() {
    socket.emit('logout');
    $location.path('/login');
  };

});
