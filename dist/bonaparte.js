(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

document.registerElement('toolbar-bonaparte', {
    prototype: require("./defaultPrototype")()
});

document.registerElement('cornerstone-bonaparte', {
    prototype: require("./defaultPrototype")()
});

document.registerElement('panel-bonaparte', {
    prototype: require("./defaultPrototype")()
});

document.registerElement('sidebar-bonaparte', {
    prototype: require("./defaultPrototype")()
});

document.registerElement('content-bonaparte', {
    prototype:require("./defaultPrototype")()
});

document.registerElement('container-bonaparte', {
    prototype: require("./defaultPrototype")()
});


},{"./defaultPrototype":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
