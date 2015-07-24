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

## Development

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

#### Structure

Bonaparte has a modular structure and is therefore very easily extendable.
Each bonaparte tag is a combination of __modules__.

__Modules__ are simple javascript functions that get instanciated for each tag-instance on the page:

```javascript
  function module(tag) {
    // tag === this === current tag instance
  }
```

## API
Requiring the `bonaparte` module provides all the necessary functions to create new _tags_ from modules, as well a set of utility functions that can be used within _modules_.

```javascript
  var bp = require("bonaparte"); // this also works in the module repository itself
```

### bp.module
#### bp.modules.mixin()
Combines _modules_ into a new _module_ <br>
__Returns__ a _module_.

```javascript

var module = bp.modules.mixin(
    (Function)   module,                 // Modules to be combined
    (Function)   module,                 // Modules will be instanciated in the order they they are passed to the mixin funcition.
    ...
)

```
### bp.tag
#### bp.tag.create();
Creates a new bonaparte-tag from _modules_. <br>
__Returns__ a tag definition.

```javascript

var tag = bp.tag.create( 
    (String)        name,               // Tag name. "-bonaparte" is automatically appended.
    (Function)      constructor,        // Tag constructor function. Will be instanciated for every tag on the page.
  [ (Array)         mixins,         ]   // Array of mixins and tagDefinitions the new tag inherits from.
  [ (HTMLElement)   htmlBaseElement ]   // Define the html element this tag inherits from (Default: HTMLElement)
)

////////////

tag.register();                         // Registers tag in HTML. After calling this function, the tag can be used in HTML.
tag.initialize( (HTMLElement) tag );    // Initializes the tag on an existion HTMLElement.
tag.mixin( (Array) mixins );            // Define mixins to chustomize existing tags behaviors.      

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
