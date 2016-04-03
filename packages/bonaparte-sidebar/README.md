# < bonaparte-sidebar >

[![npm version](https://badge.fury.io/js/bonaparte-sidebar.svg)](http://badge.fury.io/js/bonaparte-sidebar)

The sidebar component divides the space into two areas: _sidebar_ and _content_. The *sidebar* can be positioned on either side of the *content*. 
As opposed to the panel, the sidebar does not overlay the content but pushes it. There can be multiple sidebars open at the same time and they can be nested.

> If you plan to only have buttons in the sidebar have a look at [`<toolbar-bonaparte>`](bonaparte-toolbar.html) instead.


## Structure
```html
<bonaparte-sidebar
  position
  open
>
  <1st-child> <!-- sidebar -->
  
  <2nd-child> <!-- content --> 
  
</bonaparte-sidebar>
```

---

#### `<1st-child>` Sidebar
Place on one side of the _content_ according to the `sidebar` attribute.

#### `<2nd-child>` Content
Holds the main content. The sidebar is placed around this element.

## Attributes

#### `open`
Defines if the sidebar is open/visible.<br>
- _Default `true`_<br>
- _Values `false` `true`_


#### `position`
Defines the position of the sidebar relative to the _content_ area.<br>
- _Default `left`_<br>
- _Values `top` `right` `bottom` `left`_

## Events

#### `bonaparte.sidebar.open`
Triggers when the sidebar opens.

- _Source `<bonaparte-sidebar>`_<br>
- _Bubbles __Yes___

#### `bonaparte.sidebar.close`
Triggers when the sidebar closes.<br>
- _Source `<bonaparte-sidebar>`_<br>
- _Bubbles __Yes___

