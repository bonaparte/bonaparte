var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("panel", panel, [
  require("../mixins/toggle")
]);

///////////////////////////////////////////////////////////////////////////////
function panel(){
  var tag = this;
  var locked = false;

///////////////////////////////////////////////////////////////////////////////
// Public 

  this.open = open;
  this.close = close;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  window.addEventListener("click", clickHandler);
  window.addEventListener("bonaparte:closePanels", closePanels);
  this.addEventListener("attributeChangedCallback", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.testAttribute(/open/, data.detail.name)){
      if(data.detail.newValue == "true") {
        lock();

        util.triggerEvent(tag, "bonaparte:closePanels", {bubbles:true});
        util.triggerEvent(tag, "panel:open", {bubbles:true});
        util.triggerEvent(tag, "open");
      }
      else {
        util.triggerEvent(tag, "panel:close", {bubbles:true});
        util.triggerEvent(tag, "close");
      }
    };    
  }

///////////////////////////////////////////////////////////////////////////////

  function closePanels(){
    if(locked) return;
    tag.close();
  }

///////////////////////////////////////////////////////////////////////////////

  function close() {
    tag.setAttribute("open", "false");
  }

///////////////////////////////////////////////////////////////////////////////

  function open(e) {    
    lock();
    tag.setAttribute("open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    locked=true;
    setTimeout(function(){ locked=false; },0);
  }
}

///////////////////////////////////////////////////////////////////////////////