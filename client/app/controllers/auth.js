
angular.module('app.auth', ['app.factories'])

.controller('AuthController', function($scope, socket, $window, $location, AuthFactory) {
  $scope.login = {};
  $scope.signup = {};
  $scope.loginMessage = 'Please login.';
  $scope.signupMessage = 'Please signup.';

  // BEGIN all authentication-related event listeners ------------------------------------
  socket.on('loginSuccess', function(token) {
    $scope.loginMessage = 'Please login.'; //reset default auth message upon successful login.
    $window.localStorage.setItem('com.eventr', token); 
    $location.path('/start');
  });

  socket.on('loginWrongPassword', function() {
    $scope.loginMessage = 'Wrong password, please try again.';
    $location.path('/login');
  });

  socket.on('loginUserDoesNotExist', function() {
    $scope.signupMessage = 'User does not exist. Please signup.';
    $location.path('/signup');
    $scope.loginMessage = 'Please login.';
  });

  socket.on('signupSuccess', function(token) {
    $scope.signupMessage = 'Please signup.';
    $window.localStorage.setItem('com.eventr', token); //add a token with key and value
    $location.path('/start');
  });

  socket.on('signupUserExists', function() {
    $scope.loginMessage = 'User already exists. Please login.'; //this is not rendering fix this
    $scope.signupMessage = 'Please signup.';
    $location.path('/login');
  });

  socket.on('logoutSuccess', function() {
    $window.localStorage.removeItem('com.eventr');
    $location.path('/login');
  });
  // END all authentication-related event listeners ------------------------------------


  // START all authentication-related outbound emits -----------------------------------
  $scope.login = function() {
    var loginData = {
      email: $scope.login.email,
      password: $scope.login.password
    };
    socket.emit('login', loginData);
  };

  $scope.signup = function() {
    var signupData = {
      username: $scope.signup.name,
      email: $scope.signup.email,
    };
    socket.emit('signup', signupData);
  };

  $scope.logout = function() {
    socket.emit('logout');
  };
  // END all authentication-related outbound emits ------------------------------------


});
