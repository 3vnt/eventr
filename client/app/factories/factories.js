angular.module('app.factories', [])

.factory('GoalsFactory', function($http) {
  var addGoal = function(goal) {
    return $http({
      method: 'POST',
      url: '/api/goals', //??????????
      data: goal
    });
  };

  var fetchGoals = function() {
    return $http({
      method: 'GET',
      url: '/api/goals'
    }).then(function(response) {
      return response.data;
    });
  };

  return {
    addGoal: addGoal,
    fetchGoals: fetchGoals
  };
})

.factory('WeatherFactory', function($http) {
  var fetchData = function() {
    return $http({
      method: 'GET', 
      url: '/api/weather'
      // url: 'http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&APPID={' + weatherAPIkey + '}'
    })
    .then(function(response) {
      return response;
    });
  };
  return {
    fetchData: fetchData
  };
});








