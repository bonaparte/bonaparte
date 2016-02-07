# Custom Build

Bonaparte is build with [Webpack](http://webpack.github.io/). It's easy to save some bytes by removing some components from the build or to use your projects own webpack build to bundle bonaparte with the rest of your JavaScript code.

## bonaparte.build.js

Every Bonaparte component, theme or build has a `bonaparte.build.js` file in it's root. These files are used to compose Bonaparte.

*build-napoleon/bonaparte.build.js*
```javascript
// Components
require('bonaparte-panel/bonaparte.build');
require('bonaparte-scroll/bonaparte.build');
require('bonaparte-button/bonaparte.build');
require('bonaparte-sidebar/bonaparte.build');
require('bonaparte-toolbar/bonaparte.build');
require('bonaparte-draggable/bonaparte.build');
require('bonaparte-dropdown/bonaparte.build');

// Themes
require('bonaparte-theme-napoleon/bonaparte.build');

```

## Rebuild Bonaparte

The easiest way to create a custom build is by starting off one of the existing builds ([build-pure](http://github.com/bonaparte/build-pure) or [build-napoleon](http://github.com/bonaparte/build-napoleon)).

1. Download/Clone the build that includes all the components you need.
2. Install the package:
 ```
$ npm install
```
3. Update `bonaparte.build.js` to include only the components your project needs.
4. Rebuild Bonaparte:
 ```
$ npm run build
```
5. Copy the recreated `dist/` folder into your project.

## Build Bonaparte within your project

To build Bonaparte as part of your own project, add the Bonaparte packages you need to your `package.json`. Then just *require* the `bonaparte.build.js` file for each of them.

*Include a complete build:*
```javascript
require('bonaparte-build-napoleon/bonaparte.build');
```

*Single components:*
```javascript
require('bonaparte-scroll/bonaparte.build');
require('bonaparte-dropdown/bonaparte.build');
```
*Or themes:*
```javascript
require('bonaparte-theme-napoleon/bonaparte.build');
```

> Note: Make sure to include themes after components.
