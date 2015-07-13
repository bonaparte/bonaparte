var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("sidebar", sidebar);

///////////////////////////////////////////////////////////////////////////////
function sidebar(tag){
  var sidebar = tag.firstElementChild;
  // updateSize();



///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    console.log("attribute changed");
    // if(util.matchAttribute(/open/, data.detail.name) && data.detail.newValue !== "true") updateSize(data);
  }


///////////////////////////////////////////////////////////////////////////////

  function updateSize(data){
    console.log("update", data.detail);

    var sidebar = util.getAttribute(tag, "sidebar");

    if(sidebar === "left" || sidebar==="right")
      tag.firstElementChild.style.width = tag.firstElementChild.offsetWidth+"px";
    else 
      tag.firstElementChild.style.height = tag.firstElementChild.offsetHeight+"px";

  }

}

///////////////////////////////////////////////////////////////////////////////