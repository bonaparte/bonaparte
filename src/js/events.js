module.exports = function(){

  this.addEventListener     = addEventListener;
  this.removeEventListener  = removeEventListener;
  this.triggerEvent         = triggerEvent;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  var eventHandlers = {};

///////////////////////////////////////////////////////////////////////////////

  function triggerEvent(event, data){
    if(typeof eventHandlers[event] !== "object" ) return;
   
    var length = eventHandlers[event].length;
    var i = -1;
    while(++i < length) {
      eventHandlers[event][i](data);
    }
  }

//////////////////////////////////////////////////////////////////////////////

  function addEventListener(event, handler){
    if( typeof handler !== "function" ) throw "Unexpected type of "+(typeof handler)+"! Expected function.";

    eventHandlers[event] = eventHandlers[event] || [];

    // if already registered
    if( eventHandlers[event].indexOf(handler) >= 0 ) return;

    eventHandlers[event].push(handler);    

  }

//////////////////////////////////////////////////////////////////////////////

  function removeEventListener(event, handler){
    if(typeof eventHandlers[event] !== "object") return;

    var index = eventHandlers[event].indexOf(handler);

    if( index >= 0 ) {
      eventHandlers[event].splice(index, 1);
    }
  }

///////////////////////////////////////////////////////////////////////////////

}

