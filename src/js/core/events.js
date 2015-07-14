var util = require("./utility");





///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = events;

///////////////////////////////////////////////////////////////////////////////
function events(tag){

  var observer = new MutationObserver(attributeChangedCallback);
  observer.observe(tag, {
    attributes:true,
    attributeOldValue:true
  });

///////////////////////////////////////////////////////////////////////////////
// Public

  this.triggerEvent = triggerEvent;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function attributeChangedCallback(mutations){
    var attribute, data;
    
    for(var i=0; i<mutations.length; i++) {
      attribute = mutations[i].attributeName;
      if(typeof tag.attributes[attribute] === "undefined") continue;

      data = {
        name : attribute,
        previousValue : mutations[i].oldValue,
        newValue : tag.attributes[attribute].value
      };

      triggerEvent("tag.attributeChanged", data);

    }
    
  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvent(event, data, bubbles, cancelable){
    util.triggerEvent(tag, "bonaparte."+event, {
        bubbles: bubbles || false,
        cancelable: cancelable || false,
        detail: data
    });
  }

///////////////////////////////////////////////////////////////////////////////


}



