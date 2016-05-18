var bp = require("bonaparte-core");
var mousetrap = require("mousetrap");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("panel", [
  require("./toggle"),
  panel
]);

mousetrap.bind("esc", function(){bp.tag.triggerEvent(window, "bonaparte.internal.closePanels")});

///////////////////////////////////////////////////////////////////////////////
function panel(tag){
  var locked = false;

///////////////////////////////////////////////////////////////////////////////
// Public

  tag.bonaparte.open = open;
  tag.bonaparte.close = close;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  window.addEventListener("click", clickHandler);
  window.addEventListener("bonaparte.internal.closePanels", closePanels);
	tag.addEventListener("bonaparte.tag.attributeUpdated", attributeUdatedCallback);
	tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || bp.tag.contains(tag, e.target)) return;
    setTimeout(closePanels, 0); // Wait a tick for other click events to be executed in IE.
  }


///////////////////////////////////////////////////////////////////////////////

  function attributeUdatedCallback(data){
    if(bp.attribute.matchName(/open/, data.detail.name)){
      if(data.detail.newValue === "true") lock();
    }
  }
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(bp.attribute.matchName(/open/, data.detail.name)){
			if(data.detail.newValue !== "true") {
        tag.bonaparte.triggerEvent("bonaparte.panel.close", null, true);
			}
      else {
        lock();
        tag.bonaparte.triggerEvent("bonaparte.internal.closePanels", null, true);
        tag.bonaparte.triggerEvent("bonaparte.panel.open", null, true);
      }
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function closePanels(){
    if(locked) return;
    close();
  }

///////////////////////////////////////////////////////////////////////////////

  function close() {
    bp.attribute.set(tag, "open", "false");
  }

///////////////////////////////////////////////////////////////////////////////

  function open(e) {
    bp.attribute.set(tag, "open", "true");
  }
///////////////////////////////////////////////////////////////////////////////

  function lock(){
    if(locked) return;
    locked=true;
    setTimeout(function(){ locked=false; }, 100); // Wait for IE Events to be done before unlocking.
  }
}

///////////////////////////////////////////////////////////////////////////////
