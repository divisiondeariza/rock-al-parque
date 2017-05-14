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

	d3.csv("data/countriesCodes.csv",function(data){
		$scope.countriesCodes = data[0];
	});



	$scope.audio = null;

	$scope.toggleAudio = function(track, isPlaying){

	}

	$scope.playAudio = function(track,isPlaying){
		var url = track.audio;
		if($scope.audio) $scope.audio.pause();
		$scope.audio = new Audio(url)
		$scope.audio.play();
	}

}]);