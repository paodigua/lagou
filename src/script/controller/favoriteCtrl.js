'user strict';

angular.module('app').controller("favoriteCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.title="我的收藏";
	$http.get("data/myFavorite.json").then(function(resp){
		$scope.dataList=resp.data;
	});
	
}]);
