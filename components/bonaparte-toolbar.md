# < bonaparte-toolbar >
The toolbar component is a specialized [bonaparte sidebar](bonaparte-sidebar.html) which contains button groups. 

The toolbar inherits all the functionality from [`<bonaparte-sidebar>`](bonaparte-sidebar.html). In addition child elements of the _sidebar_ are handled as _ button groups_ and spread evenly from left to right / top to bottom.

## Structure
```html
<bonaparte-toolbar
  open
  position
>
    <1st-child> <!-- toolbar -->
        <nth-child> <!-- group -->
    </1st-child>
    
    <2nd-child> <!-- content -->

</bonaparte-toolbar>
```
---

#### `<1st-child>` Toolbar
Place on one side of the _content_ according to the `sidebar` attribute.

#### `<1st-child> <nth-child>` Group
Each child of the toolbar is considered a button group. Groups are spread out evenly long the toolbar.

#### `<2nd-child>` Content
Holds the main content. The toolbar is placed around this element.

## Attributes

#### `open`
Defines if the toolbar is open/visible.<br>
- _Default `true`_<br>
- _Values `false` `true`_


#### `position`
Defines the position of the toolbar relative to the _content_ area.<br>
- _Default `left`_<br>
- _Values `top` `right` `bottom` `left`_

## Events

#### `bonaparte.toolbar.open`
Triggers when the toolbar opens.

- _Source `<bonaparte-toolbar>`_<br>
- _Bubbles __Yes___

#### `bonaparte.toolbar.close`
Triggers when the toolbar closes.<br>
- _Source `<bonaparte-toolbar>`_<br>
- _Bubbles __Yes___

