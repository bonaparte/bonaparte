var objct = require("objct");
var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////
// Polyfills

require("document-register-element");
require("custom-event-polyfill");

if (!("MutationObserver" in document)) {
  MutationObserver = require("mutation-observer");
};

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}

///////////////////////////////////////////////////////////////////////////////

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
  tagFactory.initialize = initialize;
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

  function initialize(element){
    
    apply(element);  
    util.observe(element); 

  }

///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    apply(this);
    this.bonaparte.registered = true;
    this.bonaparte.triggerEvent("tag.created", null);
  }

///////////////////////////////////////////////////////////////////////////////

  function apply(element) {
    var modules = [
      require("./globals"),
      require("./events"),
      mixins,
      definition, 
      require("./mixins")
    ];

    // Create bonaparte namespace
    element.bonaparte = element.bonaparte || {};

    // Create and mixin tag instance
    objct.extend(element.bonaparte, modules)(element);
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function attachedCallback() {

  this.bonaparte.triggerEvent("tag.attached", null);

}

///////////////////////////////////////////////////////////////////////////////

function detachedCallback() {
  
  this.bonaparte.triggerEvent("tag.detached", null);
}

///////////////////////////////////////////////////////////////////////////////

function attributeChangedCallback(name, old, value) {
  
  data = {
    name : name,
    previousValue : old,
    newValue : value
  };

  this.bonaparte.triggerEvent("tag.attributeChanged", data);

}

///////////////////////////////////////////////////////////////////////////////

