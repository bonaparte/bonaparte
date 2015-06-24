module.exports = { 
  createdCallback: function() {
    console.log(this.nodeName+': here I am ^_^ ', this, arguments);
    // console.log('with content: ', this.textContent);
  },
  attachedCallback: function() {
    console.log(this.nodeName+': live on DOM ;-) ', this, arguments);
  },
  detachedCallback: function() {
    console.log(this.nodeName+': leaving the DOM :-( )', this, arguments);
  },
  attributeChangedCallback : function( name, previousValue, value ) {
    if (previousValue == null) {
      console.log(
        this.nodeName+': got a new attribute ', name,
        ' with value ', value
      );
    } else if (value == null) {
      console.log(
        this.nodeName+': somebody removed ', name,
        ' its value was ', previousValue
      );
    } else {
      console.log(
        this.nodeName+': '+name,
        ' changed from ', previousValue,
        ' to ', value
      );
    }
  }
};