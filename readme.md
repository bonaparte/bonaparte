# Bonaparte UX Framework

- [Basic Use](#basic-use)
- [Examples](#examples)
- [Bonaparte Components](#bonaparte-components)
  - [Standard Components](#standard-components)
    - [< button-bonaparte >]()
    - [< scroll-bonaparte >]()
    - [< sidebar-bonaparte >]()
    - [< panel-bonaparte >]()
  - [Highlevel Components](#highlevel-components)
    - [< toolbar-bonaparte >]()    
      - [< cornerstone-bonaparte >]()
- [Development](#development)
  - [Bonaparte](#bonaparte)
  - [Semantic UI Theme](#sui-theme)
- [Structure/Modules](#structuremodules)
  - [Events](#events)
    - [Listen](#listen)
    - [Trigger](#trigger)
- [API](#api)
  - [bp.attribute](#bpattribute)
    -  [bp.attribute.get()](#bpattributeget)
    -  [bp.attribute.matchName()](#bpattributematchname)
    -  [bp.attribute.remove()](#bpattributeremove)
    -  [bp.attribute.set()](#bpattributeset)
  - [bp.module](#bpmodule)
    -  [bp.module.mixin()](#bpmodulemixin)
  - [bp.tag](#bptag)
    -  [bp.tag.closest()](#bptagclosest)
    -  [bp.tag.contains()](#bptagcontains)
    -  [bp.tag.create()](#bptagcreate)
    -  [bp.tag.observe()](#bptagobserve)
    -  [bp.tag.triggerEvent()](#bptagtriggerevent)


## Basic Use

- Download / Clone Repository.
- Include files: 

  ```
  ./dist/SUI/semantic.min.css
  ./dist/bonaparte.css

  ./dist/SUI/semantic.min.js
  ./dist/bonaparte.js
  ```

## Examples

[Kitchen-Sink](http://dowjones.github.io/bonaparte/examples/kitchen-sink.html)
<br>
[Toolbar](http://dowjones.github.io/bonaparte/examples/toolbar.html)


__Designs:__

[Bonaparte Styles](http://dowjones.github.io/bonaparte/designs/Bonaparte%20v0.2.pdf)
<br>
[Narrator](http://dowjones.github.io/bonaparte/designs/Narrator%20UI%20v0.1.pdf)
<br>
[Narrator (Toolbars)](http://dowjones.github.io/bonaparte/designs/Narrator%20UI%20v0.1%20-%20toolbars.pdf)
<br>
[Xavier](http://dowjones.github.io/bonaparte/designs/Xavier%20UI%20v0.2.pdf)


## Bonaparte Components
Bonaparte Components are custom tags, that can be used in HTML and come with built in functionality.

Each component can be customized through attributes.

In addition, some components define a number of `required` child tags. Required children must be the first children. After the required child elements, there can be aubitrary additional content.

> Note: No component uses the `class` attribute in any way. You can use your favorite frontend frameworks classes for styling.

> Note: Required children can be any type of tag. (i.e. the <sidebar-bonapartes>'s first child can be a `<div>` or more semantically correct an `<aside>` tag.

### Standard Components

#### < sidebar-bonaparte >

```html
<sidebar-bonaparte
  sidebar=[left|top|right|bottom]
  open=[true|false]
>

  <!-- Required -->
  <1st-child sidebar />
  <2nd-child content /> 
  
</sidebar-bonaparte>
```

#### < panel-bonaparte >

```html
<!-- parent element must not be position:static -->
<panel-bonaparte
  position=[left|top|right|bottom]
  open=[false|true]
>
</panel-bonaparte>

<!-- events -->
bonaparte.panel.open
bonaparte.panel.close

```
#### < scroll-bonaparte >

```html
<!-- parent element must not be position:static -->
<scroll-bonaparte
  scrollBar=[hover|visible|hidden|native]
>

  <!-- Required -->
  <1st-child content />

</scroll-bonaparte>
```
#### < button-bonaparte >
```html

<button-bonaparte
  target=[querySelector]
  target-[attribute]=[value]
  action=[event]
  toggle=[false|true]?[attribute]*
  trigger=[event]
  bubbles=[true|false]
  active-class=[classname|""]
  shortcut=[shortcut]
>


</button-bonaparte>
```

### Highlevel Components
Highlevel components enforce a certain level of design hierachry by implementing some restrictions. 

#### < toolbar-bonaparte >
```html
<toolbar-bonaparte
  cornerstone=[top|bottom][left|right][outside]?

  extends:sidebar
>

  <!-- Required -->
  <1st-child sidebar>
    
    <!-- Required -->
    <nth-child button-group>
    
      <!-- Required -->
      <nth-child button
        extends:button
      />
  
  <2nd-child content /> 

  <!-- Optional -->
  <cornerstone-bonaparte />

</toolbar-bonaparte>
```
##### < cornerstone-bonaparte >

```html
<!-- only as direct child of <toolbar-bonaparte> -->
<cornerstone-bonaparte
  extends:button
>
</cornerstone-bonaparte>
```

## Development

### Bonaparte

#### Install / Build

- Clone Repository (Note: Respository includes submodules)
- Run `npm install` in `./`.

#### Development

- Run `npm run install-dev` in `./`. _(Select **NO** for all options for fastes result)_
- Run `gulp BPA-watch` to watch `./src/` and keep `./dist/` up to date.

> ### SUI theme
> #### Install / Build
>
> - Clone Repository (Note: Respository includes submodules)
> - Run `npm install` in `./`. 
>
> #### Development
>
> > __One doesn't simply work in `dist/` directly.__ <br>
> > _- Wise Man_
>
> - Install / Build SUI.
> - Run `npm run install-dev` in `./`. _(Select **NO** for all options for fastes result)_
> - Run `gulp SUI-watch` to watch `.SUI/ui/` and keep `dist/` up to date.
> - Work in `ui/`. _( Theme: `./ui/src/themes/bonaparte/` )_


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
bp.tag.triggerEvent(tag, "name", data)`;
```

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
__Returns__ a tag definition.


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
> Modules are combinded to an `objct`. Read more about the objct library [here](https://github.com/greenish/js-objct)
      
> Static methods on modules become static methods on the tag-definition.

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

---
