var securityGuardGame = angular.module('securityGuardGame', ['ngResource']);

securityGuardGame.controller('gameState', ['$scope', '$interval', '$timeout', '$http', '$sce', 'gamePlay', 'Enemies', 'Views', '$q', function($scope, $interval, $timeout, $http, $sce, gamePlay, Enemies, Views, $q) {
    $scope.debug = true;
    $scope.time = 0;
    $scope.power = 100;
    $scope.show = {
        "location": [{
            "name": "you",
            "locId": 999
        }],
        "name": "Player"
    };
    $scope.promise;
    $scope.start = function() {
        $interval.cancel($scope.promise);//Cancel any prior interval promiess -Choose not to use the stop function because it might make ui freak
        $scope.status = true;//This is the status that helps control which button to show RESUME or PAUSE
        $scope.promise = $interval(function() { // store the interval promise
            angular.forEach($scope.enemies, function(enemy) { //Loop through all 4 characters
                $scope.delay = 800 + Math.floor(Math.random() * 1000);//create the random time out for each character
                $timeout(function() {
                    $scope.enemies[enemy.name] = gamePlay.move(enemy); //Use GAMEPLAY to do the logic wiht the data to decided and send back
                }, $scope.delay)
            })
            return $scope.time++; return //the time to keep the seconds going
        }, 1000);
    };
    $scope.stop = function() { // stops the interval
        $interval.cancel($scope.promise);//Break and cancel the  intervale
        $scope.status = false;//make sure the buttons turns over 
    };
    $q.all([Views.query().$promise, Enemies.get().$promise])//allows use to call all at the same time
        .then(function(result) {//thanks to the promise we can assign all at one time
            $scope.views = result[0];
            $scope.enemies = result[1].toJSON();
        }).then(function() {//thanks to promises this will wait until all calls are meet & assigned to start the game
            $scope.start();
        });
}]).factory('gamePlay', ['$timeout', function($timeout) {
    function move(enemy) {
        var oldlocation = enemy.location;
        var moves = enemy.movesMarkovChain[enemy.location];
        enemy.location = moves[Math.floor(Math.random() * moves.length)];
        if (enemy.location == 999 && oldlocation != 999) enemy.kills++;
        return enemy;
    };
    return {
        move: move
    };
}]).factory('Views', ['$resource',
    function($resource) {
        return $resource('https://midnightfreddie.github.io/AngularSecurityGuard/views.json');
    }
]).factory('Enemies', ['$resource',
    function($resource) {
        return $resource('https://midnightfreddie.github.io/AngularSecurityGuard/enemies.json');
    }
]);