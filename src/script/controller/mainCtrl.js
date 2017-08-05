'user strict';

angular.module('app').controller("mainCtrl", ["$http",'$scope','cache', function($http,$scope,cache) {

		$http.get("data/positionList.json").then(function(response){
			$scope.list=response.data;
		});

}]);