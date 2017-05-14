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

				$scope.bands.forEach(function(band){
					band.isPlaying = false;
					band.currentTrack = 0;
				})
			} );

	d3.csv("data/countriesCodes.csv",function(data){
		$scope.countriesCodes = data[0];
	});



	$scope.audio = null;

	$scope.forwardAndPlay=function(band){
		band.currentTrack = (band.currentTrack + 1) % band.top_tracks.length;
		$scope.playAudio(band);
	}


	$scope.rewindAndPlay=function(band){
		band.currentTrack = (band.currentTrack - 1 + band.top_tracks.length) % band.top_tracks.length;
		$scope.playAudio(band);
	}

	$scope.toggleAudio = function(band){
		if(band.isPlaying){
			$scope.audio.pause();
		}
		else{
			if($scope.audio) $scope.audio.pause();
			$scope.playAudio(band);
		}
	}

	$scope.playAudio = function(band){
		band.isPlaying = true;
		var track = band.top_tracks[band.currentTrack]
		var url = track.audio;
		if($scope.audio) $scope.audio.pause();
		$scope.audio = new Audio(url)
		$scope.audio.addEventListener('ended', function(){
			$scope.$apply(function () {
				band.isPlaying = false;
				band.currentTrack = (band.currentTrack + 1) % band.top_tracks.length;
				}
			);
		});
		$scope.audio.addEventListener('pause', function(){
			$scope.$apply(function () {
				band.isPlaying = false;
				}
			);
		});
		$scope.audio.addEventListener('play', function(){
			$scope.$apply(function () {
				band.isPlaying = true;
				}
			);
		});
		$scope.audio.play();
	}

}]);