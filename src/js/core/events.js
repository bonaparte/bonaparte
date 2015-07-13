var util = require("./utility");





///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = events;

///////////////////////////////////////////////////////////////////////////////
function events(tag){

  var values = {};
  var observer = new MutationObserver(attributeChangedCallback);
  observer.observe(tag, {attributes:true});

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
        previousValue : values[attribute],
        newValue : tag.attributes[attribute].value
      };

      values[attribute] = data.newValue;

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



