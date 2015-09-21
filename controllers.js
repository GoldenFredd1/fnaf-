var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', ['$scope', '$interval', function($scope, $interval) {
    $scope.time = 0;
    $scope.power = 100;
    // enemies' locations and Markov chain move targets reference the index of this location array
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
    // Array of objects describing enemy attributes and behaviors
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

  // Filter function for enemy location table cells
  $scope.enemiesPresent = function(locationIndex) {
    return function(enemy) {
      return enemy.location == locationIndex;
    };
  };

  // Reassign enemy location bgased on current location and Markov chain
  $scope.move = function(enemy) {
    moves = enemy.movesMarkovChain[enemy.location];
    enemy.location = moves[Math.floor(Math.random()*moves.length)];
  };

  // Actions to perform each game tick: increment time, move each enemy
  $scope.gameTick = function() {
    $scope.time ++;
    $scope.enemies.forEach($scope.move);
    // console.log('gameTick');
  };

  // Run function gameTick every second
  $interval(function(){ $scope.gameTick(); }, 1000);

}]);
