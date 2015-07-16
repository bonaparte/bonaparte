var util = require("../core/utility");
var registerTag = require("../core/tag");
var mousetrap = require("mousetrap");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("button", button, [], HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(tag){
  var action = undefined;
  var targets = [];
  var attributes = {};
  var toggles = [];
  var shortcuts = [];
  var toggle = false;
  var active;

  if(document.readyState === "complete") init();
  else window.addEventListener("load", init);

///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function init(){
    setEvents();
    setToggles();
    setTargets();
    setAttributes();
    setShortcut();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.matchAttribute(/action/, data.name)) setEvents();
    if(util.matchAttribute(/toggle/, data.name)) setToggles();
    if(util.matchAttribute(/target/, data.name)) setTargets();
    if(util.matchAttribute(/target-.*/, data.name)) setAttributes();
    if(util.matchAttribute(/shortcut/, data.name)) setKeyEvents();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function eventHandler(e){
    syncAttributes();
    triggerEvents();

    if(util.getAttribute(tag, "bubbles") === "false") e.stopPropagation();
  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvents(){
    var trigger = util.getAttribute(tag, "trigger");
   
    if(trigger === undefined) return; 
    for(var i = 0; i < targets.length; i++){
      target = targets[i];
      util.triggerEvent(target.tag, trigger)
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function checkStyle(targetValue, attributeValue){

    if(targetValue === attributeValue) return true;
    if(targetValue === undefined || attributeValue === undefined) return false;

    // IE handling from here on out

    attributeValue = attributeValue.replace(/\s*;\s*/g,";").split(";").sort().join(";");
    attributeValue += attributeValue.slice(-1) === ";" ? "":";";

    targetValue = targetValue.replace(/\s/g, "\\s*");

    return (new RegExp( targetValue )).test(attributeValue);

  }

///////////////////////////////////////////////////////////////////////////////

  function checkAttributes(){
    var target, targetValue;
    active = undefined;

    // for each target
    for(var i =0; i< targets.length; i++){
      target = targets[i];
      
      // check attributes
      for(var name in attributes) {
        targetValue = util.getAttribute(target.tag, name);

        if((name === "style" && !checkStyle(targetValue, attributes[name])) || targetValue !== attributes[name]) {
          active = false;
          target.values[name] = targetValue;
        }

        if(active !== false) active = true;
      }

      // check toggles
      for(var k=0; k<toggles.length; k++) {
        if(util.getAttribute(target.tag, toggles[k]) !== "true")
          active=false;

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

      // toggle attributes
      for(var k=0; k<toggles.length; k++) {
        targetValue = util.getAttribute(target.tag, toggles[k]) === "true" ? 
          "false":"true";
        util.setAttribute(target.tag, toggles[k], targetValue); 
      }
      
      // sync attributes
      for(var name in attributes) {
        targetValue = active === true && toggle === true ? 
          target.values[name] : attributes[name];
        if(targetValue !== undefined) 
          util.setAttribute(target.tag, name, targetValue); 
        else 
          util.removeAttribute(target.tag, name);
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setShortcut(){
    var newShortcuts = util.getAttribute(tag, "shortcut");

    mousetrap.unbind(shortcuts);

    if(typeof newShortcuts === "undefined") return;

    shortcuts = newShortcuts.split(",");

    for(var i=0; i<shortcuts.length; i++) {
      shortcuts[i] = shortcuts[i].trim();
    }

    mousetrap.bind(shortcuts, eventHandler);

  }

///////////////////////////////////////////////////////////////////////////////

  function setToggles(){
    var toggleValue = util.getAttribute(tag, "toggle");

    toggles = [];
    toggle = false;

    if(toggleValue === undefined) return;

    toggleValue = toggleValue.replace(/\s+/g, " ").split(" ");

    for(var i=0; i < toggleValue.length; i++) {
      if(toggleValue[i] === "true" || toggleValue[i] === "false") {
        toggle = toggleValue[i] === "true";
      }
      else if(toggleValue[i] !== "") {
        toggles.push(toggleValue[i]);
      }
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = [];
    for(var i=0; i < tag.attributes.length; i++) {
      if(util.matchAttribute(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = util.getAttribute(tag, "target");

    // Remove old target event handlers
    for(var i = 0; i < targets.length; i++){
      targets[i].removeEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }

    if(selector === undefined) return;

    var potentialSidebar = tag.parentNode; 
    var potentialToolbar = potentialSidebar.parentNode;


    // restrict button by parent toolbar in general
    // var context = util.getClosest(tag, "toolbar-bonaparte") || document;

    // only restrict button in toolbar sidebars.
    var potentialToolbar = util.getClosest(tag, "toolbar-bonaparte");
    var context = potentialToolbar && util.nodeContains(potentialToolbar.firstElementChild, tag)?
      potentialToolbar : document;

     
    var newTargets = context.querySelectorAll(selector);
    if(context !== document && context.matches(selector)) {
      newTargets=Array.prototype.slice.call(newTargets);
      newTargets.push(context);
    }

    targets = [];
    for(var i=0; i < newTargets.length; i++) {
      targets.push({
        tag : newTargets[i],
        values : {}
      });
      util.observe(newTargets[i]);
      newTargets[i].addEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = util.getAttribute(tag, "action");

    if(action === newAction) return false;

    if(action !== undefined)
      tag.removeEventListener(action, eventHandler);

    if(newAction !== undefined)
      tag.addEventListener(newAction, eventHandler);

    action=newAction;

    return action !== undefined;
  }

///////////////////////////////////////////////////////////////////////////////

}

 ///////////////////////////////////////////////////////////////////////////////