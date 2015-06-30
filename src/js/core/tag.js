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
