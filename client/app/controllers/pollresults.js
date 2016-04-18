angular.module('app.pollResults', ['app.factories'])

.controller('PollResultsController', function($scope, $location, socket, $window) {
  // TODO: check if user is Host, 
  //      if is: enable choosy things.
  //      if not: just show results so far.

  // TODO: get poll results from server.
  $scope.pollResults = 'poll results';
  $scope.showWarning = false;
  $scope.selectedEventAndDate = {};

  $scope.dateChoices = [];
  $scope.eventChoices = [];
  $scope.eventName = '';
  $scope.eventDeadline = '';
  $scope.eventParticipants = [];


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

  socket.on('pollResultsPackage', function(package) {
    // console.log('Package: ', package);
    $scope.eventParticipants = package.participants;
    var locations = package.locations;
    var activities = package.activities; 
    var event = package.event;
    var participants = package.participants;

    for (var i = 0; i < locations.length; i++) {
      var dateToAdd = {
        date: locations[i].text,
        numVotes: locations[i].votesFor
      };
      $scope.dateChoices.push(dateToAdd);
    }

    for (var i = 0; i < activities.length; i++) {
      var eventToAdd = {
        event: activities[i].text,
        numVotes: activities[i].votesFor
      };
      $scope.eventChoices.push(eventToAdd);
    }

    $scope.eventName = package.event.event_name;
    $scope.eventDeadline = package.event.response_deadline.slice(0, 10);


  });

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
      console.log(finalChoices);
      socket.emit('finalChoices', finalChoices);
      $scope.showWarning = false;
      $location.path('/finalaccept');
    } else {
      $scope.showWarning = true;
    }
  };
  
  $scope.getEventID = function() {
    var eventID = $window.localStorage.getItem('com.eventID');

    socket.emit('pollResultsData', eventID);
  };
  $scope.getEventID(); //get immediately 

});