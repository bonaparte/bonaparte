///////////////////////////////////////////////////////////////////////////////

var bp = require("bonaparte-core");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("sidebar", sidebar, [ "sidebar", "content" ]);

///////////////////////////////////////////////////////////////////////////////
function sidebar(tag){
  bp.tag.DOMReady(updateSize);

///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("bonaparte.tag.attributeChanged", attributeChangedCallback);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(data){
    if(bp.attribute.matchName(/size/, data.detail.name)) updateSize();
  }


///////////////////////////////////////////////////////////////////////////////

  function updateSize(data){
    // if(!tag.firstElementChild) return;
    var size = bp.attribute.get(tag, "size");
    var sidebar = bp.attribute.get(tag, "position");
    var style = sidebar === "left" || sidebar==="right" ? "min-width" : "min-height";
    if(size === undefined)
      tag.firstElementChild.style[style] = "";
    else
      tag.firstElementChild.style[style] = size;
  }

}

///////////////////////////////////////////////////////////////////////////////
