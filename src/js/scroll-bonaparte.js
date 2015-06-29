var objct  = require("objct");
var util   = require("./utility");

///////////////////////////////////////////////////////////////////////////////

var scrollBarWidth = false;

///////////////////////////////////////////////////////////////////////////////

module.exports = objct(
  require("./tag"),
  scroll
);

///////////////////////////////////////////////////////////////////////////////

function scroll(){
  var tag = this;
  var content =  this.firstElementChild;

  if(util.getAttribute(tag, "scrollbar") === "native") return;

  if(util.getAttribute(tag, "resize") === "true") {
    tag.global.addListener("resize", update);
  }
  content.addEventListener("scroll", updatePosition);

  this.update = update;

  setupScroller();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  var slider, scrollbar;
  var scrollBarVisible;

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

    var sliderSize = Math.min(1, Math.max( 0.05, util.map(scrollHeight/containerHeight, 1, 5, 1, 0.05)));

    var position = scrollHeight-containerHeight > 0 ? content.scrollTop / (scrollHeight-containerHeight) : 0;
    var top = util.map(position, 0, 1, 0, containerHeight-(containerHeight*sliderSize));

    slider.style.height=(100*sliderSize)+"%";
    slider.style.top=top+"px";
  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    content.style.marginRight = -scrollBarWidth+"px";
  

    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    update();

    tag.appendChild(scrollbar);

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