
angular.module('app.auth', [])

.controller('AuthController', function ($scope, $window, $location, AuthFactory) {
  $scope.user = {};

  $scope.login = function () {
    AuthFactory.login($scope.user)
      .then(function (token) {
        //user will store a local token upon a successful login.
        $window.localStorage.setItem('com.eventr', token); 
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    AuthFactory.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.eventr', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
