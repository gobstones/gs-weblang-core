(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gsWeblangCore"] = factory();
	else
		root["gsWeblangCore"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdategsWeblangCore"];
/******/ 	this["webpackHotUpdategsWeblangCore"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "14bca0ba42928ee1fb9c"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var gbs = {};
	var grammar = __webpack_require__(1);
	gbs.Parser = __webpack_require__(3);
	gbs.Lexer = __webpack_require__(7);
	gbs.node = __webpack_require__(8);
	gbs.errors = __webpack_require__(4);
	gbs.Context = __webpack_require__(22);
	gbs.Gbb = {
	    Reader: __webpack_require__(24)
	};
	
	gbs.getParser = function () {
	    return grammar(gbs);
	};
	
	module.exports = gbs;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var TOKEN_NAMES = __webpack_require__(2);
	
	module.exports = function (gbs) {
	    var g = new gbs.Parser(new gbs.Lexer());
	    var define = g;
	
	    function commaSeparatedArguments(parser) {
	        var parameters = [];
	        if (parser.token.id !== ')') {
	            for (; ;) {
	                parameters.push(parser.expression(0));
	                if (parser.token.id !== ',') {
	                    break;
	                }
	                parser.advance(',');
	            }
	        }
	        return parameters;
	    }
	
	    function parameterListCall(parser) {
	        parser.advance('(');
	        var parameters = commaSeparatedArguments(parser);
	        parser.advance(')');
	        return parameters;
	    }
	
	    function parameterDeclarationList() {
	        var parameters = [];
	        g.advance('(');
	        if (g.token.id !== ')') {
	            for (; ;) {
	                if (g.token.arity !== 'name') {
	                    g.error(g.token, 'Se esperaba un nombre de parámetro.');
	                }
	                parameters.push(g.token);
	                g.advance();
	                if (g.token.id !== ',') {
	                    break;
	                }
	                g.advance(',');
	            }
	        }
	        g.advance(')');
	        return parameters;
	    }
	
	    function parenthesisExpression() {
	        g.advance('(');
	        var p = g.expression(0);
	        g.advance(')');
	        return p;
	    }
	
	    function bodyStatement() {
	        return g.block() || [];
	    }
	
	    function bodyStatementWithOptionalMultiline() {
	        return (g.token.id === '{') ? bodyStatement() : [g.statement()];
	    }
	
	    function defineConstant(symbol, alias, value, type) {
	        var token = g.symbol(symbol);
	        token.nud = function () {
	            return new gbs.node.Constant(token, alias, value, type);
	        };
	    }
	
	    define.symbol('(end)');
	    define.symbol('(literal)').nud = function () {
	        return new gbs.node.NumericLiteral(this, this.value);
	    };
	
	    define.symbol('(name)').nud = function () {
	        return new gbs.node.Variable(this, this.value);
	    };
	
	    define.op('||', 20, gbs.node.OrOperation);
	    define.op('&&', 25, gbs.node.AndOperation);
	
	    define.op('+', 50, gbs.node.SumOperation);
	    define.op('-', 50, gbs.node.DiffOperation);
	    define.op('*', 60, gbs.node.MulOperation);
	    // TODO: chequear que efectivamente sean no asociativos
	    define.op(TOKEN_NAMES.DIV, 70, gbs.node.DivOperation);
	    define.op(TOKEN_NAMES.MOD, 70, gbs.node.ModOperation);
	
	    define.infixr('^', 80, function (left) {
	        return new gbs.node.ExpOperation(g.token, left, g.expression(80));
	    });
	    // TODO: chequear cómo se comporta el NOT
	    define.prefix(TOKEN_NAMES.NOT, function () {
	        return new gbs.node.NotOperation(g.token, g.expression(70));
	    });
	    define.prefix('-', function () {
	        return new gbs.node.SubstractionOperation(g.token, g.expression(70));
	    });
	
	    define.op('==', 40, gbs.node.EqOperation);
	    define.op('/=', 40, gbs.node.NotEqualOperation);
	    define.op('<', 40, gbs.node.LessOperation);
	    define.op('>', 40, gbs.node.GraterOperation);
	    define.op('<=', 40, gbs.node.LessEqualOperation);
	    define.op('>=', 40, gbs.node.GreaterEqualOperation);
	
	    defineConstant(TOKEN_NAMES.FALSE, 'False', false, TOKEN_NAMES.BOOLEAN);
	    defineConstant(TOKEN_NAMES.TRUE, 'True', true, TOKEN_NAMES.BOOLEAN);
	    defineConstant(TOKEN_NAMES.BLUE, 'Blue', 0, TOKEN_NAMES.COLOR);
	    defineConstant(TOKEN_NAMES.RED, 'Red', 1, TOKEN_NAMES.COLOR);
	    defineConstant(TOKEN_NAMES.BLACK, 'Black', 2, TOKEN_NAMES.COLOR);
	    defineConstant(TOKEN_NAMES.GREEN, 'Green', 3, TOKEN_NAMES.COLOR);
	    defineConstant(TOKEN_NAMES.NORTH, 'North', [0, 1], TOKEN_NAMES.DIRECTION);
	    defineConstant(TOKEN_NAMES.SOUTH, 'South', [0, -1], TOKEN_NAMES.DIRECTION);
	    defineConstant(TOKEN_NAMES.EAST, 'East', [1, 0], TOKEN_NAMES.DIRECTION);
	    defineConstant(TOKEN_NAMES.WEST, 'West', [-1, 0], TOKEN_NAMES.DIRECTION);
	
	    define.symbol(':');
	    define.symbol(')');
	    define.symbol('(');
	    define.symbol('[');
	    define.symbol(']');
	    define.symbol('}');
	    define.symbol(',');
	    define.symbol('->');
	    define.symbol('..');
	    define.symbol(TOKEN_NAMES.IN);
	    define.symbol(TOKEN_NAMES.ELSE);
	    define.symbol(TOKEN_NAMES.TO);
	
	    var separator = {separator: ';'};
	    define.stmt(';', function () {
	        return separator;
	    });
	
	    define.infix('(', 80, function (left) {
	        if (left.token.arity !== 'name') {
	            gbs.errors.throwParserError(left, left.token.value + ' no es una función o procedimiento');
	        }
	        var parameters = commaSeparatedArguments(g);
	        g.advance(')');
	        var node;
	        if (left.token.value[0].toUpperCase() === left.token.value[0]) {
	            node = new gbs.node.ProcedureCall(left.token, function () {
	                return g.scope.find(left.token.value);
	            }, parameters);
	        } else {
	            node = new gbs.node.FunctionCall(left.token, function () {
	                return g.scope.find(left.token.value);
	            }, parameters);
	        }
	        return node;
	    });
	
	    define.infixr(':=', 10, function (left) {
	        if (left.id !== '.' && left.id !== '[' && (!left.token || left.token.arity !== 'name')) {
	            g.error(left, 'Del lado izquierdo de la asignación sólo pueden usarse identificadores');
	        }
	        return new gbs.node.Assignment({}, left, g.expression(9));
	    });
	
	    define.stmt(TOKEN_NAMES.DROP, function () {
	        return new gbs.node.PutStone(g.token, parameterListCall(g));
	    });
	
	    define.stmt(TOKEN_NAMES.GRAB, function () {
	        return new gbs.node.RemoveStone(g.token, parameterListCall(g));
	    });
	
	    define.stmt(TOKEN_NAMES.MOVE, function () {
	        return new gbs.node.MoveClaw(g.token, parameterListCall(g));
	    });
	
	    define.stmt(TOKEN_NAMES.MOVE_TO_EDGE, function () {
	        return new gbs.node.MoveToEdge(g.token, parameterListCall(g));
	    });
	
	    define.stmt(TOKEN_NAMES.CLEAN_BOARD, function () {
	        return new gbs.node.CleanBoard(g.token, parameterListCall(g));
	    });
	
	    define.stmt(TOKEN_NAMES.BOOM, function () {
	        var token = g.token;
	        if (parenthesisExpression(g)) {
	            gbs.errors.throwParserError(token, 'BOOM no lleva parámetros');
	        }
	        return new gbs.node.Boom(token);
	    });
	
	    define.prefix(TOKEN_NAMES.HAS_STONES, function () {
	        return new gbs.node.HasStones(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.NUM_STONES, function () {
	        return new gbs.node.NumStones(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MAX_COLOR, function () {
	        return new gbs.node.MaxColor(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MIN_COLOR, function () {
	        return new gbs.node.MinColor(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MAX_DIR, function () {
	        return new gbs.node.MaxDir(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MIN_DIR, function () {
	        return new gbs.node.MinDir(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MAX_BOOL, function () {
	        return new gbs.node.MaxBool(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.MIN_BOOL, function () {
	        return new gbs.node.MinBool(g.token, parameterListCall(g));
	    });
	
	    define.prefix(TOKEN_NAMES.CAN_MOVE, function () {
	        var id = g.token;
	        var parameters = parameterListCall(g);
	        return new gbs.node.CanMove(id, parameters);
	    });
	
	    define.stmt(TOKEN_NAMES.IF, function () {
	        var token = g.token;
	        g.advance('(');
	        var condition = g.expression(0);
	        g.advance(')');
	        var trueBranch = bodyStatement(g);
	        var falseBranch = null;
	        if (g.token.id === TOKEN_NAMES.ELSE) {
	            g.scope.reserve(g.token);
	            g.advance(TOKEN_NAMES.ELSE);
	            falseBranch = bodyStatement(g);
	        }
	        return new gbs.node.If(token, condition, trueBranch, falseBranch);
	    });
	
	    define.stmt(TOKEN_NAMES.SWITCH, function () {
	        var token = g.token;
	        var condition = parenthesisExpression(g);
	        if (g.token.id === TOKEN_NAMES.TO) {
	            g.advance(TOKEN_NAMES.TO);
	        }
	        g.advance('{');
	        var cases = [];
	        for (; ;) {
	            var exp = g.expression(0);
	            g.advance('->');
	            var body = bodyStatementWithOptionalMultiline(g);
	            cases.push({
	                case: exp,
	                body: body
	            });
	            if (g.token.id === '}' || !g.tokens.hasNext()) {
	                break;
	            }
	        }
	        g.advance('}');
	        return new gbs.node.Switch(token, condition, cases);
	    });
	
	    define.stmt(TOKEN_NAMES.WHILE, function () {
	        return new gbs.node.While(g.token, parenthesisExpression(g), bodyStatement(g));
	    });
	
	    define.stmt(TOKEN_NAMES.REPEAT, function () {
	        return new gbs.node.Repeat(g.token, parenthesisExpression(g), bodyStatement(g));
	    });
	
	    define.stmt(TOKEN_NAMES.FOR_EACH, function () {
	        // foreach dir in [minDir() .. maxDir()]
	        var iterator = g.expression();
	        if (iterator.token.arity !== 'name') {
	            g.error(iterator.token, 'El foreach espera un identificador sobre el cual iterar');
	        }
	        g.advance(TOKEN_NAMES.IN);
	        g.advance('[');
	        var items = commaSeparatedArguments(g);
	        g.advance(']');
	        return new gbs.node.ForEach(g.token, iterator, items, g.block());
	    });
	
	    define.stmt('{', function () {
	        var a = g.statements();
	        g.advance('}');
	        return a;
	    });
	
	    define.stmt('(', function () {
	        var a = g.statements();
	        g.advance(')');
	        return a;
	    });
	
	    define.prefix('(', function () {
	        var expression = g.expression(0);
	        g.advance(')');
	        return expression;
	    });
	
	    define.root(TOKEN_NAMES.PROGRAM, function () {
	        return new gbs.node.Program(g.token, g.block());
	    });
	
	    define.root(TOKEN_NAMES.FUNCTION, function () {
	        g.newScope();
	        var token = g.token;
	        if (g.token.arity === 'name') {
	            if (g.token.value[0] !== g.token.value[0].toLowerCase()) {
	                g.error(token, 'El nombre de la función ' + token.value + ' debe emepzar con minúscula');
	            }
	            g.scope.define(token);
	            g.advance();
	        } else {
	            g.error(token, 'Se esperaba un nombre de función');
	        }
	        var parameters = parameterDeclarationList(g);
	        var body = bodyStatement(g);
	
	        var ret = body.pop();
	        if (!ret || ret.alias !== 'return' || !ret.expression) {
	            g.error(token, 'La función ' + token.value + ' debe terminar con un ' + TOKEN_NAMES.RETURN);
	        }
	        g.scope.pop();
	        var declaration = new gbs.node.FunctionDeclaration(token, parameters, body, ret);
	        token.declaration = declaration;
	        return declaration;
	    });
	
	    define.stmt(TOKEN_NAMES.RETURN, function () {
	        return new gbs.node.ReturnStatement(g.token, parenthesisExpression(g));
	    });
	
	    define.root(TOKEN_NAMES.PROCEDURE, function () {
	        g.newScope();
	        var token = g.token;
	        if (g.token.arity === 'name') {
	            if (g.token.value[0] !== g.token.value[0].toUpperCase()) {
	                g.error(token, 'El nombre del procedimiento ' + token.value + ' debe emepzar con mayúscula');
	            }
	            g.scope.define(token);
	            g.advance();
	        } else {
	            g.error(token, 'Se esperaba un nombre de procedimiento');
	        }
	        var parameters = parameterDeclarationList(g);
	        var body = bodyStatement();
	        g.scope.pop();
	        var declaration = new gbs.node.ProcedureDeclaration(token, parameters, body);
	        token.declaration = declaration;
	        return declaration;
	    });
	
	    define.parse = function (input) {
	        var main;
	        var declarations = [];
	        var roots = g.parseProgram(input);
	        for (var i = 0; i < roots.length; i++) {
	            if (roots[i].alias === 'program') {
	                main = roots[i];
	            } else {
	                declarations.push(roots[i]);
	            }
	        }
	        return new gbs.node.Root(main, declarations);
	    };
	
	    return g;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	var TOKEN_NAMES = {
	    PROGRAM: 'program',
	    PROCEDURE: 'procedure',
	    FUNCTION: 'function',
	    RETURN: 'return',
	    DROP: 'Poner',
	    MOVE: 'Mover',
	    GRAB: 'Sacar',
	    BOOM: 'BOOM',
	    MOVE_TO_EDGE: 'IrAlBorde',
	    CLEAN_BOARD: 'VaciarTablero',
	    REPEAT: 'repeat',
	    WHILE: 'while',
	    FOR_EACH: 'foreach',
	    IN: 'in',
	    IF: 'if',
	    THEN: 'then',
	    ELSE: 'else',
	    SWITCH: 'switch',
	    TO: 'to',
	    OPPOSITE: 'opuesto',
	    NEXT: 'siguiente',
	    PREVIOUS: 'previo',
	    DIV: 'div',
	    MOD: 'mod',
	    NOT: 'not',
	    HAS_STONES: 'hayBolitas',
	    CAN_MOVE: 'puedeMover',
	    NUM_STONES: 'nroBolitas',
	    MIN_DIR: 'minDir',
	    MAX_DIR: 'maxDir',
	    MIN_COLOR: 'minColor',
	    MAX_COLOR: 'maxColor',
	    MIN_BOOL: 'minBool',
	    MAX_BOOL: 'maxBool',
	    RED: 'Rojo',
	    BLUE: 'Azul',
	    BLACK: 'Negro',
	    GREEN: 'Verde',
	    TRUE: 'True',
	    FALSE: 'False',
	    NORTH: 'Norte',
	    SOUTH: 'Sur',
	    EAST: 'Este',
	    WEST: 'Oeste',
	    BOOLEAN: 'Booleano',
	    COLOR: 'Color',
	    DIRECTION: 'Dirección',
	    NUMBER: 'Número'
	};
	
	module.exports = TOKEN_NAMES;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var errors = __webpack_require__(4);
	var Scope = __webpack_require__(6);
	
	function throwUndefinedSymbolError() {
	    errors.throwParserError(this, 'No definido');
	}
	
	function throwMissingOperatorError() {
	    errors.throwParserError(this, 'No se encontró el operador');
	}
	
	var OriginalSymbol = function () {
	    this.nud = throwUndefinedSymbolError;
	    this.led = throwMissingOperatorError;
	};
	
	var Parser = function (lexer) {
	    this.scope = null;
	    this.token = null;
	    this.tokens = lexer;
	    this.symbolTable = {};
	};
	
	Parser.prototype.symbol = function (id, bindingPower) {
	    var s = this.symbolTable[id];
	    bindingPower = bindingPower || 0;
	    if (s) {
	        if (bindingPower > s.lbp) {
	            s.lbp = bindingPower;
	        }
	    } else {
	        s = new OriginalSymbol();
	        s.id = s.value = id;
	        s.lbp = bindingPower;
	        this.symbolTable[id] = s;
	    }
	    return s;
	};
	
	Parser.prototype.expression = function (rightBindingPower) {
	    rightBindingPower = rightBindingPower || 0;
	    var left;
	    var t = this.token;
	    this.advance();
	    left = t.nud();
	    while (rightBindingPower < this.token.lbp) {
	        t = this.token;
	        this.advance();
	        left = t.led(left);
	    }
	    return left;
	};
	
	Parser.prototype.error = function (token, message) {
	    errors.throwParserError(token, message);
	};
	
	Parser.prototype.newScope = function () {
	    var s = this.scope;
	    this.scope = new Scope(this);
	    this.scope.parent = s;
	    return this.scope;
	};
	
	Parser.prototype.advance = function (id) {
	    var a;
	    var o;
	    var t;
	    var v;
	    var tokens = this.tokens;
	    if (id && this.token.id !== id) {
	        if (this.lastToken && this.lastToken.range && this.token.range) {
	            this.token.range.start = this.lastToken.range.start;
	        }
	        errors.throwParserError(this.token, 'Se esperaba "' + id + '" pero se encontró "' + this.token.value + '"');
	    }
	    if (!tokens.hasNext()) {
	        var lastRange = this.token.range;
	        this.token = this.symbolTable['(end)'];
	        this.token.range = lastRange;
	        return this.token;
	    }
	    t = tokens.next();
	    v = t.value;
	    a = t.type;
	    if (a === 'name') {
	        o = this.scope.find(v);
	        if (o.arity === 'routine') {
	            // force late binding
	            o = this.symbolTable['(name)'];
	        }
	    } else if (a === 'operator') {
	        o = this.symbolTable[v];
	        if (!o) {
	            errors.throwParserError(t, 'Unknown operator.');
	        }
	    } else if (a === 'number') {
	        o = this.symbolTable['(literal)'];
	        a = 'literal';
	        v = parseInt(v, 10);
	    } else {
	        errors.throwParserError(t, 'Unexpected token.');
	    }
	
	    var token = Object.create(o);
	    token.range = t.range;
	    token.value = v;
	    token.arity = a;
	    this.lastToken = this.token;
	    this.token = token;
	    return token;
	};
	
	Parser.prototype.op = function (id, bp, OpDefinition) {
	    var parser = this;
	    var s = this.symbol(id, bp);
	    s.led = function (left) {
	        return new OpDefinition(this, left, parser.expression(bp));
	    };
	    return s;
	};
	
	Parser.prototype.statement = function () {
	    var n = this.token;
	    var v;
	    if (n.std) {
	        this.advance();
	        this.scope.reserve(n);
	        return n.std();
	    }
	    v = this.expression(0);
	    if (v.alias !== ':=' && v.id !== '(' && v.arity !== 'routine') {
	        errors.throwParserError(v, 'Bad expression statement.');
	    }
	    return v;
	};
	
	Parser.prototype.statements = function () {
	    var statementsList = [];
	    var symbol;
	    for (; ;) {
	        if (this.token.id === '}' || this.token.id === '(end)') {
	            break;
	        }
	        var range = this._currentRange();
	        symbol = this.statement();
	        if (symbol && !symbol.separator) {
	            this._applyRangeToSymbol(range, symbol);
	            statementsList.push(symbol);
	        }
	    }
	    if (statementsList.length === 0) {
	        return null;
	    }
	    return statementsList;
	};
	
	Parser.prototype._applyRangeToSymbol = function (range, symbol) {
	    symbol.range = range;
	    if (this.token.range && this.token.range.end) {
	        range.end = this.token.range.end;
	    }
	};
	
	Parser.prototype.rootDeclaration = function () {
	    var n = this.token;
	    if (!n.root) {
	        errors.throwParserError(n, 'Se esperaba una definición de programa, función o procedimiento.');
	    }
	    this.advance();
	    this.scope.reserve(n);
	    return n.root();
	};
	
	Parser.prototype.stmt = function (symbol, f) {
	    var x = this.symbol(symbol);
	    x.std = f;
	    return x;
	};
	
	Parser.prototype.infix = function (id, bp, led) {
	    var s = this.symbol(id, bp);
	    var self = this;
	    s.led = led || function (left) {
	        this.left = left;
	        this.right = self.expression(bp);
	        this.arity = 'binary';
	        return this;
	    };
	    return s;
	};
	
	Parser.prototype.infixr = function (id, bp, led) {
	    var s = this.symbol(id, bp);
	    var self = this;
	    s.led = led || function (left) {
	        this.left = left;
	        this.right = self.expression(bp - 1);
	        this.arity = 'binary';
	        return this;
	    };
	    return s;
	};
	
	Parser.prototype.prefix = function (id, nud) {
	    var s = this.symbol(id);
	    var self = this;
	    s.nud = nud || function () {
	        self.scope.reserve(this);
	        this.left = self.expression(70);
	        this.arity = 'unary';
	        return this;
	    };
	    return s;
	};
	
	Parser.prototype.root = function (symbol, f) {
	    var x = this.symbol(symbol);
	    x.root = f;
	    return x;
	};
	
	Parser.prototype.block = function () {
	    var t = this.token;
	    this.advance('{');
	    return t.std();
	};
	
	Parser.prototype._currentRange = function () {
	    return {start: this.token.range.start, end: this.token.range.end};
	};
	
	Parser.prototype.roots = function () {
	    var roots = [];
	    var symbol;
	    for (; ;) {
	        if (this.token.id === '(end)') {
	            break;
	        }
	        var range = this._currentRange();
	        symbol = this.rootDeclaration();
	        if (symbol) {
	            this._applyRangeToSymbol(range, symbol);
	            roots.push(symbol);
	        }
	    }
	    if (roots.length === 0) {
	        return null;
	    }
	    return roots;
	};
	
	Parser.prototype._parseContextAwareNode = function (input, nodeParser) {
	    this.tokens.input(input);
	    this.newScope();
	    this.advance();
	    var s = nodeParser();
	    this.advance('(end)');
	    this.scope.pop();
	    return s;
	};
	
	Parser.prototype.parseExpression = function (input) {
	    var self = this;
	    return this._parseContextAwareNode(input, function () {
	        return self.expression(0);
	    });
	};
	
	Parser.prototype.parseProgram = function (input) {
	    var self = this;
	    return this._parseContextAwareNode(input, function () {
	        return self.roots();
	    });
	};
	
	Parser.prototype.parseStatements = function (input) {
	    var self = this;
	    return this._parseContextAwareNode(input, function () {
	        return self.statements();
	    });
	};
	
	module.exports = Parser;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var log = __webpack_require__(5);
	
	var errors = {};
	
	errors.throwParserError = function (token, description) {
	    var someError = {error: description, on: token};
	    log('PARSER ERROR: ', someError);
	    throw someError;
	};
	
	errors.throwInterpreterError = function (token, message) {
	    throw new errors.InterpreterException(message, token);
	};
	
	errors.InterpreterException = function (message, on) {
	    this.message = message;
	    this.on = on;
	};
	errors.InterpreterException.prototype = new Error();
	
	module.exports = errors;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var doNothing = function () {
	};
	
	module.exports = (console && console.log) ? console.log : doNothing;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var errors = __webpack_require__(4);
	
	function itself() {
	    return this;
	}
	
	var Scope = function (parser) {
	    this.parser = parser;
	    this.def = {};
	};
	
	Scope.prototype.define = function (identifier) {
	    var t = this.def[identifier.value];
	    if (typeof t === 'object') {
	        errors.throwParserError(identifier, t.reserved ? 'Already reserved.' : 'Already defined.');
	    }
	    this.def[identifier.value] = identifier;
	    identifier.reserved = false;
	    identifier.nud = itself;
	    identifier.led = null;
	    identifier.std = null;
	    identifier.lbp = 0;
	    identifier.scope = this.parser.scope;
	    return identifier;
	};
	
	Scope.prototype.find = function (name) {
	    var e = this;
	    var targetToken;
	    for (; ;) {
	        targetToken = e.def[name];
	        if (targetToken && typeof targetToken !== 'function') {
	            return e.def[name];
	        }
	        e = e.parent;
	        if (!e) {
	            targetToken = this.parser.symbolTable[name];
	            return targetToken && typeof targetToken !== 'function' ? targetToken : this.parser.symbolTable['(name)'];
	        }
	    }
	};
	
	Scope.prototype.pop = function () {
	    this.scope = this.parent;
	};
	
	Scope.prototype.reserve = function (name) {
	    if (name.arity !== 'name' || name.reserved) {
	        return;
	    }
	    var t = this.def[name.value];
	    if (t) {
	        if (t.reserved) {
	            return;
	        }
	        if (t.arity === 'name') {
	            name.error('Already defined.');
	        }
	    }
	    this.def[name.value] = name;
	    name.reserved = true;
	};
	
	module.exports = Scope;


/***/ },
/* 7 */
/***/ function(module, exports) {

	function Lexer(prefix, suffix) {
	    // Current reading position
	    this.from = 0;
	    this.startColumn = 0;
	    this.endColumn = 0;
	    this.row = 0;
	    this.prefix = prefix || '/=-<>:|&.';
	    this.suffix = suffix || '=|&>.';
	
	    this.punctuators = '/+-*^.:|&;,()<>{}[]=';
	
	    // Look ahead position
	    this.i = 0;
	
	    this.buf = null;
	    this.buflen = 0;
	}
	
	Lexer.prototype.hasNext = function () {
	    this._skipNonTokens();
	    return this.from < this.buflen;
	};
	
	Lexer.prototype.input = function (buf) {
	    this.from = 0;
	    this.i = 0;
	    this.startColumn = 0;
	    this.endColumn = 0;
	    this.row = 0;
	    this.buf = buf;
	    this.buflen = buf.length;
	    this.current = null;
	    this.nextChar = null;
	};
	
	var TokenTypes = {
	    IDENTIFIER: 'name',
	    OPERATOR: 'operator',
	    EOF: 'eof',
	    COMMENT: 'comment',
	    NUMBER: 'number',
	    NEWLINE: 'newline'
	};
	
	/**
	 * This method is highly procedural for performance reasons.
	 * There is no need for the lexer to be too flexible, since the
	 * semantics will be associated to identifiers on the parser.
	 *
	 * @returns Token. The next token on the buffer, or null if the buffer is empty.
	 */
	Lexer.prototype.next = function () {
	    do {
	        this._skipNonTokens();
	        this._refreshCurrentAndNextChars();
	
	        if (this.from >= this.buflen) {
	            return null;
	        }
	    } while (this._processComment());
	
	    // Always add cases in descending order of occurrence probability
	    if (this._processIdentifier()) {
	        return this._consume(TokenTypes.IDENTIFIER);
	    } else if (this._processOperator()) {
	        return this._consume(TokenTypes.OPERATOR);
	    } else if (this._processNumber()) {
	        return this._consume(TokenTypes.NUMBER);
	    }
	    return this._processError();
	};
	
	// PRIVATE
	
	function error(token, description) {
	    return {error: description, on: token};
	}
	
	Lexer.prototype._make = function (type, value) {
	    return {
	        type: type,
	        value: value,
	        range: {
	            start: {row: this.row, column: this.startColumn},
	            end: {row: this.row, column: this.endColumn}
	        }
	    };
	};
	
	Lexer.prototype._consume = function (type) {
	    var text = this.buf.substring(this.from, this.i);
	    var newToken = this._make(type, text);
	    this.from = this.i;
	    this.startColumn = this.endColumn;
	    return newToken;
	};
	
	Lexer.prototype._refreshCurrentAndNextChars = function () {
	    this.current = this.buf.charAt(this.from);
	    this.nextChar = this.buf.charAt(this.from + 1);
	};
	
	Lexer.prototype._processOperator = function () {
	    if (this.punctuators.indexOf(this.current) >= 0) {
	        this._increaseFrom();
	        this._processMultiCharOperator();
	        return true;
	    }
	    return false;
	};
	
	Lexer.prototype._processMultiCharOperator = function () {
	    if (this.prefix.indexOf(this.current) >= 0 && this.suffix.indexOf(this.nextChar) >= 0) {
	        this._incrementStep();
	    }
	};
	
	Lexer.prototype._processNumber = function () {
	    if (_isDigit(this.current)) {
	        this._increaseFrom();
	        while (this.i < this.buflen && _isDigit(this.buf.charAt(this.i))) {
	            this._incrementStep();
	        }
	        return true;
	    }
	    return false;
	};
	
	Lexer.prototype._processError = function () {
	    this._increaseFrom();
	    return error('Unmatched token', this._consume('UNMATCHED'));
	};
	
	Lexer.prototype._resetColumnCount = function () {
	    this.startColumn = this.endColumn;
	};
	
	Lexer.prototype._increaseFrom = function () {
	    this.i = this.from + 1;
	    this.startColumn = this.startColumn + 1;
	    this.endColumn = this.startColumn;
	};
	
	Lexer.prototype._incrementStep = function () {
	    this.i++;
	    this.endColumn++;
	};
	
	Lexer.prototype._processIdentifier = function () {
	    if (_isAlpha(this.current)) {
	        this._increaseFrom();
	        while (this.i < this.buflen && _isAlphanum(this.buf.charAt(this.i))) {
	            this._incrementStep();
	        }
	        return true;
	    }
	    return false;
	};
	
	Lexer.prototype._skipNonTokens = function () {
	    while (this.from < this.buflen) {
	        var c = this.buf.charAt(this.from);
	        if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
	            if (_isNewline(c)) {
	                this.row += 1;
	                this.endColumn = 0;
	                this.startColumn = 0;
	            } else {
	                this.startColumn++;
	                this.endColumn = this.startColumn;
	            }
	            this.from++;
	            this.i = this.from;
	        } else {
	            break;
	        }
	    }
	};
	
	Lexer.prototype._processComment = function () {
	    var chars = this.current + this.nextChar;
	    return this._processSingleLineComment(chars) || this._processMultiLineComment(chars);
	};
	
	Lexer.prototype._processSingleLineComment = function (chars) {
	    if (chars === '//') {
	        while (this.i < this.buflen && !_isNewline(this.buf.charAt(this.i))) {
	            this._incrementStep();
	        }
	        this.from = this.i;
	        this.row++;
	        this.startColumn = 0;
	        this.endColumn = 0;
	        return true;
	    }
	};
	
	Lexer.prototype._processMultiLineComment = function (chars) {
	    if (chars === '/*') {
	        this._incrementStep();
	        this._incrementStep();
	        while (this.i < this.buflen && this.buf.charAt(this.i) !== '*' && this.buf.charAt(this.i + 1) !== '/') {
	            this._incrementStep();
	            if (_isNewline(this.buf.charAt(this.i))) {
	                this.endColumn = 0;
	            }
	        }
	        this._incrementStep();
	        this._incrementStep();
	        this.from = this.i;
	        this.endColumn = this.startColumn;
	        return true;
	    }
	    return false;
	};
	
	function _isNewline(c) {
	    return c === '\r' || c === '\n';
	}
	
	function _isDigit(c) {
	    return c >= '0' && c <= '9';
	}
	
	function _isAlpha(c) {
	    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || c === '\'';
	}
	
	function _isAlphanum(c) {
	    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '_' || c === '$';
	}
	
	module.exports = Lexer;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var node = {};
	node.errors = __webpack_require__(4);
	
	var constants = {
	    STM: 'statement',
	    BINARY: 'binary',
	    EXPRESSION: 'binary',
	    NUMERIC_LITERAL: 'NumericLiteral'
	};
	
	node.interpretBlock = function (block, context) {
	    block = block || [];
	    for (var i = 0; i < block.length; i++) {
	        block[i].interpret(context);
	    }
	    return context;
	};
	
	__webpack_require__(9)(node, constants);
	__webpack_require__(10)(node, constants);
	__webpack_require__(11)(node, constants);
	__webpack_require__(12)(node, constants);
	__webpack_require__(13)(node, constants);
	__webpack_require__(14)(node, constants);
	__webpack_require__(15)(node, constants);
	__webpack_require__(16)(node, constants);
	__webpack_require__(17)(node, constants);
	__webpack_require__(18)(node, constants);
	__webpack_require__(19)(node, constants);
	__webpack_require__(20)(node, constants);
	__webpack_require__(21)(node, constants);
	
	module.exports = node;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function (node, constants) {
	    node.NumericLiteral = function (token, value) {
	        this.token = token;
	        this.value = value;
	        this.alias = constants.NUMERIC_LITERAL;
	    };
	    node.NumericLiteral.prototype.type = 'number';
	
	    node.NumericLiteral.prototype.eval = function () {
	        return this.value;
	    };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.Constant = function (token, alias, value, type) {
	        this.token = token;
	        this.value = value;
	        this.alias = alias;
	        this.type = type;
	    };
	
	    node.Constant.prototype.eval = function () {
	        return this.value;
	    };
	}
	;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.Variable = function (token, id) {
	        this.token = token;
	        this.value = id;
	    };
	
	    node.Variable.prototype.eval = function (context) {
	        return context.get(this.value);
	    };
	
	    return node;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function (node, constants) {
	    node.Assignment = function (token, left, right) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = ':=';
	        this.left = left;
	        this.right = right;
	    };
	
	    node.Assignment.prototype.interpret = function (context) {
	        context.put(this.left.token.value, this.right.eval(context));
	    };
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.If = function (token, condition, trueBranch, falseBranch) {
	        this.token = token;
	        this.alias = 'if';
	        this.condition = condition;
	        this.trueBranch = trueBranch;
	        this.falseBranch = falseBranch;
	    };
	
	    node.If.prototype.interpret = function (context) {
	        return node.interpretBlock(this.condition.eval(context) ? this.trueBranch : this.falseBranch, context);
	    };
	
	    node.Switch = function (token, expression, cases) {
	        this.token = token;
	        this.alias = 'switch';
	        this.expression = expression;
	        this.cases = cases;
	    };
	
	    node.Switch.prototype.interpret = function (context) {
	        var value = this.expression.eval(context);
	        for (var i = 0; i < this.cases.length; i++) {
	            if (this.cases[i].case.eval(context) === value) {
	                node.interpretBlock(this.cases[i].body, context);
	                break;
	            }
	        }
	        return context;
	    };
	}
	;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function (node, constants) {
	    var BinaryOperation = function (token, left, right, alias) {
	        this.alias = alias;
	        this.token = token;
	        this.left = left;
	        this.right = right;
	        this.arity = constants.BINARY;
	    };
	
	    function defineBinaryOperation(className) {
	        node[className] = function (token, left, right) {
	            BinaryOperation.call(this, token, left, right, className);
	        };
	        node[className].prototype = new BinaryOperation();
	    }
	
	    defineBinaryOperation('SumOperation');
	    node.SumOperation.prototype.eval = function (context) {
	        return this.left.eval(context) + this.right.eval(context);
	    };
	
	    defineBinaryOperation('DiffOperation');
	    node.DiffOperation.prototype.eval = function (context) {
	        return this.left.eval(context) - this.right.eval(context);
	    };
	
	    defineBinaryOperation('MulOperation');
	    node.MulOperation.prototype.eval = function (context) {
	        return this.left.eval(context) * this.right.eval(context);
	    };
	
	    defineBinaryOperation('DivOperation');
	    node.DivOperation.prototype.eval = function (context) {
	        return Math.floor(this.left.eval(context) / this.right.eval(context));
	    };
	
	    defineBinaryOperation('ModOperation');
	    node.ModOperation.prototype.eval = function (context) {
	        return this.left.eval(context) % this.right.eval(context);
	    };
	
	    defineBinaryOperation('ExpOperation');
	    node.ExpOperation.prototype.eval = function (context) {
	        return Math.pow(this.left.eval(context), this.right.eval(context));
	    };
	
	    defineBinaryOperation('AndOperation');
	    node.AndOperation.prototype.eval = function (context) {
	        return this.left.eval(context) && this.right.eval(context);
	    };
	
	    defineBinaryOperation('OrOperation');
	    node.OrOperation.prototype.eval = function (context) {
	        return this.left.eval(context) || this.right.eval(context);
	    };
	
	    defineBinaryOperation('NotEqualOperation');
	    node.NotEqualOperation.prototype.eval = function (context) {
	        return this.left.eval(context) !== this.right.eval(context);
	    };
	
	    defineBinaryOperation('EqOperation');
	    node.EqOperation.prototype.eval = function (context) {
	        return this.left.eval(context) === this.right.eval(context);
	    };
	
	    defineBinaryOperation('LessOperation');
	    node.LessOperation.prototype.eval = function (context) {
	        return this.left.eval(context) < this.right.eval(context);
	    };
	
	    defineBinaryOperation('GraterOperation');
	    node.GraterOperation.prototype.eval = function (context) {
	        return this.left.eval(context) > this.right.eval(context);
	    };
	
	    defineBinaryOperation('LessEqualOperation');
	    node.LessEqualOperation.prototype.eval = function (context) {
	        return this.left.eval(context) <= this.right.eval(context);
	    };
	
	    defineBinaryOperation('GreaterEqualOperation');
	    node.GreaterEqualOperation.prototype.eval = function (context) {
	        return this.left.eval(context) >= this.right.eval(context);
	    };
	}
	;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.NotOperation = function (token, expression) {
	        this.token = token;
	        this.expression = expression;
	        this.alias = 'not';
	    };
	
	    node.NotOperation.prototype.eval = function (context) {
	        return !this.expression.eval(context);
	    };
	
	    node.SubstractionOperation = function (token, expression) {
	        this.token = token;
	        this.expression = expression;
	        this.alias = '-';
	    };
	
	    node.SubstractionOperation.prototype.eval = function (context) {
	        return -this.expression.eval(context);
	    };
	}
	;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function (node, constants) {
	    node.HasStones = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'hasStones';
	        this.parameters = parameters;
	    };
	
	    node.HasStones.prototype.eval = function (context) {
	        return context.board().amountStones(this.parameters[0].eval(context)) > 0;
	    };
	
	    node.CanMove = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'canMove';
	        this.parameters = parameters;
	    };
	
	    node.CanMove.prototype.eval = function (context) {
	        return context.board().canMove(this.parameters[0].eval(context));
	    };
	
	    node.NumStones = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'numStones';
	        this.parameters = parameters;
	    };
	
	    node.NumStones.prototype.eval = function (context) {
	        return context.board().amountStones(this.parameters[0].eval(context));
	    };
	
	    node.MinDir = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'minDir';
	        this.parameters = parameters;
	    };
	
	    node.MinDir.prototype.eval = function (context) {
	        return context.nativeRepresentations().minDir;
	    };
	
	    node.MaxDir = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'maxDir';
	        this.parameters = parameters;
	    };
	
	    node.MaxDir.prototype.eval = function (context) {
	        return context.nativeRepresentations().maxDir;
	    };
	
	    node.MaxColor = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'maxColor';
	        this.parameters = parameters;
	    };
	
	    node.MaxColor.prototype.eval = function (context) {
	        return context.nativeRepresentations().maxColor;
	    };
	
	    node.MinColor = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'minColor';
	        this.parameters = parameters;
	    };
	
	    node.MinColor.prototype.eval = function (context) {
	        return context.nativeRepresentations().minColor;
	    };
	
	    node.MinBool = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'minBool';
	        this.parameters = parameters;
	    };
	
	    node.MinBool.prototype.eval = function () {
	        return false;
	    };
	
	    node.MaxBool = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.EXPRESSION;
	        this.alias = 'maxBool';
	        this.parameters = parameters;
	    };
	
	    node.MaxBool.prototype.eval = function () {
	        return true;
	    };
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function (node, constants) {
	    node.MoveClaw = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'MoveClaw';
	        this.parameters = parameters;
	    };
	
	    node.MoveClaw.prototype.interpret = function (context) {
	        try {
	            context.board().move(this.parameters[0].eval(context));
	        } catch (err) {
	            err.on = this.token;
	            throw err;
	        }
	        return context;
	    };
	
	    node.RemoveStone = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'Grab';
	        this.parameters = parameters;
	    };
	
	    node.RemoveStone.prototype.interpret = function (context) {
	        try {
	            context.board().removeStone(this.parameters[0].eval(context));
	        } catch (err) {
	            err.on = this.token;
	            throw err;
	        }
	        return context;
	    };
	
	    node.PutStone = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'Drop';
	        this.parameters = parameters;
	    };
	
	    node.PutStone.prototype.interpret = function (context) {
	        context.board().putStone(this.parameters[0].eval(context));
	        return context;
	    };
	
	    node.MoveToEdge = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'MoveToEdge';
	        this.parameters = parameters;
	    };
	
	    node.MoveToEdge.prototype.interpret = function (context) {
	        context.board().moveToEdge(this.parameters[0].eval(context));
	        return context;
	    };
	
	    node.CleanBoard = function (token, parameters) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'CleanBoard';
	        this.parameters = parameters;
	    };
	
	    node.CleanBoard.prototype.interpret = function (context) {
	        context.board().clear();
	        return context;
	    };
	
	    node.Boom = function (token) {
	        this.token = token;
	        this.arity = constants.STM;
	        this.alias = 'BOOM';
	    };
	
	    node.Boom.prototype.interpret = function (context) {
	        try {
	            context.board().boom();
	        } catch (err) {
	            err.on = node;
	            throw err;
	        }
	        return context;
	    };
	}
	;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    function evalArguments(context, parameters) {
	        var results = [];
	        if (parameters) {
	            for (var i = 0; i < parameters.length; i++) {
	                results.push(parameters[i].eval(context));
	            }
	        }
	        return results;
	    }
	
	    function fillParameters(context, parameters, declaration) {
	        // TODO: no se pueden reasignar valores a los parámetros
	        if (declaration.parameters) {
	            for (var i = 0; i < declaration.parameters.length; i++) {
	                context.put(declaration.parameters[i].value, parameters[i]);
	            }
	        }
	    }
	
	    // TODO: el mundo de las variables, índices y parámetros debe ser disjunto por body!!
	
	    node.ProcedureCall = function (token, declarationProvider, parameters) {
	        this.token = token;
	        this.arity = 'routine';
	        this.alias = 'ProcedureCall';
	        this.name = token.value;
	        this.parameters = parameters;
	        this.declarationProvider = declarationProvider;
	    };
	
	    node.ProcedureCall.prototype.interpret = function (context) {
	        var target = this.declarationProvider();
	        if (!target.declaration) {
	            throw new node.errors.InterpreterException('El procedimiento ' + this.name + ' no se encuentra definido.', this.node);
	        }
	        var declaration = target.declaration;
	        var parameterValues = evalArguments(context, this.parameters);
	        context.startContext();
	        fillParameters(context, parameterValues, declaration);
	        node.interpretBlock(declaration.body, context);
	        context.stopContext();
	        return context;
	    };
	
	    node.FunctionCall = function (token, declarationProvider, parameters) {
	        this.token = token;
	        this.arity = 'routine';
	        this.alias = 'FunctionCall';
	        this.name = token.value;
	        this.parameters = parameters;
	        this.declarationProvider = declarationProvider;
	    };
	
	    node.FunctionCall.prototype.eval = function (context) {
	        var target = this.declarationProvider();
	        if (!target.declaration) {
	            throw new node.errors.InterpreterException('La función "' + this.name + '" no se encuentra definida.', this.node);
	        }
	        var declaration = target.declaration;
	        var parameterValues = evalArguments(context, this.parameters);
	        context.startContext();
	        context.pushBoard();
	        fillParameters(context, parameterValues, declaration);
	        node.interpretBlock(target.body, context);
	        var result = declaration.return.expression.eval(context);
	        context.popBoard();
	        context.stopContext();
	        return result;
	    };
	}
	;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.ProcedureDeclaration = function (token, parameters, body) {
	        this.token = token;
	        this.name = token.value;
	        this.arity = 'routine';
	        this.alias = 'procedureDeclaration';
	        this.parameters = parameters || [];
	        this.body = body || [];
	    };
	
	    node.FunctionDeclaration = function (token, parameters, body, returnExpression) {
	        this.token = token;
	        this.name = token.value;
	        this.arity = 'routine';
	        this.alias = 'functionDeclaration';
	        this.parameters = parameters || [];
	        this.body = body || [];
	        this.return = returnExpression;
	    };
	
	    node.ReturnStatement = function (token, expression) {
	        this.token = token;
	        this.alias = 'return';
	        this.expression = expression;
	    };
	}
	;


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.While = function (token, expression, body) {
	        this.alias = 'while';
	        this.token = token;
	        this.expression = expression;
	        this.body = body;
	    };
	
	    node.While.prototype.interpret = function (context) {
	        while (this.expression.eval(context)) {
	            node.interpretBlock(this.body, context);
	        }
	        return context;
	    };
	
	    node.Repeat = function (token, expression, body) {
	        this.alias = 'repeat';
	        this.token = token;
	        this.expression = expression;
	        this.body = body;
	    };
	
	    node.Repeat.prototype.interpret = function (context) {
	        var value = this.expression.eval(context);
	        for (var i = 0; i < value; i++) {
	            node.interpretBlock(this.body, context);
	        }
	        return context;
	    };
	
	    node.ForEach = function (token, iterator, items, body) {
	        this.alias = 'foreach';
	        this.token = token;
	        this.iterator = iterator;
	        this.items = items;
	        this.body = body;
	    };
	
	    node.ForEach.prototype.interpret = function (context) {
	        for (var i = 0; i < this.items.length; i++) {
	            context.put(this.iterator.token.value, this.items[i].eval(context));
	            node.interpretBlock(this.body, context);
	        }
	
	        return context;
	    };
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function (node) {
	    node.Program = function (token, body) {
	        this.token = token;
	        this.alias = 'program';
	        this.body = body || [];
	    };
	
	    node.Program.prototype.interpret = function (context) {
	        node.interpretBlock(this.body, context);
	        return context;
	    };
	
	    node.Root = function (program, declarations) {
	        this.alias = 'root';
	        this.program = program;
	        this.declarations = declarations;
	    };
	
	    node.Root.prototype.interpret = function (context) {
	        this.program.interpret(context);
	        return context;
	    };
	}
	;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(23);
	
	var Context = function () {
	    var variablesStack = [];
	    var boardsStack = [];
	    var currentBoard = new Board(9, 9);
	    var currentVariables = {};
	
	    this.init = function () {
	        currentBoard.init();
	    };
	
	    this.nativeRepresentations = function () {
	        return Board;
	    };
	
	    this.board = function () {
	        return currentBoard;
	    };
	
	    this.put = function (key, value) {
	        currentVariables[key] = value;
	    };
	
	    this.get = function (id) {
	        return currentVariables[id];
	    };
	
	    this.all = function () {
	        return currentVariables;
	    };
	
	    this.startContext = function () {
	        variablesStack.push(currentVariables);
	        currentVariables = {};
	    };
	
	    this.stopContext = function () {
	        currentVariables = variablesStack.pop();
	    };
	
	    this.pushBoard = function () {
	        boardsStack.push(currentBoard);
	        currentBoard = currentBoard.clone();
	    };
	
	    this.popBoard = function () {
	        currentBoard = boardsStack.pop();
	    };
	
	    this.init();
	};
	
	module.exports = Context;


/***/ },
/* 23 */
/***/ function(module, exports) {

	var GobstonesError = function (message) {
	    this.message = message;
	};
	GobstonesError.prototype = new Error('BOOM');
	
	function Board(sizeX, sizeY) {
	    this.x = 0;
	    this.y = 0;
	
	    this.sizeX = sizeX;
	    this.sizeY = sizeY;
	}
	
	Board.blue = 0;
	Board.red = 1;
	Board.black = 2;
	Board.green = 3;
	
	Board.north = [0, 1];
	Board.east = [1, 0];
	Board.south = [0, -1];
	Board.west = [-1, 0];
	
	Board.minDir = Board.north;
	Board.maxDir = Board.west;
	Board.minColor = Board.blue;
	Board.maxColor = Board.green;
	
	Board.prototype.init = function () {
	    this.table = [[], [], [], []];
	    for (var i = 0; i < this.sizeX; i++) {
	        this.table[0][i] = [];
	        this.table[1][i] = [];
	        this.table[2][i] = [];
	        this.table[3][i] = [];
	        for (var j = 0; j < this.sizeY; j++) {
	            this.table[0][i][j] = 0;
	            this.table[1][i][j] = 0;
	            this.table[2][i][j] = 0;
	            this.table[3][i][j] = 0;
	        }
	    }
	};
	
	Board.prototype.clone = function () {
	    var c = new Board(this.sizeX, this.sizeY);
	    c.init();
	    for (var i = 0; i < this.sizeX; i++) {
	        c.table[0][i] = [];
	        c.table[1][i] = [];
	        c.table[2][i] = [];
	        c.table[3][i] = [];
	        for (var j = 0; j < this.sizeY; j++) {
	            c.table[0][i][j] = this.table[0][i][j];
	            c.table[1][i][j] = this.table[1][i][j];
	            c.table[2][i][j] = this.table[2][i][j];
	            c.table[3][i][j] = this.table[3][i][j];
	        }
	    }
	    c.x = this.x;
	    c.y = this.y;
	    return c;
	};
	
	Board.prototype.putStone = function (color) {
	    this.dropStones(color, 1);
	};
	
	Board.prototype.dropStones = function (color, amount) {
	    this.table[color][this.x][this.y] += amount;
	};
	
	Board.prototype.removeStone = function (color) {
	    if (this.table[color][this.x][this.y] <= 0) {
	        throw new GobstonesError('Se intentó sacar una bolita pero ya no quedaban bolitas para sacar');
	    }
	    this.table[color][this.x][this.y] -= 1;
	};
	
	Board.prototype.boom = function () {
	    throw new GobstonesError('BOOM!');
	};
	
	Board.prototype.clear = function () {
	    this.init();
	};
	
	Board.prototype.amountStones = function (color) {
	    return this.table[color][this.x][this.y];
	};
	
	Board.prototype.canMove = function (vec) {
	    var nextX = this.x + vec[0];
	    var nextY = this.y + vec[1];
	    return nextX < this.sizeX && nextX >= 0 && nextY < this.sizeY && nextY >= 0;
	};
	
	Board.prototype.move = function (vec) {
	    if (!this.canMove(vec)) {
	        throw new GobstonesError('Te caiste del tablero por: x=' + this.x + ' y=' + this.y);
	    }
	    this.x += vec[0];
	    this.y += vec[1];
	};
	
	Board.prototype.moveToEdge = function (vec) {
	    if (vec[0] === 1) {
	        this.x = this.sizeX - 1;
	    } else if (vec[0] === -1) {
	        this.x = 0;
	    } else if (vec[1] === 1) {
	        this.y = this.sizeY - 1;
	    } else if (vec[1] === -1) {
	        this.y = 0;
	    }
	};
	
	Board.prototype.printAscii = function () {
	    var out = this.sizeX + 'x' + this.sizeY + '\n';
	    var az = this.table[0];
	    var ro = this.table[1];
	    var ne = this.table[2];
	    var ve = this.table[3];
	    for (var j = this.sizeY - 1; j >= 0; j--) {
	        for (var i = 0; i < this.sizeX; i++) {
	            out += (az[i][j] || ro[i][j] || ne[i][j] || ve[i][j]) ? '#' : '.';
	        }
	        out += '\n';
	    }
	    return out;
	};
	
	module.exports = Board;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(23);
	var stringUtils = __webpack_require__(25);
	
	var gbbReader = {
	};
	
	gbbReader.fromString = function (gbbString) {
	    var gbbCode = this._try(gbbString);
	
	    var rawLines = stringUtils.splitByLines(gbbCode);
	    var lines = rawLines.filter(function (line) {
	        return !/^GBB\/(\d\.)+\d$/.test(line) && line !== '';
	    });
	
	    return this._buildBoard(lines);
	};
	
	gbbReader._buildBoard = function (lines) {
	    var dimensions = this._getDimensions(lines);
	    var header = this._getHeader(lines);
	
	    try {
	        var board = new Board(dimensions[0], dimensions[1]);
	        board.init();
	        this._putCells(lines, board);
	        board.x = header[0];
	        board.y = header[1];
	
	        return board;
	    } catch (err) {
	        var error = new Error('Error building the board');
	        error.inner = err;
	        throw error;
	    }
	};
	
	gbbReader._getDimensions = function (lines) {
	    var dimensions = this._try(
	        lines[0].match(/^size (\d+) (\d+)$/)
	    , 'dimensions');
	    return this._getPositionOf(dimensions);
	};
	
	gbbReader._getHeader = function (lines) {
	    var header = this._try(
	        lines[lines.length - 1].match(/^head (\d+) (\d+)$/)
	    , 'header');
	    return this._getPositionOf(header);
	};
	
	gbbReader._putCells = function (lines, board) {
	    var CELL_REGEXP = /^cell (\d+) (\d+)/;
	
	    var cellLines = lines.filter(function (line) {
	        return CELL_REGEXP.test(line);
	    });
	
	    cellLines.forEach(function (line) {
	        var cell = line.match(CELL_REGEXP);
	        var position = this._getPositionOf(cell, line);
	
	        board.x = position[0];
	        board.y = position[1];
	        this._putBalls(line, board);
	    }.bind(this));
	};
	
	gbbReader._putBalls = function (line, board) {
	    var values = stringUtils.scan(line, /(Azul|Negro|Rojo|Verde) (\d+)/g);
	    var getAmount = function (color) {
	        var value = values.filter(function (it) {
	            return it[0] === color;
	        });
	        return parseInt((value[0] || {})[1] || 0, 0);
	    };
	
	    board.dropStones(Board.blue, getAmount('Azul'));
	    board.dropStones(Board.black, getAmount('Negro'));
	    board.dropStones(Board.red, getAmount('Rojo'));
	    board.dropStones(Board.green, getAmount('Verde'));
	};
	
	gbbReader._getPositionOf = function (source, element) {
	    source = source || {};
	
	    return [
	        this._try(source[1], element), this._try(source[2], element)
	    ].map(function (it) {
	        return parseInt(it, 0);
	    });
	};
	
	gbbReader._try = function (value, thingToParse) {
	    if (!value) {
	        throw new Error('Error parsing ' + (thingToParse || 'GBB file'));
	    }
	    return value;
	};
	
	module.exports = gbbReader;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
	    splitByLines: function (string) {
	        return string.split(/\r\n|\r|\n/);
	    },
	
	    scan: function (string, regExp) {
	        if (!regExp.global) {
	            throw new Error('The regExp must be global (with "g" flag)');
	        }
	        var m = [];
	        var r = m;
	        m = regExp.exec(string);
	        while (m) {
	            m.shift();
	            r.push(m);
	            m = regExp.exec(string);
	        }
	        return r;
	    }
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map