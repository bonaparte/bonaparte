var bp = require("bonaparte");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("cornerstone", [
  require("bonaparte-button"),
  cornerstone
]);

///////////////////////////////////////////////////////////////////////////////
function cornerstone(tag){
  var toolbar = tag.parentNode;

  updateCornerstonePadding();
///////////////////////////////////////////////////////////////////////////////
  
  tag.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  toolbar.addEventListener("bonaparte.tag.attributeChanged", updateCornerstonePadding);
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function updateCornerstonePadding(){
    var cornerStonePosition = bp.attribute.get(toolbar, "cornerstone").match(/(\w+)/g);
    var sidebarPosition = bp.attribute.get(toolbar, "sidebar");
    
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