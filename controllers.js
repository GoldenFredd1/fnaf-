var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', function($scope) {
    $scope.test = "Hi";
    $scope.rooms = [
      {
        'name': 'Stage'
      },
      {
        'name': 'Pirate\'s Cove'
      },
      {
        'name': 'Dining'
      },
      {
        'name': 'Hallway'
      },
    ]
    $scope.enemies = [
      {
        'name': 'Bear',
        'location': 0
      },
      {
        'name': 'Bunny',
        'location': 0
      },
      {
        'name': 'Chick',
        'location': 0
      },
      {
        'name': 'Fox',
        'location': 1
      }
    ]
});
