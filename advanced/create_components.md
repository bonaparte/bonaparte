# Create Bonaparte Components

Bonaparte comes with all the necessary tools to make creating new components simple.

At the core of Bonaparte is the `bonaparte` package. It provides an API with all the necessary functions to create new components.


## A Bonaparte package

There are three types of Bonaparte packages: 
* **Components**<br>*Define a single Bonaparte component.*
* **Themes**<br>*Define CSS only. Themes don't export any JavaScript*
* **Builds**<br>*Combine multiple components and themes into a bundle*

In addition to `package.json` and `webpack.config.js`, Bonaparte uses three files to define a package:

```javascript
package
 |--bonaparte.js                    // required for components
 |--bonaparte.[css|less|scss|sass]  // required for components and themes
 |--bonaparte.build.js              // required for all
 |--package.json                    // required for all
 |--webpack.config.js               // required for all
```


##### bonaparte.js
`bonaparte.js` is required when creating a component.<br>
It exports the results of `bp.tag.create()`:

```javascript
module.exports = bp.tag.create('my-component', function(){
    // magic
})
```

##### bonaparte.css
When creating a component or theme, all styles are defined or `@imported` into a bonaparte.css.<br>
**You can use any preprocessor you like and rename the file accordingly (i.e. bonaparte.less)**

```css
@import 'my-styles.css'
```

##### bonaparte.build.js
**`bonaparte.build.js` is the `main` file of the package** and the entry point of the build.<br>
It `requires` and initializes/registers everything the package/component needs to work on the page.

For a standard component that is:

```javascript
require('./bonaparte.css');
require('./bonaparte.js').register();
```

And when building a theme:
```javascript
require('./bonaparte.css');
```






## Basic Use

Require the API:
```javascript
var bp = require("bonaparte");
```

Create a custom component:
```javascript
module.exports = bp.tag.create("tag-name", function(){…});
```

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

