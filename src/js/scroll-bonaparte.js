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
    // VISIBILITY
    if(content.scrollHeight <= tag.offsetHeight) {
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

    // SLIDER SIZE


    // SLIDER POSITION
    updatePosition();

  }

///////////////////////////////////////////////////////////////////////////////

  function updatePosition(){


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