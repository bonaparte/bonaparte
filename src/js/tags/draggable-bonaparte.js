var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("draggable", draggable);
///////////////////////////////////////////////////////////////////////////////
function draggable(tag) {
  var children = tag.children,
    count = [],
    draggable = false,
    currentDraggedElem = null,
    handler = util.getAttribute(tag, 'handler'),
    target = util.getAttribute(tag, 'target'),
    dropZones = target ? document.querySelectorAll(target) : children;

  for (var i = children.length - 1; i >= 0; i--) {
    var child = children[i];
    util.setAttribute(child, 'draggable', 'true');
    util.setAttribute(child, 'bonaparte-id', i);

    child.addEventListener('mousedown', mousedown);
    child.addEventListener('dragstart', dragstart);
  };
  

///////////////////////////////////////////////////////////////////////////////
  function addListeners(){
    for (var i = dropZones.length - 1; i >= 0; i--) {
      var dropZone = dropZones[i];
      draggable = true;
      dropZone.addEventListener('dragenter', dragenter);
      dropZone.addEventListener('dragover', dragover);
      dropZone.addEventListener('dragleave', dragleave);
      dropZone.addEventListener('dragend', dragend);
      dropZone.addEventListener('drop', drop);
    }
  }
  function removeListeners(){
    for (var i = dropZones.length - 1; i >= 0; i--) {
      var dropZone = dropZones[i];
      draggable = false;
      dropZone.removeEventListener('dragenter', dragenter);
      dropZone.removeEventListener('dragover', dragover);
      dropZone.removeEventListener('dragleave', dragleave);
      dropZone.removeEventListener('dragend', dragend);
      dropZone.removeEventListener('drop', drop);
    }
  }


///////////////////////////////////////////////////////////////////////////////
  
  function mousedown(e) {
    var dragElem = findDraggableEl(e);
    if (handler) {
      var slectedElem = dragElem.querySelectorAll(handler);
      if (e.target === slectedElem[0] || util.nodeContains(slectedElem[0], e.target)) {
        console.log('USE this to drag');
        addListeners();
      } else {
        console.log('can not drag');
        removeListeners();
      }
    } else {
      console.log('can drag');
      addListeners();
    }

  }


  function dragstart(e){

    if (draggable) {
      var dragElem = findDraggableEl(e);
      currentDraggedElem = dragElem;
      dragElem.classList.add('dragging');
    } else {
      var crt = this.cloneNode(true);
      crt.style.visibility = "hidden";
      e.dataTransfer.setDragImage(crt, 0, 0);
    }
  }


  function dragenter(e){
    var elem = findDraggableEl(e),
      id = util.getAttribute(elem, 'bonaparte-id');
       
    count[id] = (count[id] + 1) || 1;
    elem.classList.add('dragover');
  }
  function dragover(e){
   e.preventDefault();
  }  
  function dragleave(e){
    var elem = findDraggableEl(e),
      id = util.getAttribute(elem, 'bonaparte-id');
    
    count[id] -= 1;

    if (count[id] < 1) {
      elem.classList.remove('dragover');
    }
  }
  function dragend(e){
   findDraggableEl(e).classList.remove('dragging');
  }
  function drop(e){
    var elem = findDraggableEl(e);

    count = [];
    elem.classList.remove('dragover');
    currentDraggedElem.classList.remove('dragover');

    if (elem !== currentDraggedElem) {
      var parent = currentDraggedElem.parentNode;
      parent.removeChild(currentDraggedElem);
      parent.insertBefore(currentDraggedElem, elem);
    }

    var details = {
      dropedElem:  currentDraggedElem,
      dropZone:  elem,
      order: tag.children
    }

    util.triggerEvent(tag, "draggable.drop", {detail : details});


    // draggable
    currentDraggedElem = null;
  }

  function findDraggableEl (e) {
    var isElDraggable = (e.target.getAttribute('draggable') === 'true');
    var eventTarget = e.target;
    while (!isElDraggable) {
      isElDraggable = (eventTarget.getAttribute('draggable') === 'true');
      if (!isElDraggable) {
        eventTarget = eventTarget.parentNode;
      }
    }
    return eventTarget;
  }

///////////////////////////////////////////////////////////////////////////////

}

///////////////////////////////////////////////////////////////////////////////