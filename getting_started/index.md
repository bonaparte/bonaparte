# Getting Started

The easiest way to get your hands dirty is to start with one of the three starter kits:

* [Starter Vanilla](http://github.com/bonaparte/starter-vanilla)<br>*Creates a basic page using Bonaparte components without any framework.*
* [Starter React](http://github.com/bonaparte/starter-react)<br>*Creates a basic page using Bonaparte components and the React framework.*
* [Starter Angular](http://github.com/bonaparte/starter-angular)<br>*Creates a basic page using Bonaparte components and the Angular framework.*

Each starter includes the all Bonaparte components and the Napoleon theme (Napoleon Build).
Just select your favorite framework and open `index.html` in your browser!

## Use Bonaparte in your project
To include all Bonaparte Components:

1. Download one of the Bonaparte builds:
 * [Pure Build](http://github.com/bonaparte/build-pure)<br>*Includes all Bonaparte Components without any design.*
 * [Napoleon Build](http://github.com/bonaparte/build-napoleon)<br>*Includes all Bonaparte Components and the Napoleon theme*
1. Copy the `dist/` folder into your project.
2. Include the following into the `<head>` of your project: 
```
<link rel='stylesheet' type="text/css" href='path/to/dist/bonaparte.css'>
<script src='path/to/dist/bonaparte.js'></script>
```

> Createing your own custom build is easy as well! <br>Learn more: [4.1 Custom Build](advanced/custom-build.md)

## Use a single Bonaparte component in your project
Each component can also be used separately:

1. Download any of the Bonaparte components.
1. Copy the `dist/` folder into your project.
2. Include the following into the `<head>` of your project:  
```
<link rel='stylesheet' type="text/css" href='path/to/dist/bonaparte.css'>
<script src='path/to/dist/bonaparte.js'></script>
```