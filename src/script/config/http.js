'use strict';

angular.module("app").config(["$provide",function($provide){
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		var get=$delegate.get;
		$delegate.post=function(url,data,config){
			var def=$q.defer();
			get(url).then(function(resp){
				def.resolve(resp.data);
			},function(err){
				def.reject(err.data);
			});
			return {
				success:function(cb){
					def.promise.then(cb);
				},
				error:function(cb){
					def.promise.then(null,cb);
				}
			}
		}
		return $delegate;
	}]);
}]);
