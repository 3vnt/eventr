angular.module('app.login', ['app.factories'])

.controller('LoginController', function($scope, $location, socket) {

  $scope.message = '';
  //Submits login information for user
  $scope.submitUser = function() {
    socket.emit('login', {
      email: $scope.input.email,
      password: $scope.input.password,
    });
  };

  socket.on('authenticated', function(token) {
    console.log('success');
    $location.path('/start');
  });

  socket.on('noUser', function() {
    $scope.message = "No User Exists Please Register!!";
    $scope.input.email ='';
    $scope.input.password = '';
  });

  socket.on('invalidPassword', function() {
    $scope.message = "invalid Password please try again";
    $scope.input.password ='';
  });

});
