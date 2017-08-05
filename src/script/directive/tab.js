'use strict';

angular.module('app').directive("appTab",[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			tabData:"=",
			tabClick:"&"
		},
		templateUrl:"view/template/tab.html",
		link:function(scope){
			scope.viewFilter=function(obj){
				scope.selectedId=obj.id;
				/*父元素tClick(id,name)函数 ，这里会将obj对象进行哈希，将obj.id 赋给 形参id,obj.name赋给name,
				 * */
				scope.tabClick(obj);

			}
		}
	}
}]);
