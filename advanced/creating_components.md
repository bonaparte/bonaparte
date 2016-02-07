# Creating Components

To create a new component simply require the Bonaparte core package and use the `bp.tag.create` method to create a new component:

```javascript
var bp = require("bonaparte");

module.exports = bp.tag.create("tag-name", MyModule);

function MyModule(tag) {
    // magic
}

```

## Module Structure
Bonaparte components have a modular structure. 

__Modules__ are simple JavaScript functions/classes:
```javascript
function MyModule(tag) {
// tag === this === current tag instance
}
```
Each Bonaparte component can be composed by one or more __modules__:

```javascript
module.exports = bp.tag.create("tag-name", [
    MyModule, 
    AnotherModule, 
    function(){...}
]);

```
**Every time the component is placed on the page, all its modules are instantiated.**

Bonaparte components are modules themselves. Therefore it is possible to extend an existing Bonaparte component to add functionality:

```javascript
var bonarparteSidebar = require('bonaparte-sidebar/bonaparte.js');

module.exports = bp.tag.create("tag-name", [
    bonaparteSidebar,
    MyModule
]);
```

**Modules** are instantiated in the order they were passed to `bp.tag.create`.

> Bonaparte uses the [Objct](http://github.com/greenish/objct) library to create this modularity.

#### Events

Bonaparte components emit the following custom events.

```javascript
  "bonaparte.tag.created"
  "bonaparte.tag.attached"
  "bonaparte.tag.detached"
  "bonaparte.tag.attributeChanged" // Value changed
  "bonaparte.tag.attributeUpdated" // Value updated (might not have changed)
```

##### Listen
Listen to them like you do to native events:
```javascript
document.getElementById("bonaparte-tag").addEventListener("bonaparte.tag.created", handler);
```

##### Trigger
On Bonaparte-Tags Custom events can easily be triggered by calling
```javascript
document.getElementById("bonaparte-tag").bonaparte.triggerEvent("name", data)
```

Or through the [API](#api) events can be triggered on any element: 
```javascript
bp.tag.triggerEvent(tag, "name", data);
```

##Create New Components
New Bonaparte Components can easily be created with help of the [API](#api):

```javascript
var tag = bp.tag.create("name", function(tag){
  // tag === this === current tag instance
  // Logic goes here.
});
```
(Full documentation: [bp.tag.create()](#bptagcreate))

