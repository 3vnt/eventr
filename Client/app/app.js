angular.module('app', [
  'ngRoute',
  'app.start',
  'app.createevent',
  'app.confirmedlobby',
  'app.preferencevote',
  'app.finalaccept',
  'app.factories'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/start.html',
      controller: 'StartController'
    })
    .when('/createevent', {
      templateUrl: 'app/templates/createevent.html',
      controller: 'CreateEventController'
    }) 
    .when('/confirmedlobby', {
      templateUrl: 'app/templates/confirmedlobby.html',
      controller: 'ConfirmedLobbyController'
    })
    .when('/preferencevote', {
      templateUrl: 'app/templates/preferencevote.html',
      controller: 'PreferenceVoteController'
    })
    .when('/finalaccept', {
      templateUrl: 'app/templates/finalaccept.html',
      controller: 'FinalAcceptController'
    })
    .otherwise({
      redirectTo: '/'
    });
});