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
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function dragstart(e){
   currentDraggedElem = findDraggableEl(e);
   findDraggableEl(e).classList.add('dragging');
  }
  function dragenter(e){
   findDraggableEl(e).classList.add('dragover');
  }
  function dragover(e){
   e.preventDefault();
  }  
  function dragleave(e){
   findDraggableEl(e).classList.remove('dragover');
  }
  function dragend(e){
   findDraggableEl(e).classList.remove('dragging');
  }
  function drop(e){
   findDraggableEl(e).classList.remove('dragover');
   
   var elem = findDraggableEl(e);
   var parent = currentDraggedElem.parentNode;
   parent.removeChild(currentDraggedElem);
   parent.insertBefore(currentDraggedElem, elem);

   currentDraggedElem = null;
  }

  

  function findDraggableEl (e) {
// console.log('e.target', e.target.getAttribute('draggable'));
	var isElDraggable = (e.target.getAttribute('draggable') === 'true');
	var target = e.target;
	while (!isElDraggable) {
		isElDraggable = (target.getAttribute('draggable') === 'true');
		target = target.parentNode;
	}
	console.log('isElDraggable', isElDraggable);
  	return target;

  }
  
// event.preventDefault()

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////