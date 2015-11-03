# Bonaparte UX Framework – Core

- [About](#about)
- [Getting Started](#getting-started)
- [To Look At](#to-look-at)
- [Basic Use](#basic-use)
- [Bonaparte Components](#bonaparte-components)
  - [Standard Components](#standard-components)
  - [Highlevel Components](#highlevel-components)
- [Structure/Modules](#structuremodules)
  - [Events](#events)
- [Create New Components](#create-new-components)
- [API](#api)
  -  [bp.attribute.get()](#bpattributeget)
  -  [bp.attribute.matchName()](#bpattributematchname)
  -  [bp.attribute.remove()](#bpattributeremove)
  -  [bp.attribute.set()](#bpattributeset)
  -  [bp.module.mixin()](#bpmodulemixin)
  -  [bp.tag.closest()](#bptagclosest)
  -  [bp.tag.contains()](#bptagcontains)
  -  [bp.tag.create()](#bptagcreate)
  -  [bp.tag.DOMReady()](#bptagdomready)
  -  [bp.tag.observe()](#bptagobserve)
  -  [bp.tag.triggerEvent()](#bptagtriggerevent)

## About
This module is the core of the _Bonaparte UX Framework_. It provides an [API](#api) with all the tools needed to create Bonaparte Components.

## Getting Started
They don't even have any design that comes with them. So order to get started, check out the Dow Jones imlementation of Bonparte here: https://github.com/dowjones/bonaparte

Later you can come back and build your own Bonaparte implementation. Bonaparte itself are just a lot of parts that can be used together or by themseves. 

## To Look At

__Research/Proposal:__

[Bonaparte Research/Proposal](https://docs.google.com/a/dowjones.com/document/d/1l0vsb8ZkeJjaNtEFa-49VCAalIajGf0l4zmKBbP95sI/edit?usp=sharing)
<br>
[Bonaparte Components](https://docs.google.com/a/dowjones.com/document/d/11ufSpZOKBbgdOJ5NUsfq_Yk-ziA9sWgTJiMd1G02IzA/edit?usp=sharing)


## Basic Use

Require the API:
```javascript
var bp = require("bonaparte");
```

Create a custom component:
```javascript
module.exports = bp.tag.create("tag-name", function(){…});
```

## Bonaparte Components
Bonaparte Components are library and design agnostic UX components. They are placed in HTML in form of custom tags. 
Each components functionality can be customized through attributes.

Some components define a number of `required` child tags. Required children must be the first children. After the required child elements, there can be aubitrary additional content.

> Note: (Design Agnostic) No component uses the `class` attribute in any way. You can use your favorite frontend frameworks classes for styling.

> Note: Required children can be any type of tag. (i.e. the < sidebar-bonaparte >'s first child can be a `<div>` or more semantically correct an `<aside>` tag.

#### Standard Components

  - [< button-bonaparte >](https://github.com/bonaparte/bonaparte-button)
  - [< scroll-bonaparte >](https://github.com/bonaparte/bonaparte-scroll)
  - [< sidebar-bonaparte >](https://github.com/bonaparte/bonaparte-sidebar)
  - [< panel-bonaparte >](https://github.com/bonaparte/bonaparte-panel)


#### Highlevel Components
Highlevel components enforce a certain level of design hierachry by implementing some restrictions.
For the best result, use as many highlevel components in your design as possible.

  - [< toolbar-bonaparte >](https://github.com/bonaparte/bonaparte-toolbar)


## Structure/Modules

Bonaparte has a modular structure and is therefore very easily extendable.
Each bonaparte tag is a combination of __modules__.

__Modules__ are simple javascript functions that get instanciated for each tag-instance on the page:

```javascript
  function module(tag) {
    // tag === this === current tag instance
  }
```

### Events

Bonaparte-Tags emit the following custom events.

```javascript
  "bonaparte.tag.created"
  "bonaparte.tag.attached"
  "bonaparte.tag.detached"
  "bonaparte.tag.attributeChanged" // Value changed
  "bonaparte.tag.attributeUpdated" // Value updated (might not have changed)
```

##### Listen
Listen to them like you do with native events:
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



## API
Requiring the `bonaparte` module provides all the necessary functions to create new _tags_ from modules, as well a set of utility functions that can be used within _modules_.

```javascript
  var bp = require("bonaparte"); // this also works in the module repository itself
```
---
---

### bp.attribute

Utility functions that should be used to handle attributes. <br>
They automatically handle both `name` and `data-name` attributes in one go and normalize events across browsers.

---
#### bp.attribute.get();
Get an attribute from the given tag by attribute name. Automatically checks for data-[name] as well.<br>
__Return:__ attribute value.

```javascript
bp.attribute.get(
  (HTMLElement)   element,
  (String)        attributeName,
)

```
---
#### bp.attribute.matchName();

Compares two attribute names and checks if they are the same with: `"attributeName" === "data-attributeName"`<br>
__Returns:__ `true|false`

```javascript
bp.attribute.matchName(
  (String)      needle,
  (String)      haystack
)

```

---
#### bp.attribute.remove();

Removes an attribute from the given tag. Checks automatically if the attribute exists with or without data- prefix.

```javascript
bp.attribute.remove(
  (HTMLElement)   element,
  (String)        attributeName
)

```

---
#### bp.attribute.set();
Set an attribute on the given tag. Checks automatically if the attribute exists with or without data- prefix.

```javascript
bp.attribute.set(
  (HTMLElement)   element,
  (String)        attributeName,
  (String)        value
)

```


---
---
### bp.module
---
#### bp.module.mixin()
Combines _modules_ into a new _module_ <br>
__Returns__ a _module_.
```javascript

var module = bp.modules.mixin(
    (Function)   module,                 // Modules to be combined
    (Function)   module,                 // Modules will be instanciated in the order they they are passed to the mixin funcition.
    ...
)

```
> Modules are combinded to an `objct`. Read more about the objct library [here](https://github.com/greenish/js-objct)

---
---
### bp.tag

---
#### bp.tag.closest();
Traverses up the element tree to find the first element that matches the given selector.
__Returns:__ `Element|undefined`

```javascript
bp.tag.closest(
  (HTMLElement)   element,
  (querySelector) selector
)
```

---
#### bp.tag.contains();
Checks one Element is placed inside another.<br>
__Returns:__ `true|false`

```javascript
bp.tag.contains(
  (HTMLElement) parent,
  (HTMLElement) child
)
```
---
#### bp.tag.create();
Creates a new bonaparte-tag from _modules_. <br>
__Returns__ _Tag Factory_.


```javascript

var tag = bp.tag.create( 
    (String) name,                    // Tag name. "-bonaparte" is automatically appended.
    (Array|Function) modules,         // Modules the new tag includes.
  [ (HTMLElement) htmlBaseElement ]   // Define the html element this tag inherits from (Default: HTMLElement)
)

////////////
// Static functions

tag.register();                         // Registers tag in HTML. After calling this function, the tag can be used in HTML.
tag.initialize( (HTMLElement) tag );    // Initializes the tag on an existion HTMLElement.
tag.mixin( (Array) mixins );            // Define mixins to chustomize existing tags behaviors.      

```

The returned _Tag Factory_ that can be.
  - Used as a mixin in other tags to extend their functionality.
  - Registered to the DOM with `tag.register()` 
  - Initiated on an existing element in the DOM with `tag.initialize(element)`
  - Extended with modules through `tag.mixin(module)`


> A _Tag Factory_ is an `objct`. Read more about the objct library [here](https://github.com/greenish/js-objct)
      
> Static methods on modules become static methods on the _Tag Factory_.

---
#### bp.tag.DOMReady();
Calls the handler function when the DOM is ready. If the DOM is already completed, the handler is called imediately.

```javascript
bp.tag.DOMReady(
  (function) handler
)
```
---
#### bp.tag.observe();
Sets on observer on the given Element.
The observed element now emits `bonaparte.tag.attributeChanged` and `bonaparte.tag.attributeUpdated` events.

```javascript
bp.tag.observe(
  (HTMLElement) element
)
```
---
#### bp.tag.triggerEvent();
Triggers a event on the given HTMLElement
__Returns:__ `undefined`

```javascript
bp.tag.triggerEvent(
  (String)        event,
  (HTMLElement)   target,
  (Object)        data,
 [(Boolean)       bubbles = true ]
 [(Boolean)       cancelable=true]
)
```
