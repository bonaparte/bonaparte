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

  this.global.addListener("click", clickHandler);
  this.global.addListener("closePanels", closePanels);
  this.addListener("attributeChangedCallback", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    closePanels();
  }

///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(util.isAttribute("open", data.name)){
      if(data.newValue == "true") {
        lock();
        tag.global.trigger("closePanels");
        tag.global.trigger("panel:open");
        tag.trigger("open");
      }
      else {
        tag.global.trigger("panel:close");
        tag.trigger("close");
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
    // lock();
    tag.setAttribute("open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    locked=true;
    setTimeout(function(){ locked=false; },0);
  }
}

///////////////////////////////////////////////////////////////////////////////