var bp = require("./api");
var objct = require("objct");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = children;
module.exports.normalizeChildren = normalizeChildren;
module.exports.mapChildren = mapChildren;

///////////////////////////////////////////////////////////////////////////////

function children(tagName, children){
  children = normalizeChildren({
    role : "root",
    children : children || {}
  });
  console.log(children);

  // var error = map.indexOf(null);
  // if(error >= 0) throw "Bonaparte - "+tagName+": Role of child "+error+" is not defined.";


  return function(tag, name) {
    bp.tag.DOMReady(function(){checkChildren(tag, children)});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

    function checkChildren(element, child, path){
      path = path || tag.tagName;
      var length = element.children.length;

      bp.tag.observe(element);
      element.addEventListener("bonaparte.tag.childrenChanged", function(){checkChildren(element, child)})

      var map = mapChildren(child, length);

      for(var i=0; i<length; i++) {
        if(!child.children[map[i]]) break;
        element.children[i].setAttribute("bonaparte-"+name+"-role", child.children[map[i]].role);
        if(typeof child.children[map[i]].children === "object") {
          path = child.role === "root" ?
            path+"."+child.children[map[i]].role+"["+i+"]":
            path+"/"+element.tagName+"."+child.children[map[i]].role+"["+i+"]";

          checkChildren(element.children[i], child.children[map[i]], path);
        }
      }
      console.log(child);
      if(child.minChildren > length) console.warn("Bonaparte - "+path+": Needs a minimum of "+child.minChildren+" children! "+length+" provided.");
      if(child.maxChildren < length) console.warn("Bonapartem - "+path+": Can take a maximum of "+child.maxChildren+" children! "+length+" provided.");

    }

///////////////////////////////////////////////////////////////////////////////

  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function normalizeChildren(node) {
  var child = {
    role : node.role || node,
    children : {},
    formulas : [],
    indexes : [],
    minChildren : node.minChildren,
    maxChildren : node.maxChildren
  };
  if(!node.children) return child;

  // Normalize children to object
  if(objct.isArray(node.children))
    for(var i=0; i<node.children.length; i++) {
      child.children[i]= node.children[i];
    }
  else child.children = node.children;

  // extract formulas and indexes
  var minIndex = 0;
  var maxIndex = 0;
  var keys = Object.keys(child.children);

  if(keys.length === 0) return child;
  for(var k=0; k<keys.length; k++) {
    if(isNaN(keys[k]*1)) {
      child.formulas.push(keys[k]);
    }
    else {
      maxIndex= Math.max(maxIndex, keys[k]);
      minIndex= Math.min(minIndex, keys[k]);
      child.indexes.push(keys[k]);
    }
    child.children[keys[k]]=normalizeChildren(child.children[keys[k]]);
  }
  var minChildren = maxIndex-minIndex;

  // Set minChildren and maxChildren
  if(minChildren > child.minChildren || !child.minChildren)
    child.minChildren = minChildren;

  if(child.formulas.length === 0) {
    if(child.maxChildren < child.minChildren || !child.maxChildren)
      child.maxChildren = child.minChildren;
  }
  return child;
}

///////////////////////////////////////////////////////////////////////////////

function mapChildren(child, length){
  var children = child.children;
  var map = Array.apply(null, Array(length)).map(function(){return null});
  var formula, index;

  for(var k=0; k<child.formulas.length; k++) {
    formula = child.formulas[k].split("n+");
    for(var i=0; i<length; i++) {
      index = parseInt(formula[0])*i+parseInt(formula[1]);
      if(index >= length) break;
      map[index] = child.formulas[k];
    }
  }
  for(var k=0; k<child.indexes.length; k++) {
    index = parseFloat(child.indexes[k]);
    index = index < 0 ? index+length : index;
    map[index] = child.indexes[k];
  }
  return map;
}
