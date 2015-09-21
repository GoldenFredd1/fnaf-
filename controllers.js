var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', function($scope) {
    $scope.time = 0;
    $scope.power = 100;
    $scope.locations = [
      {
        'name': 'Stage',
        'view': 'Stage'
      },
      {
        'name': 'Pirate\'s Cove',
        'view': 'Pirate\'s Cove'
      },
      {
        'name': 'Dining',
        'view': 'Dining'
      },
      {
        'name': 'Hallway',
        'view': 'Hallway'
      },
    ]
    $scope.enemies = [
      {
        'name': 'Bear',
        'location': 0,
        'movesMarkovChain': [
          [0, 0, 0, 0, 1],
          [1, 2],
          [1, 2, 3],
          [2, 3]
        ]
      },
      {
        'name': 'Bunny',
        'location': 0,
        'movesMarkovChain': [
          [0, 0, 0, 0, 1],
          [1, 2],
          [1, 2, 3],
          [2, 3]
        ]
      },
      {
        'name': 'Chick',
        'location': 0,
        'movesMarkovChain': [
          [0, 0, 0, 0, 1],
          [1, 2],
          [1, 2, 3],
          [2, 3, 3, 3]
        ]
      },
      {
        'name': 'Fox',
        'location': 1,
        'movesMarkovChain': [
          [1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
          [3],
          [1]
        ]
      }
    ]
  $scope.enemiesPresent = function(locationIndex) {
    return function(enemy) {
      return enemy.location == locationIndex;
    };
  };
});
