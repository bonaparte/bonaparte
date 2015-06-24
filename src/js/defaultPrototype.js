module.exports = function testPrototype() {

  return Object.create(
    HTMLElement.prototype, {
    createdCallback: {value: function() {
      console.log(this.nodeName+': here I am ^_^ ');
      // console.log('with content: ', this.textContent);
    }},
    attachedCallback: {value: function() {
      console.log(this.nodeName+': live on DOM ;-) ');
    }},
    detachedCallback: {value: function() {
      console.log(this.nodeName+': leaving the DOM :-( )');
    }},
    attributeChangedCallback: {value: function(
      name, previousValue, value
    ) {
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
    }}
    });
}