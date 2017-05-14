'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$http", "$scope", function($http, $scope) {

	$http.get("data/bandsByCountry.json")
			.success(function(data, status, headers, config){
				$scope.bands = data;
			} );

	$scope.audio = null;
	$scope.playAudio = function(element){
		console.log("started");
		var url = element.band.top_tracks[0].audio;
		if($scope.audio) $scope.audio.pause();
		$scope.audio = new Audio(url)
		console.log("got Audio");
		$scope.audio.play();
		console.log("end");
	}

}]);