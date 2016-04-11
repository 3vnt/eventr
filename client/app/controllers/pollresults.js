angular.module('app.pollResults', ['app.factories'])

.controller('PollResultsController', function($scope, PollResultsFactory) {
  $scope.pollResults = 'poll results';
});