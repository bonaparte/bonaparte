# < toolbar-bonaparte >
A Toolbar is a specialized sidebar which contains button groups. The toolbar inherits all the functionality from [`<sidebar-bonaparte>`](#-sidebar-bonaparte-). In addition child elements of the sidebar are handled as button groups and spread evenly from left to right or top to bottom.
As a highlevel component Toolbars also implements restrictions on buttons. Buttons within a toolbar can only _target_ child elements of the `<toolbar-bonaparte>` tag. They can not _target_ parent elements of the toolbar.

```html
<toolbar-bonaparte
  cornerstone=[top|bottom][left|right][outside]?

  extends:sidebar
>

  <1st-child sidebar>
    <nth-child button-group>

  <2nd-child content /> 

  <cornerstone-bonaparte />  <!-- Optional -->

</toolbar-bonaparte>
```

##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | sidebar | yes | Will be place according to the _sidebar_ attribute.
__1.x__ | button-group | (yes) | All direct children of the _sidebar_ are handled as button groups and spread evenly within the sidebar.
__2__ | content | yes | Holds the main content. The sidebar is placed around this element.


##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__cornerstone__ | `left` `right`<br>`top` `bottom` | `left top` | Defines the position of the cornerstone within the toolbar.
 | `outside` | | If present, the cornerstone sits outside the toolbar and pushes it.<br>The first passed side defines the side on which the cornerstone leaves the toolbar. <br>`left top outside`: Cornerstone sits left of the toolbar aligned top.<br>`top left outside`: Cornerstone sits on top of the toolbar aligned left.


## < cornerstone-bonaparte >
A cornerstone is a special button placed in one corner of a toolbar. There can only be one cornerstone per toolbar and its position is defined by it's toolbar. Cornerstones don't exist outside Toolbars.

```html
<!-- only as direct child of <toolbar-bonaparte> -->
<cornerstone-bonaparte
  extends:button
>
</cornerstone-bonaparte>
```
