var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("button", button, [], HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(){
  var tag = this;
  var action = undefined;
  var targets = [];
  var attributes = {};
  var active;

  window.addEventListener("load", function(){

    setEvents();
    setTargets();
    setAttributes();

  });

///////////////////////////////////////////////////////////////////////////////

  tag.addListener("attributeChangedCallback", attributeChangedCallback);  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function attributeChangedCallback(data){
    if(util.testAttribute(/action/, data.name)) setEvents();
    if(util.testAttribute(/target/, data.name)) setTargets();
    if(util.testAttribute(/target-.*/, data.name)) setAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function eventHandler(){

    syncAttributes();
    triggerEvents();

  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvents(){
    var trigger = util.getAttribute(tag, "trigger");
    
    if(trigger === undefined) return; 

    var event = new Event(trigger);

    for(var i = 0; i < targets.length; i++){
      target = targets[i];
      target.tag.dispatchEvent(event);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function checkAttributes(){
    var target, targetValue;
    active = undefined;
    for(var i =0; i< targets.length; i++){
      target = targets[i];
      for(var name in attributes) {
        targetValue = util.getAttribute(target.tag, name);
        if(targetValue !== attributes[name]) {
          active = false;
          target.values[name]= targetValue;
        }
        if(active !== false) active = true;
      }
    }

    if(active === true){
      tag.classList.add("active");
    }
    else {
      tag.classList.remove("active");
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function syncAttributes(){
    var target, targetValue;

    for(var i = 0; i < targets.length; i++){
      target = targets[i];

      for(var name in attributes) {
        targetValue = active === true ? target.values[name] : attributes[name];
        util.setAttribute(target.tag, name, targetValue); 
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = [];
    for(var i=0; i < tag.attributes.length; i++) {
      if(util.testAttribute(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = util.getAttribute(tag, "target");
    
    if(selector === undefined) return;

    var newTargets = document.querySelectorAll(selector);
    targets = [];

    for(var i=0; i < newTargets.length; i++) {
      targets.push({
        tag : newTargets[i],
        values : {}
      });
      newTargets[i].addListener("attributeChangedCallback", targetAttributeChangedCallback);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = util.getAttribute(tag, "action");

    if(action === newAction) return;

    if(action !== undefined)
      tag.removeEventListener(action, eventHandler);

    if(newAction !== undefined)
      tag.addEventListener(newAction, eventHandler);

    action=newAction;
  }

///////////////////////////////////////////////////////////////////////////////

}

 ///////////////////////////////////////////////////////////////////////////////