
angular.module('app.auth', [])

.controller('AuthController', function($scope, socket, $window, $location, AuthFactory) {
  $scope.user = {};

  $scope.login = function() {
    var user = {
      username: $scope.login.name,
      email: $scope.login.email,
      password: $scope.login.password
    };

    socket.emitAsync('login', user)
      .then(function(token) {
        console.log(token); //format might be wrong... maybe try response.data.token instead
        //user should store a local token upon a successful login.
        $window.localStorage.setItem('com.eventr', token);
        $location.path('/createevent');

      })
      .catch(function(error) {
        console.error(error);
      });
    $location.path('/start');
  };

  $scope.signup = function() {
    var user = {
      username: $scope.signup.name,
      email: $scope.signup.email,
      password: $scope.signup.password
    };

    socket.emitAsync('signup', user)
      .then(function(token) {
        console.log(token); //format might be wrong... maybe try response.data.token instead
        //user should store a local token upon a successful signup.
        $window.localStorage.setItem('com.eventr', token);
        $location.path('/createevent');

      })
      .catch(function(error) {
        console.error(error);
      });
  };

});
