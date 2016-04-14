angular.module('app', [
  'ngRoute',
  'app.start',
  'app.createEvent',
  'app.pollResults',
  'app.preferenceVote',
  'app.finalAccept',
  'app.confirmedLobby',
  'app.auth',
  'app.factories'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/login.html',
      controller: 'AuthController'
    })
    .when('/start', {
      templateUrl: 'app/templates/start.html',
      controller: 'StartController',
      authenticate: true
    })
    .when('/createevent', {
      templateUrl: 'app/templates/createevent.html',
      controller: 'CreateEventController'
    })
    .when('/pollresults', {
      templateUrl: 'app/templates/pollresults.html',
      controller: 'PollResultsController'
    })
    .when('/preferencevote', {
      templateUrl: 'app/templates/preferencevote.html',
      controller: 'PreferenceVoteController'
    })
    .when('/finalaccept', {
      templateUrl: 'app/templates/finalaccept.html',
      controller: 'FinalAcceptController'
    })
    .when('/confirmedlobby', {
      templateUrl: 'app/templates/confirmedlobby.html',
      controller: 'ConfirmedLobbyController'
    })
    .when('/login', {
      templateUrl: 'app/templates/login.html',
      controller: 'AuthController'
    })
    .when('/logout', {
      templateUrl: 'app/templates/logout.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/templates/signup.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/signup'
    });

    // Inject an interceptor to stop all outbound requests and look in local storage to find the user's token and then add it to the header so the server can validate the request
    $httpProvider.interceptors.push('TokensFactory');
})
.factory('TokensFactory', function($window) {
  var attachToken = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.eventr');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attachToken;
})
.run(function($rootScope, $location, AuthFactory) {
  // listen for anytime angular tries to change routes. When it tries, we look for the token in localstorage and send that token to the server to see if it's valid.
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (next.$$route.originalPath === '/logout') {
      AuthFactory.logout();
    }

    if (next.$$route && next.$$route.authenticate && !AuthFactory.isAuth()) {
      $location.path('/login');
    }
  });
});




