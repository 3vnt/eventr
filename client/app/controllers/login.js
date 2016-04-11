angular.module('app.login', ['app.factories'])

.controller('LoginController', function($scope, socket, $location) {

  //Submits login information for user
  $scope.submitUser = function() {
    socket.emit('login', {
      username: $scope.input.name,
      email: $scope.input.email,
      password: $scope.input.password,
    });
    $location.path('/start');
  }

});
