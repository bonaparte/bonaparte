var util = require("../core/utility");
var registerTag = require("../core/tag");
var mousetrap = require("mousetrap");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("panel", panel, [
  require("../mixins/toggle")
]);

mousetrap.bind("esc", function(){util.triggerEvent(window, "bonaparte.internal.closePanels")});

///////////////////////////////////////////////////////////////////////////////
function panel(tag){
  var locked = false;

///////////////////////////////////////////////////////////////////////////////
// Public 

  this.open = open;
  this.close = close;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  window.addEventListener("click", clickHandler);
  window.addEventListener("bonaparte.internal.closePanels", closePanels);
  tag.addEventListener("bonaparte.tag.attributeUpdated", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.matchAttribute(/open/, data.detail.name)){
      if(data.detail.newValue == "true") {
        lock();

        tag.bonaparte.triggerEvent("bonaparte.internal.closePanels", null, true);
        tag.bonaparte.triggerEvent("bonaparte.panel.open", null, true);
      }
      else { 
        tag.bonaparte.triggerEvent("bonaparte.panel.close", null, true);
      }
    };    
  }

///////////////////////////////////////////////////////////////////////////////

  function closePanels(){
    if(locked) return;
    close();
  }

///////////////////////////////////////////////////////////////////////////////

  function close() {
    util.setAttribute(tag, "open", "false");
  }

///////////////////////////////////////////////////////////////////////////////

  function open(e) {    
    util.setAttribute(tag, "open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    locked=true;
    setTimeout(function(){ locked=false; },0);
  }
}

///////////////////////////////////////////////////////////////////////////////