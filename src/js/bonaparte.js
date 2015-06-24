var objct = require("objct");

document.registerElement('toolbar-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./test") )
});

document.registerElement('cornerstone-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./test") )
});

document.registerElement('panel-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./panel") )
});

document.registerElement('sidebar-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./test") )
});

document.registerElement('content-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./test") )
});

document.registerElement('scroll-bonaparte', {
    prototype: new objct.extend( Object.create( HTMLElement.prototype ), require("./test") )
});

