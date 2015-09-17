///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = require("./api");

///////////////////////////////////////////////////////////////////////////////
// Polyfills

if(typeof document.addEventListener === "function") return; // no polyfills for IE8 -> silently fail.

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
