angular.module('app.homepage', ['app.factories'])

.controller('HomepageController', function($scope, socket, $location) {

  $scope.pickEventAndTime = function(responses, users) {
    var timeToPick = false;

    if ($scope.responses.length === $scope.users.length) {
      timeToPick = true;
    }
  }

  $scope.needToVote = function(user) {
    var voted = false;
    if ($scope.user.vote) {
      voted = true;
    }
  }


  $scope.getEvents = function(user) {
    

  }

});