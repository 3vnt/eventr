angular.module('app.signup', ['app.factories'])

.controller('SignupController', function($scope, socket, $location) {

  $scope.message ='';

  //Submits login information for user
  $scope.signup = function() {
    if ($scope.password === $scope.passwordConfirm) {
      console.log('firing');
      socket.emit('signup', {
        username: $scope.input.username,
        email: $scope.input.email,
        password: $scope.input.password,
      })

    } else {
      $scope.password = '';
      $scope.passwordConfirm = '';
      $scope.message = "Your Password did not match please try again";
    }
  }

  //Success will redirect
  socket.on('success', function(token) {
    //store something into window local storage token
    $location.path('/start');
  });

  socket.on('usernameNotUnique', function() {
    $scope.username = '';
    $scope.password = '';
    $scope.passwordConfirm ='';
    $scope.message = 'Username already taken please select new one';
  });

  socket.on('emailUsed', function() {
    $scope.password = '';
    $scope.passwordConfirm ='';
    $scope.email = '';
    $scope.message = 'Email already in use please choose a new one';
  });


  socket.on('failed', function() {
    $scope.username = '';
    $scope.pasword = '';
    $scope.passwordConfrim = '';
    $scope.message = 'We Ran into some kind of error! Sorry please try again!';
  });

});
