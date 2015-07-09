var objct = require("objct");


///////////////////////////////////////////////////////////////////////////////
// Polyfills

require("document-register-element");

if (!("MutationObserver" in document)) {
  MutationObserver = require("mutation-observer");
};


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
