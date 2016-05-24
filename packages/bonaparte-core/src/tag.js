var objct = require("objct");
var bp = require("./api");

///////////////////////////////////////////////////////////////////////////////

var registeredTags = {};

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = createTag;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function createTag(name, modules, children, nativeBaseElement){
  var modulesType = (objct.isArray(modules) && "array") || typeof modules;

  if(modulesType === "function")
    modules = [modules];
  else if(modulesType !== "array")
    throw "Bonaparte - createTag: Unexpected "+modulesType+". Expected Function or Array."

  nativeBaseElement = nativeBaseElement || window.HTMLElement || window.Element;

  var childrenModule = require("./children")(name, children);

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
      require("./events"),
      definition,
      require("./mixins"),
      childrenModule
    ];

    // Create bonaparte namespace
    element.bonaparte = element.bonaparte || {};
    element.bonaparte.children = children;

    // Create and mixin tag instance
    objct.extend(element, modules)(element, name);
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
