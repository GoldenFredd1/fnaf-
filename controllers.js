var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', function($scope) {
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
  $scope.enemiesPresent = function(roomIndex) {
    console.log(roomIndex);
    // NOPE // console.log(enemy);
    // NOPE // console.log(enemies);
    // NOPE // return enemy.location == roomIndex;
    return function(enemy) {
      console.log(enemy);
      return enemy.location == roomIndex;
    };
  };
});
