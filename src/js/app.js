var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////

document.registerElement('toolbar-bonaparte', { prototype: createPrototype() });

document.registerElement('cornerstone-bonaparte', { prototype: createPrototype() });

document.registerElement('panel-bonaparte', { prototype: createPrototype( require("./panel-bonaparte") ) });

document.registerElement('sidebar-bonaparte', { prototype: createPrototype() });

document.registerElement('content-bonaparte', { prototype: createPrototype() });

document.registerElement('scroll-bonaparte', { prototype: createPrototype() });

///////////////////////////////////////////////////////////////////////////////

function createPrototype(element){
  element = element || {};

  return new objct.extend ( Object.create( HTMLElement.prototype ), {
    createdCallback : createdCallback,
    attachedCallback : attachedCallback,
    detachedCallback : detachedCallback,
    attributeChangedCallback : attributeChangedCallback
  });

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function createdCallback() {

    // Create and mixin tag instance
    new objct.extend(this, element);

    if(!objct.isObjct(element)) return;
    
    var data = {
      element : this
    };

    this.triggerEvent("createdCallback", data);
    this.global.triggerEvent("createdCallback", data);
  }

///////////////////////////////////////////////////////////////////////////////

  function attachedCallback() {
    
    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.triggerEvent("attachedCallback", data);
    this.global.triggerEvent("attachedCallback", data);

  }

///////////////////////////////////////////////////////////////////////////////

  function detachedCallback() {

    if(!objct.isObjct(element)) return;

    var data = {
      element : this
    };
    
    this.triggerEvent("detachedCallback", data);
    this.global.triggerEvent("detachedCallback", data);
    
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

    this.triggerEvent("attributeChangedCallback", data);
    this.global.triggerEvent("attributeChangedCallback", data);

  }

///////////////////////////////////////////////////////////////////////////////

}