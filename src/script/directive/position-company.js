'use strict';

angular.module('app').directive("appPositionCompany",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			compInfo:"="
		},
		templateUrl:"view/template/positionCompany.html",
	}
}]);
