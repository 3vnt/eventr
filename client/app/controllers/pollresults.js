angular.module('app.pollResults', ['app.factories'])

.controller('PollResultsController', function($scope, $location, socket) {
  // TODO: is this right?
  io.connect();
  // TODO: check if user is Host, 
  //      if is: enable choosy things.
  //      if not: just show results so far.

  // TODO: get poll results from server.
  $scope.pollResults = 'poll results';
  $scope.showWarning = false;
  $scope.selectedEventAndDate = {};


  // Dummy data
  // $scope.dateChoices = [
  //   {date: new Date(), numVotes: 3},
  //   {date: new Date(), numVotes: 4},
  //   {date: new Date(), numVotes: 1}
  // ];
  // $scope.eventChoices = [
  //   {event: 'candy store', numVotes: 2},
  //   {event: 'movies',      numVotes: 3},
  //   {event: 'skydiving',   numVotes: 5}
  // ];

  $scope.hostSelectFinalChoice = function(choiceType, choiceObject) {
    $scope.selectedEventAndDate[choiceType] = choiceObject[choiceType];
  };

  $scope.toggleClass = function(choiceType, choiceObject) {
    return $scope.selectedEventAndDate[choiceType] === choiceObject[choiceType];
  };
  
  $scope.sendConfirmation = function (finalChoices) { 
    // NOTE: check if values are not defined
    // TODO: Ensure values are date, time.
    if (finalChoices.event && finalChoices.date) {
      // NOTE: currently just logs final choices
      // TODO: should send final choices to server
      console.log(finalChoices);
      socket.emit('finalChoices', finalChoices);
      $scope.showWarning = false;
      $location.path('/finalaccept');
    } else {
      $scope.showWarning = true;
    }
  };
  // 
});