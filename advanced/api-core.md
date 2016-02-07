# Bonaparte Core - API

```javascript
  var bp = require("bonaparte");
```
* [bp.attribute](#bpattribute)
 -  [get()](#bpattributeget)
 -  [matchName()](#bpattributematchname)
 -  [remove()](#bpattributeremove)
 -  [set()](#bpattributeset)
* [bp.module](#bpmodule)
 -  [mixin()](#bpmodulemixin)
* [bp.tag](#bptag)
 -  [closest()](#bptagclosest)
 -  [contains()](#bptagcontains)
 -  [create()](#bptagcreate)
 -  [DOMReady()](#bptagdomready)
 -  [observe()](#bptagobserve)
 -  [triggerEvent()](#bptagtriggerevent)



## bp.attribute

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
## bp.module
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
## bp.tag

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
