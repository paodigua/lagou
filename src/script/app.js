'use strict';
/*上面一句，使用严格模式*/
angular.module("app",['ui.router','ngCookies','validation','ngAnimate'])
.run(['$rootScope','AuthService','cache',function($rootScope,cache){

	$rootScope.$on('$routeChangeStart',function(evt,next,current){
		if(! cache.get('id')){
/*			用户未登录时,在切换路由时要执行的 */
		}
	});
}]);


