angular.module('app.homepage', ['app.factories'])

.controller('HomepageController', function($scope, socket, $location) {

  $scope.getNotifications = function() {
    //notifications to get:
    //added to event
    //need to pay
    //need to pick event/time
  }


  $scope.getEvents = function() {
    //someone should check this socket code. I just copied it from elsewhere
  }




});