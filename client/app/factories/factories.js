angular.module('app.factories', [])

<<<<<<< HEAD
// .factory('CreateEventFactory', function($http) {
//   var addEvent = function(event) {
//     return $http({
//       method: 'POST',
//       url: '' ?????????????
//       data: event
//     });
//   }
// });
=======
.factory('CreateEventFactory', function($http) {
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '', //?????????????
      data: event
    });
  }
})


// SocketFactory
// MySqlFactory


>>>>>>> 1a4ee8b704093f24f5aca1571c5c0a926a40b3f8
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
<<<<<<< HEAD
}).factory('GoalsFactory', function($http) {
  var addGoal = function(goal) {
=======
})





.factory('QuestionsFactory', function($http) {
  var addQuestion = function(question) {
>>>>>>> 1a4ee8b704093f24f5aca1571c5c0a926a40b3f8
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
});








