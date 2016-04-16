angular.module('app.confirmedLobby', ['app.factories'])

.controller('ConfirmedLobbyController', function($scope, $location, socket) {

  $scope.confirmedParticipants = ['Hao', 'Jonathen', 'Thomas', 'Genevieve'];

});