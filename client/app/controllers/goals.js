angular.module('app.goals', ['app.factories'])

.controller('GoalsController', function($scope, GoalsFactory) {
  $scope.goal = {};
  $scope.data = {};

  $scope.addGoal = function() {
    GoalsFactory.addGoal($scope.goal)
    .then(function(response) {
      $scope.goal = '';
    })
    .catch(function(error) {
      console.error(error);
    })
  };

  $scope.fetchGoals = function() {
    GoalsFactory.fetchGoals()
    .then(function(goals) {
      console.log('Fetched goals: ', goals);
      $scope.data.goals = goals;
    })
    .catch(function(error) {
      console.error(error);
    });
  };
  $scope.fetchGoals(); //Immediately call this function on first page load

});