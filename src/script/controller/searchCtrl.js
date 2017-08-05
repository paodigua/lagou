'user strict';

angular.module('app').controller("searchCtrl", ['dict', "$http", '$scope', function(dict, $http, $scope) {
	/*页面顶部搜索栏*/
	$scope.name = '';
	$scope.search = function() {
		$http.get("data/positionList.json?name" + $scope.name).then(function(response) {
			$scope.positionList = response.data;
		});
	}
	$scope.search();
	/*页面主体内容： tab条件选择栏*/
	$scope.orgTabData = [{
			id: "city",
			name: "城市"
		},
		{
			id: "salary",
			name: "薪资"
		},
		{
			id: "scale",
			name: "公司规模"
		},
	];
	/*深copy tab数据 */
	$scope.tabData = angular.copy($scope.orgTabData);
	$scope.sheet = {};
	/*点击职位条件tab时用于回传数据的函数*/
	var tabId = '';
	$scope.tClick = function(id, name) {
		tabId = id;
		$scope.sheet.list = dict[id];
		$scope.sheet.visible = true;
	}
	/*点击sheet更换搜索条件后回传数据的函数*/
		/*向positionList指令 传入数据的接口*/
	$scope.filterObj={};
	$scope.changeFilter = function(id, name) {
		if(id) {
			angular.forEach($scope.tabData, function(item) {
				if(item.id === tabId) {
					item.name = name;
					$scope.filterObj[tabId+'Id']=id;
				}
			});
		} else {
			angular.forEach($scope.tabData, function(item, index) {
				if(item.id === tabId) {
					item.name = $scope.orgTabData[index].name;
					delete $scope.filterObj[tabId+'Id'];
				}
			})
		}
	}
	

}]);