var objct = require("objct");
var bp = require("./utility");

///////////////////////////////////////////////////////////////////////////////
// Polyfills

if(typeof document.addEventListener === "function") { // no polyfills for IE8 -> silently fail.
  
  if(!("MutationObserver" in document)) {
    MutationObserver = require("mutation-observer");
  };
  require("document-register-element");
  require("custom-event-polyfill");


  if (Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      proto.matches = proto.matchesSelector ||
          proto.mozMatchesSelector || proto.msMatchesSelector ||
          proto.oMatchesSelector || proto.webkitMatchesSelector;
  }
}
///////////////////////////////////////////////////////////////////////////////

var registeredTags = {};

///////////////////////////////////////////////////////////////////////////////
// Public 

bp.tag.create=createTag;
module.exports = bp;

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
      document.createElement(name+"-bonaparte");
      return;
    }
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
    bp.tag.observe(element); 
    
    return definition;
  }

///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    apply(this);
    this.bonaparte.registered = true;
    this.bonaparte.triggerEvent("bonaparte.tag.created", null);
  }

///////////////////////////////////////////////////////////////////////////////

  function apply(element) {
    var modules = [
      require("./events"),
      definition, 
      require("./mixins")
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

function attributeChangedCallback(name, old, value) {
  
  data = {
    name : name,
    previousValue : old,
    newValue : value
  };

  this.bonaparte.triggerEvent("bonaparte.tag.attributeChanged", data);
  this.bonaparte.triggerEvent("bonaparte.tag.attributeUpdated", data);

}

///////////////////////////////////////////////////////////////////////////////

