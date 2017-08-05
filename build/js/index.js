'use strict';
/*上面一句，使用严格模式*/
angular.module("app",['ui.router','ngCookies','validation','ngAnimate']);



'use strict';

angular.module('app')
.value('dict',{})
.run(['dict','$http',function(dict,$http){
	$http.get("data/city.json").then(function(resp){
		dict.city=resp.data;
	});
	$http.get("data/salary.json").then(function(resp){
		dict.salary=resp.data;
	});
	$http.get("data/scale.json").then(function(resp){
		dict.scale=resp.data;
	});
}]);

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

'use strict';

angular.module('app')
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:"/main",
		templateUrl:"view/main.html",
		controller:"mainCtrl"
	}).state('position',{
		url:"/position/:id",
		templateUrl:"view/position.html",
		controller:"positionCtrl"
	}).state('company',{
		url:"/company/:id",
		templateUrl:"view/company.html",
		controller:"companyCtrl"
	}).state('search',{
		url:"/serach",
		templateUrl:"view/search.html",
		controller:"searchCtrl"
	}).state('login',{
		url:"/login",
		templateUrl:"view/login.html",
		controller:"loginCtrl"
	}).state('register',{
		url:"/register",
		templateUrl:"view/register.html",
		controller:"registerCtrl"
	}).state('favorite',{
		url:"/favorite",
		templateUrl:"view/favorite.html",
		controller:"favoriteCtrl"
	}).state('post',{
		url:"/post",
		templateUrl:"view/post.html",
		controller:"postCtrl"
	}).state('me',{
		url:"/me",
		templateUrl:"view/me.html",
		controller:"meCtrl"
	});
	
	$urlRouterProvider.otherwise("main");
}]);

'use strict';

angular.module("app").config(["$validationProvider", function($validationProvider) {
	var expression = {
		phone: /^1[\d]{10}/,
		password: function(value) {
			var str = value + '';
			return str.length > 5;
		},
		required:function(value){
			return !!value;
		}
	};

	var defaultMsg = {
		phone: {
			success: "",
			error: "必须是11位手机号"
		},
		password: {
			success: "",
			error: "密码长度必须大于6位"
		},
		required: {
			success:"",
			error:"不能为空"
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
'user strict';

angular.module('app').controller("companyCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.title="公司职位";
	$http.get("data/company.json?id="+$state.params.id).then(function(response){
		$scope.compJobInfo=response.data;
	},function(err){
		//error
	});
}]);

'user strict';

angular.module('app').controller("favoriteCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.title="我的收藏";
	$http.get("data/myFavorite.json").then(function(resp){
		$scope.dataList=resp.data;
	});
	
}]);

'user strict';

angular.module('app').controller("loginCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.userLogin=function(){
		$http.post("data/login.json",$scope.user).success(function(resp){
			cache.put('id',resp.id);
			cache.put('name',resp.name);
			cache.put('image',resp.image);
			$state.go("main");
		});
	};
}]);

'user strict';

angular.module('app').controller("mainCtrl", ["$http",'$scope','cache', function($http,$scope,cache) {

		$http.get("data/positionList.json").then(function(response){
			$scope.list=response.data;
		});

}]);
'user strict';

angular.module('app').controller("meCtrl",['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.user={};
	if(cache.get("id")){
		$scope.user.id=cache.get("id");
		$scope.user.name=cache.get("name");
		$scope.user.headImage=cache.get("image");
	}
	$scope.logout=function(){
			cache.remove("id");
			cache.remove("name");
			cache.remove("image");
			$scope.user={};
	}
}]);

'user strict';

angular.module('app').controller("positionCtrl", ['$scope', '$http', '$state', '$q', 'cache','$log', function($scope, $http, $state, $q, cache,$log) {
	$scope.title = "职位详情";
	$scope.isLogin = !!cache.get("name");
	$scope.message = $scope.isLogin ? '投个简历' : '去登录';

	function getPosition() {
		var def = $q.defer();
		$http.get("data/position.json?id=" + $state.params.id).then(function(res) {
			$scope.jobInfo = res.data;
			//			for(var i=0;i<res.data.length;i++){
			//				if(res.data[i].id=== $state.params.id){
			//					$scope.jobInfo=res.data[i];
			//				}
			//			}
			if($scope.jobInfo.posted) {
				$scope.message = '投递成功';
			}
			def.resolve(res.data);
		}, function(err) {
			def.reject(err);
		});
		return def.promise;
	};

	function getCompany(id) {
		console.log("id:" + id);
		$http.get("data/company.json?id=" + id).then(function(res) {
			$scope.comInfo = res.data;
		});
	}
	getPosition().then(function(res) {
		getCompany(res.id);
	});

	$scope.go = function() {
		if($scope.message !== "投递成功") {
			if($scope.message == '投个简历') {
				$http.post("data/handle.json", { id: $scope.jobInfo.id }).success(function(resp) {
					$scope.company = resp;
					$log.info(resp);
					$scope.message= "投递成功";
				});
			} else {
				$state.go("login");
			}
		}

	}
}]);
'user strict';

angular.module('app').controller("postCtrl", ['$scope', '$http', '$state', 'cache', function($scope, $http, $state, cache) {
	$scope.title = "投递记录";
	$scope.tabData = [{
		id: "all",
		name: "全部"
	}, {
		id: "pass",
		name: "面试通过"
	}, {
		id: "fail",
		name: "不合适"
	}, ];
	$http.get("data/myPost.json").then(function(resp) {
		$scope.positionList = resp.data;
	});

	$scope.filterObj = {};
	$scope.tClick = function(id, name) {
		switch(id) {
			case 'all':
				delete $scope.filterObj.state;
				break;
			case 'pass':
				$scope.filterObj.state = '1';
				break;
			case 'fail':
				$scope.filterObj.state = '-1';
				break;
		}
	};

}]);
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
'use strict';

angular.module('app').directive("appFoot",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/foot.html"
	}
}]);

'use strict';

angular.module('app').directive("appHeadBar",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/headBar.html",
		scope:{
			text:"@"
		},
		link:function($scope){
			$scope.back=function(){
				window.history.back();
			};
		}
	}
}]);

'use strict';

angular.module('app').directive("appHead",['cache',function(cache){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/head.html",
		link:function(scope){
			scope.name=cache.get("name") || '';
		}
	}
}]);

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

'use strict';

angular.module('app').directive("appPositionInfo",['$http',function($http){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"view/template/positionInfo.html",
		scope:{
			isActive:"=",
			isLogin:"=",
			pos:"="
		},
		link:function($scope){
			$scope.$watch('pos',function(newVal){
				if(! newVal) return ; 
				$scope.pos.select= $scope.pos.select || false;
				$scope.starPath=$scope.pos.select ? "image/active.png" :"image/star.png";
			});
			
			$scope.favorite=function(){
				$http.post("data/favorite.json",{
					id:$scope.pos.id,
					select:! $scope.pos.select
				}).success(function(resp){
					$scope.pos.select = !$scope.pos.select;
					$scope.starPath=$scope.pos.select ? "image/star-active.png" :"image/star.png";
				});
			}
		}
	}
}]);

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

'use strict';

angular.module('app').directive("appPositionList", ['$http', function($http) {
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/positionList.html",
		scope: {
			jobList: "=",
			filterObj: "=",
			isFavorite:"="
		},
		link: function(scope) {
			scope.select = function(item) {
				$http.post("data/favorite.json",{
					id:item.id,
					select: !item.select
				}).success(function(resp){
					item.select = !item.select;
				});
			}
		}
	}
}]);
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

'use strict';

//angular.module("app").service('cache',['$cookies',function($cookies){
//	this.put=function(key,value){
//		$cookies.put(key,value);
//	};
//	this.get=function(key){
//		return $cookies.get(key);
//	};
//	this.remove=function(key){
//		$cookies.remove(key);
//	};
//}]);

angular.module("app").factory('cache',['$cookies',function($cookies){
	return {
		put:function(key,value){
			$cookies.put(key,value);
		},
		get:function(key){
			return $cookies.get(key);
		},
		remove:function(key){
			$cookies.remove(key);
		}
	};
}]);
//'use strict';

angular.module("app").service("httpService", function ($http) {
    return {
        getDatas: function (url, obj1, succCallBack, errorCallBack) {
            return $http({
                method: "GET",
                url: url,
                params: obj1 || {}
            }).success(function (data) {
                succCallBack && succCallBack(data);
            }).error(function (data) {
                errorCallBack && errorCallBack(data);
            })
        },
        postDatas: function (url, obj1, succCallBack, errorCallBack) {
            return $http({
                method: "POST",
                url: 'p/prod.json',
                data: obj1 || {},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).success(function (data) {
                succCallBack && succCallBack(data);
            }).error(function (data) {
                errorCallBack && errorCallBack(data);
            })
        }
    }
});
