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


.factory('ConfirmedLobby', function($http) {

  var lobby = function() {
    return $http({
      method: 'GET',
      url: '/api/confirmedlobby'
    })
  }
})

.factory('FinalAccept', function($http) {
  var accept = function() {
    return $http({
      method: 'GET',
      url: '/api/accept'
    })
  }

  return {
    accept: accept
  }

})

.factory('AuthFactory', function($http, $location, $window) {

  var isAuth = function() {
    return !!$window.localStorage.getItem('com.eventr');
  };

  var logout = function() {
    $window.localStorage.removeItem('com.eventr');
    $location.path('/login');
  };

  return {
    isAuth: isAuth,
    logout: logout
  };

});
