# < bonaparte-sidebar >
The Sidebar is a UI element consisting of to two areas, a sidebar and a content area. As opposed to the panel, the sidebar does not overlay over the content but pushes it. There can be multiple sidebars open at the same time and they can be nested.
> If you plan to only have buttons in the sidebar have a look at [`<toolbar-bonaparte>`](bonaparte-toolbar.html) instead.


### Structure
```html
<bonaparte-sidebar
  position
  open
>
  <1st-child> <!-- sidebar -->
  
  <2nd-child> <!-- content --> 
  
</bonaparte-sidebar>
```

##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :---------
__position__  |   `left`<br>`top`<br>`right`<br>`bottom` | `left` | Defines the position of the sidebar relative to its content area.
__open__ | `true` | `true` | Displays the Sidebar according to its `min-width`.
 | `false` | | Sets the size of the sidebar to 0px.


##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | sidebar | yes | Will be place according to the _sidebar_ attribute.
__2__ | content | yes | Holds the main content. The sidebar is placed around this element.


##### Events
[Not yet implemented.. sry]
Name | Target | Bubbles | Description 
:--------- | :--- | :------ | :------
__bonaparte.sidebar.open__ | `<bonaparte-sidebar>` | yes | Triggers when a sidebar opens.
__bonaparte.sidebar.close__ | `<bonaparte-sidebar>` | yes | Triggers when a sidebar closes.

