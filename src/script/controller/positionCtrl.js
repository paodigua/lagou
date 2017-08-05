'user strict';

angular.module('app').controller("positionCtrl", ['$scope', '$http', '$state', '$q', 'cache','$log', function($scope, $http, $state, $q, cache,$log) {
	$scope.title = "职位详情";
	$scope.isLogin = !!cache.get("name");
	$scope.message = $scope.isLogin ? '投个简历' : '去登录';

	function getPosition() {
		var def = $q.defer();
		$http.get("data/position.json?id=" + $state.params.id).then(function(res) {
			$scope.jobInfo = res.data;
			//			for(var i=0;i<res.data.length;i++){
			//				if(res.data[i].id=== $state.params.id){
			//					$scope.jobInfo=res.data[i];
			//				}
			//			}
			if($scope.jobInfo.posted) {
				$scope.message = '投递成功';
			}
			def.resolve(res.data);
		}, function(err) {
			def.reject(err);
		});
		return def.promise;
	};

	function getCompany(id) {
		console.log("id:" + id);
		$http.get("data/company.json?id=" + id).then(function(res) {
			$scope.comInfo = res.data;
		});
	}
	getPosition().then(function(res) {
		getCompany(res.id);
	});

	$scope.go = function() {
		if($scope.message !== "投递成功") {
			if($scope.message == '投个简历') {
				$http.post("data/handle.json", { id: $scope.jobInfo.id }).success(function(resp) {
					$scope.company = resp;
					$log.info(resp);
					$scope.message= "投递成功";
				});
			} else {
				$state.go("login");
			}
		}

	}
}]);