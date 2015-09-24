var securityGuardGame = angular.module('securityGuardGame', []);

securityGuardGame.controller('gameState', ['$scope', '$interval', '$http', '$sce', function($scope, $interval, $http, $sce) {
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
    $scope.enemies.forEach($scope.move);
    // console.log('gameTick');
  };

  // Run function gameTick every second
  $interval(function(){ $scope.gameTick(); }, 1000);

  $scope.explicitlyTrustedHtml = function(input) {
    console.log("hi");
    return $sce.trustAsHtml(input.name);
  }

}]);
