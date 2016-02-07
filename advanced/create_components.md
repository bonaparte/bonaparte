# Development

Bonaparte comes with all the necessary tools to create new components.

At the core of Bonaparte is the `bonaparte` package. It provides an API with all the necessary functions to create new components and packages.






## Creating Components

Bonaparte has a modular structure and is therefore very easily extendable.
Each Bonaparte component is a combination of __modules__.

__Modules__ are simple JavaScript functions/classes that get instantiated for each tag-instance on the page:

```javascript
  function module(tag) {
    // tag === this === current tag instance
  }
```


Require the API:
```javascript
var bp = require("bonaparte");
```

Create a custom component:
```javascript
module.exports = bp.tag.create("tag-name", function(){…});
```



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

