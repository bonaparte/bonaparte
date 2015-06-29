var objct = require("objct");
var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("./tag"), 
  require("./toggle"),
  panel
);

///////////////////////////////////////////////////////////////////////////////

panel.prototype = {
  open : open,
  close : close
};

function panel(){
  var tag = this;

  this.addListener("attributeChangedCallback", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


  function attributeChangedCallback(data){
    switch(data.name) {
      case "open": 
        if(util.getAttribute(tag, "stayOpen") === "true") break;
        setTimeout(function(){ 
          if(data.newValue === "true") 
            tag.global.addListener("click", clickHandler);
          else
            tag.global.removeListener("click", clickHandler);
        },0); // wait for end of current process > let event finish bubbling up.
      break;

    } 
  }

///////////////////////////////////////////////////////////////////////////////

  function clickHandler(e){
    if(e.target === tag || util.nodeContains(tag, e.target)) return;
    tag.close();
  }

///////////////////////////////////////////////////////////////////////////////

}
///////////////////////////////////////////////////////////////////////////////

function close() {
  this.setAttribute("open", "false");
}

///////////////////////////////////////////////////////////////////////////////

function open() {
  this.setAttribute("open", "true");
}