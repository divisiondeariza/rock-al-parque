'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$http", "$scope", function($http, $scope) {

	$http.get("data/bands.json")
			.success(function(data, status, headers, config){
				$scope.bands = data;

				$scope.bands.forEach(function(band){
					band.isPlaying = false;
					band.currentTrack = 0;
				})
			} );



	$scope.audio = null;

	$scope.forwardAndPlay=function(band){
		band.currentTrack = (band.currentTrack + 1) % band.tracks.length;
		$scope.playAudio(band);
	}


	$scope.rewindAndPlay=function(band){
		band.currentTrack = (band.currentTrack - 1 + band.tracks.length) % band.tracks.length;
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
		if(band.tracks){
			$scope.playLoadedAudio(band);
		}else{
			$http.get("data/tracks/" + band.id + ".json")
				.success(function(data, status, headers, config){
					band.tracks = data["tracks"];
					console.log(band.tracks);
					$scope.playLoadedAudio(band);	
				});
		}

	}

	$scope.playLoadedAudio = function(band){
		band.isPlaying = true;
		var track = band.tracks[band.currentTrack]
		var url = track.audio;
		if($scope.audio) $scope.audio.pause();
		$scope.audio = new Audio(url)
		$scope.audio.addEventListener('ended', function(){
			$scope.$apply(function () {
				band.isPlaying = false;
				band.currentTrack = (band.currentTrack + 1) % band.tracks.length;
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