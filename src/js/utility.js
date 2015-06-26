module.exports = utility = {};

///////////////////////////////////////////////////////////////////////////////

utility.nodeContains = function(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

utility.getAttribute = function(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}