// JS

var panel = require("./src/js/tags/panel-bonaparte");
var scroll = require("./src/js/tags/scroll-bonaparte");
var sidebar = require("./src/js/tags/sidebar-bonaparte");
var toolbar = require("./src/js/tags/toolbar-bonaparte");
var cornerstone = require("./src/js/tags/cornerstone-bonaparte");
var button = require("./src/js/tags/button-bonaparte");
var draggable = require("./src/js/tags/draggable-bonaparte");

// toolbar.mixin({
//   test:function(){
//     alert("test")
//   }
// });

panel.register();
scroll.register();
sidebar.register();
cornerstone.register();
toolbar.register();
button.register();
draggable.register();

document.registerElement('content-bonaparte');


// CSS

require("./src/less/DJ-design/sidebar-bonaparte.less");
require("./src/less/DJ-design/toolbar-bonaparte.less");
require("./src/less/DJ-design/panel-bonaparte.less");
require("./src/less/DJ-design/scroll-bonaparte.less");
require("./src/less/DJ-design/content-bonaparte.less");
require("./src/less/DJ-design/button-bonaparte.less");
