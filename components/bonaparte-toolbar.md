# < bonaparte-toolbar >
A Toolbar is a specialized sidebar which contains button groups. The toolbar inherits all the functionality from [`<bonaparte-sidebar>`](#-bonaparte-sidebar-). In addition child elements of the sidebar are handled as button groups and spread evenly from left to right or top to bottom.
As a highlevel component Toolbars also implements restrictions on buttons. Buttons within a toolbar can only _target_ child elements of the `<bonaparte-toolbar>` tag. They can not _target_ parent elements of the toolbar.

### Structure
```html
<bonaparte-toolbar
  extends:sidebar
>

  <1st-child sidebar>
    <nth-child button-group>

  <2nd-child content /> 

</bonaparte-toolbar>
```

##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | sidebar | yes | Will be place according to the _sidebar_ attribute.
__1.x__ | button-group | (yes) | All direct children of the _sidebar_ are handled as button groups and spread evenly within the sidebar.
__2__ | content | yes | Holds the main content. The sidebar is placed around this element.
