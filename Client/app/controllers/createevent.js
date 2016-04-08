angular.module('app.createevent', ['app.factories'])

.controller('CreateEventController', function($scope, socket, $location) {

  $scope.eventData = {
    date: '2016-April-05 17:03:00',
    deadline: '2016-April-12 17:03:00',
    emailList: {'b3563195@trbvn.com': 'b3563195@trbvn.com'}
  };

  $scope.addEvent = function() {
    socket.emit('addEvent', $scope.eventData);
    $location.path('/pollresults');

    // CreateEventFactory.addEvent($scope.eventData)
    // .then(function(response) {
    //   response.redirect('/pollresults');
    // })
    // .catch(function(error) {
    //   console.error(error);
    // })
  }
});