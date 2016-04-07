angular.module('app.weather', ['app.factories'])

.controller('WeatherController', function($scope, WeatherFactory) {
  $scope.data = {};
  $scope.fetchData = function() {
    WeatherFactory.fetchData()
    .then(function(data) {
      $scope.data = data;
    })
    .catch(function(error) {
      console.error(error);
    });
  };
  $scope.fetchData();
});