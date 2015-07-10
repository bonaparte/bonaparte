var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("cornerstone", cornerstone);

///////////////////////////////////////////////////////////////////////////////
function cornerstone(){
  var tag = this;
  var toolbar = this.parentNode;

  updateCornerstonePadding();
///////////////////////////////////////////////////////////////////////////////
  
  this.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  toolbar.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function updateCornerstonePadding(){
    var cornerStonePosition = util.getAttribute(toolbar, "cornerstone").match(/(\w+)/g);
    var sidebarPosition = util.getAttribute(toolbar, "sidebar");
    
    toolbar.firstElementChild.style.padding="";
    
    if(cornerStonePosition.indexOf("outside") >= 0) return;

    var sidebarPositionIndex = cornerStonePosition.indexOf(sidebarPosition);

    if(sidebarPositionIndex < 0) return;
    else cornerStonePosition.splice(sidebarPositionIndex,1);

    var paddingSide = cornerStonePosition[0];

    var paddingValue = paddingSide === "left" || paddingSide === "right"?
      tag.offsetWidth:
      tag.offsetHeight;

    paddingSide=paddingSide.charAt(0).toUpperCase() + paddingSide.slice(1);

    toolbar.firstElementChild.style["padding"+paddingSide]=paddingValue+"px";

  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////