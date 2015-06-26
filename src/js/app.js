var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

document.registerElement('toolbar-bonaparte');

document.registerElement('cornerstone-bonaparte');

document.registerElement('panel-bonaparte', createPrototype(require("./panel-bonaparte")));

document.registerElement('sidebar-bonaparte');

document.registerElement('content-bonaparte');

document.registerElement('scroll-bonaparte', createPrototype(require("./scroll-bonaparte")));

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

    // Create and mixin tag instance
    new objct.extend(this, element, require("./mixins"));
        
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