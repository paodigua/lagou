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
