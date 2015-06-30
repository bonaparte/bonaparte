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
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

document.registerElement('toolbar-bonaparte');

document.registerElement('cornerstone-bonaparte');

document.registerElement('panel-bonaparte', createPrototype(require("./tags/panel-bonaparte")));

document.registerElement('sidebar-bonaparte');

document.registerElement('content-bonaparte');

document.registerElement('scroll-bonaparte', createPrototype(require("./tags/scroll-bonaparte")));

///////////////////////////////////////////////////////////////////////////////

function createPrototype(element){
  element = element || {};

  return {
    prototype : new objct.extend ( Object.create( HTMLElement.prototype ), {
      createdCallback : createdCallback,
      attachedCallback : attachedCallback,
      detachedCallback : detachedCallback,
      attributeChangedCallback : attributeChangedCallback
    })
  };

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    if(!objct.isObjct(element)) return;

    // Create bonaparte namespace
    this.bonaparte = this.bonaparte || {};

    // Create and mixin tag instance
    new objct.extend(this, element, require("./core/mixins"));
        
    var data = {
      element : this
    };

    this.trigger("createdCallback", data);
    this.global.trigger("createdCallback", data);
  }

///////////////////////////////////////////////////////////////////////////////

  function attachedCallback() {
    
    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.trigger("attachedCallback", data);
    this.global.trigger("attachedCallback", data);

  }

///////////////////////////////////////////////////////////////////////////////

  function detachedCallback() {

    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.trigger("detachedCallback", data);
    this.global.trigger("detachedCallback", data);
    
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback( name, previousValue, newValue ) {

    if(!objct.isObjct(element)) return;

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

}
},{"./core/mixins":5,"./tags/panel-bonaparte":9,"./tags/scroll-bonaparte":10,"objct":1}],3:[function(require,module,exports){
module.exports = function(){

  this.addListener     = addListener;
  this.removeListener  = removeListener;
  this.trigger         = trigger;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  var eventHandlers = {};

//////////////////////////////////////////////////////////////////////////////

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

module.exports = globals;

///////////////////////////////////////////////////////////////////////////////

window.addEventListener("click", forwardEvent);
window.addEventListener("resize", forwardEvent);

///////////////////////////////////////////////////////////////////////////////

globals.global = new objct(require("./events"));

globals.prototype = {
  global : globals.global,
};

///////////////////////////////////////////////////////////////////////////////

function globals(){

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function forwardEvent(e){

  globals.global.trigger(e.type, e); 

}
},{"./events":3,"objct":1}],5:[function(require,module,exports){
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

module.exports = mixins;

///////////////////////////////////////////////////////////////////////////////

var mixins = {};

///////////////////////////////////////////////////////////////////////////////

function mixins(){
  var tag = this;
  mixins[tag.tagName] = mixins[tag.tagName] || [];

  tag.mixin = mixin;

  new objct.extend(tag, mixins[tag.tagName]);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function mixin(mixin){
    if( typeof mixin !== "function" ) throw "Unexpected type of "+(typeof mixin)+"! Expected function.";

    // Save mixin
    mixins[tag.tagName].push(mixin);

    // apply mixin to current tag.
    new objct.extend(tag, mixin);

  }

///////////////////////////////////////////////////////////////////////////////

}
},{"objct":1}],6:[function(require,module,exports){
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("./globals"),
  require("./events"),
  tag
);

///////////////////////////////////////////////////////////////////////////////

function tag(){

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

}
},{"./events":3,"./globals":4,"objct":1}],7:[function(require,module,exports){
module.exports = utility = {};

///////////////////////////////////////////////////////////////////////////////

var easing = {
  // t: current time, b: begInnIng value, c: change In value, d: duration
  easeNot: function (t, b, c, d) {
    return b+c*(t/=d);
  },
  easeInQuad: function (t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; 
  },
  easeInOutBack: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (t, b, c, d) {
    return c - easing.easeOutBounce (d-t, 0, c, d) + b;
  },
  easeOutBounce: function (t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (t, b, c, d) {
    if (t < d/2) return easing.easeInBounce (t*2, 0, c, d) * .5 + b;
    return easing.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
}

///////////////////////////////////////////////////////////////////////////////

utility.nodeContains = function(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

utility.getAttribute = function(tag, name){
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
utility.map = function(x, cMin, cMax, tMin, tMax, easingFunction) {
  easingFunction = easing[easingFunction] !== undefined ? easingFunction : "easeNot";
  if(x===0) return tMin;
  return easing[easingFunction](x-cMin, tMin, tMax-tMin, cMax-cMin);  
};

///////////////////////////////////////////////////////////////////////////////

},{}],8:[function(require,module,exports){
var util = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////

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
var objct = require("objct");
var util = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("../core/tag"), 
  require("../mixins/toggle"),
  panel
);

///////////////////////////////////////////////////////////////////////////////
function panel(){
///////////////////////////////////////////////////////////////////////////////
// Setup 

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
},{"../core/tag":6,"../core/utility":7,"../mixins/toggle":8,"objct":1}],10:[function(require,module,exports){
var objct  = require("objct");
var util   = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("../core/tag"), 
  scroll
);

///////////////////////////////////////////////////////////////////////////////
function scroll(){
///////////////////////////////////////////////////////////////////////////////
// Setup 

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
},{"../core/tag":6,"../core/utility":7,"objct":1}]},{},[2]);
