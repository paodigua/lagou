'use strict';

angular.module('app').directive("appSheet",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			visible:"=",
			filterInfoList:"=",
			select:"&"
		},
		templateUrl:"view/template/sheet.html",
		link:function(scope){

		}
	}
}]);
