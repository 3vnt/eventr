// Create and export a new Angular module called "app.pomodoro".
angular.module('app.pomodoro', [])

.controller('PomodoroController', function($scope) {
  $scope.timeLeft = {
    seconds: 60,
    intervalTracker: null 
  };

  $scope.startTimer = function() {
    // stores an ongoing setInterval so that we can start and stop it
    $scope.timeLeft.intervalTracker = setInterval(function() {
      if ($scope.timeLeft.seconds === 0 || typeof $scope.timeLeft.seconds === 'string') {
        $scope.timeLeft.seconds = 'No time remaining, reset';
        $scope.$apply(); // Force the string above to show        
        $scope.stopTimer();
      } else {
        $scope.timeLeft.seconds--;
        $scope.$apply();        
      }
    }, 1000);
  };

  $scope.stopTimer = function() {
    clearInterval($scope.timeLeft.intervalTracker); // stops an ongoing setInterval
  };

  $scope.resetTimer = function() {
    $scope.timeLeft.seconds = 60;
    $scope.stopTimer();
  };

});


