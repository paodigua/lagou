'user strict';

angular.module('app').controller("companyCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.title="公司职位";
	$http.get("data/company.json?id="+$state.params.id).then(function(response){
		$scope.compJobInfo=response.data;
	},function(err){
		//error
	});
}]);
