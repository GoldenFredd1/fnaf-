var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', ['$scope', '$interval', '$timeout', '$http', '$sce', function($scope, $interval, $timeout, $http, $sce) {
    $scope.debug = true;
    $scope.time = 0;
    $scope.power = 100;

    $http.get("views.json")
      .success(function(response) {
        $scope.views = response;
      });
    // Array of objects describing enemy attributes and behaviors
    $http.get("enemies.json")
      .success(function(response) {
        $scope.enemies = response;
        $scope.enemies.forEach( function(enemy) { enemy['kills'] = 0; } );
        // Start enemies with random move times
        $scope.enemies.forEach($scope.randomMoveTime);
      });

  // Reassign enemy location bgased on current location and Markov chain
  $scope.move = function(enemy) {
    var oldlocation = enemy.location;
    moves = enemy.movesMarkovChain[enemy.location];
    enemy.location = moves[Math.floor(Math.random()*moves.length)];
    if (enemy.location == 999 && oldlocation != 999) enemy.kills++;
  };

  // Actions to perform each game tick: increment time, move each enemy
  $scope.gameTick = function() {
    $scope.time ++;
    // console.log('gameTick');
  };

  // Randomize move interval
  $scope.randomMoveTime = function(enemy) {
    $scope.move(enemy);
    var delay = 800 + Math.floor(Math.random() * 1000);
    $timeout(function() {$scope.randomMoveTime(enemy)}, delay);
  }

  // Run function gameTick every second
  $interval(function(){ $scope.gameTick(); }, 1000);

}]);
