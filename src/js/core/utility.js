// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  isAttribute : isAttribute,
  map : map
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}
///////////////////////////////////////////////////////////////////////////////

function isAttribute(name, attribute){
  return name === attribute || name === "data-"+attribute;
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
