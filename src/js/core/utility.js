var objct = require("objct");
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  tag : {
    contains : nodeContains,
    observe : observe,
    triggerEvent : triggerEvent,
    closest : getClosest
  },
  attribute : {
    get : getAttribute,
    set : setAttribute,
    remove : removeAttribute,
    matchName : matchAttribute
  }
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var observedElements = [];

function observe(element){
  if(observedElements.indexOf(element)>=0) return;
  if(typeof element.bonaparte === "object" && element.bonaparte.registered) return;

  element.bonaparte = element.bonaparte || {};
  element.bonaparte.observer = new MutationObserver(mutationHandler);

  element.bonaparte.observer.observe(element, {
    attributes:true,
    attributeOldValue:true
  });
  observedElements.push(element);

}

///////////////////////////////////////////////////////////////////////////////

function mutationHandler(mutations){
  var attribute, data, tag;
  
  for(var i=0; i<mutations.length; i++) {
    attribute = mutations[i].attributeName;
    tag = mutations[i].target;
    if(typeof tag.attributes[attribute] === "undefined") continue;

    data = {
      name : attribute,
      previousValue : mutations[i].oldValue,
      newValue : tag.attributes[attribute].value
    };

    triggerEvent(tag, "bonaparte.tag.attributeChanged", data);
    triggerEvent(tag, "bonaparte.tag.attributeUpdated", data);
  }
 
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

  if(oldValue === value) {
    tag.bonaparte.triggerEvent("bonaparte.tag.attributeUpdated",{
      name:name,
      previousValue : oldValue,
      newValue: value
    });
  }  
}

///////////////////////////////////////////////////////////////////////////////

function removeAttribute(tag, name) {
  if(typeof tag.attributes[name] !== "object") return;

  var data = {
    name : name,
    previousValue : tag.attributes[name].value,
    newValue : null
  }
  // remove attribute
  tag.removeAttribute(name);
  tag.removeAttribute("data-"+name);

  // trigger Mutation event if not "native" bonaparte element
  if(typeof tag.bonaparte !== "object" || !tag.bonaparte.registered) {
    triggerEvent(tag, "bonaparte.tag.attributeChanged", data);
    triggerEvent(tag, "bonaparte.tag.attributeUpdated", data);
  }
}

///////////////////////////////////////////////////////////////////////////////