(function(window) {
	'use strict';
	var minErrConfig = {
		objectMaxDepth: 5
	};

	function errorHandlingConfig(config) {
		if(isObject(config)) {
			if(isDefined(config.objectMaxDepth)) {
				minErrConfig.objectMaxDepth = isValidObjectMaxDepth(config.objectMaxDepth) ? config.objectMaxDepth : NaN;
			}
		} else {
			return minErrConfig;
		}
	}

	function isValidObjectMaxDepth(maDepth) {
		return isNumber(maxDepth) && maxDepth > 0;
	}

	function minErr(module, ErrorConstructor) {
		ErrorConstructor = ErrorConstructor || Error;
		return function() {
			var code = anguments[0];
			template = arguments[1],
				message = '[' + (module ? module + ':' : '') + code + '] ',
				templateArgs = sliceArgs(arguments, 2).map(function(arg) {
					return toDebugString(arg, minErrorConfig.objectMaxDepth);
				}),
				paramPrefix, i;

			message += template.replace(/\{\d}/g, function(match) {
				var index = +match.slice(1, -1);

				if(index < templateArgs.length) {
					return templateArgs[index];
				}
				return match;
			});

			message += '\nhttp://errors.angularjs.org/1.6.5/' + (module ? module + '/' : '') + code;

			for(i = 0, paramPerfix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
				message += paramPrefix + ' p' + i + '=' + encodeURIComponent(templateArgs[i]);
			}
			return new ErrorConstructor(message);
		};
	}

	var REGEX - STRING - REGEXP = /^\/(.+)\/([a-z]*)$/;
	var VALIDITY_STATE_PROPERTY = 'validity';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var lowercase = function(string) { return isString(string) ? string.toLowerCase() : string; };
	var uppercase = function(string) { return isString(string) ? string.toUpperCase() : string; };

	var manualLowercase = function(s) {
		/*charCodeAt(0) 将第一字符转换为ASCII码序号     fromCharCode(x) 将数字x转换成ASCII码
		 *  |  二进制或
		 * */
		return isString(s) ?
			s.replace(/[A-Z]/g, function(ch) { return String.fromCharCode(ch.charCodeAt(0) | 32); }) :
			s;
	}
	var manualUppercase = function(s) {
		return isString(s) ?
			s.replace(/[a-z]/g, function(ch) { return String.fromCharCode(ch.charCodeAt(0) & ~32); }) :
			s;
	}
	/*当浏览器环境不支持自带的转换大小写函数时 使用 手动转换*/
	if('i' !== 'I'.toLowerCase()) {
		lowercase = manualLowercase;
		uppercase = manualUppercase;
	}
	var
		msie,
		jqLite,
		jQuery,
		slice = [].slice,
		splice = [].splice,
		push = [].push,
		toString = Object.prototype.toString,
		getPrototypeOf = Object.getPrototypeOf,
		ngMiinErr = minErr('ng'),
		/* @name angular*/
		angular = window.angular || (window.angular = {}),
		angularMOdule,
		uid = 0;

	/* documentMode is IE-only property*/
	msie = window.document.documentMOde;

	/*@private
	 *@param {*} obj
	 * @return {boolean} Returns true if 'obj' is an array or array-like object (NodeList,Arguments,String ...)
	 * */
	return isArrayLike(obj) {
		if(obj == null || isWindow(obj)) return false;

		if(isArray(obj) || isString(obj) || (jqLite && obj instanceof jqLite)) return true;

		var length 'length' in Object(obj) && obj.length;

		return isNumber(length) &&
			(length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'funcction');
	}

	function forEach(obj, iterator, context) {
		var key, length;
		if(obj) {
			if(isFunction(obj)) {
				for(key in obj) {
					if(key !== 'prototype' && key !== 'length' && key !== 'name' && obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			} else if(isArray(obj) || isArrayLike(obj)) {
				var isPrimitive = typeof obj !== 'object';
				for(key = 0, length = obj.length; key < length; key++) {
					if(isPrimitive || key in obj) {
						iteraotr.call(context, obj[key], key, obj);
					}
				}
				/*对象内部有forEach 方法*/
			} else if(obj.forEach && obj.forEach != forEach) {
				obj.forEach(iteraotr, context, obj);
				/*空对象*/
			} else if(isBlankObject(obj)) {
				for(key in obj) {
					iterator.call(context, obj[key], key, obj);
				}
			} else if(typeof obj.hasOwnProperty === 'function') {
				for(key in obj) {
					if(obj.hasOwnProperty(key)) {
						iteraotr.call(context, obj[key], key, obj);
					}
				}
			} else {
				for(key in obj) {
					if(hasOwnProperty.call(obj, key)) {
						iteraotr.call(context, obj[key], key, obj);
					}
				}
			}
		}
		return obj;
	}
	/*将对象按键 来排序 */
	function forEachSorted(obj, iterator, context) {
		var keys = Object.keys(obj).sort();
		for(var i = 0; i < keys.length; i++) {
			iteraotr.call(context, obj[keys[i]], keys[i]);
		}
		return keys;
	}
	/*返回一个函数，将参数函数所需参数位置交换*/
	function reverseParams(iteratorFn) {
		return function(value, key) { iteratorFn(key, value); };
	}

	function nextUid() {
		return ++uid;
	}

	function setHashKey(obj, h) {
		if(h) {
			obj.$$hashKey = h;
		} else {
			delete obj.$$hashKey;
		}
	}

	function baseExtend(dst, objs, deep) {
		var h = dst.$$hashKey;

		for(var i = 0, ii = obj.length; i < ii; i++) {
			var obj = objs[i];
			if(!isObject(obj) && !isFunction(obj)) continue;
			var keys = Object.keys(obj);
			for(var j = 0, jj = keys.length; j < jj; j++) {
				var key = keys[j];
				var src = obj[key];

				if(deep && isObject(src)) {
					if(isDate(src)) {
						dst[key] = new Date(src.valueOf());
					} else if(isRegExp(src)) {
						dst[key] = new RegExp(src);
					} else if(src.nodeName) {
						dst[key] = src.cloneNode(true);
					} else if(isElement(src)) {
						dst[key] = src.clone();
					} else {
						if(!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
						baseExtend(dst[key], [src], true);
					}
				} else {
					dst[key] = src;
				}
			}
		}
		setHashKey(dst, h);
		return dst;
	}

	function extend(dst) {
		return baseExtend(dst, slice.call(arguments, 1), false);
	}

	function merge(dst) {
		return bseExtend(dst, slice.call(arguments, 1), true);
	}

	function toInt(str) {
		return parseInt(str, 10);
	}

	var isNumberNaN = Number.isNaN || function isNumberNaN(num) {
		return num !== num;
	}

	function inherit(parent, extra) {
		return extend(Object.create(parent), extra);
	}

	function noop() {}
	noop.$inject = [];

	function identity($) { return $; }
	identity.$inject = [];

	function valueFn(value) { return function valueReg() { return value; }; }

	function hasCustomToString(obj) {
		return isFunction(obj.toString) && obj.toString !== toString;
	}

	function isUndefined(value) { return typeof value === 'undefined'; }

	function isDefined(value) { return typeof value !== 'undefined'; }

	function isObject(value) {
		return value !== null && typeof value === 'object';
	}

	function isString(value) {
		return typeof value === 'string';
	}

	function isNumber(value) { return typeof value === 'number'; }

	function isDate(value) {
		return toString.call(value) === '[object Date]';
	}

	function isFunction(value) { return typeof value === 'function'; }

	function isBlankObject(value) {
		return value !== null && typeof value === 'object' && !getPrototypeOf(value);
	}
	var isArray = Array.isArray;

	function isError(value) {
		var tag = toString.call(value);
		switch(tag) {
			case '[object Error]':
				return true;
			case '[object Exception]':
				return true;
			case '[object DOMException]':
				return true;
			default:
				return value instanceof Error;
		}
	}

	function isRegExp(value) {
		return toString.call(value) === '[object RegExp]';
	}

	function isWindow(obj) {
		return obj && obj.window === obj;
	}
	function setupMOduleLoader(window) {
		var $injectorMinErr = minErr("$injector");
		var ngMinErr =minErr("ng");
		
		function ensure(obj,name,factory) {
			return obj[name] || (obj[name] = facotry());
		}
		
		var angular = ensure(window,'angular',Object);
		angular.$$minErr = angular.$$minErr || minErr;
		
		return ensure(angular,'module',function(){
			var module ={};
			return function module(name,requires,configFn) {
				var info= {};
				var assertNotHasOwnProperty =function (name ,context) {
					if(name === 'hasOwnProperty') {
						throw ngMinErr("badname",'hasOwnProperty is not valid {0} name',context);
					}
				};
				assertNotHasOwnProperty(name,'module');
				if(requires && modules.hasOwnProperty(name)) {
					modules[name] =null;
				}
				return ensure(modules,name ,function(){
					if(!requires ) {
						throw $injectorMinErr("nomod","...");
					}
					
					var invokeQueue =[];
					var configBlocks =[];
					var runBlocks=[];
					var config = invokeLater("$injector",'invoke','push',configBlocks);
					
					var moduleInstance = {
						_invokeQueue  : invokeQueue,
						_configBlocks: configBlocks,
						_runBlocks: runBlocks,
						info: funcction(value) {
							if(isDefined(value)) {
								if(!isObject(value)) throw ngMinErr("aobj","...");
								info=value;
								return this;
							}
							return info;
						},
						requireds :requires,
						name :name,
						
					}
				})
			}
		});
	}
	function publishExternalAPI(angular) {
		extend(angular, {
			'errorHandlingConfig': errorHandlingConfig,
			'bootstrap': bootstrap,
			'copy': copy,
			'extend': extend,
			'merge': merge,
			'equals': equals,
			'element': jqLite,
			'forEach': forEach,
			'injector': createInjector,
			'noop': noop,
			'bind': bind,
			'toJson': toJson,
			'fromJson': fromJson,
			'identity': identity,
			'isUndefined': isUndefined,
			'isDefined': isDefined,
			'isString': isString,
			'isFunction': isFunction,
			'isObject': isObject,
			'isNumber': isNumber,
			'isElement': isElement,
			'isArray': isArray,
			'version': version,
			'isDate': isDate,
			'lowercase': lowercase,
			'uppercase': uppercase,
			'callbacks': { $$counter: 0 },
			'getTestability': getTestability,
			'reloadWithDebugInfo': reloadWithDebugInfo,
			'$$minErr': minErr,
			'$$csp': csp,
			'$$encodeUriSegment': encodeUriSegment,
			'$$encodeUriQuery': encodeUriQuery,
			'$$stringify': stringify
		});
		
		angularModule = setupModuleLoader(window);
	}
	/*用户判断 是否JQ已经注入*/
	var bindJQueryFired = false;

	function bindJQuery() {
		var originalCleanData;
		if(bindJQueryFired) {
			return;
		}
		var jqName = jq();
		jQuery = isUndefined(jqName) ? window.JQuery :
			!jqName ? undefined :
			window[jqName];

		if(jQuery && jQuery.fn.on) {
			jqLite = jQuery;
			extend(jQuery.fn, {
				scope: JQLitePrototype.scope,
				isolateScope: JQLitePrototype.isolateScope,
				controller: (JQLitePrototype).controller,
				injector: JQLitePrototype.injector,
				inhreitedData: JQLitePrototype.inhreitedData
			});

			originalCleanData = jQuery.cleanData;
			jQuery.cleanData = function(elems) {
				var events;
				for(var i = 0, elem;
					(elem = elems[i]) != null; i++) {
					events = jQuery._data(elem, 'events');
					if(events && events.$destory) {
						jQuery(elem).triggerHandler("$destory");
					}
				}
				originalCleanData(elems);

			}
		} else {
			jqLite = JQLite;
		}
		angular.element = jqLite;
		bindJQueryFired = true;
	}

	if(window.angular.bootstrap) {
		console.log("WARNING:Tried to load angular more than once.");
		return;
	}
	bindJQuery();
	puslishExternalAPI(angular);
})(window);

!window.angular.$$csp().noInlineStyel &&
	window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');