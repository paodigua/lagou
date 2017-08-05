'user strict';

angular.module('app').controller("registerCtrl", ['$scope', '$http', '$state', 'cache', '$interval', function($scope, $http, $state, cache, $interval) {
	$scope.user = {};
	$scope.submit = function() {
		$http.post('data/regist.json',$scope.user).success(function(resp){
			$state.go("login");
		})
	}
	$scope.sms = "发送短信";
	var count = 60;
	$scope.isSend = false;
	$scope.send = function() {
		if(! $scope.isSend) {
			$http({
				url: "data/code.json"
			}).then(function(resp) {
				count = 60;
				var data = resp.data;
				$scope.sms = count + 's :发送成功';
				if(data.state === 1) {
					var t = $interval(function() {
						if(count > 0) {
							count--;
							$scope.sms = count + 's :发送成功';
						} else {
							$interval.cancel(t);
							$scope.sms = '超时，重新发送';
							$scope.isSend=false;
						}
					}, 1000);
				}
			});
			$scope.isSend=true;
		}

	}
}]);