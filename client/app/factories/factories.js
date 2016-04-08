angular.module('app.factories', [])

.factory('CreateEventFactory', function($http) {
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '' ?????????????
      data: event
    });
  }
});


SocketFactory
MySqlFactory


//Factory for using socket.io]
.factory('socket',function ($rootScope) {
  var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
});





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








