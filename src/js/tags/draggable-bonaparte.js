var bp = require("bonaparte");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("draggable", draggable);
///////////////////////////////////////////////////////////////////////////////
function draggable(tag) {

  tag.update = update;

  var children = [],
    count = [],
    draggable = false,
    currentDraggedElem = null,
    handler,
    target,
    dropZones;
  
  initialise();

  function update () {
    initialise();
  }

  function initialise () {
    children = tag.children;
    handler = bp.attribute.get(tag, 'handler');
    target = bp.attribute.get(tag, 'target');
    dropZones = target ? document.querySelectorAll(target) : children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];

      bp.attribute.set(child, 'draggable', 'true');
      bp.attribute.set(child, 'bp-order-id', i);

      child.addEventListener('mousedown', mousedown);
      child.addEventListener('mouseup', mouseup);
      child.addEventListener('dragstart', dragstart);
    };
    setRange();
  }

  function setRange () {
    var range = bp.attribute.get(tag, 'range');
    if (range) {
      range = range.split(',');
      for (var i = range.length - 1; i >= 0; i--) {
        range[i] = parseInt(range[i])
      };
      for (var i = children.length - 1; i >= 0; i--) {
        if (i >= range[0] && i <= range[1]) {
          children[i].classList.add('inRange');
        } else {
          children[i].classList.remove('inRange');
        }
      }
    }
  }
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
      if (e.target === slectedElem[0] || bp.tag.contains(slectedElem[0], e.target)) {
        // console.log('Use handler to drag');
        addListeners();
      } else {
        // console.log('can not drag');
        removeListeners();
      }
    } else {
      // console.log('can drag');
      addListeners();
    }

  }

  function mouseup () {
    removeListeners();
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
      id = bp.attribute.get(elem, 'bp-order-id');

    count[id] = (count[id] + 1) || 1;
    elem.classList.add('dragover');
  }

  function dragover(e){
   e.preventDefault();
  }  

  function dragleave(e){
    var elem = findDraggableEl(e),
      id = bp.attribute.get(elem, 'bp-order-id');

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

    setRange();
    bp.triggerEvent(tag, "draggable.drop", {detail : details});
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