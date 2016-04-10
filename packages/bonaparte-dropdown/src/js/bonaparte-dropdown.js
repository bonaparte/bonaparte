var bp = require("bonaparte-core");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("dropdown", dropdown);

///////////////////////////////////////////////////////////////////////////////
function dropdown(tag) {

  tag.addEventListener("bonaparte.tag.attributeChanged", update);
  bp.tag.DOMReady(initialise);


  function update (data) {
    var handler = '',
        listener = []

    if (data.detail.name === "action") {
      handler = getHandler();
      listener = (data.detail.previousValue || "click").split(',');
    } else if (data.detail.name === "handler") {
      handler = getHandler(data.detail.previousValue || false);
      listener = (bp.attribute.get(tag, "action") || "click").split(',');
    }

    for (var i = 0; i < listener.length; i++) {
      handler.removeEventListener(listener[i].trim(), handleClick);
    }

    initialise();
  }

  function initialise () {
  	var handler = getHandler(),
      listener = (bp.attribute.get(tag, "action") || "click").split(',');
    for (var i = 0; i < listener.length; i++) {
      handler.addEventListener(listener[i].trim(), handleClick);
    };
  }

  function getHandler(handlerSelector) {

    if (typeof handlerSelector === 'undefined') {
      handlerSelector = bp.attribute.get(tag, "handler") || false;
    }
    var handler = tag.children[1];
    if (handlerSelector) {
      handler = tag.children[1].querySelector(handlerSelector) || handler;
    }

    return handler;
  }

  function handleClick(e) {

    toggleActive();
  }

  function closePanel(e) {

   if(e.target === tag || bp.tag.contains(tag, e.target)) return;

    var handler = getHandler();
    bp.attribute.set(tag, "open", false);
    handler.classList.remove(bp.attribute.get(handler, "active-class") || "active");
    window.removeEventListener("click", closePanel);
  }

  function toggleActive() {

    var handler = getHandler(),
      attribute = "open",
    	newValue = bp.attribute.get(tag, attribute) === "true" ? "false" : "true",
      activeClass = bp.attribute.get(handler, "active-class") || "active";

    bp.attribute.set(tag, attribute, newValue);
    handler.classList.toggle(activeClass);

    if (newValue === "true") {
      window.addEventListener("click", closePanel);
    } else {
      window.removeEventListener("click", closePanel);
    }

  }

///////////////////////////////////////////////////////////////////////////////
}

///////////////////////////////////////////////////////////////////////////////
