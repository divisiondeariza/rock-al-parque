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

}]);