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