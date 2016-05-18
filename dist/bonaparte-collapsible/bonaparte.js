/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(81);


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	///////////////////////////////////////////////////////////////////////////////
	// Public 

	module.exports = __webpack_require__(15);

	///////////////////////////////////////////////////////////////////////////////
	// Polyfills

	if(typeof document.addEventListener === "function") { // no polyfills for IE8 -> silently fail.
	  
	  if(!("MutationObserver" in document)) {
	    MutationObserver = __webpack_require__(21);
	  };
	  __webpack_require__(22);
	  __webpack_require__(23);


	  if (Element && !Element.prototype.matches) {
	      var proto = Element.prototype;
	      proto.matches = proto.matchesSelector ||
	          proto.mozMatchesSelector || proto.msMatchesSelector ||
	          proto.oMatchesSelector || proto.webkitMatchesSelector;
	  }
	}


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var objct = __webpack_require__(16);

	///////////////////////////////////////////////////////////////////////////////
	// Public

	module.exports = {
	  tag : {
	    create : __webpack_require__(18),
	    contains : nodeContains,
	    observe : observe,
	    triggerEvent : triggerEvent,
	    closest : getClosest,
	    DOMReady : DOMReady
	  },
	  attribute : {
	    get : getAttribute,
	    set : setAttribute,
	    remove : removeAttribute,
	    matchName : matchAttribute
	  },
	  mixin : {
	    create : mixin
	  }
	};

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
	var observedElements = [];

	function observe(element){
	  if(observedElements.indexOf(element)>=0) return;

	  element.bonaparte = element.bonaparte || {};
	  element.bonaparte.observer = new MutationObserver(mutationHandler);

	  element.bonaparte.observer.observe(element, {
	    attributes:true,
	    attributeOldValue:true,
	    childList:true
	  });
	  observedElements.push(element);
	}

	///////////////////////////////////////////////////////////////////////////////

	function mutationHandler(mutations){
	  for(var i=0; i<mutations.length; i++) switch(mutations[i].type) {
	    case "attributes":
	      var attribute = mutations[i].attributeName;
	      var tag = mutations[i].target;
	      var data = {
	        name : attribute,
	        oldValue : mutations[i].oldValue,
	        newValue : tag.attributes[attribute] ? tag.attributes[attribute].value : null
	      };

	      if(data.oldValue !== data.newValue)
	        triggerEvent(tag, "bonaparte.tag.attributeChanged", data);
	      triggerEvent(tag, "bonaparte.tag.attributeUpdated", data);
	    break;
	    case "childList":
	      triggerEvent(mutations[i].target, "bonaparte.tag.childrenChanged", {
	        added : mutations[i].addedNodes,
	        removed : mutations[i].removedNodes
	      });
	    break;
	  }
	}

	///////////////////////////////////////////////////////////////////////////////

	function mixin() {
	  return objct(arguments);
	}

	///////////////////////////////////////////////////////////////////////////////

	function DOMReady(handler){
	  if(document.readyState === "complete") handler();
	  else window.addEventListener("load", handler);
	}
	///////////////////////////////////////////////////////////////////////////////

	function triggerEvent(tag, event, data, bubbles, cancelable){
	    var newEvent = new CustomEvent(event, {
	        bubbles: bubbles || false,
	        cancelable: cancelable || false,
	        detail: data
	    });
	    tag.dispatchEvent(newEvent);
	}

	///////////////////////////////////////////////////////////////////////////////


	function nodeContains(parent, child) {
	  while((child=child.parentNode)&&child!==parent);
	  return !!child;
	};

	///////////////////////////////////////////////////////////////////////////////

	function getClosest(tag, name){
	  while((tag=tag.parentNode)&&tag.nodeName.toUpperCase()!==name.toUpperCase());
	  return tag ? tag:false;

	}

	///////////////////////////////////////////////////////////////////////////////

	function getAttribute(tag, name){
	  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
	  return attribute ? attribute.value : undefined;
	}
	///////////////////////////////////////////////////////////////////////////////

	function matchAttribute(patterns, name){
	  var pattern, dataPattern;
	  if(!objct.isArray(patterns)) patterns = [patterns];

	  for(var i=0; i<patterns.length; i++) {
	    pattern = patterns[i];
	    dataPattern = new RegExp("data-"+pattern.source);
	    if(pattern.test(name) ||  dataPattern.test(name))
	      return true;
	  }
	  return false;
	}

	///////////////////////////////////////////////////////////////////////////////

	function setAttribute(tag, name, value) {
	  name = tag.hasAttribute("data-"+name) ? "data-"+name : name;
	  var oldValue = getAttribute(tag, name);

	  tag.setAttribute(name, value);
	}

	///////////////////////////////////////////////////////////////////////////////

	function removeAttribute(tag, name) {
	  if(typeof tag.attributes[name] !== "object") return;

	  // remove attribute
	  tag.removeAttribute(name);
	  tag.removeAttribute("data-"+name);

	}

	///////////////////////////////////////////////////////////////////////////////


/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*! 
	 * objct - v0.x (https://github.com/greenish/js-objct)
	 * 
	 * Copyright (c) 2015 Philipp Adrian (www.philippadrian.com)
	 *
	 * The MIT Licence (http://opensource.org/licenses/MIT)
	 */
	////////////////////////////////////////////////////////////////////////////////
	(function(commonJSmodule, undefined){
	"use strict";

	////////////////////////////////////////////////////////////////////////////////
	var Objct = function(){};
	var NewObj = function(){return {};};
	var hash = "jmuMMRs6AUUG293HXcs8Z0ofQlkG0hqiNAJlZq2hHYakBQmyfnRuCsh2yf-d7n";
	var testExecutable = new RegExp("\\b"+hash+"\\b");
	var strFunction = "function";
	var strObject = "object";
	var strArray = Array.toString();
	var objectKeys = Object.keys || Objct;
	////////////////////////////////////////////////////////////////////////////////
	var checkType = function(value){
		var	type = typeof value;
		return type === strFunction || (type === strObject && !factory.isArray(value));
	};
	////////////////////////////////////////////////////////////////////////////////
	var instantiateFunction = function(fn, args){
		Objct.prototype = fn.prototype;
		var f = new Objct();
		Objct.prototype = null;
		var r = fn.apply(f, args);
		if(checkType(r)) return r;
		return f;		
	};
	////////////////////////////////////////////////////////////////////////////////
	var decoratedProperty = function(target, source, k, data) {
		target[k] = typeof source[k] === strFunction && source[k].hash === hash?
			source[k].call(data.i, {
				args:data.a, 
				modules:data.m, 
				target:target,
				key:k
			}):
			source[k];
	};
	////////////////////////////////////////////////////////////////////////////////
	var decoratedModule = function(module, data, instance) {
		return typeof module === strFunction && module.hash === hash ?
			module.call(instance, {
				args:data.a, 
				modules:data.m
			}):
			module;
	}
	////////////////////////////////////////////////////////////////////////////////
	var mixinObject = function(target, source, data, keys) {
		var k = -1, length;
		keys = keys || objectKeys(source);
		if(typeof keys === strObject) {
			length = keys.length;	
			if(data.d) 
				while(++k < length) 
					decoratedProperty(target, source, keys[k], data);
			else 
				while(++k < length) 
					target[keys[k]]=source[keys[k]];
		}
		else {
			if(data.d) 
				for(k in source) 
					decoratedProperty(target, source, k, data);
			else 
				for(k in source) 
					target[k]=source[k];
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	var mixinFunction = function(target, fn, data){
		var proto = fn.prototype;
		var instance, keys;

		mixinObject(target, proto, data);

		if(!data.d) {
			fn.apply(target, data.a);
			return;
		}

		fn.prototype = target;
		instance = instantiateFunction(fn, data.a);
		fn.prototype = proto;

		keys = typeof Object.getOwnPropertyNames === strFunction ?
			Object.getOwnPropertyNames(instance):
			undefined;
		
		mixinObject(target, instance, data, keys);
	};
	////////////////////////////////////////////////////////////////////////////////
	var build = function(modules, data){
		var isFunction, i=-1;
		var instance, obj, length = modules.length;

		while(++i<length) {
			obj = data.d ?
				decoratedModule(modules[i].obj, data, data.i):
				modules[i].obj;

			// first Module
			if(i === 0) {
				// very first module
				if(data.i === null) {
					data.i = obj === NewObj ? 
						NewObj():
						typeof obj === strFunction ?
							instantiateFunction(obj, data.a):
							obj;
					// call first modules decorators
					data.d && mixinObject(data.i, data.i, data);
					continue;
				}
				else if(obj === NewObj) continue;
			} 

			//module is factory? -> call it
			modules[i].isFactory ?
				obj.call({hash:hash}, modules[i], data):
				// module is function?
				typeof obj === strFunction ?
					mixinFunction(data.i, obj, data):
					// module is object
					mixinObject(data.i, obj, data);
		}

		return data.i;
	};
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	var factory = function(){
		Array.prototype.unshift.call(arguments, NewObj);
		return factory.extend.call({
			hash:hash,
			i : this instanceof factory,
			d : false,
			arguments : arguments
		});
	};
	//////////////////////////////////////////////////////////////////////////////
	factory.e = function(){
		Array.prototype.unshift.call(arguments, NewObj);
		return factory.extend.call({
			hash:hash,
			i : this instanceof factory.e,
			d : true,
			arguments : arguments
		});
	};
	//////////////////////////////////////////////////////////////////////////////
	factory.e.extend = function(){
		return factory.extend.call({
			hash:hash,
			i : this instanceof factory.e.extend,
			d : true,
			arguments : arguments
		});
	};
	//////////////////////////////////////////////////////////////////////////////
	factory.extend = function(){
		////////////////////////////////////////////////////////////////////////
		var Executable = function Executable(module, data){
			"jmuMMRs6AUUG293HXcs8Z0ofQlkG0hqiNAJlZq2hHYakBQmyfnRuCsh2yf-d7n";
			var that = this || {};

			//////////////////////////
			// Continue building process
			//////////////////////////
			if(that && typeof that.hash === "string" && that.hash === hash) {
				// pass up modules
				module.m = thisData.m;
				return build(thisData.m, data);
			}
			//////////////////////////
			// Start building process
			//////////////////////////
			
			thisData.a = arguments;
			return build(thisData.m, thisData);
		};
		////////////////////////////////////////////////////////////////////////
		var that = this || {};
		var thisData = {
			a : [], // args
			m : [], // modules
			i : null, // instance
			d : that.hash === hash ? that.d : false // decorated
		};
		var type;
		var args = arguments.length > 0 ? arguments : that.arguments;
		var instant = this instanceof factory.extend || that.i;

		//setup modules
		var i=-1;
		while(++i < args.length) {
			type = typeof args[i];
			if(!checkType(args[i])) {
				if(type !== strObject) {
					throw("objct: Unexpected '"+type+"'! Only 'functions' and 'objects' can be used with objct.");
				}
				else {
					Array.prototype.splice.apply(args, [i,1].concat(args[i]));
					i--;
					continue;
				}
			}

			thisData.m.push({ 
				obj : args[i],
				isFactory : type === strFunction && testExecutable.test(args[i])
			});

			// if module is a function and not a decorator, copy static properties to Executable
			if(!instant && type === strFunction && args[i].hash !== hash)
				mixinObject(Executable, args[i], thisData);
		}	
		return instant ? new Executable() : Executable;
	};
	////////////////////////////////////////////////////////////////////////////////
	factory.e.decorator = function(fn){
		var type = typeof fn;
		if(type !== strFunction) 
			throw("objct.decorator: Unexpected '"+type+"'! Objct.decorator only takes one function as argument.");
		return function(){
			var args = Array.prototype.slice.call(arguments);
			var f = function(decoratorData){
				return fn.apply(this, [decoratorData].concat(args));
			};
			f.hash=hash;
			return f;
		};
	};
	////////////////////////////////////////////////////////////////////////////////
	factory.isObjct = function(obj){
	  return testExecutable.test(obj);
	};
	////////////////////////////////////////////////////////////////////////////////
	// isArray fallback for ie<9
	factory.isArray = Array.isArray || function (obj) {
		return (typeof obj == strObject 
			&& Object.prototype.toString.call(obj) === "[object Array]")
			|| ("constructor" in obj && String(obj.constructor) === strArray);
	};
	////////////////////////////////////////////////////////////////////////////////

	// Connect to Environment 
	commonJSmodule.exports = factory;

	////////////////////////////////////////////////////////////////////////////////
	})( false? {} : module);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module)))

/***/ },

/***/ 17:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var objct = __webpack_require__(16);
	var bp = __webpack_require__(15);

	///////////////////////////////////////////////////////////////////////////////

	var registeredTags = {};

	///////////////////////////////////////////////////////////////////////////////
	// Public

	module.exports = createTag;

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	function createTag(name, modules, nativeBaseElement){
	  var modulesType = (objct.isArray(modules) && "array") || typeof modules;

	  if(modulesType === "function")
	    modules = [modules];
	  else if(modulesType !== "array")
	    throw "Bonaparte - createTag: Unexpected "+modulesType+". Expected Function or Array."

	  nativeBaseElement = nativeBaseElement || window.HTMLElement || window.Element;

	///////////////////////////////////////////////////////////////////////////////
	// Public

	  function tagFactory(){};
	  tagFactory.register = register;
	  tagFactory.initialize = initialize;
	  tagFactory.mixin = mixin;

	///////////////////////////////////////////////////////////////////////////////

	  var definition = objct(modules, tagFactory);
	  return definition;

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	  function register(){

	    if(typeof document.registerElement === "undefined") { // If IE8 make tag stylable but otherwise do nothing.
	      document.createElement("bonaparte-"+name);
	      return definition;
	    }
	    registeredTags[name] = registeredTags[name] !== undefined ?
	      registeredTags[name]:
	      document.registerElement("bonaparte-"+name, {
	        prototype : Object.create( nativeBaseElement.prototype , {
	          createdCallback : { value: createdCallback },
	          attachedCallback : { value: attachedCallback },
	          detachedCallback : { value: detachedCallback }
	        })
	      });

	    return definition;
	  }

	///////////////////////////////////////////////////////////////////////////////

	  function mixin(mixin){
	    objct.extend(definition, mixin);
	    return definition;
	  }

	///////////////////////////////////////////////////////////////////////////////

	  function initialize(element){
	    apply(element);
	    return definition;
	  }

	///////////////////////////////////////////////////////////////////////////////

	  function createdCallback() {
	    apply(this);
	    this.bonaparte.triggerEvent("bonaparte.tag.created", null);
	  }

	///////////////////////////////////////////////////////////////////////////////

	  function apply(element) {
	    var modules = [
	      __webpack_require__(19),
	      definition,
	      __webpack_require__(20)
	    ];

	    // Create bonaparte namespace
	    element.bonaparte = element.bonaparte || {};

	    // Create and mixin tag instance
	    objct.extend(element, modules)(element);
	  }

	///////////////////////////////////////////////////////////////////////////////

	}

	///////////////////////////////////////////////////////////////////////////////

	function attachedCallback() {
	  this.bonaparte.triggerEvent("bonaparte.tag.attached", null);
	}

	///////////////////////////////////////////////////////////////////////////////

	function detachedCallback() {
	  this.bonaparte.triggerEvent("bonaparte.tag.detached", null);
	}

	///////////////////////////////////////////////////////////////////////////////


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var bp = __webpack_require__(14);

	///////////////////////////////////////////////////////////////////////////////
	// Public

	module.exports = events;

	///////////////////////////////////////////////////////////////////////////////
	function events(tag){
	  bp.tag.observe(tag);

	///////////////////////////////////////////////////////////////////////////////
	// Public
	  tag.bonaparte.triggerEvent = triggerEvent;

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	  function triggerEvent(event, data, bubbles, cancelable){
	    bp.tag.triggerEvent(tag, event, data, bubbles, cancelable);
	  }

	///////////////////////////////////////////////////////////////////////////////

	}


/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var objct = __webpack_require__(16);

	var registeredMixins = {};

	///////////////////////////////////////////////////////////////////////////////
	// Public

	module.exports = mixins;

	///////////////////////////////////////////////////////////////////////////////
	function mixins(tag){

	  registeredMixins[tag.tagName] = registeredMixins[tag.tagName] || [];
	  new objct.extend(tag, registeredMixins[tag.tagName]);

	///////////////////////////////////////////////////////////////////////////////
	// Public

	  tag.bonaparte.mixin = mixin;

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////

	  function mixin(mixin){
	    if( typeof mixin !== "function" ) throw "Unexpected type of "+(typeof mixin)+"! Expected function.";

	    // Save mixin
	    registeredMixins[tag.tagName].push(mixin);

	    // apply mixin to current tag.
	    new objct.extend(tag, mixin);

	  }

	///////////////////////////////////////////////////////////////////////////////

	}

/***/ },

/***/ 21:
/***/ function(module, exports) {

	var MutationObserver = window.MutationObserver
	  || window.WebKitMutationObserver
	  || window.MozMutationObserver;

	/*
	 * Copyright 2012 The Polymer Authors. All rights reserved.
	 * Use of this source code is goverened by a BSD-style
	 * license that can be found in the LICENSE file.
	 */

	var WeakMap = window.WeakMap;

	if (typeof WeakMap === 'undefined') {
	  var defineProperty = Object.defineProperty;
	  var counter = Date.now() % 1e9;

	  WeakMap = function() {
	    this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
	  };

	  WeakMap.prototype = {
	    set: function(key, value) {
	      var entry = key[this.name];
	      if (entry && entry[0] === key)
	        entry[1] = value;
	      else
	        defineProperty(key, this.name, {value: [key, value], writable: true});
	      return this;
	    },
	    get: function(key) {
	      var entry;
	      return (entry = key[this.name]) && entry[0] === key ?
	          entry[1] : undefined;
	    },
	    'delete': function(key) {
	      var entry = key[this.name];
	      if (!entry) return false;
	      var hasValue = entry[0] === key;
	      entry[0] = entry[1] = undefined;
	      return hasValue;
	    },
	    has: function(key) {
	      var entry = key[this.name];
	      if (!entry) return false;
	      return entry[0] === key;
	    }
	  };
	}

	var registrationsTable = new WeakMap();

	// We use setImmediate or postMessage for our future callback.
	var setImmediate = window.msSetImmediate;

	// Use post message to emulate setImmediate.
	if (!setImmediate) {
	  var setImmediateQueue = [];
	  var sentinel = String(Math.random());
	  window.addEventListener('message', function(e) {
	    if (e.data === sentinel) {
	      var queue = setImmediateQueue;
	      setImmediateQueue = [];
	      queue.forEach(function(func) {
	        func();
	      });
	    }
	  });
	  setImmediate = function(func) {
	    setImmediateQueue.push(func);
	    window.postMessage(sentinel, '*');
	  };
	}

	// This is used to ensure that we never schedule 2 callas to setImmediate
	var isScheduled = false;

	// Keep track of observers that needs to be notified next time.
	var scheduledObservers = [];

	/**
	 * Schedules |dispatchCallback| to be called in the future.
	 * @param {MutationObserver} observer
	 */
	function scheduleCallback(observer) {
	  scheduledObservers.push(observer);
	  if (!isScheduled) {
	    isScheduled = true;
	    setImmediate(dispatchCallbacks);
	  }
	}

	function wrapIfNeeded(node) {
	  return window.ShadowDOMPolyfill &&
	      window.ShadowDOMPolyfill.wrapIfNeeded(node) ||
	      node;
	}

	function dispatchCallbacks() {
	  // http://dom.spec.whatwg.org/#mutation-observers

	  isScheduled = false; // Used to allow a new setImmediate call above.

	  var observers = scheduledObservers;
	  scheduledObservers = [];
	  // Sort observers based on their creation UID (incremental).
	  observers.sort(function(o1, o2) {
	    return o1.uid_ - o2.uid_;
	  });

	  var anyNonEmpty = false;
	  observers.forEach(function(observer) {

	    // 2.1, 2.2
	    var queue = observer.takeRecords();
	    // 2.3. Remove all transient registered observers whose observer is mo.
	    removeTransientObserversFor(observer);

	    // 2.4
	    if (queue.length) {
	      observer.callback_(queue, observer);
	      anyNonEmpty = true;
	    }
	  });

	  // 3.
	  if (anyNonEmpty)
	    dispatchCallbacks();
	}

	function removeTransientObserversFor(observer) {
	  observer.nodes_.forEach(function(node) {
	    var registrations = registrationsTable.get(node);
	    if (!registrations)
	      return;
	    registrations.forEach(function(registration) {
	      if (registration.observer === observer)
	        registration.removeTransientObservers();
	    });
	  });
	}

	/**
	 * This function is used for the "For each registered observer observer (with
	 * observer's options as options) in target's list of registered observers,
	 * run these substeps:" and the "For each ancestor ancestor of target, and for
	 * each registered observer observer (with options options) in ancestor's list
	 * of registered observers, run these substeps:" part of the algorithms. The
	 * |options.subtree| is checked to ensure that the callback is called
	 * correctly.
	 *
	 * @param {Node} target
	 * @param {function(MutationObserverInit):MutationRecord} callback
	 */
	function forEachAncestorAndObserverEnqueueRecord(target, callback) {
	  for (var node = target; node; node = node.parentNode) {
	    var registrations = registrationsTable.get(node);

	    if (registrations) {
	      for (var j = 0; j < registrations.length; j++) {
	        var registration = registrations[j];
	        var options = registration.options;

	        // Only target ignores subtree.
	        if (node !== target && !options.subtree)
	          continue;

	        var record = callback(options);
	        if (record)
	          registration.enqueue(record);
	      }
	    }
	  }
	}

	var uidCounter = 0;

	/**
	 * The class that maps to the DOM MutationObserver interface.
	 * @param {Function} callback.
	 * @constructor
	 */
	function JsMutationObserver(callback) {
	  this.callback_ = callback;
	  this.nodes_ = [];
	  this.records_ = [];
	  this.uid_ = ++uidCounter;
	}

	JsMutationObserver.prototype = {
	  observe: function(target, options) {
	    target = wrapIfNeeded(target);

	    // 1.1
	    if (!options.childList && !options.attributes && !options.characterData ||

	        // 1.2
	        options.attributeOldValue && !options.attributes ||

	        // 1.3
	        options.attributeFilter && options.attributeFilter.length &&
	            !options.attributes ||

	        // 1.4
	        options.characterDataOldValue && !options.characterData) {

	      throw new SyntaxError();
	    }

	    var registrations = registrationsTable.get(target);
	    if (!registrations)
	      registrationsTable.set(target, registrations = []);

	    // 2
	    // If target's list of registered observers already includes a registered
	    // observer associated with the context object, replace that registered
	    // observer's options with options.
	    var registration;
	    for (var i = 0; i < registrations.length; i++) {
	      if (registrations[i].observer === this) {
	        registration = registrations[i];
	        registration.removeListeners();
	        registration.options = options;
	        break;
	      }
	    }

	    // 3.
	    // Otherwise, add a new registered observer to target's list of registered
	    // observers with the context object as the observer and options as the
	    // options, and add target to context object's list of nodes on which it
	    // is registered.
	    if (!registration) {
	      registration = new Registration(this, target, options);
	      registrations.push(registration);
	      this.nodes_.push(target);
	    }

	    registration.addListeners();
	  },

	  disconnect: function() {
	    this.nodes_.forEach(function(node) {
	      var registrations = registrationsTable.get(node);
	      for (var i = 0; i < registrations.length; i++) {
	        var registration = registrations[i];
	        if (registration.observer === this) {
	          registration.removeListeners();
	          registrations.splice(i, 1);
	          // Each node can only have one registered observer associated with
	          // this observer.
	          break;
	        }
	      }
	    }, this);
	    this.records_ = [];
	  },

	  takeRecords: function() {
	    var copyOfRecords = this.records_;
	    this.records_ = [];
	    return copyOfRecords;
	  }
	};

	/**
	 * @param {string} type
	 * @param {Node} target
	 * @constructor
	 */
	function MutationRecord(type, target) {
	  this.type = type;
	  this.target = target;
	  this.addedNodes = [];
	  this.removedNodes = [];
	  this.previousSibling = null;
	  this.nextSibling = null;
	  this.attributeName = null;
	  this.attributeNamespace = null;
	  this.oldValue = null;
	}

	function copyMutationRecord(original) {
	  var record = new MutationRecord(original.type, original.target);
	  record.addedNodes = original.addedNodes.slice();
	  record.removedNodes = original.removedNodes.slice();
	  record.previousSibling = original.previousSibling;
	  record.nextSibling = original.nextSibling;
	  record.attributeName = original.attributeName;
	  record.attributeNamespace = original.attributeNamespace;
	  record.oldValue = original.oldValue;
	  return record;
	};

	// We keep track of the two (possibly one) records used in a single mutation.
	var currentRecord, recordWithOldValue;

	/**
	 * Creates a record without |oldValue| and caches it as |currentRecord| for
	 * later use.
	 * @param {string} oldValue
	 * @return {MutationRecord}
	 */
	function getRecord(type, target) {
	  return currentRecord = new MutationRecord(type, target);
	}

	/**
	 * Gets or creates a record with |oldValue| based in the |currentRecord|
	 * @param {string} oldValue
	 * @return {MutationRecord}
	 */
	function getRecordWithOldValue(oldValue) {
	  if (recordWithOldValue)
	    return recordWithOldValue;
	  recordWithOldValue = copyMutationRecord(currentRecord);
	  recordWithOldValue.oldValue = oldValue;
	  return recordWithOldValue;
	}

	function clearRecords() {
	  currentRecord = recordWithOldValue = undefined;
	}

	/**
	 * @param {MutationRecord} record
	 * @return {boolean} Whether the record represents a record from the current
	 * mutation event.
	 */
	function recordRepresentsCurrentMutation(record) {
	  return record === recordWithOldValue || record === currentRecord;
	}

	/**
	 * Selects which record, if any, to replace the last record in the queue.
	 * This returns |null| if no record should be replaced.
	 *
	 * @param {MutationRecord} lastRecord
	 * @param {MutationRecord} newRecord
	 * @param {MutationRecord}
	 */
	function selectRecord(lastRecord, newRecord) {
	  if (lastRecord === newRecord)
	    return lastRecord;

	  // Check if the the record we are adding represents the same record. If
	  // so, we keep the one with the oldValue in it.
	  if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
	    return recordWithOldValue;

	  return null;
	}

	/**
	 * Class used to represent a registered observer.
	 * @param {MutationObserver} observer
	 * @param {Node} target
	 * @param {MutationObserverInit} options
	 * @constructor
	 */
	function Registration(observer, target, options) {
	  this.observer = observer;
	  this.target = target;
	  this.options = options;
	  this.transientObservedNodes = [];
	}

	Registration.prototype = {
	  enqueue: function(record) {
	    var records = this.observer.records_;
	    var length = records.length;

	    // There are cases where we replace the last record with the new record.
	    // For example if the record represents the same mutation we need to use
	    // the one with the oldValue. If we get same record (this can happen as we
	    // walk up the tree) we ignore the new record.
	    if (records.length > 0) {
	      var lastRecord = records[length - 1];
	      var recordToReplaceLast = selectRecord(lastRecord, record);
	      if (recordToReplaceLast) {
	        records[length - 1] = recordToReplaceLast;
	        return;
	      }
	    } else {
	      scheduleCallback(this.observer);
	    }

	    records[length] = record;
	  },

	  addListeners: function() {
	    this.addListeners_(this.target);
	  },

	  addListeners_: function(node) {
	    var options = this.options;
	    if (options.attributes)
	      node.addEventListener('DOMAttrModified', this, true);

	    if (options.characterData)
	      node.addEventListener('DOMCharacterDataModified', this, true);

	    if (options.childList)
	      node.addEventListener('DOMNodeInserted', this, true);

	    if (options.childList || options.subtree)
	      node.addEventListener('DOMNodeRemoved', this, true);
	  },

	  removeListeners: function() {
	    this.removeListeners_(this.target);
	  },

	  removeListeners_: function(node) {
	    var options = this.options;
	    if (options.attributes)
	      node.removeEventListener('DOMAttrModified', this, true);

	    if (options.characterData)
	      node.removeEventListener('DOMCharacterDataModified', this, true);

	    if (options.childList)
	      node.removeEventListener('DOMNodeInserted', this, true);

	    if (options.childList || options.subtree)
	      node.removeEventListener('DOMNodeRemoved', this, true);
	  },

	  /**
	   * Adds a transient observer on node. The transient observer gets removed
	   * next time we deliver the change records.
	   * @param {Node} node
	   */
	  addTransientObserver: function(node) {
	    // Don't add transient observers on the target itself. We already have all
	    // the required listeners set up on the target.
	    if (node === this.target)
	      return;

	    this.addListeners_(node);
	    this.transientObservedNodes.push(node);
	    var registrations = registrationsTable.get(node);
	    if (!registrations)
	      registrationsTable.set(node, registrations = []);

	    // We know that registrations does not contain this because we already
	    // checked if node === this.target.
	    registrations.push(this);
	  },

	  removeTransientObservers: function() {
	    var transientObservedNodes = this.transientObservedNodes;
	    this.transientObservedNodes = [];

	    transientObservedNodes.forEach(function(node) {
	      // Transient observers are never added to the target.
	      this.removeListeners_(node);

	      var registrations = registrationsTable.get(node);
	      for (var i = 0; i < registrations.length; i++) {
	        if (registrations[i] === this) {
	          registrations.splice(i, 1);
	          // Each node can only have one registered observer associated with
	          // this observer.
	          break;
	        }
	      }
	    }, this);
	  },

	  handleEvent: function(e) {
	    // Stop propagation since we are managing the propagation manually.
	    // This means that other mutation events on the page will not work
	    // correctly but that is by design.
	    e.stopImmediatePropagation();

	    switch (e.type) {
	      case 'DOMAttrModified':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-attributes

	        var name = e.attrName;
	        var namespace = e.relatedNode.namespaceURI;
	        var target = e.target;

	        // 1.
	        var record = new getRecord('attributes', target);
	        record.attributeName = name;
	        record.attributeNamespace = namespace;

	        // 2.
	        var oldValue =
	            e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;

	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 3.1, 4.2
	          if (!options.attributes)
	            return;

	          // 3.2, 4.3
	          if (options.attributeFilter && options.attributeFilter.length &&
	              options.attributeFilter.indexOf(name) === -1 &&
	              options.attributeFilter.indexOf(namespace) === -1) {
	            return;
	          }
	          // 3.3, 4.4
	          if (options.attributeOldValue)
	            return getRecordWithOldValue(oldValue);

	          // 3.4, 4.5
	          return record;
	        });

	        break;

	      case 'DOMCharacterDataModified':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-characterdata
	        var target = e.target;

	        // 1.
	        var record = getRecord('characterData', target);

	        // 2.
	        var oldValue = e.prevValue;


	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 3.1, 4.2
	          if (!options.characterData)
	            return;

	          // 3.2, 4.3
	          if (options.characterDataOldValue)
	            return getRecordWithOldValue(oldValue);

	          // 3.3, 4.4
	          return record;
	        });

	        break;

	      case 'DOMNodeRemoved':
	        this.addTransientObserver(e.target);
	        // Fall through.
	      case 'DOMNodeInserted':
	        // http://dom.spec.whatwg.org/#concept-mo-queue-childlist
	        var target = e.relatedNode;
	        var changedNode = e.target;
	        var addedNodes, removedNodes;
	        if (e.type === 'DOMNodeInserted') {
	          addedNodes = [changedNode];
	          removedNodes = [];
	        } else {

	          addedNodes = [];
	          removedNodes = [changedNode];
	        }
	        var previousSibling = changedNode.previousSibling;
	        var nextSibling = changedNode.nextSibling;

	        // 1.
	        var record = getRecord('childList', target);
	        record.addedNodes = addedNodes;
	        record.removedNodes = removedNodes;
	        record.previousSibling = previousSibling;
	        record.nextSibling = nextSibling;

	        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
	          // 2.1, 3.2
	          if (!options.childList)
	            return;

	          // 2.2, 3.3
	          return record;
	        });

	    }

	    clearRecords();
	  }
	};

	if (!MutationObserver) {
	  MutationObserver = JsMutationObserver;
	}

	module.exports = MutationObserver;


/***/ },

/***/ 22:
/***/ function(module, exports) {

	/*! (C) WebReflection Mit Style License */
	(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)vt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(vt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(n--,F.splice(t--,1),vt(e,o))}function dt(e){throw new Error("A "+e+" type is already registered")}function vt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function mt(e){return e?(mt.prototype=e,new mt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){c=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=s.getAttribute(i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t}),-2<S.call(y,v+c)+S.call(y,d+c)&&dt(n);if(!m.test(c)||-1<S.call(g,c))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,c):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():c,c,p;return f&&-1<S.call(y,d+l)&&dt(l),p=y.push((f?v:d)+c)-1,w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[p]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");

/***/ },

/***/ 23:
/***/ function(module, exports) {

	// Polyfill for creating CustomEvents on IE9/10/11

	// code pulled from:
	// https://github.com/d4tocchini/customevent-polyfill
	// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

	try {
	  new window.CustomEvent("test");
	} catch(e) {
	 var CustomEvent = function(event, params) {
	      var evt;
	      params = params || {
	          bubbles: false,
	          cancelable: false,
	          detail: undefined
	      };

	      evt = document.createEvent("CustomEvent");
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	      return evt;
	  };

	  CustomEvent.prototype = window.Event.prototype;
	  window.CustomEvent = CustomEvent; // expose definition to window
	}


/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82).register();
	__webpack_require__(84);

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var bp = __webpack_require__(83);
	///////////////////////////////////////////////////////////////////////////////
	// Public

	module.exports = bp.tag.create("collapsible", collapsible);

	///////////////////////////////////////////////////////////////////////////////
	function collapsible(tag){

	}


/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);

/***/ },

/***/ 84:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });