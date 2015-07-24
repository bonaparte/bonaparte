# Bonaparte UX Framework

### Examples

__Internal:__

[Kitchen-Sink](https://github.dowjones.net/pages/newsroomdevelopment/bonaparte/examples/kitchen-sink.html)
<br>
[Toolbar](https://github.dowjones.net/pages/newsroomdevelopment/bonaparte/examples/toolbar.html)

__Public:__

[Kitchen-Sink](http://dowjones.github.io/bonaparte/examples/kitchen-sink.html)
<br>
[Toolbar](http://dowjones.github.io/bonaparte/examples/toolbar.html)


### Use

- Download / Clone Repository.
- Include files: 

  ```
  ./dist/SUI/semantic.min.css
  ./dist/bonaparte.css

  ./dist/SUI/semantic.min.js
  ./dist/bonaparte.js
  ```

## Dev Setup

> ### SUI theme
> #### Install / Build
>
> - Clone Repository (Note: Respository includes submodules)
> - Run `npm install` in `./`. _(Select **NO** for all options for fastes result)_
>
> #### Development
>
> > __One doesn't simply work in `dist/` directly.__ <br>
> > _- Wise Man_
>
> - Install / Build SUI.
> - Run `gulp SUI-watch` to watch `.SUI/ui/` and keep `dist/` up to date.
> - Work in `ui/`. _( Theme: `./ui/src/themes/bonaparte/` )_


### Bonaparte

#### Install / Build

- Clone Repository (Note: Respository includes submodules)
- Run `npm install` in `./`.

#### Development

- Run `gulp BPA-watch` to watch `./src/` and keep `./dist/` up to date.

## Structure

Bonaparte has a modular structure and is therefore very easily extendable.
Each bonaparte tag is a combination of __modules__.

__Modules__ are simple javascript functions that get instanciated for each tag-instance on the page:

```javascript
  function module(tag) {
    // tag === this === current tag instance
  }
```

## Events

Bonaparte-Tags emit the following custom events.

```javascript
  "bonaparte.tag.created"
  "bonaparte.tag.attached"
  "bonaparte.tag.detached"
  "bonaparte.tag.attributeChanged"
  "bonaparte.tag.attributeUpdated"
```

Custom tags can easily be triggered on Bonaparte-Tags by calling
```javascript
document.getElementById("bonaparte-tag").bonaparte.triggerEvent("name", data)`
```
or through the api on any element 

```javascript
bp.tag.triggerEvent(tag, "name", data)`;
```

## API
Requiring the `bonaparte` module provides all the necessary functions to create new _tags_ from modules, as well a set of utility functions that can be used within _modules_.

```javascript
  var bp = require("bonaparte"); // this also works in the module repository itself
```

### bp.module
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

### bp.tag
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

#### bp.tag.observe();
Sets on observer on the given Element.
The observed element now emits `bonaparte.tag.attributeChanged` and `bonaparte.tag.attributeUpdated` events.

```javascript
bp.tag.observe(
  (HTMLElement) element
)
```

#### bp.tag.contains();
Checks one Element is placed inside another.<br>
__Returns:__ `true|false`

```javascript
bp.tag.contains(
  (HTMLElement) parent,
  (HTMLElement) child
)
```

#### bp.tag.closest();
Traverses up the element tree to find the first element that matches the given selector.
__Returns:__ `Element|undefined`

```javascript
bp.tag.closest(
  (HTMLElement)   element,
  (querySelector) selector
)
```

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


### bp.attribute
Utility functions that should be used to handle attributes. <br>
They automatically handle both `name` and `data-name` attributes in one go and normalize events across browsers.

#### bp.attribute.get();
Get an attribute from the given tag by attribute name. Automatically checks for data-[name] as well.<br>
__Return:__ attribute value.

```javascript
bp.attribute.get(
  (HTMLElement)   element,
  (String)        attributeName,
)

```

#### bp.attribute.set();
Set an attribute on the given tag. Checks automatically if the attribute exists with or without data- prefix.

```javascript
bp.attribute.set(
  (HTMLElement)   element,
  (String)        attributeName,
  (String)        value
)

```
#### bp.attribute.remove();

Removes an attribute from the given tag. Checks automatically if the attribute exists with or without data- prefix.

```javascript
bp.attribute.remove(
  (HTMLElement)   element,
  (String)        attributeName
)

```

#### bp.attribute.matchName();

Compares two attribute names and checks if they are the same with: `"attributeName" === "data-attributeName"`<br>
__Returns:__ `true|false`

```javascript
bp.attribute.matchName(
  (String)      needle,
  (String)      haystack
)

```

## Tags

```html
<toolbar
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
      
    </nth-child>
  
  </1st-child>
  <2nd-child content /> 

  <!-- Optional -->
  <cornerstone-bonaparte />

</toolbar-bonaparte>
```

```html
<sidebar
  sidebar=[left|top|right|bottom]
  open=[true|false]
>

  <!-- Required -->
  <1st-child sidebar />
  <2nd-child content /> 
  
</sidebar-bonaparte>
```

```html
<!-- only as direct child of <toolbar-bonaparte> -->
<cornerstone-bonaparte
  open=[false|true]
>
</cornerstone-bonaparte>
```

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

```html
<!-- parent element must not be position:static -->
<scroll-bonaparte
  scrollBar=[hover|visible|hidden|native]
>

  <!-- Required -->
  <1st-child content />

</scroll-bonaparte>
```

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

  <!-- Required if dropdown attribute defined -->
  <1st-child drowdown />

</button-bonaparte>
```
