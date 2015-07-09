var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("sortable", sortable, []);

///////////////////////////////////////////////////////////////////////////////
function sortable(){
  var tag = this;
  var children = tag.children;

  var currentDraggedElem = null;

  for (var i = children.length - 1; i >= 0; i--) {
  	var child = children[i];
  	util.setAttribute(child, 'draggable', 'true');
  	util.setAttribute(child, 'data-bonaparte-Id', i);

  	child.addEventListener('dragstart', dragstart);
  	child.addEventListener('dragenter', dragenter);
  	child.addEventListener('dragover', dragover);
  	child.addEventListener('dragleave', dragleave);
  	child.addEventListener('dragend', dragend);
  	child.addEventListener('drop', drop);
  };

  console.log('children', children);
// debugger;



  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function dragstart(e){
   console.log('dragstart', e);
   currentDraggedElem = e.srcElement;
   e.target.classList.add('dragging');
  }
  function dragenter(e){
   console.log('dragenter', e);
   e.target.classList.add('dragover');
  }
  function dragover(e){
   console.log('dragover', e);
   e.preventDefault();
  }  
  function dragleave(e){
   console.log('dragleave', e);
   e.target.classList.remove('dragover');
  }
  function dragend(e){
   console.log('dragend', e);
   e.target.classList.remove('dragging');
   // debugger;
  }

  function drop(e){
   var elem = e.srcElement;
   var parent = currentDraggedElem.parentNode;

   parent.removeChild(currentDraggedElem);
   parent.insertBefore(currentDraggedElem, elem);

   currentDraggedElem = null;
   console.log('drop', e);

   // debugger;
  }

  
  
// event.preventDefault()

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////