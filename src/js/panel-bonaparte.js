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
    if(e.target === tag || util.nodeContains(e.target, tag)) return;
    tag.close();
  }

///////////////////////////////////////////////////////////////////////////////

}
///////////////////////////////////////////////////////////////////////////////

function close() {
  this.setAttribute("open", "false");
  this.trigger(this.NodeName+"-closed", {element:this});
}

///////////////////////////////////////////////////////////////////////////////

function open() {
  this.setAttribute("open", "true");
  this.trigger(this.NodeName+"-opened", {element:this});
  this.global.trigger(this.NodeName+"-opened", {element:this});
}