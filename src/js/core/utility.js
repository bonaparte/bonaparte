var objct = require("objct");
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  testAttribute : testAttribute,
  setAttribute : setAttribute,
  getClosest : getClosest,
  map : map
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

function getClosest(tag, name){
  while((tag=tag.parentNode)&&tag.nodeName.toUpperCase()!==name.toUpperCase()); 
  return tag ? tag:false; 

}

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}
///////////////////////////////////////////////////////////////////////////////

function testAttribute(patterns, name){
  var pattern, dataPattern;
  if(!objct.isArray(patterns)) patterns = [patterns];

  for(var i=0; i<patterns.length; i++) {
    pattern = patterns[i];
    dataPattern = new RegExp("data-"+pattern.source);
    if(pattern.test(name) ||  dataPattern.test(name)) 
      return true;
  }
  return false;
}

///////////////////////////////////////////////////////////////////////////////

function setAttribute(tag, name, value) {
  if(tag.attributes["data-"+name] !== undefined) 
    tag.setAttribute("data-"+name, value);
  else 
    tag.setAttribute(name, value);
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
