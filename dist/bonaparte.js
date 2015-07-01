(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! 
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
			modules:data.m, 
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
		d : that.hash === hash ? that.d : false, // decorated
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
})(typeof module === "undefined"? {} : module);
},{}],2:[function(require,module,exports){
var panel = require("./tags/panel-bonaparte");
var scroll = require("./tags/scroll-bonaparte");
var toolbar = require("./tags/toolbar-bonaparte");

document.registerElement('cornerstone-bonaparte');
document.registerElement('sidebar-bonaparte');
document.registerElement('content-bonaparte');


},{"./tags/panel-bonaparte":9,"./tags/scroll-bonaparte":10,"./tags/toolbar-bonaparte":11}],3:[function(require,module,exports){
///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = events;

///////////////////////////////////////////////////////////////////////////////
function events(){

  var eventHandlers = {};

///////////////////////////////////////////////////////////////////////////////
// Public

  this.addListener     = addListener;
  this.removeListener  = removeListener;
  this.trigger         = trigger;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function addListener(event, handler){
    if( typeof handler !== "function" ) throw "Unexpected type of "+(typeof handler)+"! Expected function.";

    eventHandlers[event] = eventHandlers[event] || [];

    // if already registered
    if( eventHandlers[event].indexOf(handler) >= 0 ) return;

    eventHandlers[event].push(handler);    

  }

//////////////////////////////////////////////////////////////////////////////

  function removeListener(event, handler){
    if(typeof eventHandlers[event] !== "object") return;

    var index = eventHandlers[event].indexOf(handler);

    if( index >= 0 ) {
      eventHandlers[event].splice(index, 1);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function trigger(event, data){
    if(typeof eventHandlers[event] !== "object" ) return;
   
    var length = eventHandlers[event].length;
    var i = -1;
    while(++i < length) {
      eventHandlers[event][i](data);
    }
  }

///////////////////////////////////////////////////////////////////////////////

}


},{}],4:[function(require,module,exports){
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////
// Public

var globals = module.exports = {
  global : new objct(require("./events"))
};

///////////////////////////////////////////////////////////////////////////////
// EventListeners

window.addEventListener("click", forwardEvent);
window.addEventListener("resize", forwardEvent);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function forwardEvent(e){

  globals.global.trigger(e.type, e); 

}
},{"./events":3,"objct":1}],5:[function(require,module,exports){
var objct = require("objct");

var registeredMixins = {};

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = mixins;

///////////////////////////////////////////////////////////////////////////////
function mixins(){

  var tag = this;
  registeredMixins[tag.tagName] = registeredMixins[tag.tagName] || [];
  new objct.extend(tag, registeredMixins[tag.tagName]);

///////////////////////////////////////////////////////////////////////////////
// Public

  this.mixin = mixin;

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
},{"objct":1}],6:[function(require,module,exports){
var objct = require("objct");

var registeredTags = {};

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = registerTag;

///////////////////////////////////////////////////////////////////////////////

function registerTag(tagName, tagDefinition, nativeBaseElement){

  nativeBaseElement = nativeBaseElement || HTMLElement;

  var elements = [
    require("./globals"),
    require("./events"),
    tagDefinition
  ];

  registeredTags[tagName+"-bonaparte"] = registeredTags[tagName+"-bonaparte"] !== undefined ?
    registeredTags[tagName+"-bonaparte"]:
    document.registerElement(tagName+"-bonaparte", getPrototype());

///////////////////////////////////////////////////////////////////////////////
// Public
  
  return registeredTags[tagName+"-bonaparte"];

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function getPrototype(){
    return {
      prototype : new objct.extend ( Object.create( nativeBaseElement.prototype ), {
        createdCallback : createdCallback,
        attachedCallback : attachedCallback,
        detachedCallback : detachedCallback,
        attributeChangedCallback : attributeChangedCallback
      })
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    // Create bonaparte namespace
    this.bonaparte = this.bonaparte || {};

    // Create and mixin tag instance
    new objct.extend(this, elements, require("./mixins"));
        
    var data = {
      element : this
    };

    this.trigger("createdCallback", data);
    this.global.trigger("createdCallback", data);
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function attachedCallback() {
  
  var data = {
    element : this
  };
  
  this.trigger("attachedCallback", data);
  this.global.trigger("attachedCallback", data);

}

///////////////////////////////////////////////////////////////////////////////

function detachedCallback() {

  var data = {
    element : this
  };
  
  this.trigger("detachedCallback", data);
  this.global.trigger("detachedCallback", data);
  
}

///////////////////////////////////////////////////////////////////////////////

function attributeChangedCallback( name, previousValue, newValue ) {

  var data = {
    element : this,
    name : name,
    previousValue : previousValue,
    newValue : newValue
  };

  this.trigger("attributeChangedCallback", data);
  this.global.trigger("attributeChangedCallback", data);

}

///////////////////////////////////////////////////////////////////////////////

},{"./events":3,"./globals":4,"./mixins":5,"objct":1}],7:[function(require,module,exports){
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  map : map
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}

///////////////////////////////////////////////////////////////////////////////
// x: current Value, 
// cMin: current range min, 
// cMax: current range max, 
// tMin: target range min, 
// tMax: target range max, 
// easingFunction: easingFunction (string)

function map(x, cMin, cMax, tMin, tMax, easingFunction) {
  easingFunction = typeof easing === "object" && easing[easingFunction] !== undefined ? 
    easing[easingFunction] : 
    function (t, b, c, d) { return b+c*(t/=d) };
  if(x===0) return tMin;
  return easingFunction(x-cMin, tMin, tMax-tMin, cMax-cMin);  
}
///////////////////////////////////////////////////////////////////////////////

},{}],8:[function(require,module,exports){
var util = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = {
  toggle : toggle
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function toggle(attribute){
  var newValue = util.getAttribute(this, attribute) === "true" ? "false" : "true";
  this.setAttribute(attribute, newValue);
}


},{"../core/utility":7}],9:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("panel", [
  require("../mixins/toggle"),
  panel
]);

///////////////////////////////////////////////////////////////////////////////
function panel(){

  var tag = this;
  var locked = false;

///////////////////////////////////////////////////////////////////////////////
// Public 

  this.open = open;
  this.close = close;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  this.global.addListener("click", clickHandler);
  this.global.addListener("closePanels", closePanels);
  this.addListener("attributeChangedCallback", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(data.name === "open" && data.newValue == "true") {
      lock();
      tag.global.trigger("closePanels");
    };    
  }

///////////////////////////////////////////////////////////////////////////////

  function closePanels(){
    if(locked) return;
    tag.close();
  }

///////////////////////////////////////////////////////////////////////////////

  function close() {
    tag.setAttribute("open", "false");
  }

///////////////////////////////////////////////////////////////////////////////

  function open(e) {    
    lock();
    tag.setAttribute("open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    locked=true;
    setTimeout(function(){ locked=false; },0);
  }
}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":6,"../core/utility":7,"../mixins/toggle":8}],10:[function(require,module,exports){
var util   = require("../core/utility");
var registerTag = require("../core/tag");

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("scroll", [
  scroll
]);

///////////////////////////////////////////////////////////////////////////////
function scroll(){

  var tag = this;
  var content =  this.firstElementChild;
  var slider, scrollbar, scrollBarVisible;

  if(util.getAttribute(this, "scrollbar") === "native") return;

  setupScroller();

///////////////////////////////////////////////////////////////////////////////
// Public 
 
  this.update = update;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  if(util.getAttribute(this, "resize") === "true")
    this.global.addListener("resize", update);
  
  content.addEventListener("scroll", updatePosition);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function update(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    // VISIBILITY
    if(scrollHeight <= containerHeight) {
      if(scrollBarVisible !== false) {
        scrollbar.style.opacity = 0.01;
        scrollBarVisible = false;
      }
    }
    else {
      if(scrollBarVisible !== true) {
        scrollbar.style.opacity = "";
        scrollBarVisible = true;
      }
    } 

    // SLIDER SIZE / POSITION
    updatePosition();

  }

///////////////////////////////////////////////////////////////////////////////

  function updatePosition(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    var sliderSize = Math.min(1, Math.max( 0.05, util.map(scrollHeight/containerHeight, 1, 5, 1, 0.05)));

    var position = scrollHeight-containerHeight > 0 ? content.scrollTop / (scrollHeight-containerHeight) : 0;
    var top = util.map(position, 0, 1, 0, containerHeight-(containerHeight*sliderSize));

    slider.style.height=(100*sliderSize)+"%";
    slider.style.top=top+"px";
  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    content.style.marginRight = -scrollBarWidth+"px";
  

    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    update();

    tag.appendChild(scrollbar);

  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function getScrollBarWidth(){
  var width = document.body.clientWidth;
  var overflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "scroll";
  width -= document.body.clientWidth;
  document.documentElement.style.overflow = overflow;
  return width;
}
},{"../core/tag":6,"../core/utility":7}],11:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("toolbar", [
  toolbar
]);

///////////////////////////////////////////////////////////////////////////////
function toolbar(){



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":6,"../core/utility":7}]},{},[2]);
