var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  tag : {
    create : require("./tag"),
    contains : nodeContains,
    observe : observe,
    triggerEvent : triggerEvent,
    closest : getClosest,
    DOMReady : DOMReady
  },
  attribute : {
    get : getAttribute,
    set : setAttribute,
    remove : removeAttribute,
    matchName : matchAttribute
  },
  mixin : {
    create : mixin
  }
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var observedElements = [];

function observe(element){
  if(observedElements.indexOf(element)>=0) return;

  element.bonaparte = element.bonaparte || {};
  element.bonaparte.observer = new MutationObserver(mutationHandler);

  element.bonaparte.observer.observe(element, {
    attributes:true,
    attributeOldValue:true,
    childList:true
  });
  observedElements.push(element);
}

///////////////////////////////////////////////////////////////////////////////

function mutationHandler(mutations){
  for(var i=0; i<mutations.length; i++) switch(mutations[i].type) {
    case "attributes":
      var attribute = mutations[i].attributeName;
      var tag = mutations[i].target;

      var data = {
        name : attribute,
        oldValue : mutations[i].oldValue,
        newValue : tag.attributes[attribute] ? tag.attributes[attribute].value : null
      };

      if(data.oldValue !== data.newValue)
        triggerEvent(tag, "bonaparte.tag.attributeChanged", data);
      triggerEvent(tag, "bonaparte.tag.attributeUpdated", data);
    break;
    case "childList":
      triggerEvent(mutations[i].target, "bonaparte.tag.childrenChanged", {
        added : mutations[i].addedNodes,
        removed : mutations[i].removedNodes
      });
    break;
  }
}

///////////////////////////////////////////////////////////////////////////////

function mixin() {
  return objct(arguments);
}

///////////////////////////////////////////////////////////////////////////////

function DOMReady(handler){
  if(document.readyState === "complete") setTimeout(handler, 0);
  else window.addEventListener("load", handler);
}
///////////////////////////////////////////////////////////////////////////////

function triggerEvent(tag, event, data, bubbles, cancelable){
    var newEvent = new CustomEvent(event, {
      bubbles: bubbles || false,
      cancelable: cancelable || false,
      detail: data
    });
    tag.dispatchEvent(newEvent);
}

///////////////////////////////////////////////////////////////////////////////


function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent);
  return !!child;
};

///////////////////////////////////////////////////////////////////////////////

function getClosest(tag, name){
  while((tag=tag.parentNode)&&tag.nodeName.toUpperCase()!==name.toUpperCase());
  return tag ? tag:false;

}

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined;
}
///////////////////////////////////////////////////////////////////////////////

function matchAttribute(patterns, name){
  var pattern, dataPattern;
  if(!objct.isArray(patterns)) patterns = [patterns];

  for(var i=0; i<patterns.length; i++) {
    pattern = patterns[i];
    dataPattern = new RegExp("data-"+pattern.source);
    if(pattern.test(name) ||  dataPattern.test(name))
      return true;
  }
  return false;
}

///////////////////////////////////////////////////////////////////////////////

function setAttribute(tag, name, value) {
  name = tag.hasAttribute("data-"+name) ? "data-"+name : name;
  var oldValue = getAttribute(tag, name);

  tag.setAttribute(name, value);
}

///////////////////////////////////////////////////////////////////////////////

function removeAttribute(tag, name) {
  if(typeof tag.attributes[name] !== "object") return;

  // remove attribute
  tag.removeAttribute(name);
  tag.removeAttribute("data-"+name);

}

///////////////////////////////////////////////////////////////////////////////
