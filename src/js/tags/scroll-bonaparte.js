var bp = require("bonaparte");

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("scroll", scroll);

///////////////////////////////////////////////////////////////////////////////
function scroll(tag){
  var content =  tag.firstElementChild;
  var slider, scrollbar, scrollBarVisible;

  if(bp.attribute.get(tag, "scrollbar") === "native") return;

  setupScroller();

///////////////////////////////////////////////////////////////////////////////
// Public 
 
  this.bonaparte.update = update;

///////////////////////////////////////////////////////////////////////////////
// Eventlisteners

  if(bp.attribute.get(tag, "resize") !== "false")
    window.addEventListener("resize", update);
  
  content.addEventListener("scroll", updatePosition);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function update(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    // VISIBILITY
    if(scrollHeight <= containerHeight) {
      if(scrollBarVisible !== false) {
        scrollbar.style.opacity = 0.01;
        scrollBarVisible = false;
      }
    }
    else {
      if(scrollBarVisible !== true) {
        scrollbar.style.opacity = "";
        scrollBarVisible = true;
      }
    } 

    // SLIDER SIZE / POSITION
    updatePosition();

  }

///////////////////////////////////////////////////////////////////////////////

  function updatePosition(){
    var containerHeight = tag.offsetHeight;
    var scrollHeight = content.scrollHeight;

    var sliderSize = Math.min(1, Math.max( 0.05, map(scrollHeight/containerHeight, 1, 5, 1, 0.05)));

    var position = scrollHeight-containerHeight > 0 ? content.scrollTop / (scrollHeight-containerHeight) : 0;
    var top = map(position, 0, 1, 0, containerHeight-(containerHeight*sliderSize));

    slider.style.height=(100*sliderSize)+"%";
    slider.style.top=top+"px";
  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    content.style.marginRight = -scrollBarWidth+"px";
    content.style.paddingRight = scrollBarWidth+"px";
  
    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    update();

    tag.appendChild(scrollbar);

  }

///////////////////////////////////////////////////////////////////////////////
// x: current Value, 
// cMin: current range min, 
// cMax: current range max, 
// tMin: target range min, 
// tMax: target range max, 
// easingFunction: easingFunction (string)

  function map(x, cMin, cMax, tMin, tMax, easingFunction) {
    easingFunction = typeof easing === "object" && easing[easingFunction] !== undefined ? 
      easing[easingFunction] : 
      function (t, b, c, d) { return b+c*(t/=d) };
    if(x===0) return tMin;
    return easingFunction(x-cMin, tMin, tMax-tMin, cMax-cMin);  
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////

function getScrollBarWidth(){
  var width = document.body.clientWidth;
  var overflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "scroll";
  width -= document.body.clientWidth;
  document.documentElement.style.overflow = overflow;
  return width;
}