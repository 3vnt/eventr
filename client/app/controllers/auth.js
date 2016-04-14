
angular.module('app.auth', ['app.factories'])

.controller('AuthController', function($scope, socket, $window, $location, AuthFactory) {
  $scope.login = {};
  $scope.signup = {};
  $scope.loginMessage = 'Please login.';
  $scope.signupMessage = 'Please signup.';

  // BEGIN all authentication-related event listeners 
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
    $window.localStorage.setItem('com.eventr', token);
    $location.path('/start');
  });

  socket.on('signupUserExists', function(token) {
    $scope.loginMessage = 'User already exists. Please login.';
    $scope.signupMessage = 'Please signup.';
    $location.path('/login');
  });
  // END all authentication-related event listeners 

  $scope.login = function() {
    var loginData = {
      email: $scope.login.email,
      password: $scope.login.password
    };
    socket.emit('login', loginData);

    // socket.emitAsync('login', user);
    //   .then(function(token) {
    //     console.log(token); //format might be wrong... maybe try response.data.token instead
    //     //user should store a local token upon a successful login.
    //     $window.localStorage.setItem('com.eventr', token);
    //     $location.path('/start');

    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
  };

  $scope.signup = function() {
    var signupData = {
      username: $scope.signup.name,
      email: $scope.signup.email,
      password: $scope.signup.password
    };
    socket.emit('signup', signupData);

    // socket.emitAsync('signup', signupData)
    //   .then(function(token) {
    //     console.log(token); //format might be wrong... maybe try response.data.token instead
    //     //user should store a local token upon a successful signup.
    //     $window.localStorage.setItem('com.eventr', token);
    //     $location.path('/createevent');

    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
  };

});