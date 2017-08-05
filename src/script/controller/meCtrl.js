'user strict';

angular.module('app').controller("meCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.user={};
	if(cache.get("id")){
		$scope.user.id=cache.get("id");
		$scope.user.name=cache.get("name");
		$scope.user.headImage=cache.get("image");
	}
	$scope.logout=function(){
			cache.remove("id");
			cache.remove("name");
			cache.remove("image");
			$scope.user={};
	}
}]);
