// Create and export a new Angular module called "app". Require all of the modules inside of [ ];
angular.module('app', [
  'ngRoute',
  'app.pomodoro',
  'app.goals',
  'app.weather',
  'app.factories'
  ])
.config(function($routeProvider, $httpProvider) {
  // The router is like a doorman. When a person walks through the door of a building they've never been to, the doorman tells them where to go. The person just needs to know the name of the room they're looking for. They don't need to know the exact floor and room number. Likewise, when a person navigates to /goals in the browser, the router will automatically give them app/controllers/goals.html. The person doesn't need to know the exact file path.  
  $routeProvider
    .when('/pomodoro', {
      templateUrl: 'app/controllers/pomodoro.html',
      controller: 'PomodoroController'
    }) 
    .when('/goals', {
      templateUrl: 'app/controllers/goals.html',
      controller: 'GoalsController'
    })
    .when('/weather', {
      templateUrl: 'app/controllers/weather.html',
      controller: 'WeatherController'
    })
    .when('/signout', {
      //build this later on
    })
    .otherwise({
      redirectTo: '/pomodoro'
    });
});