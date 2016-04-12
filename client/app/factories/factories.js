angular.module('app.factories', [])

.factory('CreateEventFactory', function($http) {
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '', //?????????????
      data: event
    });
  }
})

//Factory for using socket.io]
.factory('socket', function ($rootScope) {
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
})


.factory('QuestionsFactory', function($http) {
  var addQuestion = function(question) {
    return $http({
      method: 'POST',
      url: '/api/questions',
      data: question
    });
  };
  
  var log_some_things = function() {
    console.log('this for sure works');
  };
  
  // sends two options with a user
  var sendResponse = function(options) {
    return $http({
      method: 'POST',
      url: '/api/responses',
      data: options
    });
  };
   

  return {
    addQuestion: addQuestion,
    sendResponse: sendResponse
  };
})


.factory('PollResultsFactory', function($http) {
  // should not be $http. should instead be socket logic
  var getResults = function() {
    return $http({
      method: 'GET',
      url: '/api/responses'
    });
  };

  return {
    getResults: getResults
  };
})


.factory('AuthFactory', function($http, $location, $window) {
  // Trade username/password for a JWT from the server and store that JWT in localstorage.
  var login = function(user) {
    return 
  }
});
