var objct = require("objct");

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
  var slider, scrollbar;

  setupScroller();

  this.firstElementChild.addEventListener("scroll", scrolling);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function scrolling(){
    var scrollHeight = this.scrollHeight;
    var containerHeight = tag.offsetHeight;


  }

///////////////////////////////////////////////////////////////////////////////

  function setupScroller(){
    // Remove/Hide native Scrollbar
    scrollBarWidth = scrollBarWidth || getScrollBarWidth();
    tag.firstElementChild.style.marginRight = -scrollBarWidth+"px";
  

    slider = document.createElement("div")
    slider.setAttribute("class", "slider");

    scrollbar = document.createElement("div")
    scrollbar.setAttribute("class", "scrollbar");
    scrollbar.appendChild(slider);

    tag.appendChild(scrollbar);




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

///////////////////////////////////////////////////////////////////////////////

}
