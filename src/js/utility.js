module.exports = utility = {};

///////////////////////////////////////////////////////////////////////////////

utility.nodeContains = function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};