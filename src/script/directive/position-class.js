'use strict';
/*子指令的link函数先于父指令的link函数执行。
        也就是说，如果子指令的某个scope变量依赖于父指令传来的参数时，可能一直是undefinded比如：
        APP.directive("子指令", function () {
    return {
        scope: {
　　　　　　变量A:"=父指令的参数"
　　　　　},
        restrict: 'A',
        replace: false,
        link: function (scope, elem, attr) {
            scope.变量B＝scope.变量A;//变量量B其实永远是undefinded，因为Link先于父指令的Link执行，
　　　　　　　　　　　　　　　　　　　　　//导致此时子指令还没有得到父指令传来的参数值。
        }
      必须使用$watch来解决
    APP.directive("子指令", function () {
	    return {
	        scope: {
	　　　　　　变量A:"=父指令的参数"
	　　　　　},
	        restrict: 'A',
	        replace: false,
	        link: function (scope, elem, attr) {
	            scope.$watch("变量A"，function(){
	　　　　　　　　　　scope.变量B=scope.变量A;
	　　　　　　　})
	        }
	    }
	});
 */
angular.module('app').directive("appPositionClass",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			compInfo:"="
		},
		templateUrl:"view/template/positionClass.html",
		link:function(scope){
			/*添加点击函数 */
			scope.showPositionList=function(i){
					scope.positionList = scope.compInfo.positionClass[i].positionList;
					scope.isActive=i;	
				}
			scope.$watch('compInfo',function(newVal){
				if(newVal){
					scope.showPositionList(0);
				}
				
			});
		}
	}
}]);
