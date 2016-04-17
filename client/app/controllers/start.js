angular.module('app.start', ['app.factories'])

.controller('StartController', function($scope) {
  //if user is authenticated
  socket.emit('retrieveNotifications');

});
