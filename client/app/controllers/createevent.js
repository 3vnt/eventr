angular.module('app.createEvent', ['app.factories'])

.controller('CreateEventController', function($scope, socket, $location) {

  $scope.eventData = {
    deadline: '2016-05-01', //yyyy-mm-dd
    friends: {},
    activities: {},
    locations: {},
  };

  $scope.addFriend = function() {
    $scope.eventData.friends[$scope.friendText] = $scope.friendText;
    $scope.friendText ='';
  };

  $scope.removeFriend =function(friend) {
    delete $scope.eventData.friends[friend];
  };

  $scope.addActivity = function() {
    $scope.eventData.activities[$scope.activityText] = $scope.activityText;
    console.log($scope.eventData.activities);
    $scope.activityText ='';
  };

  $scope.removeActivity =function(activity) {
    delete $scope.eventData.activities[activity];
  };

   $scope.addLocation = function() {
    $scope.eventData.locations[$scope.locationText] = $scope.locationText;
    $scope.locationText ='';
  };

  $scope.removeLocation =function(location) {
    delete $scope.eventData.locations[location];
  };


  $scope.addEvent = function() {
    socket.emit('addEvent', $scope.eventData);
    $location.path('/pollresults');
  };

});
