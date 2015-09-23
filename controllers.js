var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', ['$scope', '$interval', '$http', function($scope, $interval, $http) {
    $scope.debug = true;
    $scope.time = 0;
    $scope.power = 100;

    $http.get("views.json")
      .success(function(response) {
        $scope.views = response
      });
    // Array of objects describing enemy attributes and behaviors
    $http.get("enemies.json")
      .success(function(response) {
        $scope.enemies = response
      });

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
