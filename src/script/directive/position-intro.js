'use strict';

angular.module('app').directive("appPositionIntro",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			pos:"="
		},
		templateUrl:"view/template/positionIntro.html",
	}
}]);
