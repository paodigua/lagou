'use strict';

angular.module("app").filter("filterByObj",[function(){
	return function(dataList,obj){
		var res=[];
		angular.forEach(dataList,function(item){
			var isEqual=true;
			for(var e in obj){
				if(item[e] !== obj[e]){
					isEqual=false;
				}
			}
			if(isEqual){
				res.push(item);
			}
		});
		return res;
	}
}]);
