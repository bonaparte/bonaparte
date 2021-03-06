# < bonaparte-panel >

[![npm version](https://badge.fury.io/js/bonaparte-panel.svg)](http://badge.fury.io/js/bonaparte-panel)

A panel is a temporary UI element that slides in from one side and overlays the content.
There can only be one panel open at a time. Clicking outside of a panel or opening an second panel will close the currently open one.

> For a permanent sidebar that doesn't overlay the content use [`<sidebar-bonaparte>`](bonaparte-sidebar.html)

#### Examples

- [Starter](http://bonaparte.github.io/starter-vanilla)


## Structure
```html
<!-- Position relative to parent element. Parent must not be position:static. -->
<bonaparte-panel
  open
  position
>
</bonaparte-panel>
```

## Attributes

#### `open`
Defines if the panel is visible or not.<br>
- _Default `false`_<br>
- _Values `false` `true`_


#### `position`
Defines the position of the panel relative to it's parent container.<br>
- _Default `left`_<br>
- _Values `top` `right` `bottom` `left`_

## Events

#### `bonaparte.panel.open`
Triggers when the panel opens.

- _Source `<bonaparte-panel>`_<br>
- _Bubbles __Yes___

#### `bonaparte.panel.close`
Triggers when the panel closes.<br>
- _Source `<bonaparte-panel>`_<br>
- _Bubbles __Yes___
