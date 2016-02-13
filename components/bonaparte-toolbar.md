# < bonaparte-toolbar >
The toolbar component is a specialized [bonaparte sidebar](bonaparte-sidebar.html) which contains button groups. 

The toolbar inherits all the functionality from [`<bonaparte-sidebar>`](bonaparte-sidebar.html). In addition child elements of the _sidebar_ are handled as _ button groups_ and spread evenly from left to right / top to bottom.

## Structure
```html
<bonaparte-toolbar
  open
  position
>
    <1st-child> <!-- sidebar -->
        <nth-child> <!-- group -->
    </1st-child>
    
    <2nd-child> <!-- content -->

</bonaparte-toolbar>
```


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



#### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | sidebar | yes | Will be place according to the _sidebar_ attribute.
__1.x__ | button-group | (yes) | All direct children of the _sidebar_ are handled as button groups and spread evenly within the sidebar.
__2__ | content | yes | Holds the main content. The sidebar is placed around this element.
