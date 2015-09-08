var bp = require("bonaparte");
var mousetrap = require("mousetrap");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("button", button, HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(tag){

  var action = undefined;
  var targets = [];
  var attributes = {};
  var toggles = [];
  var shortcuts = [];
  var toggle = false;
  var active;


  bp.tag.DOMReady(init);

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
    if(bp.attribute.matchName(/action/, data.name)) setEvents();
    if(bp.attribute.matchName(/toggle/, data.name)) setToggles();
    if(bp.attribute.matchName(/target/, data.name)) setTargets();
    if(bp.attribute.matchName(/target-.*/, data.name)) setAttributes();
    if(bp.attribute.matchName(/shortcut/, data.name)) setShortcut();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function eventHandler(e){
    setTargets();
    syncAttributes();
    triggerEvents();

    if(bp.attribute.get(tag, "bubbles") === "false") e.stopPropagation();
  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvents(){
    var trigger = bp.attribute.get(tag, "trigger");
   
    if(trigger === undefined) return; 
    for(var i = 0; i < targets.length; i++){
      target = targets[i];
      bp.tag.triggerEvent(target, trigger)
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function checkValues(name, targetValue, attributeValue){

    if(targetValue === attributeValue) return true;
    if(name !== "style" || targetValue === undefined || attributeValue === undefined) return false;

    // IE handling from here on down

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
        targetValue = bp.attribute.get(target, name);

        if(!checkValues(name, targetValue, attributes[name])) {
          active = false;
          target.bonaparte.values[name] = targetValue;
        }

        if(active !== false) active = true;
      }

      // check toggles
      for(var k=0; k<toggles.length; k++) {
        if(bp.attribute.get(target, toggles[k]) !== "true")
          active=false;

        if(active !== false) active = true;
      }     
 
    } 
    
    var activeClass = bp.attribute.get(tag, "active-class") || "active";
    if(activeClass==="") return;

    if(active === true){
      tag.classList.add(activeClass);
    } else {
      tag.classList.remove(activeClass);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function syncAttributes(){
    var target, targetValue;
    for(var i = 0; i < targets.length; i++){
      target = targets[i];

      // toggle attributes
      // for(var k=0; k<toggles.length; k++) {
      //   targetValue = bp.attribute.get(target, toggles[k]) === "true" ? 
      //     "false":"true";
      //   bp.attribute.set(target, toggles[k], targetValue); 
      // }
      
      // sync attributes
      for(var name in attributes) {
        targetValue = active === true && (toggle === true || toggles.indexOf(name) >=0)? 
          target.bonaparte.values[name]  : attributes[name];

        if(targetValue !== undefined) 
          bp.attribute.set(target, name, targetValue); 
        else 
          bp.attribute.remove(target, name);
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setShortcut(){
    var newShortcuts = bp.attribute.get(tag, "shortcut");

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
    var toggleValue = bp.attribute.get(tag, "toggle");

    toggles = [];
    toggle = false;

    if(toggleValue === undefined) return;

    toggleValue = toggleValue.replace(/\s+/g, " ").split(" ");

    for(var i=0; i < toggleValue.length; i++) {
      if(toggleValue[i] === "true" || toggleValue[i] === "false") {
        toggle = toggleValue[i] === "true";
      }
      else if(toggleValue[i] !== "") {
        toggles.push(toggleValue[i].match(/(?:data-)?(.*)/)[1]);
      }
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = {};
    for(var i=0; i < tag.attributes.length; i++) {
      if(bp.attribute.matchName(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(?:data-)?(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = bp.attribute.get(tag, "target");

    // only restrict button in toolbar sidebars.
    var potentialToolbar = bp.tag.closest(tag, "toolbar-bonaparte");
    var context = potentialToolbar && bp.tag.contains(potentialToolbar.firstElementChild, tag)?
      potentialToolbar : document;

     
    var newTargets = context.querySelectorAll(selector);
    if(context !== document && context.matches(selector)) {
      newTargets=Array.prototype.slice.call(newTargets);
      newTargets.push(context);
    }


    if(newTargets.length <= 0) return;

    // Remove old target event handlers
    for(var i = 0; i < targets.length; i++){
      targets[i].removeEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }

    targets = [];
    for(var i=0; i < newTargets.length; i++) {
      newTargets[i].bonaparte = newTargets[i].bonaparte || {};
      newTargets[i].bonaparte.values = newTargets[i].bonaparte.values ||{};
      targets.push(newTargets[i]);
      bp.tag.observe(newTargets[i]);
      newTargets[i].addEventListener("bonaparte.tag.attributeChanged", targetAttributeChangedCallback);
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = bp.attribute.get(tag, "action");

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