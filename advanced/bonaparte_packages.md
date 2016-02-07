# Bonaparte packages

There are three types of Bonaparte packages: 
* **Components**<br>*Define a single Bonaparte component.*
* **Themes**<br>*Define CSS only. Themes don't export any JavaScript*
* **Builds**<br>*Combine multiple components and themes into a bundle*

A minimal Bonaparte component package includes five files:

```javascript
package
 |--bonaparte.js                    // required for components
 |--bonaparte.[css|less|scss|sass]  // required for components and themes
 |--bonaparte.build.js              // required for all
 |--package.json                    // required for all
 |--webpack.config.js               // required for all
```


#### bonaparte.js
`bonaparte.js` is required when creating a component.<br>
It exports the results of `bp.tag.create()`:

```javascript
module.exports = bp.tag.create('my-component', function(){
    // magic
})
```

#### bonaparte.css
When creating a component or theme, all styles are defined or `@imported` into bonaparte.css.<br>
**You can use any preprocessor you like and rename this file accordingly (i.e. bonaparte.less)**

```css
@import 'my-styles.css'
```

#### bonaparte.build.js
**`bonaparte.build.js` is the `main` file of the package** and the entry point of the build.<br>
It `requires` and initializes/registers everything the package/component needs to work on the page.

For a standard component that is:

```javascript
require('./bonaparte.css');
require('./bonaparte.js').register();
```

When building a theme it's just the css:
```javascript
require('./bonaparte.css');
```

And for a Build it's a number of bonaparte components and themes:

```javascript
require('bonaparte-dropdown');
require('bonaparte-scroll');

require('bonaparte-theme-napoleon');
```

#### webpack.config.js
The Bonaparte core package `bonaparte` provides a webpack.config for standard bonaparte components and themes:
```
module.exports = require('bonaparte/webpack.config');
```

#### package.json
In your `package.json` add the `bonaparte` core package as a dependencie and define `bonaparte.build.js` as your `main` entry point.

``` 
{
    "name" : "bonaparte-[my-component]",
    
    "main" : "bonaparte.build.js",

    "dependencies" : {
        "bonaparte" : "x.x.x",
 
        ...
    }
 
    ...
}
```

