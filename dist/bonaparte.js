(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.prevValue,i=e.newValue;Q&&t.attributeChangedCallback&&e.attrName!=="style"&&t.attributeChangedCallback(e.attrName,n===e[a]?null:r,n===e[l]?null:i)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
},{}],2:[function(require,module,exports){
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
		if(!instant && type === strFunction && args[i].hash !== hash) {
			mixinObject(Executable, args[i], thisData);
		}

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
},{}],3:[function(require,module,exports){
var panel = require("./tags/panel-bonaparte");
var scroll = require("./tags/scroll-bonaparte");
var sidebar = require("./tags/sidebar-bonaparte");
var toolbar = require("./tags/toolbar-bonaparte");
var cornerstone = require("./tags/cornerstone-bonaparte");
var button = require("./tags/button-bonaparte");

// toolbar.mixin({
//   test:function(){
//     alert("test")
//   }
// });

panel.register();
scroll.register();
sidebar.register();
cornerstone.register();
toolbar.register();
button.register();

document.registerElement('content-bonaparte');


},{"./tags/button-bonaparte":10,"./tags/cornerstone-bonaparte":11,"./tags/panel-bonaparte":12,"./tags/scroll-bonaparte":13,"./tags/sidebar-bonaparte":14,"./tags/toolbar-bonaparte":15}],4:[function(require,module,exports){
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

  function trigger(event, data, element){
    if(typeof eventHandlers[event] !== "object" ) return;
   
    element = element || this;
    var tagName = element.tagName || "";
    var length = eventHandlers[event].length;
    var i = -1;
    while(++i < length) {
      eventHandlers[event][i](data, this, tagName.toLowerCase());
    }
  }

///////////////////////////////////////////////////////////////////////////////

}


},{}],5:[function(require,module,exports){
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
// Polyfills

require("document-register-element");

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function forwardEvent(e){

  globals.global.trigger(e.type, e); 

}
},{"./events":4,"document-register-element":1,"objct":2}],6:[function(require,module,exports){
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
},{"objct":2}],7:[function(require,module,exports){
var objct = require("objct");

var registeredTags = {};

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = registerTag;

///////////////////////////////////////////////////////////////////////////////

function registerTag(name, definition, mixins, nativeBaseElement){
  var definitionType = (objct.isArray(definition) && "array") || typeof definition;
  if(definitionType !== "object" && definitionType !== "function")
    throw "Bonaparte - registerTag: Unexpected "+definitionType+". Expected Function or Object."

  nativeBaseElement = nativeBaseElement || HTMLElement;
  mixins = mixins || [];
///////////////////////////////////////////////////////////////////////////////
// Public
  
  function tagFactory(){};
  tagFactory.register = register;
  tagFactory.mixin = mixin;

///////////////////////////////////////////////////////////////////////////////

  definition = objct(tagFactory, definition);
  return definition;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function register(){ 
    registeredTags[name+"-bonaparte"] = registeredTags[name+"-bonaparte"] !== undefined ?
      registeredTags[name+"-bonaparte"]:
      document.registerElement(name+"-bonaparte", {
        prototype : Object.create( nativeBaseElement.prototype , {
          createdCallback : { value: createdCallback },
          attachedCallback : { value: attachedCallback },
          detachedCallback : { value: detachedCallback },
          attributeChangedCallback : { value: attributeChangedCallback }
        })
      });

    return registeredTags[name+"-bonaparte"];
  }

///////////////////////////////////////////////////////////////////////////////

  function mixin(mixin){
    definition = objct(definition, mixin);
  }

///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {
    var elements = [
      require("./globals"),
      require("./events"),
      mixins,
      definition
    ];

    // Create bonaparte namespace
    this.bonaparte = this.bonaparte || {};

    // Create and mixin tag instance
    new objct.extend(this, elements, require("./mixins"));
        
    this.trigger("createdCallback");
    this.global.trigger("createdCallback", null, this);
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function attachedCallback() {

  this.trigger("attachedCallback");
  this.global.trigger("attachedCallback", null, this);

}

///////////////////////////////////////////////////////////////////////////////

function detachedCallback() {

  this.trigger("detachedCallback");
  this.global.trigger("detachedCallback", null, this);
  
}

///////////////////////////////////////////////////////////////////////////////

function attributeChangedCallback( name, previousValue, newValue ) {

  var data = {
    name : name,
    previousValue : previousValue,
    newValue : newValue
  };

  this.trigger("attributeChangedCallback", data);
  this.global.trigger("attributeChangedCallback", data, this);

}

///////////////////////////////////////////////////////////////////////////////

},{"./events":4,"./globals":5,"./mixins":6,"objct":2}],8:[function(require,module,exports){
var objct = require("objct");
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  testAttribute : testAttribute,
  setAttribute : setAttribute,
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

function testAttribute(patterns, name){
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
  if(tag.attributes["data-"+name] !== undefined) 
    tag.setAttribute("data-"+name, value);
  else 
    tag.setAttribute(name, value);
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

},{"objct":2}],9:[function(require,module,exports){
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


},{"../core/utility":8}],10:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("button", button, [], HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(){
  var tag = this;
  var action = undefined;
  var targets = [];
  var attributes = {};
  var active;

  window.addEventListener("load", function(){

    setEvents();
    setTargets();
    setAttributes();

  });

///////////////////////////////////////////////////////////////////////////////

  tag.addListener("attributeChangedCallback", attributeChangedCallback);  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function attributeChangedCallback(data){
    if(util.testAttribute(/action/, data.name)) setEvents();
    if(util.testAttribute(/target/, data.name)) setTargets();
    if(util.testAttribute(/target-.*/, data.name)) setAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function checkAttributes(){
    var target, targetValue;
    active = undefined;
    for(var i =0; i< targets.length; i++){
      target = targets[i];
      for(var name in attributes) {
        targetValue = util.getAttribute(target.tag, name);
        if(targetValue !== attributes[name]) {
          active = false;
          target.values[name]= targetValue;
        }
        if(active !== false) active = true;
      }
    }

    if(active === true){
      tag.classList.add("active");
    }
    else {
      tag.classList.remove("active");
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function syncAttributes(){
    var target, targetValue;

    for(var i = 0; i < targets.length; i++){
      target = targets[i];

      for(var name in attributes) {
        targetValue = active === true ? target.values[name] : attributes[name];
        util.setAttribute(target.tag, name, targetValue); 
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = [];
    for(var i=0; i < tag.attributes.length; i++) {
      if(util.testAttribute(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = util.getAttribute(tag, "target");
    
    if(selector === undefined) return;

    var newTargets = document.querySelectorAll(selector);
    targets = [];

    for(var i=0; i < newTargets.length; i++) {
      targets.push({
        tag : newTargets[i],
        values : {}
      });
      console.log(newTargets[i]);
      newTargets[i].addListener("attributeChangedCallback", targetAttributeChangedCallback);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = util.getAttribute(tag, "action");

    if(action === newAction) return;

    if(action !== undefined)
      tag.removeEventListener(action, syncAttributes);

    if(newAction !== undefined)
      tag.addEventListener(newAction, syncAttributes);

    action=newAction;
  }

///////////////////////////////////////////////////////////////////////////////

}

 ///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":7,"../core/utility":8}],11:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("cornerstone", cornerstone);

///////////////////////////////////////////////////////////////////////////////
function cornerstone(){
  var tag = this;
  var toolbar = this.parentNode;

  updateCornerstonePadding();
///////////////////////////////////////////////////////////////////////////////
  
  this.addListener("attributeChangedCallback", updateCornerstonePadding);
  toolbar.addListener("attributeChangedCallback", updateCornerstonePadding);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function updateCornerstonePadding(){
    var cornerStonePosition = util.getAttribute(toolbar, "cornerstone").match(/(\w+)/g);
    var sidebarPosition = util.getAttribute(toolbar, "sidebar");
    
    toolbar.firstElementChild.style.padding="";
    
    if(cornerStonePosition.indexOf("outside") >= 0) return;

    var sidebarPositionIndex = cornerStonePosition.indexOf(sidebarPosition);

    if(sidebarPositionIndex < 0) return;
    else cornerStonePosition.splice(sidebarPositionIndex,1);

    var paddingSide = cornerStonePosition[0];

    var paddingValue = paddingSide === "left" || paddingSide === "right"?
      tag.offsetWidth:
      tag.offsetHeight;

    paddingSide=paddingSide.charAt(0).toUpperCase() + paddingSide.slice(1);

    toolbar.firstElementChild.style["padding"+paddingSide]=paddingValue+"px";

  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":7,"../core/utility":8}],12:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("panel", panel, [
  require("../mixins/toggle")
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
  this.global.addListener("bonaparte:closePanels", closePanels);
  this.addListener("attributeChangedCallback", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.testAttribute(/open/, data.name)){
      if(data.newValue == "true") {
        lock();
        tag.global.trigger("bonaparte:closePanels");
        tag.global.trigger("panel:open");
        tag.trigger("open");
      }
      else {
        tag.global.trigger("panel:close");
        tag.trigger("close");
      }
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
},{"../core/tag":7,"../core/utility":8,"../mixins/toggle":9}],13:[function(require,module,exports){
var util   = require("../core/utility");
var registerTag = require("../core/tag");

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("scroll", scroll);

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

  if(util.getAttribute(this, "resize") !== "false")
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
    content.style.paddingRight = scrollBarWidth+"px";
  
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
},{"../core/tag":7,"../core/utility":8}],14:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("sidebar", sidebar);

///////////////////////////////////////////////////////////////////////////////
function sidebar(){
  var tag = this;
  var sidebar = this.firstElementChild;
  updateSize(util.getAttribute(this, "size"));

///////////////////////////////////////////////////////////////////////////////

  this.addListener("attributeChangedCallback", attributeChangedCallback);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.testAttribute(/size/, data.name)) {
      updateSize(data.newValue);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function updateSize(size) {
    if(typeof size === "undefined") return;

    sidebar.style["-webkit-flex-basis"] = size;
    sidebar.style["-ms-flex-preferred-size"] = size;
    sidebar.style["flex-basis"] = size;
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":7,"../core/utility":8}],15:[function(require,module,exports){
var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("toolbar", toolbar, [
  require("./sidebar-bonaparte.js")
]);

///////////////////////////////////////////////////////////////////////////////
function toolbar(){


///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////
},{"../core/tag":7,"../core/utility":8,"./sidebar-bonaparte.js":14}]},{},[3]);
