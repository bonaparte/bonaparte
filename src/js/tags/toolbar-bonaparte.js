var bp = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("toolbar", [
  require("./sidebar-bonaparte.js"),
  toolbar
]);

///////////////////////////////////////////////////////////////////////////////
function toolbar(tag){

  if(document.readyState === "complete") initializeButtons();
  else window.addEventListener("load", initializeButtons);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function initializeButtons(){
    var groups = tag.firstElementChild.children;
    var buttons=[];
    for(var i=0; i<  groups.length; i++) {
      for(var k=0; k<groups[i].children.length; k++) {

        if(groups[i].children[k].nodeName.toUpperCase() !== "BUTTON-BONAPARTE")
          buttons.push(groups[i].children[k]);
      }

    }

    for(var i = 0; i< buttons.length; i++){
      require("./button-bonaparte").initialize(buttons[i]);
    }


  }
///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////