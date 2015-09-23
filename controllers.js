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

        // temp conversion
        $scope.locindex = [];
        $scope.views.forEach(function(view) {
          view.location.forEach(function(loc) {
            $scope.locindex.push(loc.locId);
          });
        });
        $scope.newenemies = []
        response.forEach(function(enemy) {
          mytemp = {};
          mytemp['name'] = enemy.name;
          mytemp['location'] = enemy.location;
          mytemp['movesMarkovChain'] = {};
          enemy.movesMarkovChain.forEach(function(loc, index) {
            mytemp['movesMarkovChain'][$scope.locindex[index]] = [];
            loc.forEach(function(moveto) {
              mytemp['movesMarkovChain'][$scope.locindex[index]].push($scope.locindex[moveto]);
            });
          });
          $scope.newenemies.push(mytemp);
        });
        $scope.tempstring = angular.toJson($scope.newenemies, true)
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

  // Sets display to none if debug not true
  $scope.display = function() {
    return $scope.debug ? "block" : "none";
  };

}]);
