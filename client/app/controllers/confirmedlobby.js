angular.module('app.confirmedLobby', ['app.factories'])

.controller('ConfirmedLobbyController', function($scope, socket, $location) {

  $scope.confirmedParticipants = ['Hao', 'Jonathen', 'Thomas', 'Genevieve'];

});